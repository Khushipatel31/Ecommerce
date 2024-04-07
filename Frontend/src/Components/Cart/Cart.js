import React from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cartSlice);
    console.log(cartItems)
    const checkoutHandler=()=>{
        window.location.replace("/shipping")
    }
    const increaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemToCart(id, newQuantity))
    }
    const decreaseQuantity = (id, quantity) => {
        const newQuantity = quantity - 1;
        if (quantity <= 1) {
            return;
        }
        dispatch(addItemToCart(id, newQuantity))
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemFromCart(id));
    }

    return (
        <>
            {
                cartItems.length === 0 ?
                    <div style={{ fontSize: "1.4rem" }} className="emptyCart m-auto flex items-center text-4xl  justify-center flex-col text-center h-96 mb-32 mt-24">
                        <RemoveShoppingCartIcon className="text-fuchsia-950 mb-4 " style={{ fontSize: "7rem" }} />
                        <Typography style={{ fontSize: "1.4rem", marginBottom: "1.4rem" }}  >No Product exists in your Cart</Typography>
                        <Link to="/products" className="mb-2 w-44  p-2 rounded transition-all bg-fuchsia-950  text-pretty text-white hover:bg-fuchsia-900">View Products</Link>
                    </div>
                    :
                    <div className="cardPage pt-6  ">
                        <div className="cartHeader p-3 px-2 w-[90%] mx-auto rounded bg-fuchsia-950 text-white grid grid-cols-4">
                            <p className="col-span-2">Product</p>
                            <p className="col-span-1">Quantity</p>
                            <p className="col-span-1 text-end">SubOrder</p>
                        </div>
                        {
                            cartItems && cartItems.map((item) => {
                                return (
                                    <div className="cartContainer   col-span-2 w-[90%] mx-auto grid grid-cols-4 ">
                                        <CartItemCard item={item} deleteCartItem={deleteCartItems} />
                                        <div className="cartInput h-[8vmax] flex items-center justify-start  mb-3  w-96   ">
                                            <button onClick={() => decreaseQuantity(item.product, item.quantity)} className="px-3  h-8 relative bg-fuchsia-950 text-white hover:border-fuchsia-950 hover:bg-fuchsia-900 hover:text-white  rounded">-</button>
                                            <input className="bg-slate-100 px-3 text-center border-none outline-none  w-16 h-8" type="number" value={item.quantity} readOnly></input>
                                            <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} className="px-3  h-8 bg-fuchsia-950 text-white hover:border-fuchsia-950 hover:bg-fuchsia-900 hover:text-white relative  rounded">+</button>
                                        </div>
                                        <p className="cartSubTotal h-[8vmax] flex justify-end p-1 items-center text-xl px-3  ">{`$${item.price * item.quantity}`}</p>
                                    </div>
                                )
                            })
                        }
                        <div className="cartTotal border-t-2 border-fuchsia-950   items-end w-[90%]  flex flex-col mx-auto justify-end ">
                            <div className="TotalBox flex justify-end ">
                                <p className="flex p-5 text-xl">Gross Total</p>
                                <p className="flex p-5 text-xl"> {`$${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`}</p>
                            </div>
                            <button  onClick={checkoutHandler} className=" mt-4 w-40 mr-3  text-lg bg-fuchsia-950 rounded p-2 transition-all text-white hover:bg-fuchsia-900  submitReview">
                                Check Out
                            </button>
                        </div>
                    </div>
            }
        </>
    );
};

export default Cart;
