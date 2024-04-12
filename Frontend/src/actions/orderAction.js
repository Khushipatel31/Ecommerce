import axios from "axios";
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../constants/orderConstant";
import { orderRedux } from "../store/slices/orderSlice";
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(orderRedux.createOrder({ type: CREATE_ORDER_REQUEST }));
        const config = {
            header: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post("/api/v1/order/new", order, config);
        console.log(data);
        dispatch(createOrder.createOrder({
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


export const clearErrors = () => async (dispatch) => {
    dispatch(createOrder({ type: CLEAR_ERRORS }));
};
