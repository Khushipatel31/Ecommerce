import axios from "axios";
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,MY_ORDER_FAIL,MY_ORDER_REQUEST,MY_ORDER_SUCCESS, ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL, } from "../constants/orderConstant";
import { orderRedux } from "../store/slices/orderSlice";
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(orderRedux.createOrder({ type: CREATE_ORDER_REQUEST }));
        const config = {
            header: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post("/api/v1/order/new", order, config);
        console.log(data);
        dispatch(orderRedux.createOrder({
            type: CREATE_ORDER_SUCCESS,
            data: data
        }))
    } catch (error) {
        dispatch(orderRedux.createOrder({
            type: CREATE_ORDER_FAIL,
            error: error.message
        }));
    }
};

export const myOrders = () => async (dispatch) => {
    try {
        dispatch(orderRedux.myOrders({ type: MY_ORDER_REQUEST }));
        const { data } = await axios.get("/api/v1/orders/me");
        dispatch(orderRedux.myOrders({
            type: MY_ORDER_SUCCESS,
            data: data
        }))
    } catch (error) {
        dispatch(orderRedux.myOrders({
            type: MY_ORDER_FAIL,
            error: error.message
        }));
    }
};

export const orderDetails = (id) => async (dispatch) => {
    try {
        console.log("heya")
        dispatch(orderRedux.orderDetails({ type: ORDER_DETAILS_REQUEST }));
        const { data } = await axios.get(`/api/v1/order/${id}`);
        console.log(data);
        dispatch(orderRedux.orderDetails({
            type: ORDER_DETAILS_SUCCESS,
            data: data
        }))
    } catch (error) {
        dispatch(orderRedux.orderDetails({
            type: ORDER_DETAILS_FAIL,
            error: error.message
        }));
    }
};



export const clearErrors = () => async (dispatch) => {
    dispatch(createOrder({ type: CLEAR_ERRORS }));
};
