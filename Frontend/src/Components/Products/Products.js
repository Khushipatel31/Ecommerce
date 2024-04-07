import React, { useEffect, useState } from "react";
import Loader from "../Layouts/Loader/Loader";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Home/Product/Product";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import Typography from '@material-ui/core/Typography';
import './Products.css';
import MetaData from "../Layouts/MetaData";

const categories = [
  "Electrical",
  "PC",
  "Laptop",
  "Tablet"
]

const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("$");
  const [rating, setRating] = useState(0);

  const [price, setPrice] = useState([0, 25000]);
  const { products, loading, error, resultPerPage, filteredProductsCount } = useSelector(
    (state) => state.productSlice
  );


  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  }

  useEffect(() => {
    if (error) {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        dispatch(clearErrors(dispatch));
      }
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating, dispatch));
  }, [dispatch, keyword, currentPage,error, price, rating, category]);

  let count = filteredProductsCount;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products" />
          <p className="text-center mt-5 text-fuchsia-950 font-semibold underline underline-offset-8 text-3xl ">Products</p>
          <div className="flex w-full   ">
            <div className="filterBox h-1/2 mt-20  w-56 justify-start  flex ml-9 flex-col  m-3 p-7   bg-gray-100 shadow-md rounded    ">
              <Typography>Price</Typography>
              <Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby="range-slider" min={0} max={25000} />
              <Typography>Categories</Typography>
              <ul className="categoryBox  p-0 m-[0.4vmax] cursor-pointer transition-all   ">
                {categories.map((category) => {
                  return <li className="categorylink   hover:underline  hover:underline-offset-5 hover:font-bold  hover:text-fuchsia-950  " key={category} onClick={() => setCategory(category)}  >{category}</li>
                })}
              </ul>
              {
                keyword &&
                <fieldset className="border border-black px-1 ">
                  <Typography component="legend" >Ratings Above</Typography>
                  <Slider className="p-1" value={rating} valueLabelDisplay="auto" onChange={(e, newRating) => {
                    setRating(newRating);
                  }} aria-labelledby="continuous-slider" min={0} max={5} />
                </fieldset>
              }

            </div>
            <div className="flex flex-col items-center w-full  ">
              <div className="products flex flex-wrap gap-6 w-full    items-center justify-center mt-10 p-4 ">
                {products &&
                  products.map((product) => {
                    return <Product product={product} key={product._id}></Product>;
                  })}

              </div>
              {
                resultPerPage < count && <div className="paginationBox">
                  <Pagination activePage={currentPage} itemsCountPerPage={resultPerPage} onChange={setCurrentPageNo} nextPageText="Next" prevPageText="Prev" firstPageText="1st" lastPageText="Last" itemClass="page-item " activeClass="pageItemActive" activeLinkClass="pageLinkActive" linkClass="page-link" totalItemsCount={filteredProductsCount} />
                </div>
              }
            </div>

          </div>

        </>
      )}
    </>
  );
};
export default Products;
