import React from 'react';
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import { IoFastFood } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import DataNotFound from './NotFound';
import ItemCard from './ItemCard';

const ShopContainer = ({ data }) => {
  const dispatch = useDispatch();

  const groceryItems = data;
  const filteredCategories = useSelector((state) => state.ui.categorySelected);

  const selectedCategoryList =
    groceryItems &&
    groceryItems.filter((item) => item.category === filteredCategories);
  const handleCategoryChange = (category) => {
    dispatch(uiActions.setCategory(category));
  };

  return (
    <section className="w-full my-6" id="shop">
      <div className="w-full flex flex-col items-center justify-between">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-24 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our fetured products
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                key={category.id}
                whileTap={{ scale: 0.75 }}
                className={`group ${
                  filteredCategories === category.urlParamName
                    ? 'bg-cartNumBg'
                    : 'bg-card'
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                onClick={() => handleCategoryChange(category.urlParamName)}>
                <div
                  className={` w-10 h-10 ${
                    filteredCategories === category.urlParamName
                      ? 'bg-white'
                      : 'bg-cartNumBg'
                  } rounded-full shadow-lg  group-hover:bg-white flex items-center justify-center`}>
                  <IoFastFood
                    className={`${
                      filteredCategories === category.urlParamName
                        ? 'text-textColor'
                        : 'text-white'
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm capitalize  ${
                    filteredCategories === category.urlParamName
                      ? 'text-white'
                      : 'text-textColor'
                  } group-hover:text-white`}>
                  {category.urlParamName}
                </p>
              </motion.div>
            ))}
        </div>
        {/* Product cards */}
        <div className="w-full flex items-center gap-5 flex-wrap justify-center  my-12 scroll-smooth">
          {selectedCategoryList && selectedCategoryList.length > 0 ? (
            selectedCategoryList.map((item) => (
              <ItemCard key={item.id} cardData={item} />
            ))
          ) : (
            <DataNotFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopContainer;
