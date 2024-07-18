// Saving new Item to Firebase
import { setDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase.config';

export const saveItem = async (data) => {
  await setDoc(doc(firestore, 'groceryItems', `${Date.now()}`), data, {
    merge: true,
  });
};
