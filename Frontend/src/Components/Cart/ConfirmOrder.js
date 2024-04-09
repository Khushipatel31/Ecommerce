import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";
import MetaData from "../Layouts/MetaData";

const ConfirmOrder = () => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cartSlice);
    const { user } = useSelector((state) => state.userSlice);

    const subTotal = cartItems.reduce((acc, item) =>
        acc += item.quantity * item.price, 0
    )

    const shippingCharges = subTotal > 1000 ? 0 : 200;

    const tax = subTotal * 0.18;

    const totalPrice = subTotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subTotal,
            shippingCharges,
            tax,
            totalPrice,
        };
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        window.location.replace("/process/payment");
    };

    return (
        <>
            <MetaData title="Confirm Order"></MetaData>
            <CheckOutSteps activeStep={1}></CheckOutSteps>
            <div className="confirmOrderPage  bg-white grid grid-cols-[6fr,3fr]  ">
                <div >
                    <div className="confirmshippingArea p-[5vh] pl-16   py-10 pb-0">
                        <Typography style={{fontSize:"1.5rem"}}  className="text-fuchsia-950 underline-offset-2 underline text-base md:text-lg lg:text-xl font-bold  font-roboto">Shipping Info</Typography>
                        <div className="confirmshippingAreaBox m-[4vh]">
                            <div className=" flex">
                                <p className="font-bold text-sm md:text-base lg:text-lg font-roboto text-black">Name:</p>
                                <span className="mx-[1vh]  text-base md:text-lg font-roboto text-gray-700 ">{user.name}</span>
                            </div>
                            <div className="flex my-[1vh]">
                                <p className="font-bold text-sm md:text-base lg:text-lg font-roboto text-black">Phone:</p>
                                <span className="mx-[1vh]  text-base md:text-lg font-roboto text-gray-700">{shippingInfo.phoneNo}</span>
                            </div>
                            <div className="flex my-[1vh]">
                                <p className="font-bold text-sm md:text-base lg:text-lg font-roboto text-black">Address:</p>
                                <span className="mx-[1vh]  text-base md:text-lg font-roboto text-gray-700">{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems mt-[3vh]  m-[8vh] py-10 pt-4">
                        <Typography style={{fontSize:"1.5rem"}}  className="text-fuchsia-950 underline-offset-2 underline font-normal text-base md:text-lg lg:text-xl  font-roboto">Your Cart Items:</Typography>
                        {/* Scrollable cart items container */}
                        <div className="confirmCartItemsContainer mt-8  justify-center self-center  overflow-auto mx-8 h-auto " style={{ maxHeight: '480px', overflowY: 'scroll', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product} className="  border-2 border-gray-300  flex items-center justify-between font-normal text-base md:text-lg lg:text-xl font-roboto ">
                                        <img className="w-72" src={item.image} alt="Product" />
                                        <Link className="text-gray-600 mx-8 w-3/5 no-underline" to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span className="font-normal text-base text-gray-500">
                                            {item.quantity} X ₹{item.price} ={" "}
                                            <b>₹{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className=" border-l-2 border-gray-300 p-28  ">
                    <div className="orderSummary     ">
                        <Typography style={{fontSize:"1.5rem"}}  className=" text-fuchsia-950 text-center font-normal important  border-b border-gray-300 py-4 w-full mx-auto box-border">Order Summary</Typography>
                        <div className="border-b-2 border-t-2">
                            <div className="flex font-light text-sm md:text-base justify-between ">
                                <p className="font-normal  text-xl  py-4 w-full mx-auto box-border">Subtotal:</p>
                                <span className="text-gray-700   self-center ">${subTotal}</span>
                            </div>
                            <div className="flex font-light text-sm md:text-base justify-between ">
                                <p className=" font-normal text-xl py-4 w-full mx-auto box-border">Shipping Charges:</p>
                                <span className="text-gray-700   self-center">${shippingCharges}</span>
                            </div>
                            <div className="flex font-light text-sm md:text-base justify-between ">
                                <p className=" font-normal text-xl py-4 w-full mx-auto box-border">GST:</p>
                                <span className="text-gray-700   self-center">${tax}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                        <div className="flex font-light text-sm md:text-base justify-between ">
                                <p className=" font-normal text-xl py-4 w-full mx-auto box-border">Total:</p>
                                <span className="text-gray-700   self-center">${totalPrice}</span>
                            </div>
                        </div>

                        <button onClick={proceedToPayment} className="mt-4 w-80 ml-2 self-center text-lg bg-fuchsia-950 rounded p-2 transition-all text-white hover:bg-fuchsia-900  ">Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmOrder;
