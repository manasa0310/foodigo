import React, { useRef, useState } from 'react';
import ItemCard from './ItemCard';
import Loader from './Loader';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { motion } from 'framer-motion';

const RowContainer = ({ data }) => {
  const rowConatiner = useRef();
  const [scrollX, setscrollX] = useState(0);

  const slide = (shift) => {
    rowConatiner.current.scrollLeft += shift;
    setscrollX(scrollX + shift);
  };

  return (
    <section className="w-full my-6">
      {/* Header section */}
      <div className="w-full flex items-center justify-between">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          Our fresh & healthy fruits
        </p>

        <div className="hidden md:flex gap-3 items-center">
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
            onClick={() => slide(-200)}>
            <MdChevronLeft className="text-lg text-white" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={() => slide(200)}>
            <MdChevronRight className="text-lg text-white" />
          </motion.div>
        </div>
      </div>
      {/* Row section */}

      <div
        ref={rowConatiner}
        className="w-full flex items-center gap-3  my-12 scroll-smooth overflow-x-scroll scrollbar-none">
        {data && data.length > 0 ? (
          data.map((item) => <ItemCard key={item.id} cardData={item} />)
        ) : (
          <div className="mt-auto mx-auto ">
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};

export default RowContainer;
