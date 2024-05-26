import axios from "axios";
import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../constants/orderConstant";
import { orderRedux } from "../store/slices/orderSlice";
import TokenError from "../Components/Error/TokenError";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(orderRedux.createOrder({ type: CREATE_ORDER_REQUEST }));
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch(
      orderRedux.createOrder({
        type: CREATE_ORDER_SUCCESS,
        data,
      })
    );
  } catch (error) {
    TokenError(error);
    dispatch(
      orderRedux.createOrder({
        type: CREATE_ORDER_FAIL,
        error: error.message,
      })
    );
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch(orderRedux.myOrders({ type: MY_ORDER_REQUEST }));
    const { data } = await axios.get("/api/v1/orders/me");
    dispatch(
      orderRedux.myOrders({
        type: MY_ORDER_SUCCESS,
        data,
      })
    );
  } catch (error) {
    TokenError(error);
    dispatch(
      orderRedux.myOrders({
        type: MY_ORDER_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(orderRedux.allOrders({ type: ALL_ORDERS_REQUEST }));
    const { data } = await axios.get("/api/v1/admin/orders");
    dispatch(
      orderRedux.allOrders({
        type: ALL_ORDERS_SUCCESS,
        data,
      })
    );
  } catch (error) {
    TokenError(error);
    dispatch(
      orderRedux.allOrders({
        type: ALL_ORDERS_FAIL,
        error: error.message,
      })
    );
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );
    dispatch(
      orderRedux.updateDeleteOrder({
        type: UPDATE_ORDER_SUCCESS,
        data,
      })
    );
  } catch (error) {
    TokenError(error);
    dispatch(
      orderRedux.updateDeleteOrder({
        type: UPDATE_ORDER_FAIL,
        error: error.message,
      })
    );
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch(
      orderRedux.updateDeleteOrder({ type: DELETE_ORDER_SUCCESS, data })
    );
  } catch (error) {
    TokenError(error);
    dispatch(
      orderRedux.updateDeleteOrder({
        type: DELETE_ORDER_FAIL,
        error: error.message,
      })
    );
  }
};

export const orderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderRedux.orderDetails({ type: ORDER_DETAILS_REQUEST }));
    const { data } = await axios.get(`/api/v1/order/${id}`);
    console.log(data);
    dispatch(
      orderRedux.orderDetails({
        type: ORDER_DETAILS_SUCCESS,
        data: data,
      })
    );
  } catch (error) {
    TokenError(error);
    dispatch(
      orderRedux.orderDetails({
        type: ORDER_DETAILS_FAIL,
        error: error.message,
      })
    );
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(orderRedux.myOrders({ type: CLEAR_ERRORS }));
};
