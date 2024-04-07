import { ADD_TO_CART, REMOVE_CART_ITEM ,SAVE_SHIPPING_INFO} from "../constants/cartConstant";
import axios from "axios";
import { cartRedux } from "../store/slices/cart";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(cartRedux.cartItemss({
        type:ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        },
    }))
    localStorage.setItem("cartItems",JSON.stringify(getState().cartSlice.cartItems));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
    dispatch(cartRedux.cartItemss({
        type:REMOVE_CART_ITEM,
        id:id
    }))
    localStorage.setItem("cartItems",JSON.stringify(getState().cartSlice.cartItems));
};

export const saveShippingInfo=(data)=>async(dispatch)=>{
    console.log(data);
    dispatch(cartRedux.cartItemss({
        type: SAVE_SHIPPING_INFO,
        payload:data
    }))
    localStorage.setItem("shippingInfo",JSON.stringify(data));
}