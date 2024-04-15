import React, { useEffect, useRef } from "react";
import CheckoutSteps from "./CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData";
import { Typography } from "@material-ui/core";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { clearErrors,createOrder } from "../../actions/orderAction";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
const Swal = require("sweetalert2");

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.userSlice);
  const { error } = useSelector((state) => state.orderSlice);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      dispatch(clearErrors(dispatch));
    }
  }, [dispatch, error]);
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      console.log(client_secret);
      if (!stripe || !elements) return;
      console.log(shippingInfo);
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              line2: "",
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        console.log("this");
        payBtn.current.disabled = false;
        Swal.fire({
          icon: "error",
          title: "Payment error",
          text: `${result.error.message}`,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          window.location.replace("/success");
        } else {
          console.log("this");
          Swal.fire({
            icon: "error",
            title: "Payment error",
            text: `Something went wrong`,
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      Swal.fire({
        icon: "error",
        title: "Payment error",
        text: `${error.response.data.message}`,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  return (
    <>
      <MetaData title="Payment"></MetaData>
      <CheckoutSteps activeStep={2}></CheckoutSteps>
      <div className="paymentContainer grid place-items-center bg-white h-65vh m-8">
        <form
          className="paymentForm w-96 h-full"
          onSubmit={(e) => submitHandler(e)}
        >
          <Typography
            style={{ fontSize: "1.5rem" }}
            className="text-fuchsia-950 underline-offset-2 underline text-center md:text-lg lg:text-xl font-bold  font-roboto"
          >
            Card Info
          </Typography>

          <div className="flex items-center my-8">
            <CreditCardIcon className="absolute transform translate-x-4 text-gray-600 text-2xl" />
            <CardNumberElement className="py-4 px-16 w-full box-border border border-gray-300 rounded outline-none" />
          </div>
          <div className="flex items-center my-8">
            <EventIcon className="absolute transform translate-x-4 text-gray-600 text-2xl" />
            <CardExpiryElement className="py-4 px-16 w-full box-border border border-gray-300 rounded outline-none" />
          </div>
          <div className="flex items-center my-8">
            <VpnKeyIcon className="absolute transform translate-x-4 text-gray-600 text-2xl" />
            <CardCvcElement className="py-4 px-16 w-full box-border border border-gray-300 rounded outline-none" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="mt-4 w-96 ml-0 self-center text-lg   bg-fuchsia-950 rounded p-2 transition-all text-white hover:bg-fuchsia-900  "
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
