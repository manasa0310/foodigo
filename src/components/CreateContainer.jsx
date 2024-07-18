import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../firebase.config';
import { useDispatch } from 'react-redux';
import { fetchGroceryData } from '../store/grocery-actions';

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdAttachMoney,
  MdFoodBank,
} from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import { saveItem } from '../utils/firebaseFunctions';

const CreateContainer = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('danger');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMessage('Error while uploading image : Try again');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMessage('Image uploaded successfully');
          setAlertStatus('success');
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, image);
    deleteObject(deleteRef).then(() => {
      setImage(null);
      setIsLoading(false);
      setFields(true);
      setMessage('Image deleted successfully');
      setAlertStatus('success');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !price || !category || !image) {
        setFields(true);
        setMessage('Please fill all the fields');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
        return;
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageUrl: image,
          calories: calories,
          price: price,
          category: category,
          quantity: 1,
        };
        saveItem(data);
        setFields(true);
        setMessage('Data saved successfully');
        resetFields();
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);

        dispatch(fetchGroceryData());
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMessage('Error while uploading image : Try again');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const resetFields = () => {
    setTitle('');
    setCalories('');
    setPrice('');
    setCategory(null);
    setImage(null);
  };

  return (
    <div className="w-full  h-auto flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className={`w-[80%] md:w-auto absolute top-[15%]  mt-auto p-2 md:px-6 rounded-lg text-lg font-semibold text-center ${
              alertStatus === 'danger'
                ? 'bg-red-400 text-red-800'
                : 'bg-emerald-400 text-emerald-800'
            }`}>
            {message}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 md:gap-4">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full outline-none border-none  bg-transparent text-lg font-semibold placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full ">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base drop-shadow-sm p-2 rounded-md cursor-pointer">
            <option value="other" className="bg-white">
              Select a category
            </option>
            {categories &&
              categories.map((category) => (
                <option
                  key={category.id}
                  className="text-base border-none outline-none capitalize bg-white text-headingColor"
                  value={category.urlParamName}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!image ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-4xl text-gray-500 hover:text-gray-700" />
                      <p className=" text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      className="hidden"
                      onChange={uploadImage}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={image}
                      className="w-full h-full object-cover"
                      alt="uploaded"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-lg duration-500 transition-all ease-in-out"
                      onClick={deleteImage}>
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
