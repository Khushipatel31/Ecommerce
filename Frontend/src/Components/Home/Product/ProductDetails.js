import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../../actions/productAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import Loader from "../../Layouts/Loader/Loader";
import MetaData from "../../Layouts/MetaData";
import { addItemToCart } from "../../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../../constants/productConstant";
const Swal = require("sweetalert2");
const ProductDetails = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { success, error: reviewError } = useSelector(
    (state) => state.productSlice
  );
  const { product, loading, error } = useSelector(
    (state) => state.productDetailsSlice
  );
  const [quantity, setQuantity] = useState(1);

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    let data = {
      rating: rating,
      comment: comment,
      productId: id,
    };
    console.log(data);
    dispatch(newReview(data));
    setOpen(false);
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      return;
    }
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };
  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    Swal.fire({
      icon: "success",
      title: "Item Added to Cart Successfully",
      footer: '<a href="#">Why do I have this issue?</a>',
    }).then(() => {
      // window.location.replace("/");
    });
  };
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      dispatch(clearErrors(dispatch));
    }
    if (reviewError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${reviewError}`,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Review added Successfully",
          text: `$}`,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        dispatch({ type: NEW_REVIEW_RESET });
      }
      dispatch(clearErrors(dispatch));
    }
    dispatch(getProductDetails(id, dispatch));
  }, [dispatch, id, error, reviewError, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />
          <div className="productDetails  justify-center items-center   w-full  flex  py-14 px-32 ">
            <div className="ml-40" style={{ width: "30%" }}>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage p-2  w-96 items-center justify-center  "
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className=" p-5 ml-36  " style={{ width: "50%" }}>
              <div className="detailsBlock-1  ">
                <h2 className="text-3xl mb-2">{product.name}</h2>
                <p className="text-lg mb-2">Product #{product._id}</p>
              </div>
              <div className="detailsBlock-2 flex items-center mb-3  w-96 border-b-2 ">
                <Rating {...options}></Rating>
                <span className="text-blue-800">
                  {" "}
                  ({product.numOfReviews} Reviews )
                </span>
              </div>
              <div className="detailsBlock-3 ">
                <h1 className="text-bold text-2xl mb-2">${product.price}</h1>
                <div className="detailsBloc-3-1 flex items-center gap-6  mb-3  w-96  border-b-2">
                  <div className="detailsBloc-3-1-1  mb-2">
                    <button
                      onClick={decreaseQuantity}
                      className="px-3  h-8 relative bg-fuchsia-950 text-white hover:border-fuchsia-950 hover:bg-fuchsia-900 hover:text-white  rounded "
                    >
                      -
                    </button>
                    <input
                      readOnly
                      className="bg-slate-100 px-3 text-center border-none outline-none  w-16 h-8 "
                      value={quantity}
                      type="number"
                    ></input>
                    <button
                      onClick={increaseQuantity}
                      className="px-3  h-8 bg-fuchsia-950 text-white hover:border-fuchsia-950 hover:bg-fuchsia-900 hover:text-white relative  rounded "
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={addToCartHandler}
                    disabled={product.stock < 1 ? true : false}
                    className="mb-2  p-2 rounded transition-all bg-fuchsia-950  text-pretty text-white hover:bg-fuchsia-900"
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="py-1 w-96 pb-3  border-b-2">
                  <span className="text-lg ">Status:</span>
                  <b
                    className={
                      product.stock < 1
                        ? " out-of-stock p-1 text-lg text-red-600   "
                        : " in-stock  text-green-600 p-1 text-lg  "
                    }
                  >
                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4 text-lg  py-1 ">
                <span className="text-bold">Description:</span>{" "}
                <p className="text-lg">{product.description}</p>
              </div>
              <button
                onClick={submitReviewToggle}
                className=" mt-4  text-lg bg-fuchsia-950 rounded p-2 transition-all text-white hover:bg-fuchsia-900  submitReview"
              >
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading text-center text-bold border-b-2   pb-3 text-xl w-[20%] mx-auto mb-4    ">
            Reviews
          </h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog  flex flex-col ">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea border-solid border border-gray-200 my-4 outline-none p-4 text-base "
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews items-center justify-center flex flex-wrap px-4 m-1 ">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="text-xl text-center text-gray-400">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
