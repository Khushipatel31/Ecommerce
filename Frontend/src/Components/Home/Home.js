import React, { useEffect, useState } from 'react';
import bg from "../../Assets/bg.jpg";
import Product from "./Product/Product";
import MetaData from "../Layouts/MetaData";
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Layouts/Loader/Loader';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("$");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1); // Use const to define setCurrentPage as a function

  const { products, loading, error } = useSelector((state) => state.productSlice);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      dispatch(clearErrors(dispatch));
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating, dispatch));
  }, [dispatch, error, keyword, currentPage, price, category, rating]); // Include all dependencies in the useEffect array

  return (
    <>
      {loading ? <Loader /> : <>
        <MetaData title="Ecommerce"></MetaData>
        <div className="object-contain bg-cover bg-center" style={{ backgroundImage: `url(${bg})`, width: '100%', height: '95vh' }}>
          <div className=' absolute top-0 max-w-full right-0 mr-52 mt-44 text-white font-bold text-pretty text-5xl'>Enjoy hassle-free </div>
          <div className=' absolute top-0 max-w-full right-0 mr-52 mt-56 pt-4 text-white font-bold text-pretty text-4xl  text-left'>Onine Shopping  </div>
          <a href='#featured-product' className='absolute top-0 right-0 mr-80 mt-80 text-white font-bold text-pretty '><button className='bg-fuchsia-950 px-4 py-3 rounded hover:bg-inherit hover:border-white hover:border'>Shop Now</button></a>
        </div>
        <div id="featured-product" className="bg-white mt-6">
          <h4 className='text-center text-fuchsia-950 font-semibold underline underline-offset-8 text-3xl'>Featured Products</h4>
          <div className='flex flex-wrap gap-6 items-center justify-center mt-10 p-4'>
            {products && products.map((product) => {
              return <Product key={product._id} product={product}></Product>
            })}
          </div>
        </div>
      </>}
    </>
  );
};

export default Home;
