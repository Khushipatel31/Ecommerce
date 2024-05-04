import { createSlice } from "@reduxjs/toolkit";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  CLEAR_ERRORS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET
} from "../../constants/productConstant";
const initialState = {
  products: [],
  error: null,
  loading: false,
  productCount: 0,
  resultPerPage: null,
  filteredProductsCount: 0,
  success: null,
  product:null,
  isUpdated:null,
  isDeleted:null
};
console.log("hi")

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    abc: (state, action) => {
      switch (action.payload.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
          return {
            ...state,
            loading: true,
            products: [],
          };
        case ALL_PRODUCT_SUCCESS:
          return {
            ...state,
            loading: false,
            products: action.payload.data.products,
            productCount: action.payload.data.productCount,
            resultPerPage: action.payload.data.resultPerPage,
            filteredProductsCount: action.payload.data.filteredProductsCount,
          };
        case ADMIN_PRODUCT_SUCCESS:
          return {
            loading: false,
            products: action.payload.data.products
          }
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload.error,
          };
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default: {
          return state;
        }
      }
    },
    newReview: (state, action) => {
      switch (action.payload.type) {
        case NEW_REVIEW_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case NEW_REVIEW_SUCCESS:
          return {
            ...state,
            loading: false,
            success: action.payload.data.success,
          };
        case NEW_REVIEW_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload.error,
          };
        case NEW_REVIEW_RESET:
          return {
            ...state,
            success: false,
            loading: false,
          };
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default: {
          return state;
        }
      }
    },
    newProduct: (state, action) => {
      switch (action.payload.type) {
        case NEW_PRODUCT_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case NEW_PRODUCT_SUCCESS:
          return {
            ...state,
            loading: false,
            product:action.payload.data.product,
            success: action.payload.data.success,
            error:null
          };
        case NEW_PRODUCT_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload.error,
          };
        case NEW_PRODUCT_RESET:
          return {
            ...state,
            loading: false,
            success:false,
            error:null
          };
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default: {
          return state;
        }
      }
    },
    deleteProduct: (state, action) => {
      switch (action.payload.type) {
        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case DELETE_PRODUCT_SUCCESS:
          return {
            ...state,
            loading: false,
            isDeleted: action.payload.data.success,
          };
          case UPDATE_PRODUCT_SUCCESS:
          return {
            ...state,
            loading: false,
            // success: action.payload.data.success,
            isUpdated:action.payload.data.success,
          };
        case DELETE_PRODUCT_FAIL:
        case  UPDATE_PRODUCT_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload.error,
          };
        case DELETE_PRODUCT_RESET:
          return {
            ...state,
            loading: false,
            isDeleted: false,
          };
          case UPDATE_PRODUCT_RESET:
            return {
              ...state,
              loading: false,
              isUpdated: false,
            };
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default: {
          return state;
        }
      }
    },
  },
});
export const productRedux = productSlice.actions;
export default productSlice.reducer;
