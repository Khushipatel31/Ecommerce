import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
} from "../constants/productConstant";
import { productRedux } from "../store/slices/productSlice";
import { productDetailsRedux } from "../store/slices/productDetailsSlice";
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch(productRedux.abc({ type: ALL_PRODUCT_REQUEST }));
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      if (category !== "$") {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }
      if(rating>0){
        link+= `&ratings=${rating}`
      }

      const { data } = await axios.get(link);
      console.log(data)
      dispatch(
        productRedux.abc({
          type: ALL_PRODUCT_SUCCESS,
          data: data,
        })
      );
    } catch (error) {
      dispatch(
        productRedux.abc({
          type: ALL_PRODUCT_FAIL,
          error: error.message,
        })
      );
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsRedux.detail({ type: PRODUCT_DETAILS_REQUEST }));
    const { data } = await axios.get(`/api/v1/product/${id}`);
    console.log("Product ");
    dispatch(
      productDetailsRedux.detail({
        type: PRODUCT_DETAILS_SUCCESS,
        data: data,
      })
    );
  } catch (error) {
    console.log("this is error");
    dispatch(
      productDetailsRedux.detail({
        type: PRODUCT_DETAILS_FAIL,
        error: error.message,
      })
    );
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(productRedux.newReview({ type: NEW_REVIEW_REQUEST }));
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    dispatch(
      productRedux.newReview({
        type: NEW_REVIEW_SUCCESS,
        data: data,
      })
    );
  } catch (error) {
    console.log("this is error");
    dispatch(
      productRedux.newReview({
        type: NEW_REVIEW_FAIL,
        error: error.message,
      })
    );
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(productRedux.abc({ type: CLEAR_ERRORS }));
};
