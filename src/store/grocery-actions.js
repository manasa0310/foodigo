import { groceryActions } from './grocery-slice';
import { getDocs, orderBy, collection, query } from 'firebase/firestore';

import { firestore } from '../firebase.config';

export const fetchGroceryData = () => {
  return async (dispatch) => {
    const fetchGroceryHandler = async () => {
      const items = await getDocs(
        query(collection(firestore, 'groceryItems'), orderBy('id', 'desc'))
      );
      const groceryItems = [];
      items.forEach((item) => {
        groceryItems.push(item.data());
      });
      return groceryItems;
    };

    try {
      const groceryData = await fetchGroceryHandler();
      dispatch(groceryActions.setGroceryItems(groceryData));
    } catch (err) {
      console.log(err);
    }
  };
};
