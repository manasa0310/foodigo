import React from 'react';
import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { AiFillShopping } from 'react-icons/ai';
import { MdAdd, MdLogout } from 'react-icons/md';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { uiActions } from '../store/ui-slice';
import { cartActions } from '../store/cart-slice';
import { useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const user = useSelector((state) => state.auth.user);
  const isMenuOpen = useSelector((state) => state.ui.isMenuOpen);
  const totalCartItems = useSelector((state) => state.cart.totalQuantity);

  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch(authActions.setUser(providerData[0]));
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    }
  };

  const logout = () => {
    dispatch(authActions.logout());
    isMenuOpen && dispatch(uiActions.toggleMenu());
    localStorage.removeItem('user');
  };

  const toggleMenu = () => {
    dispatch(uiActions.toggleMenu());
  };

  const toggleCart = () => {
    dispatch(cartActions.toggleCart());
  };

  return (
    <header className="fixed z-50 p-3 px-4 w-screen md:p-6 md:px-16 bg-primary  ">
      {/* Desktop */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">Foodigo</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-12 ">
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              Home
            </li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              Menu
            </li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              About
            </li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              Contact
            </li>
          </motion.ul>

          <div
            onClick={toggleCart}
            className="relative flex items-center justify-center">
            <AiFillShopping className="text-textColor text-2xl cursor-pointer" />
            {totalCartItems > 0 && (
              <div className=" absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-cartNumBg">
                <p className=" text-white text-xs font-semibold">
                  {totalCartItems}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="userprofile"
              className="w-10 h-10 shadow-xl rounded-full cursor-pointer"
              onClick={user ? toggleMenu : login}
            />
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-blue-300 shadow-xl flex flex-col  top-12 right-0 rounded-lg absolute">
                {user && user.email === 'k.balaganesh26@gmail.com' && (
                  <Link to={'/createItem'}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-blue-400 transition-all duration-100 ease-in-out text-textColor text-base rounded-lg"
                      onClick={toggleMenu}>
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-blue-400 transition-all duration-100 ease-in-out text-textColor text-base rounded-lg"
                  onClick={logout}>
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}

      <div className="flex items-center justify-between md:hidden w-full h-full  ">
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="userprofile"
            className="w-10 h-10 shadow-xl rounded-full cursor-pointer"
            onClick={user ? toggleMenu : login}
          />
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-blue-300 shadow-xl flex flex-col  top-12 left-0 rounded-lg absolute">
              {user && user.email === 'k.balaganesh26@gmail.com' && (
                <Link to={'/createItem'}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-blue-400 transition-all duration-100 ease-in-out text-textColor text-base hover:text-headingColor rounded-lg"
                    onClick={toggleMenu}>
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex  gap-1 flex-col ">
                <li
                  className="text-base cursor-pointer text-textColor  hover:bg-blue-400 hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2 rounded-lg"
                  onClick={toggleMenu}>
                  Home
                </li>
                <li
                  className="text-base cursor-pointer px-4 py-2 text-textColor hover:bg-blue-400 hover:text-headingColor duration-100 transition-all ease-in-out rounded-lg"
                  onClick={toggleMenu}>
                  Menu
                </li>
                <li
                  className="text-base cursor-pointer px-4 py-2 hover:bg-blue-400 text-textColor hover:text-headingColor duration-100 transition-all ease-in-out rounded-lg"
                  onClick={toggleMenu}>
                  About
                </li>
                <li
                  className="text-base cursor-pointer px-4 py-2 hover:bg-blue-400 text-textColor hover:text-headingColor duration-100 transition-all ease-in-out rounded-lg"
                  onClick={toggleMenu}>
                  Contact
                </li>
              </ul>
              <p
                className="m-2 shadow-md p-2 flex items-center gap-3 cursor-pointer hover:bg-blue-400 transition-all duration-100 ease-in-out text-textColor justify-center hover:text-headingColor text-base rounded-lg"
                onClick={logout}>
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>

        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">Foodigo</p>
        </Link>
        <div
          onClick={toggleCart}
          className="relative flex items-center justify-center">
          <AiFillShopping className="text-textColor text-2xl cursor-pointer" />
          <div className=" absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-cartNumBg">
            <p className=" text-white text-xs font-semibold">
              {totalCartItems}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
