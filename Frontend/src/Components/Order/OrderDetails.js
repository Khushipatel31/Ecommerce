import React, { useEffect } from "react";
import MetaData from "../Layouts/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Loader from "../Layouts/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { orderDetails, clearErrors } from "../../actions/orderAction";
import { useParams } from "react-router-dom";
const Swal = require("sweetalert2");

const OrderDetails = () => {
  const { orderDetail, error, loading } = useSelector(
    (state) => state.orderSlice
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
      if (error) {
          Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      dispatch(clearErrors());
    }
    dispatch(orderDetails(id));
}, [dispatch, id,error]);
return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage px-20 py-8">
            <div className="orderDetailsContainer    ">
              <Typography
                style={{ fontSize: "1.8rem", marginBottom: "2rem" }}
                className="text-fuchsia-950 underline-offset-2 underline text-center text-base md:text-lg lg:text-xl   font-bold  font-roboto"
              >
                Order #{orderDetail && orderDetail._id}
              </Typography>
              <Typography
                style={{ fontSize: "1.5rem" }}
                className="text-fuchsia-950 underline-offset-2 underline text-base md:text-lg lg:text-xl font-bold  font-roboto"
              >
                Shipping Info
              </Typography>
              <div className="orderDetailsContainerBox p-[3vh]  ">
                <div className="flex">
                  <p className="font-bold text-sm md:text-base lg:text-lg font-roboto text-black">
                    Name:
                  </p>
                  <span className="mx-[1vh]  text-base md:text-lg font-roboto text-gray-700">
                    {orderDetail && orderDetail.user && orderDetail.user.name}
                  </span>
                </div>
                <div className=" flex my-[1vh]">
                  <p className="font-bold text-sm md:text-base lg:text-lg font-roboto text-black">
                    Phone:
                  </p>
                  <span className="mx-[1vh]  text-base md:text-lg font-roboto text-gray-700">
                    { orderDetail && orderDetail.shippingInfo &&
                      orderDetail.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className=" flex  my-[1vh]">
                  <p className="font-bold text-sm md:text-base lg:text-lg font-roboto text-black">
                    Address:
                  </p>
                  <span className="mx-[1vh]  text-base md:text-lg font-roboto text-gray-700">
                    { orderDetail && orderDetail.shippingInfo &&
                      `${orderDetail.shippingInfo.address}, ${orderDetail.shippingInfo.city}, ${orderDetail.shippingInfo.state}, ${orderDetail.shippingInfo.pinCode}, ${orderDetail.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography
                style={{ fontSize: "1.5rem" }}
                className="text-fuchsia-950 underline-offset-2 underline text-base md:text-2xl lg:text-xl font-bold  font-roboto"
              >
                Payment
              </Typography>
              <div className="orderDetailsContainerBox p-[3vh] ">
                <div>
                  <p
                    className={
                      orderDetail && orderDetail.paymentInfo &&
                      orderDetail.paymentInfo.status === "succeeded"
                        ? "text-green-600 text-bold text-xl "
                        : "text-red-500 text-bold text-xl"
                    }
                  >
                    {orderDetail && orderDetail.paymentInfo &&
                    orderDetail.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div className="flex">
                  <p className="font-bold text-sm md:text-base lg:text-lg font-roboto text-black">
                    Amount:
                  </p>
                  <span className="mx-[1vh]  text-base md:text-lg font-roboto text-gray-700">
                    {orderDetail && orderDetail.totalPrice && orderDetail.totalPrice}
                  </span>
                </div>
              </div>

              <Typography
                style={{ fontSize: "1.5rem" }}
                className="text-fuchsia-950 underline-offset-2 underline text-base md:text-lg lg:text-xl font-bold  font-roboto"
              >
                Order Status
              </Typography>
              <div className="orderDetailsContainerBox p-[3vh] ">
                <div>
                  <p
                    className={
                      orderDetail && orderDetail.orderDetailStatus &&
                      orderDetail.orderDetailStatus === "Delivered"
                        ? "text-green-600 font-bold  md:text-base lg:text-lg font-roboto text-xl   "
                        : "text-red-500 font-bold text-xl  font-roboto "
                    }
                  >
                    { orderDetail && orderDetail.orderStatus && orderDetail.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderCartItems flex w-[80vw] font-normal text-sm orderDetailsCartItem flex-col">
              <Typography
                style={{ fontSize: "1.5rem" }}
                className="text-fuchsia-950 mb-5 underline-offset-2 underline text-base md:text-lg lg:text-xl font-bold  font-roboto"
              >
                Order Items:
              </Typography>
              <div className="orderCartItemsContainer max-h-[30rem] mt-10  overflow-y-auto" >
                { orderDetail && orderDetail.orderItems &&
                  orderDetail.orderItems.map((item) => (
                    <div
                      key={item.product}
                      className=" w-[70vw] mb-3 flex items-center justify-evenly font-normal text-base md:text-lg lg:text-xl font-roboto "
                    >
                      <img src={item.image} className="w-72" alt="Product" />
                      <Link
                        to={`/product/${item.product}`}
                        className="text-gray-700 mx-7  orderDetailsCartItemName"
                      >
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
        </>
      )}
    </>
  );
};

export default OrderDetails;
