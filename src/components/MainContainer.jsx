import Home from './Home';
import React from 'react';
import RowContainer from './RowContainer';
import { useSelector } from 'react-redux';
import ShopContainer from './ShopContainer';
import CartContainer from './CartContainer';

const MainContainer = () => {
  const { isCartOpen } = useSelector((state) => state.cart);
  const { groceryItems } = useSelector((state) => state.grocery);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Home />

      <RowContainer
        data={groceryItems?.filter((item) => item.category === 'fruits')}
      />

      <ShopContainer data={groceryItems} />

      {isCartOpen && <CartContainer />}
    </div>
  );
};

export default MainContainer;
