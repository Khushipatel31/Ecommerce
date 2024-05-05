import { createSlice } from "@reduxjs/toolkit";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_SUCCESS,
} from "../../constants/orderConstant";
const initialState = {
  order: null,
  error: null,
  loading: false,
  orders: [],
  orderDetail: null,
  isUpdated: false,
  isDeleted: null
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    createOrder: (state, action) => {
      switch (action.payload.type) {
        case CREATE_ORDER_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case CREATE_ORDER_SUCCESS:
          return {
            ...state,
            loading: false,
            order: action.payload.data.order,
          };
        case CREATE_ORDER_FAIL:
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
    myOrders: (state, action) => {
      switch (action.payload.type) {
        case MY_ORDER_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case MY_ORDER_SUCCESS:
          return {
            ...state,
            loading: false,
            orders: action.payload.data.orders,
          };
        case MY_ORDER_FAIL:
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
    orderDetails: (state, action) => {
      console.log(action.payload);
      switch (action.payload.type) {
        case ORDER_DETAILS_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case ORDER_DETAILS_SUCCESS:
          return {
            ...state,
            loading: false,
            orderDetail: action.payload.data.order,
          };
        case ORDER_DETAILS_FAIL:
          return {
            ...state,
            loading: true,
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
    allOrders: (state, action) => {
      switch (action.payload.type) {
        case ALL_ORDERS_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case ALL_ORDERS_SUCCESS:
          return {
            ...state,
            loading: false,
            orders: action.payload.data.orders,
          };
        case ALL_ORDERS_FAIL:
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
    updateDeleteOrder: (state, action) => {
      switch (action.payload.type) {
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case UPDATE_ORDER_SUCCESS:
          return {
            ...state,
            loading: false,
            isUpdated: action.payload.data.success,
          };
        case DELETE_ORDER_SUCCESS:
          return {
            ...state,
            loading: false,
            isDeleted: action.payload.data.success,
          };
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
          return {
            ...state,
            loading: false,
            isUpdated:false,
            error: action.payload.error,
          };
        case UPDATE_ORDER_RESET:
          return {
            ...state,
            loading: false,
            isUpdated: false
          }
        case DELETE_ORDER_RESET:
          return {
            ...state,
            loading: false,
            isDeleted: false
          }
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
            isUpdated:false
          };
        default: {
          return state;
        }
      }
    },
  },
});
export const orderRedux = orderSlice.actions;
export default orderSlice.reducer;
