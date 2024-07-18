import './App.css';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import CreateContainer from './components/CreateContainer';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/auth-actions';
import { fetchGroceryData } from './store/grocery-actions';
import { cartActions } from './store/cart-slice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGroceryData());
  }, [dispatch]);

  useEffect(() => {
    const cartInfo =
      localStorage.getItem('cartItems') !== 'undefined'
        ? JSON.parse(localStorage.getItem('cartItems'))
        : localStorage.clear();
    if (cartInfo) {
      dispatch(cartActions.setCart(cartInfo));
    }
  });

  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary ">
        <Header />
        <main className="mt-14 md:mt-20 md:px-16 px-4 py-4  w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
