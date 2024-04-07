import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const options = {
    edit: false, //products that are seen we cannot edit star,
    color: "rgba(20,20,20,0.1)",
    activeColor: "rgba(255, 215, 0, 1)",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <>
      <Link
        className="productCard p-2 rounded-xl m-2 flex flex-col w-60 no-underline pb-3 shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        to={`/product/${product._id}`}
      >
        <img
          src={product.images[0].url}
          className="w-60 rounded  "
          alt={product.name}
        />
        <p className="text-xl mt-1 ">{product.name}</p>
        <div className="flex items-start    ">
          <ReactStars {...options} />
          <span className="place-self-center ml-2  ">
            ({product.numOfReviews})
          </span>
        </div>
        <span className="text-bold   ">${product.price}</span>
      </Link>
    </>
  );
};

export default Product;
