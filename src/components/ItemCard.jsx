import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';

const ItemCard = ({ cardData }) => {
  const dispatch = useDispatch();
  return (
    <div
      key={cardData.id}
      className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4 my-8  lg:my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative ">
      <div className="w-full flex items-center justify-between">
        <motion.div
          className="w-40 h-40 -mt-8 drop-shadow-2xl"
          whileHover={{ scale: 1.2 }}>
          <img
            src={cardData.imageUrl}
            alt=""
            className="w-full h-full  object-contain"
          />
        </motion.div>
        <motion.div
          onClick={() => dispatch(cartActions.addItemToCart(cardData))}
          whileTap={{ scale: 0.75 }}
          className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8">
          <MdShoppingBasket className="text-white" />
        </motion.div>
      </div>

      <div className="z-50 w-full flex flex-col items-end justify-end -mt-8">
        <p className="text-textColor font-semibold text-base md:text-lg">
          {cardData.title || 'No title'}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {cardData.calories || '0'} Calories
        </p>
        <div className="flex items-center gap-8">
          <p className="text-lg text-headingColor font-semibold">
            <span className="text-sm text-red-500">$</span>
            {cardData.price || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
