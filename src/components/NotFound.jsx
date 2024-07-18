import React from 'react';
import NotFound from '../img/NotFound.svg';

const DataNotFound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img src={NotFound} className="h-340" alt="" />
      <p className="text-xl text-headingColor font-semibold my-2">
        Items Not Available
      </p>
    </div>
  );
};

export default DataNotFound;
