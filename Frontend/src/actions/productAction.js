import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstant";
import { productRedux } from "../store/slices/productSlice";
import { productDetailsRedux } from "../store/slices/productDetailsSlice";
export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) => async (dispatch) => {
  try {
    console.log(rating);
    dispatch(productRedux.abc({ type: ALL_PRODUCT_REQUEST }));
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings=${rating}`;
    if (category !== '$') {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings=${rating}`;
    }
    const { data } = await axios.get(link);
    dispatch(productRedux.abc({
      type: ALL_PRODUCT_SUCCESS,
      data: data
    }))
  } catch (error) {
    dispatch(productRedux.abc({
      type: ALL_PRODUCT_FAIL,
      error: error.message
    }));
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsRedux.detail({ type: PRODUCT_DETAILS_REQUEST }));
    console.log(id);
    const { data } = await axios.get(`/api/v1/product/${id}`);
    console.log("Product ")
    dispatch(productDetailsRedux.detail({
      type: PRODUCT_DETAILS_SUCCESS,
      data: data
    }))
  } catch (error) {
    console.log("this is error")
    dispatch(productDetailsRedux.detail({
      type: PRODUCT_DETAILS_FAIL,
      error: error.message
    }));
  }
};


export const clearErrors = () => async (dispatch) => {
  dispatch(productRedux.abc({ type: CLEAR_ERRORS }));
};
