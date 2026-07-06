import { db } from '../../firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';

const COLLECTION_NAME = 'marketing';

export const fetchMarketing = async () => {
    // const q = query(collection(db, COLLECTION_NAME), where("status", "==", "active"));
    // const snapshot = await getDocs(q);
    // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return [];
};
