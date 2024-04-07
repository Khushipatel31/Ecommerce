import { createSlice } from "@reduxjs/toolkit";
import {PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST, CLEAR_ERRORS } from "../../constants/productConstant";
const initialState = {
    product: [],
    error:null,
    loading:false,
}

const productDetailsSlice = createSlice({
    name: 'productDetailsSlice',
    initialState,
    reducers: {
        detail: (state, action) => {
            switch (action.payload.type) {
                case PRODUCT_DETAILS_REQUEST:
                    return {
                        ...state,
                        loading: true,
                        product: []
                    }
                case PRODUCT_DETAILS_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        product: action.payload.data.product,
                    }
                case PRODUCT_DETAILS_FAIL:
                    return {
                        ...state,
                        loading: false,
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
export const  productDetailsRedux  = productDetailsSlice.actions
export default productDetailsSlice.reducer;