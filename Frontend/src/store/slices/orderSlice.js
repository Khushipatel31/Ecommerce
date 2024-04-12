import { createSlice } from "@reduxjs/toolkit";
import {CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,CLEAR_ERRORS } from "../../constants/orderConstant";
const initialState = {
    order:null,
    error:null,
    loading:false,
}

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        createOrder: (state, action) => {
            switch (action.payload.type) {
                case CREATE_ORDER_REQUEST:
                    return {
                        ...state,
                        loading: true,
                    }
                case CREATE_ORDER_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        order: action.payload.data.order,
                    }
                case CREATE_ORDER_FAIL:
                    console.log("hi");
                    return {
                        ...state,
                        loading: true,
                        error: action.payload.error,
                    }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null
                    }
                default: {
                    return state;
                }
            }

        },
    }
}
)
export const  orderRedux  = orderSlice.actions
export default orderSlice.reducer;