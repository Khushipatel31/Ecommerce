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
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL
} from "../constants/productConstant";
import { productRedux } from "../store/slices/productSlice";
import { productDetailsRedux } from "../store/slices/productDetailsSlice";
import Swal from "sweetalert2";
import TokenError from "../Components/Error/TokenError";

export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch(productRedux.abc({ type: ALL_PRODUCT_REQUEST }));
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      if (category !== "$") {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }
      if (rating > 0) {
        link += `&ratings=${rating}`;
      }

      const { data } = await axios.get(link);
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

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch(productRedux.abc({ type: ADMIN_PRODUCT_REQUEST }));
    const { data } = await axios('/api/v1/admin/products');
    dispatch(
      productRedux.abc({
        type: ADMIN_PRODUCT_SUCCESS,
        data: data,
      })
    );
  } catch (error) {
    TokenError(error);
    dispatch(
      productRedux.abc({
        type: ADMIN_PRODUCT_FAIL,
        error: error.response.data.message,
      })
    );
  }
}

export const newProduct = (product) => async (dispatch) => {
  try {
    dispatch(productRedux.newProduct({ type: NEW_PRODUCT_REQUEST }));
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post('/api/v1/admin/product/new', product, config);
    dispatch(
      productRedux.newProduct({
        type: NEW_PRODUCT_SUCCESS,
        data: data,
      })
      
    );
  } catch (error) {
    TokenError(error);
    dispatch(
      productRedux.newProduct({
        type: NEW_PRODUCT_FAIL,
        error: error.message,
      })
    );
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(productRedux.deleteProduct({ type: UPDATE_PRODUCT_REQUEST }));

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );
    dispatch(
      productRedux.deleteProduct({
        type: UPDATE_PRODUCT_SUCCESS,
        data: data,
      })
    )
  } catch (error) {
    TokenError(error);
    dispatch(productRedux.deleteProduct({
      type: UPDATE_PRODUCT_FAIL,
      error: error.message,
    }));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRedux.deleteProduct({ type: DELETE_PRODUCT_REQUEST }));
    const { data } = await axios.delete(`/api/v1/admin/product/${id}`)
    dispatch(
      productRedux.deleteProduct({
        type: DELETE_PRODUCT_SUCCESS,
        data: data,
      })
    );
  } catch (error) {
    TokenError(error);
    dispatch(
      productRedux.deleteProduct({
        type: DELETE_PRODUCT_FAIL,
        error: error.message,
      })
    );
  }
};


export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productRedux.detail({ type: PRODUCT_DETAILS_REQUEST }));
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(
      productRedux.detail({
        type: PRODUCT_DETAILS_SUCCESS,
        data: data,
      })
    );
  } catch (error) {
    dispatch(
      productRedux.detail({
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

export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch(productRedux.productReviews({ type: ALL_REVIEW_REQUEST }));
    const { data } = await axios.get(`/api/v1/review?id=${id}`);
    dispatch(
      productRedux.productReviews({
        type: ALL_REVIEW_SUCCESS,
        data
      })
    );
  } catch (error) {
    dispatch(
      productRedux.productReviews({
        type: ALL_REVIEW_FAIL,
        error: error.message,
      })
    );
  }
};

export const deleteReviews = (reviewId,productId) => async (dispatch) => {
  try {
    dispatch(productRedux.updateDeleteReviews({ type: DELETE_REVIEW_REQUEST }));
    const { data } = await axios.delete(`/api/v1/review?id=${reviewId}&productId=${productId}`);
    dispatch(
      productRedux.updateDeleteReviews({
        type: DELETE_REVIEW_SUCCESS,
        data
      })
    );
  } catch (error) {
    TokenError(error);
    dispatch(
      productRedux.updateDeleteReviews({
        type: DELETE_REVIEW_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(productRedux.abc({ type: CLEAR_ERRORS }));
};
