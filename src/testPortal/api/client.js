import db from '../../firebase/firestore';
import auth from '../../firebase/auth';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';

class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

// ---------------------------------------------------------------------------
// Helper functions for shuffling and similarity scoring
// ---------------------------------------------------------------------------
function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandomSubset(array, size) {
  const shuffled = shuffle(array);
  return shuffled.slice(0, size);
}

function normalize(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
}

function bigrams(str) {
  const chars = Array.from(str);
  const result = [];
  for (let i = 0; i < chars.length - 1; i++) {
    result.push(chars[i] + chars[i + 1]);
  }
  return result;
}

function diceCoefficient(a, b) {
  const first = bigrams(normalize(a));
  const second = bigrams(normalize(b));

  if (first.length === 0 && second.length === 0) return 1;
  if (first.length === 0 || second.length === 0) return 0;

  const secondPool = [...second];
  let matches = 0;

  for (const bigram of first) {
    const idx = secondPool.indexOf(bigram);
    if (idx !== -1) {
      matches += 1;
      secondPool.splice(idx, 1);
    }
  }

  return (2 * matches) / (first.length + second.length);
}

async function gradeAttemptClient(studentId) {
  const attemptDoc = await getDoc(doc(db, 'test_attempts', studentId));
  if (!attemptDoc.exists()) return;
  const attempt = attemptDoc.data();

  const testDoc = await getDoc(doc(db, 'tests', attempt.testId));
  const testData = testDoc.exists() ? testDoc.data() : {};
  const similarityThreshold = (testData.codingSimilarity || 75) / 100;

  let totalMarks = 0;
  let maxMarks = 0;
  const results = {};

  for (const q of attempt.questions) {
    maxMarks += q.marks;

    const akDoc = await getDoc(doc(db, 'answer_keys', q.id));
    const akData = akDoc.exists() ? akDoc.data() : {};

    const studentAnswer = attempt.answers?.[q.id] || {};
    let isCorrect = false;
    let similarityScore = null;

    if (q.type === 'MCQ') {
      isCorrect = Boolean(
        studentAnswer.selectedOptionId &&
        akData.correctOptionId &&
        studentAnswer.selectedOptionId === akData.correctOptionId
      );
    } else {
      const codeAnswer = studentAnswer.codeAnswer || '';
      const refAnswer = akData.referenceAnswer || '';
      similarityScore = diceCoefficient(codeAnswer, refAnswer);
      isCorrect = similarityScore >= similarityThreshold;
    }

    const marksAwarded = isCorrect ? q.marks : 0;
    totalMarks += marksAwarded;

    results[q.id] = {
      isCorrect,
      marksAwarded,
      similarityScore,
      isManualOverride: false
    };
  }

  await updateDoc(doc(db, 'test_attempts', studentId), {
    results,
    totalMarks,
    maxMarks
  });
}

// ---------------------------------------------------------------------------
// Activity Logging Helper
// ---------------------------------------------------------------------------
const logActivity = async (action, details, adminEmail) => {
  try {
    const user = auth.currentUser;
    const cacheEmail = sessionStorage.getItem('admin_email');
    const performedBy = adminEmail || user?.email || cacheEmail || 'System';
    
    await addDoc(collection(db, 'activity_logs'), {
      performedBy,
      action,
      details,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
};

// ---------------------------------------------------------------------------
// Admin API
// ---------------------------------------------------------------------------
export const adminApi = {
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const adminDocRef = doc(db, 'admins', user.uid);
      const adminDocSnap = await getDoc(adminDocRef);

      // Seed master admin doc if it doesn't exist
      if (!adminDocSnap.exists()) {
        const isMasterEmail = user.email.toLowerCase() === 'admin@aashasm.com';
        await setDoc(adminDocRef, {
          email: user.email,
          role: isMasterEmail ? 'master' : 'admin',
          isMaster: isMasterEmail,
          isActive: true,
          plainPassword: isMasterEmail ? password : '',
          createdAt: serverTimestamp()
        });
        sessionStorage.setItem('admin_email', user.email);
        return { id: user.uid, email: user.email, isMaster: isMasterEmail, isActive: true };
      }

      const adminData = adminDocSnap.data();
      const isMasterEmail = user.email.toLowerCase() === 'admin@aashasm.com';

      // Migrate old docs that are missing isMaster / isActive / plainPassword
      const needsMigration = adminData.isMaster === undefined
        || adminData.isActive === undefined
        || (isMasterEmail && !adminData.plainPassword);

      if (needsMigration) {
        const patch = {};
        if (adminData.isMaster === undefined) patch.isMaster = isMasterEmail;
        if (adminData.isActive === undefined) patch.isActive = true;
        if (adminData.role === undefined) patch.role = isMasterEmail ? 'master' : 'admin';
        if (isMasterEmail && !adminData.plainPassword) patch.plainPassword = password;
        await updateDoc(adminDocRef, patch);
        Object.assign(adminData, patch);
      }

      // Block inactive sub-admins
      if (!adminData.isMaster && !isMasterEmail && adminData.isActive === false) {
        await signOut(auth);
        throw new ApiError('Your account has been deactivated. Contact the master administrator.', 403);
      }

      sessionStorage.setItem('admin_email', user.email);
      return {
        id: user.uid,
        email: user.email,
        isMaster: isMasterEmail || adminData.isMaster || false,
        isActive: adminData.isActive !== false
      };
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(err.message || "Invalid email or password.", 401);
    }
  },

  me: async () => {
    const user = auth.currentUser;
    if (!user) throw new ApiError('Not authenticated.', 401);
    const isMasterEmail = user.email.toLowerCase() === 'admin@aashasm.com';
    const adminDocSnap = await getDoc(doc(db, 'admins', user.uid));
    if (!adminDocSnap.exists()) {
      // If master is logged in but doc is missing, recreate it
      if (isMasterEmail) {
        await setDoc(doc(db, 'admins', user.uid), {
          email: user.email, role: 'master', isMaster: true,
          isActive: true, plainPassword: '', createdAt: serverTimestamp()
        });
        sessionStorage.setItem('admin_email', user.email);
        return { id: user.uid, email: user.email, isMaster: true, isActive: true };
      }
      throw new ApiError('Admin record not found.', 404);
    }
    const data = adminDocSnap.data();
    const isMaster = isMasterEmail || data.isMaster === true;
    if (!isMaster && data.isActive === false) {
      await signOut(auth);
      throw new ApiError('Your account has been deactivated.', 403);
    }
    sessionStorage.setItem('admin_email', user.email);
    return {
      id: user.uid,
      email: user.email,
      isMaster,
      isActive: data.isActive !== false
    };
  },

  logout: async () => {
    sessionStorage.removeItem('admin_email');
    await signOut(auth);
  },
  updateAdminCredentials: async ({ currentPassword, newEmail, newPassword }) => {
    const { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail } = await import('firebase/auth');
    const user = auth.currentUser;
    if (!user) throw new ApiError('Not authenticated.', 401);

    // Re-authenticate first
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    try {
      await reauthenticateWithCredential(user, credential);
    } catch (err) {
      throw new ApiError('Current password is incorrect. Please try again.', 401);
    }

    // Update email if changed
    if (newEmail && newEmail.toLowerCase() !== user.email.toLowerCase()) {
      await updateEmail(user, newEmail.toLowerCase());
      await logActivity('UPDATE_ADMIN_EMAIL', `Admin email updated to: ${newEmail.toLowerCase()}`);
    }

    // Update password if provided
    if (newPassword && newPassword.trim()) {
      await updatePassword(user, newPassword);
      await logActivity('UPDATE_ADMIN_PASSWORD', `Admin password was changed`);
    }

    return { ok: true };
  },

  /* ── Sub-admin management ─────────────────────────────────── */
  createSubAdmin: async (email, password) => {
    const masterUser = auth.currentUser;
    if (!masterUser) throw new ApiError('Not authenticated.', 401);

    try {
      const { initializeApp } = await import('firebase/app');
      const { getAuth, createUserWithEmailAndPassword, signOut: secondarySignOut } = await import('firebase/auth');

      const secondaryFirebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID
      };

      // Use a unique name each time or reuse
      const secondaryApp = initializeApp(secondaryFirebaseConfig, 'SecondaryAdminApp_' + Date.now());
      const sAuth = getAuth(secondaryApp);

      const newCred = await createUserWithEmailAndPassword(sAuth, email.toLowerCase(), password);
      const newUid = newCred.user.uid;

      await setDoc(doc(db, 'admins', newUid), {
        email: email.toLowerCase(),
        plainPassword: password,
        role: 'admin',
        isMaster: false,
        isActive: true,
        createdAt: serverTimestamp()
      });

      await secondarySignOut(sAuth);
      await logActivity('CREATE_ADMIN', `New admin created: ${email.toLowerCase()}`);
      return { ok: true, uid: newUid };
    } catch (err) {
      throw new ApiError(err.message || 'Failed to create admin.', 400);
    }
  },

  createSubAdminWithMasterPass: async (subEmail, subPassword, masterPassword) => {
    // We now use the secondary app pattern which does not sign out the master admin.
    // The masterPassword parameter is ignored because session restoration is no longer needed.
    return adminApi.createSubAdmin(subEmail, subPassword);
  },

  subscribeAdmins: (onData, onError) => {
    return onSnapshot(
      collection(db, 'admins'),
      (snap) => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => {
          if (a.isMaster) return -1;
          if (b.isMaster) return 1;
          return (a.email || '').localeCompare(b.email || '');
        });
        onData(list);
      },
      (err) => onError && onError(err)
    );
  },

  toggleAdminStatus: async (uid, isActive) => {
    await updateDoc(doc(db, 'admins', uid), { isActive });
    await logActivity(
      isActive ? 'ACTIVATE_ADMIN' : 'DEACTIVATE_ADMIN',
      `Admin account ${isActive ? 'activated' : 'deactivated'}: UID ${uid}`
    );
    return { ok: true };
  },

  deleteSubAdmin: async (uid) => {
    await deleteDoc(doc(db, 'admins', uid));
    await logActivity('DELETE_ADMIN', `Admin record deleted: UID ${uid}`);
    return { ok: true };
  },
  subscribeActivityLogs: (onData, onError) => {
    const q = query(
      collection(db, 'activity_logs'),
      orderBy('timestamp', 'desc')
    );
    return onSnapshot(
      q,
      (snap) => {
        const logs = snap.docs.map(d => ({
          id: d.id,
          ...d.data(),
          userEmail: d.data().performedBy || null
        }));
        onData(logs);
      },
      (err) => onError && onError(err)
    );
  },
  subscribeColleges: (onData, onError) => {
    let colleges = [];
    let tests = [];
    let students = [];

    const resolveAndNotify = () => {
      const testCounts = {};
      tests.forEach(t => {
        if (t.collegeId) {
          testCounts[t.collegeId] = (testCounts[t.collegeId] || 0) + 1;
        }
      });

      const studentCounts = {};
      students.forEach(s => {
        if (s.collegeId) {
          studentCounts[s.collegeId] = (studentCounts[s.collegeId] || 0) + 1;
        }
      });

      const list = colleges.map(c => ({
        ...c,
        _count: {
          tests: testCounts[c.id] || 0,
          students: studentCounts[c.id] || 0
        }
      }));

      list.sort((a, b) => a.name.localeCompare(b.name));
      onData(list);
    };

    const unsubColleges = onSnapshot(collection(db, 'colleges'), (snap) => {
      colleges = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      resolveAndNotify();
    }, onError);

    const unsubTests = onSnapshot(collection(db, 'tests'), (snap) => {
      tests = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      resolveAndNotify();
    }, onError);

    const unsubStudents = onSnapshot(collection(db, 'students'), (snap) => {
      students = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      resolveAndNotify();
    }, onError);

    return () => {
      unsubColleges();
      unsubTests();
      unsubStudents();
    };
  },
  subscribeFields: (onData, onError) => {
    const q = query(collection(db, 'interested_fields'));
    return onSnapshot(q, (snap) => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => a.name.localeCompare(b.name));
      onData(list);
    }, onError);
  },
  subscribeTests: (onData, onError) => {
    let tests = [];
    let questions = [];
    let students = [];

    const resolveAndNotify = () => {
      const questionCounts = {};
      questions.forEach(q => {
        if (q.testId) {
          questionCounts[q.testId] = (questionCounts[q.testId] || 0) + 1;
        }
      });

      const studentCounts = {};
      students.forEach(s => {
        if (s.testId) {
          studentCounts[s.testId] = (studentCounts[s.testId] || 0) + 1;
        }
      });

      const list = tests.map(t => ({
        ...t,
        questionCount: questionCounts[t.id] || 0,
        registeredCount: studentCounts[t.id] || 0,
        college: {
          name: t.collegeNames && t.collegeNames.length > 0
            ? t.collegeNames.join(', ')
            : (t.collegeName || 'Unassigned College')
        }
      }));

      list.sort((a, b) => {
        const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
        const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
        return timeB - timeA;
      });

      onData(list);
    };

    const unsubTests = onSnapshot(collection(db, 'tests'), (snap) => {
      tests = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      resolveAndNotify();
    }, onError);

    const unsubQuestions = onSnapshot(collection(db, 'questions'), (snap) => {
      questions = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      resolveAndNotify();
    }, onError);

    const unsubStudents = onSnapshot(collection(db, 'students'), (snap) => {
      students = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      resolveAndNotify();
    }, onError);

    return () => {
      unsubTests();
      unsubQuestions();
      unsubStudents();
    };
  },
  subscribePortalSettings: (onData, onError) => {
    return onSnapshot(doc(db, 'settings', 'portal'), (snap) => {
      onData(snap.exists() ? snap.data() : { showOnWebsite: false });
    }, onError);
  },
  me: () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (!user) {
          reject(new ApiError("Not authenticated.", 401));
          return;
        }
        try {
          const docRef = doc(db, 'admins', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().role === 'admin') {
            resolve({ id: user.uid, email: user.email, name: user.displayName || user.email });
          } else {
            reject(new ApiError("Not authenticated.", 401));
          }
        } catch (err) {
          reject(new ApiError(err.message, 500));
        }
      });
    });
  },

  listColleges: async () => {
    const q = query(collection(db, 'colleges'), orderBy('name', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  createCollege: async (data, adminEmail) => {
    const docRef = await addDoc(collection(db, 'colleges'), {
      name: data.name,
      isActive: true,
      createdAt: serverTimestamp()
    });
    await logActivity('CREATE_COLLEGE', `Added college: ${data.name}`, adminEmail);
    return { id: docRef.id };
  },
  updateCollege: async (id, data, adminEmail) => {
    const oldSnap = await getDoc(doc(db, 'colleges', id));
    const oldData = oldSnap.exists() ? oldSnap.data() : {};
    
    await updateDoc(doc(db, 'colleges', id), data);

    let changeText = [];
    if (data.name !== undefined && data.name !== oldData.name) {
      changeText.push(`Name: "${oldData.name || ''}" → "${data.name}"`);
    }
    if (data.isActive !== undefined && data.isActive !== oldData.isActive) {
      const oldStatus = oldData.isActive !== false ? 'Active' : 'Inactive';
      const newStatus = data.isActive ? 'Active' : 'Inactive';
      changeText.push(`Status: ${oldStatus} → ${newStatus}`);
    }

    const details = changeText.length > 0 
      ? `Updated college: ${changeText.join(', ')}` 
      : `Updated college details`;

    await logActivity('UPDATE_COLLEGE', details, adminEmail);
    return { ok: true };
  },
  deleteCollege: async (id, adminEmail) => {
    const oldSnap = await getDoc(doc(db, 'colleges', id));
    const collegeName = oldSnap.exists() ? oldSnap.data().name : id;
    await deleteDoc(doc(db, 'colleges', id));
    await logActivity('DELETE_COLLEGE', `Deleted college: "${collegeName}"`, adminEmail);
    return { ok: true };
  },

  listFields: async () => {
    const q = query(collection(db, 'interested_fields'), orderBy('name', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  createField: async (data, adminEmail) => {
    const docRef = await addDoc(collection(db, 'interested_fields'), {
      name: data.name,
      isActive: true,
      createdAt: serverTimestamp()
    });
    await logActivity('CREATE_FIELD', `Added interested field: ${data.name}`, adminEmail);
    return { id: docRef.id };
  },
  updateField: async (id, data, adminEmail) => {
    const oldSnap = await getDoc(doc(db, 'interested_fields', id));
    const oldData = oldSnap.exists() ? oldSnap.data() : {};

    await updateDoc(doc(db, 'interested_fields', id), data);

    let changeText = [];
    if (data.name !== undefined && data.name !== oldData.name) {
      changeText.push(`Name: "${oldData.name || ''}" → "${data.name}"`);
    }
    if (data.isActive !== undefined && data.isActive !== oldData.isActive) {
      const oldStatus = oldData.isActive !== false ? 'Active' : 'Inactive';
      const newStatus = data.isActive ? 'Active' : 'Inactive';
      changeText.push(`Status: ${oldStatus} → ${newStatus}`);
    }

    const details = changeText.length > 0 
      ? `Updated field: ${changeText.join(', ')}` 
      : `Updated interested field details`;

    await logActivity('UPDATE_FIELD', details, adminEmail);
    return { ok: true };
  },
  deleteField: async (id, adminEmail) => {
    const oldSnap = await getDoc(doc(db, 'interested_fields', id));
    const fieldName = oldSnap.exists() ? oldSnap.data().name : id;
    await deleteDoc(doc(db, 'interested_fields', id));
    await logActivity('DELETE_FIELD', `Deleted interested field: "${fieldName}"`, adminEmail);
    return { ok: true };
  },

  listTests: async () => {
    const q = query(collection(db, 'tests'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const tests = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    const questionsSnap = await getDocs(collection(db, 'questions'));
    const studentsSnap = await getDocs(collection(db, 'students'));

    const questionCounts = {};
    questionsSnap.forEach(d => {
      const qData = d.data();
      questionCounts[qData.testId] = (questionCounts[qData.testId] || 0) + 1;
    });

    const studentCounts = {};
    studentsSnap.forEach(d => {
      const sData = d.data();
      studentCounts[sData.testId] = (studentCounts[sData.testId] || 0) + 1;
    });

    return tests.map(t => ({
      ...t,
      questionCount: questionCounts[t.id] || 0,
      registeredCount: studentCounts[t.id] || 0
    }));
  },
  getTest: async (id) => {
    const testDoc = await getDoc(doc(db, 'tests', id));
    if (!testDoc.exists()) throw new ApiError("Test not found.", 404);
    const testData = testDoc.data();

    const qSnap = await getDocs(query(collection(db, 'questions'), where('testId', '==', id)));
    const sSnap = await getDocs(query(collection(db, 'students'), where('testId', '==', id)));

    return {
      id: testDoc.id,
      ...testData,
      questionCount: qSnap.size,
      registeredCount: sSnap.size
    };
  },
  createTest: async (data) => {
    const collegeIds = data.collegeIds || [];
    const collegeNames = [];
    for (const cId of collegeIds) {
      const collegeDoc = await getDoc(doc(db, 'colleges', cId));
      if (collegeDoc.exists()) {
        collegeNames.push(collegeDoc.data().name);
      }
    }

    const docRef = await addDoc(collection(db, 'tests'), {
      title: data.title,
      collegeIds,
      collegeNames,
      collegeId: collegeIds[0] || '',
      collegeName: collegeNames[0] || '',
      durationMinutes: Number(data.durationMinutes),
      questionsToServe: Number(data.questionsToServe),
      defaultMarksPerQuestion: Number(data.defaultMarksPerQuestion || 1),
      isActive: false,
      registrationOpen: false,
      createdAt: serverTimestamp()
    });
    await logActivity('CREATE_TEST', `Created test drive: ${data.title}`);
    return { id: docRef.id };
  },
  updateTest: async (id, data) => {
    const updateData = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.durationMinutes !== undefined) updateData.durationMinutes = Number(data.durationMinutes);
    if (data.questionsToServe !== undefined) updateData.questionsToServe = Number(data.questionsToServe);
    if (data.defaultMarksPerQuestion !== undefined) updateData.defaultMarksPerQuestion = Number(data.defaultMarksPerQuestion);
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.registrationOpen !== undefined) updateData.registrationOpen = data.registrationOpen;

    if (data.collegeIds !== undefined) {
      const collegeIds = data.collegeIds || [];
      const collegeNames = [];
      for (const cId of collegeIds) {
        const collegeDoc = await getDoc(doc(db, 'colleges', cId));
        if (collegeDoc.exists()) {
          collegeNames.push(collegeDoc.data().name);
        }
      }
      updateData.collegeIds = collegeIds;
      updateData.collegeNames = collegeNames;
      updateData.collegeId = collegeIds[0] || '';
      updateData.collegeName = collegeNames[0] || '';
    }

    await updateDoc(doc(db, 'tests', id), updateData);

    let detailsList = [];
    if (data.title !== undefined) detailsList.push(`title: '${data.title}'`);
    if (data.durationMinutes !== undefined) detailsList.push(`duration: ${data.durationMinutes}m`);
    if (data.isActive !== undefined) detailsList.push(`active: ${data.isActive}`);
    if (data.registrationOpen !== undefined) detailsList.push(`registration: ${data.registrationOpen}`);
    if (data.collegeIds !== undefined) detailsList.push(`colleges: [${data.collegeIds.length} selected]`);
    const detailsText = detailsList.length > 0 ? `Updated test details: ${detailsList.join(', ')}` : `Updated test settings`;
    await logActivity('UPDATE_TEST', detailsText);

    return { ok: true };
  },

  listQuestions: async (testId) => {
    const q = query(collection(db, 'questions'), where('testId', '==', testId));
    const snap = await getDocs(q);
    const questions = [];

    for (const d of snap.docs) {
      const qData = d.data();
      const akDoc = await getDoc(doc(db, 'answer_keys', d.id));
      const akData = akDoc.exists() ? akDoc.data() : {};

      let mergedOptions = qData.options || [];
      if (qData.type === 'MCQ' && akData.correctOptionId) {
        mergedOptions = mergedOptions.map(o => ({
          ...o,
          isCorrect: o.id === akData.correctOptionId
        }));
      }

      questions.push({
        id: d.id,
        ...qData,
        options: mergedOptions,
        referenceAnswer: akData.referenceAnswer || '',
        explanation: akData.explanation || ''
      });
    }

    // Sort in-memory to prevent Firestore index requirements
    questions.sort((a, b) => {
      const t1 = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt)) : new Date(0);
      const t2 = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt)) : new Date(0);
      return t1 - t2;
    });

    return { count: questions.length, questions };
  },
  createQuestion: async (testId, data) => {
    const qDocRef = doc(collection(db, 'questions'));
    const qId = qDocRef.id;

    let optionsList = [];
    let correctOptionId = null;

    if (data.type === 'MCQ') {
      optionsList = (data.options || []).map((o, idx) => {
        const optionId = `opt_${idx}_${Date.now()}`;
        if (o.isCorrect) correctOptionId = optionId;
        return { id: optionId, text: o.text };
      });
    }

    const batch = writeBatch(db);
    batch.set(qDocRef, {
      testId,
      type: data.type,
      text: data.text,
      marks: Number(data.marks),
      difficulty: data.difficulty || 'MEDIUM',
      category: data.category || '',
      topic: data.topic || '',
      options: optionsList,
      createdAt: serverTimestamp()
    });

    const akDocRef = doc(db, 'answer_keys', qId);
    batch.set(akDocRef, {
      testId,
      correctOptionId,
      referenceAnswer: data.type === 'CODING' ? data.referenceAnswer : null,
      explanation: data.explanation || ''
    });

    await batch.commit();
    const testSnap = await getDoc(doc(db, 'tests', testId));
    const testTitle = testSnap.exists() ? testSnap.data().title : testId;
    await logActivity('CREATE_QUESTION', `Added question to test "${testTitle}": "${data.text.substring(0, 35)}..." (Type: ${data.type}, Marks: ${data.marks})`);

    return {
      id: qId,
      testId,
      type: data.type,
      text: data.text,
      marks: data.marks,
      options: (data.options || []).map((o, idx) => ({ ...o, id: optionsList[idx]?.id }))
    };
  },
  updateQuestion: async (id, data) => {
    const qDocRef = doc(db, 'questions', id);
    const qSnap = await getDoc(qDocRef);
    if (!qSnap.exists()) throw new ApiError("Question not found.", 404);
    const qData = qSnap.data();

    const batch = writeBatch(db);

    let optionsList = [];
    let correctOptionId = null;

    if (qData.type === 'MCQ' && data.options) {
      optionsList = data.options.map((o, idx) => {
        const optionId = o.id || `opt_${idx}_${Date.now()}`;
        if (o.isCorrect) correctOptionId = optionId;
        return { id: optionId, text: o.text };
      });
    }

    const updateQ = {
      text: data.text,
      marks: Number(data.marks),
      difficulty: data.difficulty || qData.difficulty,
      category: data.category || qData.category,
      topic: data.topic || qData.topic,
    };
    if (qData.type === 'MCQ' && data.options) {
      updateQ.options = optionsList;
    }
    batch.update(qDocRef, updateQ);

    const akDocRef = doc(db, 'answer_keys', id);
    const updateAK = {};
    if (qData.type === 'MCQ' && correctOptionId) {
      updateAK.correctOptionId = correctOptionId;
    }
    if (qData.type === 'CODING' && data.referenceAnswer !== undefined) {
      updateAK.referenceAnswer = data.referenceAnswer;
    }
    if (data.explanation !== undefined) {
      updateAK.explanation = data.explanation;
    }
    batch.update(akDocRef, updateAK);

    await batch.commit();

    let changeList = [];
    if (data.text !== undefined && data.text !== qData.text) {
      const oldSnippet = qData.text ? `"${qData.text.substring(0, 20)}..."` : '""';
      changeList.push(`Text: ${oldSnippet} → "${data.text.substring(0, 20)}..."`);
    }
    if (data.marks !== undefined && Number(data.marks) !== Number(qData.marks)) {
      changeList.push(`Marks: ${qData.marks || 0} → ${data.marks}`);
    }
    const details = changeList.length > 0 
      ? `Updated question details: ${changeList.join(', ')}` 
      : `Updated question ID ${id}`;

    await logActivity('UPDATE_QUESTION', details);
    return { ok: true };
  },
  deleteQuestion: async (id) => {
    const attemptsSnap = await getDocs(collection(db, 'test_attempts'));
    let used = false;
    attemptsSnap.forEach(d => {
      const attempt = d.data();
      if (attempt.questions && attempt.questions.some(q => q.id === id)) {
        used = true;
      }
    });

    if (used) {
      throw new ApiError("This question has already been served in at least one student attempt and cannot be deleted. Deactivate the test instead.", 409);
    }

    const qSnap = await getDoc(doc(db, 'questions', id));
    const qData = qSnap.exists() ? qSnap.data() : {};
    const qText = qData.text ? `"${qData.text.substring(0, 30)}..."` : `ID ${id}`;

    const batch = writeBatch(db);
    batch.delete(doc(db, 'questions', id));
    batch.delete(doc(db, 'answer_keys', id));
    await batch.commit();
    await logActivity('DELETE_QUESTION', `Deleted question: ${qText}`);

    return { ok: true };
  },

  subscribeRegistrations: (params, onData, onError) => {
    let students = [];
    let attemptsByStudent = {};

    const resolveAndNotify = () => {
      let merged = students.map(s => {
        const attempt = attemptsByStudent[s.id] || null;
        return {
          ...s,
          attempt: attempt ? {
            id: s.id,
            status: attempt.status,
            startedAt: attempt.startedAt ? (attempt.startedAt.toDate ? attempt.startedAt.toDate().toISOString() : attempt.startedAt) : '',
            submittedAt: attempt.submittedAt ? (attempt.submittedAt.toDate ? attempt.submittedAt.toDate().toISOString() : attempt.submittedAt) : '',
            totalMarks: attempt.totalMarks,
            maxMarks: attempt.maxMarks
          } : null
        };
      });

      // Apply filters
      if (params.testId) {
        merged = merged.filter(s => s.testId === params.testId);
      }
      if (params.collegeId) {
        merged = merged.filter(s => s.collegeId === params.collegeId);
      }
      if (params.name) {
        const ns = params.name.toLowerCase();
        merged = merged.filter(s => s.name.toLowerCase().includes(ns));
      }
      if (params.prn) {
        const prn = params.prn.toLowerCase();
        merged = merged.filter(s => s.prnNumber.toLowerCase().includes(prn));
      }
      if (params.roll) {
        const roll = params.roll.toLowerCase();
        merged = merged.filter(s => s.rollNumber.toLowerCase().includes(roll));
      }
      if (params.minMarks !== undefined && params.minMarks !== '') {
        merged = merged.filter(s => s.attempt && s.attempt.totalMarks >= Number(params.minMarks));
      }
      if (params.maxMarks !== undefined && params.maxMarks !== '') {
        merged = merged.filter(s => s.attempt && s.attempt.totalMarks <= Number(params.maxMarks));
      }

      // Apply sorting
      const sort = params.sort || 'marks_desc';
      merged.sort((a, b) => {
        if (sort === 'marks_desc') {
          const m1 = a.attempt?.totalMarks ?? -1;
          const m2 = b.attempt?.totalMarks ?? -1;
          if (m2 !== m1) return m2 - m1;
          return new Date(b.registeredAt) - new Date(a.registeredAt);
        } else if (sort === 'marks_asc') {
          const m1 = a.attempt?.totalMarks ?? 9999;
          const m2 = b.attempt?.totalMarks ?? 9999;
          if (m2 !== m1) return m1 - m2;
          return new Date(a.registeredAt) - new Date(b.registeredAt);
        } else if (sort === 'name_asc') {
          return a.name.localeCompare(b.name);
        } else if (sort === 'registered_desc') {
          return new Date(b.registeredAt) - new Date(a.registeredAt);
        } else if (sort === 'registered_asc') {
          return new Date(a.registeredAt) - new Date(b.registeredAt);
        }
        return 0;
      });

      onData(merged);
    };

    const unsubStudents = onSnapshot(collection(db, 'students'), (snap) => {
      students = snap.docs.map(d => {
        const s = d.data();
        return {
          id: d.id,
          name: s.name,
          email: s.email,
          college: s.collegeName,
          collegeId: s.collegeId,
          department: s.department,
          className: s.className,
          rollNumber: s.rollNumber,
          prnNumber: s.prnNumber,
          testId: s.testId,
          testTitle: s.testTitle || '',
          registeredAt: s.registeredAt ? (s.registeredAt.toDate ? s.registeredAt.toDate().toISOString() : s.registeredAt) : '',
          interestedFields: s.interestedFields || [],
        };
      });
      resolveAndNotify();
    }, onError);

    const unsubAttempts = onSnapshot(collection(db, 'test_attempts'), (snap) => {
      attemptsByStudent = {};
      snap.forEach(d => {
        attemptsByStudent[d.id] = d.data();
      });
      resolveAndNotify();
    }, onError);

    return () => {
      unsubStudents();
      unsubAttempts();
    };
  },

  listRegistrations: async (params) => {
    let q = query(collection(db, 'students'));
    const snap = await getDocs(q);
    let students = [];

    const attemptsSnap = await getDocs(collection(db, 'test_attempts'));
    const attemptsByStudent = {};
    attemptsSnap.forEach(d => {
      attemptsByStudent[d.id] = d.data();
    });

    snap.forEach(d => {
      const s = d.data();
      const attempt = attemptsByStudent[d.id] || null;
      students.push({
        id: d.id,
        name: s.name,
        email: s.email,
        college: s.collegeName,
        collegeId: s.collegeId,
        department: s.department,
        className: s.className,
        rollNumber: s.rollNumber,
        prnNumber: s.prnNumber,
        testId: s.testId,
        testTitle: s.testTitle || '',
        registeredAt: s.registeredAt ? (s.registeredAt.toDate ? s.registeredAt.toDate().toISOString() : s.registeredAt) : '',
        interestedFields: s.interestedFields || [],
        attempt: attempt ? {
          id: attempt.studentId,
          status: attempt.status,
          startedAt: attempt.startedAt ? (attempt.startedAt.toDate ? attempt.startedAt.toDate().toISOString() : attempt.startedAt) : '',
          submittedAt: attempt.submittedAt ? (attempt.submittedAt.toDate ? attempt.submittedAt.toDate().toISOString() : attempt.submittedAt) : '',
          totalMarks: attempt.totalMarks,
          maxMarks: attempt.maxMarks
        } : null
      });
    });

    if (params.testId) {
      students = students.filter(s => s.testId === params.testId);
    }
    if (params.collegeId) {
      students = students.filter(s => s.collegeId === params.collegeId);
    }
    if (params.name) {
      const ns = params.name.toLowerCase();
      students = students.filter(s => s.name.toLowerCase().includes(ns));
    }
    if (params.prn) {
      const prn = params.prn.toLowerCase();
      students = students.filter(s => s.prnNumber.toLowerCase().includes(prn));
    }
    if (params.roll) {
      const roll = params.roll.toLowerCase();
      students = students.filter(s => s.rollNumber.toLowerCase().includes(roll));
    }
    if (params.minMarks !== undefined && params.minMarks !== '') {
      const min = Number(params.minMarks);
      students = students.filter(s => s.attempt && s.attempt.totalMarks >= min);
    }
    if (params.maxMarks !== undefined && params.maxMarks !== '') {
      const max = Number(params.maxMarks);
      students = students.filter(s => s.attempt && s.attempt.totalMarks <= max);
    }

    const sort = params.sort || 'marks_desc';
    students.sort((a, b) => {
      if (sort === 'marks_desc') {
        const m1 = a.attempt?.totalMarks ?? -999;
        const m2 = b.attempt?.totalMarks ?? -999;
        if (m2 !== m1) return m2 - m1;
        return new Date(a.registeredAt) - new Date(b.registeredAt);
      } else if (sort === 'marks_asc') {
        const m1 = a.attempt?.totalMarks ?? 9999;
        const m2 = b.attempt?.totalMarks ?? 9999;
        if (m2 !== m1) return m1 - m2;
        return new Date(a.registeredAt) - new Date(b.registeredAt);
      } else if (sort === 'name_asc') {
        return a.name.localeCompare(b.name);
      } else if (sort === 'registered_desc') {
        return new Date(b.registeredAt) - new Date(a.registeredAt);
      } else if (sort === 'registered_asc') {
        return new Date(a.registeredAt) - new Date(b.registeredAt);
      }
      return 0;
    });

    return students;
  },
  getStudent: async (studentId) => {
    const studentDoc = await getDoc(doc(db, 'students', studentId));
    if (!studentDoc.exists()) throw new ApiError("Student not found.", 404);
    const s = studentDoc.data();

    const attemptDoc = await getDoc(doc(db, 'test_attempts', studentId));
    const attempt = attemptDoc.exists() ? attemptDoc.data() : null;

    const fieldsSnap = await getDocs(collection(db, 'interested_fields'));
    const fieldsMap = {};
    fieldsSnap.docs.forEach(d => {
      fieldsMap[d.id] = d.data().name;
    });
    const interestedFieldNames = (s.interestedFields || []).map(id => fieldsMap[id] || id);

    const breakdown = [];
    if (attempt && attempt.questions) {
      for (const aq of attempt.questions) {
        const akDoc = await getDoc(doc(db, 'answer_keys', aq.id));
        const akData = akDoc.exists() ? akDoc.data() : {};

        const answer = attempt.answers?.[aq.id] || {};
        const result = attempt.results?.[aq.id] || {};

        let questionOptions = aq.options || [];
        if (aq.type === 'MCQ' && akData.correctOptionId) {
          questionOptions = questionOptions.map(o => ({
            ...o,
            isCorrect: o.id === akData.correctOptionId
          }));
        }

        breakdown.push({
          questionId: aq.id,
          type: aq.type,
          text: aq.text,
          marks: aq.marks,
          marksAwarded: result.marksAwarded ?? 0,
          isCorrect: result.isCorrect ?? false,
          options: aq.type === 'MCQ' ? questionOptions : undefined,
          selectedOptionId: aq.type === 'MCQ' ? (answer.selectedOptionId || null) : undefined,
          codeAnswer: aq.type === 'CODING' ? (answer.codeAnswer || '') : undefined,
          referenceAnswer: aq.type === 'CODING' ? (akData.referenceAnswer || '') : undefined,
          similarityScore: aq.type === 'CODING' ? (result.similarityScore ?? 0) : undefined,
          answeredAt: answer.answeredAt ? (answer.answeredAt.toDate ? answer.answeredAt.toDate().toISOString() : answer.answeredAt) : null
        });
      }
    }

    return {
      id: studentDoc.id,
      name: s.name,
      email: s.email,
      college: s.collegeName,
      collegeId: s.collegeId,
      department: s.department,
      className: s.className,
      rollNumber: s.rollNumber,
      prnNumber: s.prnNumber,
      testId: s.testId,
      testTitle: s.testTitle || '',
      registeredAt: s.registeredAt ? (s.registeredAt.toDate ? s.registeredAt.toDate().toISOString() : s.registeredAt) : '',
      interestedFields: interestedFieldNames,
      attempt: attempt ? {
        id: studentDoc.id,
        status: attempt.status,
        startedAt: attempt.startedAt ? (attempt.startedAt.toDate ? attempt.startedAt.toDate().toISOString() : attempt.startedAt) : '',
        submittedAt: attempt.submittedAt ? (attempt.submittedAt.toDate ? attempt.submittedAt.toDate().toISOString() : attempt.submittedAt) : '',
        totalMarks: attempt.totalMarks,
        maxMarks: attempt.maxMarks
      } : null,
      breakdown
    };
  },

  overrideStudentMarks: async (studentId, questionId, isCorrect, marksAwarded) => {
    const docRef = doc(db, 'test_attempts', studentId);
    const attemptSnap = await getDoc(docRef);
    if (!attemptSnap.exists()) throw new ApiError("Attempt not found.", 404);
    const attempt = attemptSnap.data();

    // Fetch candidate details
    const studentSnap = await getDoc(doc(db, 'students', studentId));
    const studentData = studentSnap.exists() ? studentSnap.data() : {};
    const candidateName = studentData.name || studentId;
    const testTitle = studentData.testTitle || 'Test';

    // Fetch old score
    const oldMarks = attempt.results?.[questionId]?.marksAwarded ?? 0;
    const oldStatus = attempt.results?.[questionId]?.isCorrect ? 'Correct' : 'Incorrect';

    const results = attempt.results || {};
    results[questionId] = {
      ...(results[questionId] || {}),
      isCorrect,
      marksAwarded: Number(marksAwarded),
      isManualOverride: true
    };

    let totalMarks = 0;
    Object.keys(results).forEach(qId => {
      totalMarks += results[qId].marksAwarded || 0;
    });

    await updateDoc(docRef, {
      results,
      totalMarks
    });
    
    const details = `Manually graded candidate "${candidateName}" for test "${testTitle}": Marks ${oldMarks} (${oldStatus}) → ${marksAwarded} (${isCorrect ? 'Correct' : 'Incorrect'})`;
    await logActivity('OVERRIDE_MARKS', details);
    return { ok: true };
  },

  getPortalSettings: async () => {
    const docRef = doc(db, 'settings', 'test_portal');
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      return { showOnWebsite: false };
    }
    return snap.data();
  },
  updatePortalSettings: async (data) => {
    const docRef = doc(db, 'settings', 'test_portal');
    await setDoc(docRef, data, { merge: true });
    await logActivity('UPDATE_SETTINGS', `Updated portal settings (showOnWebsite: ${data.showOnWebsite})`);
    return { ok: true };
  },
  subscribeActivityLogs: (onData, onError) => {
    const q = query(collection(db, 'activity_logs'), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          ...d,
          userEmail: d.performedBy || 'System',
          timestamp: d.timestamp ? (d.timestamp.toDate ? d.timestamp.toDate().toISOString() : d.timestamp) : new Date().toISOString()
        };
      });
      onData(data);
    }, (err) => {
      console.error(err);
      onError(err);
    });
  },

  // Stub for serverless compatibility, returns path to load CSV/PDF in client
  exportUrl: (format, params) => {
    return `#export-${format}-${JSON.stringify(params)}`;
  }
};

const sanitizeAttempt = (attempt) => {
  if (!attempt) return null;
  const startedTime = attempt.startedAt ? (attempt.startedAt.toDate ? attempt.startedAt.toDate().getTime() : new Date(attempt.startedAt).getTime()) : Date.now();
  const durationMs = (attempt.durationMinutes || 30) * 60 * 1000;
  const deadline = startedTime + durationMs;

  let remainingSec = 0;
  if (attempt.status === 'IN_PROGRESS') {
    remainingSec = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
  }

  // Sanitize the questions: remove referenceAnswer, correctOptionId, etc.
  const sanitizedQuestions = (attempt.questions || []).map(q => {
    const base = {
      id: q.id,
      text: q.text,
      type: q.type,
      marks: q.marks,
      order: q.order,
    };
    if (q.type === 'MCQ') {
      base.options = (q.options || []).map(o => ({ id: o.id, text: o.text }));
      base.selectedOptionId = q.selectedOptionId || null;
    } else {
      base.codeAnswer = q.codeAnswer || '';
    }
    return base;
  });

  return {
    id: attempt.studentId || attempt.id,
    studentId: attempt.studentId,
    testId: attempt.testId,
    status: attempt.status,
    startedAt: attempt.startedAt,
    durationMinutes: attempt.durationMinutes,
    remainingSeconds: remainingSec,
    submittedAt: attempt.submittedAt || null,
    questions: sanitizedQuestions,
  };
};

// ---------------------------------------------------------------------------
// Student API
// ---------------------------------------------------------------------------
const tokenKey = (testId) => `tp_student_token_${testId}`;
const studentIdKey = (testId) => `tp_student_id_${testId}`;

export const studentSession = {
  save: (testId, { studentId, token }) => {
    localStorage.setItem(tokenKey(testId), token);
    localStorage.setItem(studentIdKey(testId), studentId);
  },
  get: (testId) => ({
    token: localStorage.getItem(tokenKey(testId)),
    studentId: localStorage.getItem(studentIdKey(testId)),
  }),
  clear: (testId) => {
    localStorage.removeItem(tokenKey(testId));
    localStorage.removeItem(studentIdKey(testId));
  },
};

export const studentApi = {
  listColleges: async () => {
    const q = query(collection(db, 'colleges'), where('isActive', '==', true));
    const snap = await getDocs(q);
    const colleges = snap.docs.map(d => ({ id: d.id, name: d.data().name }));
    colleges.sort((a, b) => a.name.localeCompare(b.name));
    return colleges;
  },
  listFields: async () => {
    const q = query(collection(db, 'interested_fields'), where('isActive', '==', true));
    const snap = await getDocs(q);
    const fields = snap.docs.map(d => ({ id: d.id, name: d.data().name }));
    fields.sort((a, b) => a.name.localeCompare(b.name));
    return fields;
  },
  getTest: async (testId) => {
    const testDoc = await getDoc(doc(db, 'tests', testId));
    if (!testDoc.exists()) throw new ApiError("Test not found.", 404);
    const data = testDoc.data();
    return {
      id: testDoc.id,
      title: data.title,
      durationMinutes: data.durationMinutes,
      isActive: data.isActive,
      registrationOpen: data.registrationOpen,
      college: { name: data.collegeName }
    };
  },
  register: async (testId, data) => {
    const email = data.email.toLowerCase();
    const q = query(collection(db, 'students'), where('testId', '==', testId), where('email', '==', email));
    const snap = await getDocs(q);
    if (!snap.empty) {
      throw new ApiError("This email has already been used to register for this test.", 409);
    }

    const userCredential = await signInAnonymously(auth);
    const studentId = userCredential.user.uid;

    const collegeDoc = await getDoc(doc(db, 'colleges', data.collegeId));
    const collegeName = collegeDoc.exists() ? collegeDoc.data().name : '';

    const testDoc = await getDoc(doc(db, 'tests', testId));
    const testTitle = testDoc.exists() ? testDoc.data().title : '';

    await setDoc(doc(db, 'students', studentId), {
      name: data.name,
      email,
      collegeId: data.collegeId,
      collegeName,
      department: data.department,
      className: data.className,
      rollNumber: data.rollNumber,
      prnNumber: data.prnNumber,
      interestedFields: data.interestedFieldIds,
      testId,
      registeredAt: serverTimestamp(),
      authUid: studentId,
      testTitle
    });

    await logActivity('REGISTER_STUDENT', `Candidate registered: ${data.name} (${email}) for test: ${testTitle}`);

    return { studentId, token: studentId };
  },
  resume: async (testId, data) => {
    const email = data.email.toLowerCase();
    const prn = data.prnNumber;

    const q = query(
      collection(db, 'students'),
      where('testId', '==', testId),
      where('email', '==', email),
      where('prnNumber', '==', prn)
    );
    const snap = await getDocs(q);
    if (snap.empty) {
      throw new ApiError("No matching registration found for that email and PRN number.", 404);
    }

    const studentDoc = snap.docs[0];
    const studentId = studentDoc.id;

    const userCredential = await signInAnonymously(auth);
    const newUid = userCredential.user.uid;

    await updateDoc(doc(db, 'students', studentId), {
      authUid: newUid
    });

    return { studentId, token: studentId };
  },
  startAttempt: async (studentId, token) => {
    const attemptDoc = await getDoc(doc(db, 'test_attempts', studentId));
    if (attemptDoc.exists()) {
      return sanitizeAttempt(attemptDoc.data());
    }

    const studentDoc = await getDoc(doc(db, 'students', studentId));
    if (!studentDoc.exists()) throw new ApiError("Student not found.", 404);
    const sData = studentDoc.data();

    const testDoc = await getDoc(doc(db, 'tests', sData.testId));
    if (!testDoc.exists()) throw new ApiError("Test not found.", 404);
    const testData = testDoc.data();

    if (!testData.isActive) {
      throw new ApiError("This test is not currently active.", 409);
    }

    const qSnap = await getDocs(query(collection(db, 'questions'), where('testId', '==', sData.testId)));
    const questionsPool = qSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    if (questionsPool.length < testData.questionsToServe) {
      throw new ApiError("Test configuration is incomplete: question pool is too small.", 409);
    }

    const selectedQuestions = pickRandomSubset(questionsPool, testData.questionsToServe);

    const questionsForAttempt = selectedQuestions.map((q, idx) => {
      let options = q.options || [];
      if (q.type === 'MCQ' && testData.randomOptions !== false) {
        options = shuffle(options);
      }
      return {
        id: q.id,
        text: q.text,
        type: q.type,
        marks: q.marks,
        order: idx,
        options
      };
    });

    const newAttempt = {
      studentId,
      testId: sData.testId,
      startedAt: new Date(),
      durationMinutes: testData.durationMinutes,
      status: 'IN_PROGRESS',
      questions: questionsForAttempt,
      answers: {},
      tabEscapesCount: 0,
      fullscreenViolations: 0
    };

    await setDoc(doc(db, 'test_attempts', studentId), {
      ...newAttempt,
      startedAt: serverTimestamp()
    });

    return sanitizeAttempt(newAttempt);
  },
  getAttempt: async (studentId, token) => {
    const attemptDoc = await getDoc(doc(db, 'test_attempts', studentId));
    if (!attemptDoc.exists()) throw new ApiError("Test has not been started yet.", 404);
    const attempt = attemptDoc.data();

    const startedTime = attempt.startedAt?.toDate ? attempt.startedAt.toDate().getTime() : new Date(attempt.startedAt).getTime();
    const durationMs = attempt.durationMinutes * 60 * 1000;
    const deadline = startedTime + durationMs;
    const isExpired = attempt.status === 'IN_PROGRESS' && Date.now() >= deadline;

    if (isExpired) {
      const docRef = doc(db, 'test_attempts', studentId);
      await updateDoc(docRef, {
        status: 'AUTO_SUBMITTED',
        submittedAt: serverTimestamp()
      });

      await gradeAttemptClient(studentId);

      const updatedSnap = await getDoc(docRef);
      return sanitizeAttempt(updatedSnap.data());
    }

    return sanitizeAttempt(attempt);
  },
  saveAnswer: async (studentId, attemptQuestionId, token, data) => {
    const docRef = doc(db, 'test_attempts', studentId);

    const attemptDoc = await getDoc(docRef);
    if (!attemptDoc.exists()) throw new ApiError("Attempt not found.", 404);
    const attempt = attemptDoc.data();

    const startedTime = attempt.startedAt?.toDate ? attempt.startedAt.toDate().getTime() : new Date(attempt.startedAt).getTime();
    const durationMs = attempt.durationMinutes * 60 * 1000;
    const deadline = startedTime + durationMs;

    if (attempt.status !== 'IN_PROGRESS' || Date.now() >= deadline) {
      throw new ApiError("Time is up — this test has already been submitted.", 409);
    }

    const updatePayload = {};
    if (data.selectedOptionId !== undefined) {
      updatePayload[`answers.${attemptQuestionId}.selectedOptionId`] = data.selectedOptionId;
    }
    if (data.codeAnswer !== undefined) {
      updatePayload[`answers.${attemptQuestionId}.codeAnswer`] = data.codeAnswer;
    }
    updatePayload[`answers.${attemptQuestionId}.answeredAt`] = serverTimestamp();

    if (data.tabEscapesCount !== undefined) {
      updatePayload['tabEscapesCount'] = data.tabEscapesCount;
    }
    if (data.fullscreenViolations !== undefined) {
      updatePayload['fullscreenViolations'] = data.fullscreenViolations;
    }

    await updateDoc(docRef, updatePayload);
    return { ok: true };
  },
  submitAttempt: async (studentId, token) => {
    const docRef = doc(db, 'test_attempts', studentId);
    await updateDoc(docRef, {
      status: 'SUBMITTED',
      submittedAt: serverTimestamp()
    });

    await gradeAttemptClient(studentId);

    try {
      const studentDoc = await getDoc(doc(db, 'students', studentId));
      if (studentDoc.exists()) {
        const s = studentDoc.data();
        await logActivity('SUBMIT_TEST', `Candidate submitted test attempt: ${s.name} (${s.email})`);
      } else {
        await logActivity('SUBMIT_TEST', `Candidate ID ${studentId} submitted test attempt`);
      }
    } catch (err) {
      await logActivity('SUBMIT_TEST', `Candidate ID ${studentId} submitted test attempt`);
    }

    return { ok: true, status: 'SUBMITTED' };
  }
};

export { ApiError };
