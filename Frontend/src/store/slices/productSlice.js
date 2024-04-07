import { createSlice } from "@reduxjs/toolkit";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS } from "../../constants/productConstant";
const initialState = {
    products: [],
    error:null,
    loading:false,
    productCount:0,
    resultPerPage:null,
    filteredProductsCount:0
}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        abc: (state, action) => {
            switch (action.payload.type) {
                case ALL_PRODUCT_REQUEST:
                    return {
                        ...state,
                        loading: true,
                        products: []
                    }
                case ALL_PRODUCT_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        products: action.payload.data.products,
                        productCount: action.payload.data.productCount,
                        resultPerPage:action.payload.data.resultPerPage,
                        filteredProductsCount:action.payload.data.filteredProductsCount
                    }
                case ALL_PRODUCT_FAIL:
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
export const  productRedux  = productSlice.actions
export default productSlice.reducer;