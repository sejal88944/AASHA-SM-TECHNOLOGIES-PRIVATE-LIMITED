import { db } from '../../firebase/firestore';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'services';

export const getAllServices = async () => {
    // const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return [];
};

export const createServices = async (data) => {
    // return await addDoc(collection(db, COLLECTION_NAME), data);
};

export const updateServices = async (id, data) => {
    // await updateDoc(doc(db, COLLECTION_NAME, id), data);
};

export const deleteServices = async (id) => {
    // await deleteDoc(doc(db, COLLECTION_NAME, id));
};
