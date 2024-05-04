import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";


const Product = ({ product }) => {
  const options = {
    size: "normal",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <Link
        className="productCard p-2 rounded-xl m-2 flex flex-col w-60 no-underline pb-3 shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        to={`/product/${product._id}`}
      >
        {
          product && product.images[0].url && 
          <img
            src={product.images[0].url}
            className="w-60 rounded  "
            alt={product.name}
          />
        }

        <p className="text-xl mt-1 ">{product.name}</p>
        <div className="flex items-start    ">
          <Rating {...options} />
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
