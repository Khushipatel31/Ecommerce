import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import CheckOutSteps from "../Cart/CheckOutSteps";
import MetaData from "../Layouts/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { clearErrors, orderDetails } from "../../actions/orderAction";
import Loader from "../Layouts/Loader/Loader";

const ProcessOrder = () => {
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
      dispatch(clearErrors(dispatch));
    }
    dispatch(orderDetails(id));
  }, [dispatch, error, id]);
  const proceedToPayment = () => {};
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard w-full max-w-full  flex">
            <Sidebar />
            <div className="dashboardContainer ml- flex bg-center col-span-2 p-4 w-full">
                <div className="confirmOrderPage  bg-white grid grid-cols-[6fr,3fr] ml-20  ">
                  <div>
                    <div className="confirmshippingArea p-[1vh]    ">
                      <Typography
                        style={{ fontSize: "1.5rem" }}
                        className="text-fuchsia-950 underline-offset-2 underline text-base md:text-lg lg:text-xl font-bold  font-roboto"
                      >
                        Shipping Info
                      </Typography>
                      <div className="confirmshippingAreaBox m-[4vh]">
                        <div className="orderDetailsContainerBox p-[1vh]  ">
                          <div className="flex">
                            <p className="font-bold text-sm md:text-base lg:text-lg font-roboto text-black">
                              Name:
                            </p>
                            <span className="mx-[1vh]  text-base md:text-lg font-roboto text-gray-700">
                              {orderDetail &&
                                orderDetail.user &&
                                orderDetail.user.name}
                            </span>
                          </div>
                          <div className=" flex my-[1vh]">
                            <p className="font-bold text-sm md:text-base lg:text-lg font-roboto text-black">
                              Phone:
                            </p>
                            <span className="mx-[1vh]  text-base md:text-lg font-roboto text-gray-700">
                              {orderDetail &&
                                orderDetail.shippingInfo &&
                                orderDetail.shippingInfo.phoneNo}
                            </span>
                          </div>
                          <div className=" flex  my-[1vh]">
                            <p className="font-bold text-sm md:text-base lg:text-lg font-roboto text-black">
                              Address:
                            </p>
                            <span className="mx-[1vh]  text-base md:text-lg font-roboto text-gray-700">
                              {orderDetail &&
                                orderDetail.shippingInfo &&
                                `${orderDetail.shippingInfo.address}, ${orderDetail.shippingInfo.city}, ${orderDetail.shippingInfo.state}, ${orderDetail.shippingInfo.pinCode}, ${orderDetail.shippingInfo.country}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Typography
                      style={{ fontSize: "1.5rem" }}
                      className="text-fuchsia-950 underline-offset-2 underline text-base md:text-2xl lg:text-xl font-bold  font-roboto"
                    >
                      Payment
                    </Typography>
                    <div className="orderDetailsContainerBox p-[1vh] ">
                      <div>
                        <p
                          className={
                            orderDetail &&
                            orderDetail.paymentInfo &&
                            orderDetail.paymentInfo.status === "succeeded"
                              ? "text-green-600 text-bold text-xl "
                              : "text-red-500 text-bold text-xl"
                          }
                        >
                          {orderDetail &&
                          orderDetail.paymentInfo &&
                          orderDetail.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                      <Typography
                      style={{ fontSize: "1.5rem" }}
                      className="text-fuchsia-950 underline-offset-2 underline text-base md:text-2xl lg:text-xl font-bold  font-roboto"
                    >
                      Order Status
                    </Typography>
                    <div>
                        <p
                          className={
                            orderDetail &&
                            orderDetail.paymentInfo &&
                            orderDetail.paymentInfo.status === "succeeded"
                              ? "text-green-600 text-bold text-xl "
                              : "text-red-500 text-bold text-xl"
                          }
                        >
                          {orderDetail &&
                          orderDetail.paymentInfo &&
                          orderDetail.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                      <div className="confirmCartItems mt-[3vh]  m-[8vh] py-10 pt-4">
                        <Typography
                          style={{ fontSize: "1.5rem" }}
                          className="text-fuchsia-950 underline-offset-2 underline font-normal text-base md:text-lg lg:text-xl  font-roboto"
                        >
                          Your Cart Items:
                        </Typography>
                        {/* Scrollable cart items container */}
                        <div
                          className="confirmCartItemsContainer mt-8  justify-center self-center  overflow-auto mx-8 h-auto "
                          style={{
                            maxHeight: "480px",
                            overflowY: "scroll",
                            scrollbarWidth: "none",
                            WebkitOverflowScrolling: "touch",
                          }}
                        >
                          {orderDetail  && orderDetail.orderItems &&
                            orderDetail.orderItems.map((item) => (
                              <div
                                key={item.product}
                                className="  border-2 border-gray-300  flex items-center justify-between font-normal text-base md:text-lg lg:text-xl font-roboto "
                              >
                                <img
                                  className="w-72"
                                  src={item.image}
                                  alt="Product"
                                />
                                <Link
                                  className="text-gray-600 mx-8 w-3/5 no-underline"
                                  to={`/product/${item.product}`}
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
                    <div className=" border-l-2 border-gray-300 p-28  ">
                      <div className="orderSummary     ">
                        <Typography
                          style={{ fontSize: "1.5rem" }}
                          className=" text-fuchsia-950 text-center font-normal important  border-b border-gray-300 py-4 w-full mx-auto box-border"
                        >
                          Order Summary
                        </Typography>
                        <div className="border-b-2 border-t-2">
                          <div className="flex font-light text-sm md:text-base justify-between ">
                            <p className="font-normal  text-xl  py-4 w-full mx-auto box-border">
                              Subtotal:
                            </p>
                            <span className="text-gray-700   self-center ">
                              $
                            </span>
                          </div>
                          <div className="flex font-light text-sm md:text-base justify-between ">
                            <p className=" font-normal text-xl py-4 w-full mx-auto box-border">
                              Shipping Charges:
                            </p>
                            <span className="text-gray-700   self-center">
                              $
                            </span>
                          </div>
                          <div className="flex font-light text-sm md:text-base justify-between ">
                            <p className=" font-normal text-xl py-4 w-full mx-auto box-border">
                              GST:
                            </p>
                            <span className="text-gray-700   self-center">
                              $
                            </span>
                          </div>
                        </div>

                        <div className="orderSummaryTotal">
                          <div className="flex font-light text-sm md:text-base justify-between ">
                            <p className=" font-normal text-xl py-4 w-full mx-auto box-border">
                              Total:
                            </p>
                            <span className="text-gray-700   self-center">
                              $
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={proceedToPayment}
                          className="mt-4 w-80 ml-2 self-center text-lg bg-fuchsia-950 rounded p-2 transition-all text-white hover:bg-fuchsia-900  "
                        >
                          Proceed To Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProcessOrder;
