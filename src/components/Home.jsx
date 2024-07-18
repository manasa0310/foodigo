import React from 'react';
import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg.png';
import { heroData } from '../utils/data';

const Home = () => {
  return (
    <section
      id="home"
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full  ">
      <div className="py-2 flex-1 flex flex-col items-start  justify-start gap-6 md:gap-5">
        <div className="flex items-center gap-2 bg-orange-100 justify-center px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>

          <div className="w-8 h-8 rounded-full bg-white overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="DeliveryImage"
            />
          </div>
        </div>

        <p className="text-[2.4rem] lg:text-[3.2rem] md:leading-tight font-bold text-headingColor">
          The Fastest and Freshest Delivery in
          <span className="text-orange-600 text-[2.8rem] lg:text-[4rem]">
            {' '}
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia unde
          consectetur error eaque asperiores? Dolorum sequi, magni inventore
          tenetur quae dolorem asperiores quasi voluptates corporis ex obcaecati
          nobis recusandae distinctio?
        </p>
        <button
          type="button"
          className="bg-gradient-to-br w-full md:w-auto md:px-6  from-orange-400 to-orange-600 px-4 py-2  rounded-lg hover:shadow-xl transition-all ease-in-out duration-150 text-textColor">
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative ">
        <img
          src={HeroBg}
          alt="HeroBg"
          className=" ml-auto h-420 w-full lg:w-auto  lg:h-625 "
        />
        <div className="w-full h-full  flex items-center absolute top-0 left-0 justify-center xl:px-20 py-4 gap-6 drop-shadow-lg flex-wrap">
          {heroData &&
            heroData.map((item) => (
              <div
                key={item.id}
                className="lg:w-190 w-32   p-4  bg-cardOverlay backdrop-blur-md rounded-3xl flex items-center justify-center flex-col ">
                <img
                  src={item.img}
                  className=" lg:w-36 w-24  -mt-10 lg:-mt-20"
                  alt="I1"
                />
                <p className="lg:text-xl text-base text-center font-semibold lg:mt-4 mt-2 text-textColor">
                  {item.name}
                </p>
                <p className="lg:text-sm text-[12px] text-lighttextGray my-1 lg:mt-2 lg:mb-3">
                  {item.description}
                </p>
                <p className="text-sm  font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span> {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
