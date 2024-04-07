import { createSlice } from "@reduxjs/toolkit";
import { ADD_TO_CART, REMOVE_CART_ITEM,SAVE_SHIPPING_INFO } from "../../constants/cartConstant";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    error: null,
    shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{}
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        cartItemss: (state, action) => {
            const item = action.payload.payload;
            switch (action.payload.type) {
                case ADD_TO_CART:
                    const isItemExist = state.cartItems.find(i => i.product == item.product);
                    if (isItemExist) {
                        return {
                            ...state,
                            cartItems: state.cartItems.map((i) => {
                                return i.product === isItemExist.product ? item : i;
                            })
                        };
                    } else {
                        return {
                            ...state,
                            cartItems: [...state.cartItems, item]
                        };
                    }
                case  REMOVE_CART_ITEM:
                    return{
                        ...state,
                        cartItems:state.cartItems.filter((i)=>i.product!==action.payload.id)
                    }
                case SAVE_SHIPPING_INFO:
                    return{
                        ...state,
                        shippingInfo:action.payload.payload
                    }
                default:
                    return state;
            }
        },
    }
});

export const cartRedux = cartSlice.actions;
export default cartSlice.reducer;
