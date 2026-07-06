import { db } from '../../firebase/firestore';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'marketing';

export const getAllMarketing = async () => {
    // const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return [];
};

export const createMarketing = async (data) => {
    // return await addDoc(collection(db, COLLECTION_NAME), data);
};

export const updateMarketing = async (id, data) => {
    // await updateDoc(doc(db, COLLECTION_NAME, id), data);
};

export const deleteMarketing = async (id) => {
    // await deleteDoc(doc(db, COLLECTION_NAME, id));
};
