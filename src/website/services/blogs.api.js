import { db } from '../../firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';

const COLLECTION_NAME = 'blogs';

export const fetchBlogs = async () => {
    // const q = query(collection(db, COLLECTION_NAME), where("status", "==", "active"));
    // const snapshot = await getDocs(q);
    // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return [];
};
