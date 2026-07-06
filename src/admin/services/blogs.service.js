import { db } from '../../firebase/firestore';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'blogs';

export const getAllBlogs = async () => {
    // const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return [];
};

export const createBlogs = async (data) => {
    // return await addDoc(collection(db, COLLECTION_NAME), data);
};

export const updateBlogs = async (id, data) => {
    // await updateDoc(doc(db, COLLECTION_NAME, id), data);
};

export const deleteBlogs = async (id) => {
    // await deleteDoc(doc(db, COLLECTION_NAME, id));
};
