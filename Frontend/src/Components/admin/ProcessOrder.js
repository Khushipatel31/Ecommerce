import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import CheckOutSteps from "../Cart/CheckOutSteps";
import MetaData from "../Layouts/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { clearErrors, orderDetails, updateOrder } from "../../actions/orderAction";
import Loader from "../Layouts/Loader/Loader";
import { ErrorMessage, Field, Formik } from "formik";
import { Form } from "react-router-dom";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";

const ProcessOrder = () => {
  const { orderDetail, error, loading, isUpdated } = useSelector(
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
    if (isUpdated) {
      Swal.fire({
        icon: "success",
        title: "Order Updated Successfully",
        text: "You have successfully updated order!",
        confirmButtonText: "OK",
      }).then(() => {
        dispatch({ type: UPDATE_ORDER_RESET });
      });
    }
    dispatch(orderDetails(id));
  }, [dispatch, error, id, isUpdated]);
  const updateProcessOrder = (values, { setSubmitting }) => {
    if (values.category === "") {
      setSubmitting(false);
      return;
    } else {
      setSubmitting(true);
      const myForm = {
        status: values.category
      }
      dispatch(updateOrder(id, myForm))
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard w-full max-w-full  flex">
            <Sidebar />
            <div className="dashboardContainer    p-4 w-full">
              <div className="confirmOrderPage   bg-white  w-full  ">
                <div className="flex w-full  ">
                  <div className="flex-2 w-[62%]" >
                    <div className="confirmshippingArea p-[1vh]    ">
                      <Typography
                        style={{ fontSize: "1.5rem" }}
                        className="text-fuchsia-950 underline-offset-2 underline text-base md:text-lg lg:text-xl font-bold  font-roboto"
                      >
                        Shipping Info
                      </Typography>
                      <div className="confirmshippingAreaBox ">
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
                    <div className="flex items-center ">

                      <Typography
                        style={{ fontSize: "1.5rem" }}
                        className="text-fuchsia-950 underline-offset-2 underline text-base md:text-2xl lg:text-xl font-bold pl-1 font-roboto"
                      >
                        Payment:
                      </Typography>
                      <p
                        className={
                          orderDetail &&
                            orderDetail.paymentInfo &&
                            orderDetail.paymentInfo.status === "succeeded"
                            ? "text-green-600 p-[1vmax]  text-bold text-xl "
                            : "text-red-500 p-[1vmax] text-bold text-xl"
                        }
                      >
                        {orderDetail &&
                          orderDetail.paymentInfo &&
                          orderDetail.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>
                    <div className="orderDetailsContainerBox  ">
                      <div className="flex items-center">

                        <Typography
                          style={{ fontSize: "1.5rem" }}
                          className="text-fuchsia-950 underline-offset-2 pl-1 underline text-base md:text-lg lg:text-xl font-bold  font-roboto"
                        >
                          Order Status:
                        </Typography>
                        <p
                          className={
                            orderDetail && orderDetail.orderStatus &&
                              orderDetail.orderStatus === "Delivered"
                              ? "text-green-600 font-bold p-[1vmax] md:text-base  lg:text-lg font-roboto text-xl   "
                              : "text-red-500 font-bold p-[1vmax] text-xl font-roboto "
                          }
                        >
                          {orderDetail && orderDetail.orderStatus && orderDetail.orderStatus}
                        </p>
                      </div>
                      <div className="orderDetailsContainerBox ">
                        <div>
                        </div>
                      </div>
                      <Typography
                        style={{ fontSize: "1.5rem" }}
                        className="text-fuchsia-950 underline-offset-2 pl-1 pt-3 underline font-normal text-base md:text-lg lg:text-xl  font-roboto"
                      >
                        Your Cart Items:
                      </Typography>
                      <div className="confirmCartItems     pt-4">
                        {/* Scrollable cart items container */}
                        <div
                          className="confirmCartItemsContainer  p-3 px-8 justify-center self-center  overflow-auto  h-auto "
                          style={{
                            maxHeight: "480px",
                            overflowY: "scroll",
                            scrollbarWidth: "none",
                            WebkitOverflowScrolling: "touch",
                          }}
                        >
                          {orderDetail && orderDetail.orderItems &&
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
                                <span className="font-normal w-3/5 text-base text-gray-500">
                                  {item.quantity} X ₹{item.price} ={" "}
                                  <b>₹{item.price * item.quantity}</b>
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 border-l-2 border-gray-300 items-center justify-center  w-full">
                    <Typography
                      style={{ fontSize: "1.5rem", marginTop: "5rem" }}
                      className="text-fuchsia-950 underline-offset-2 pl-1 pt-3 mt-96 underline text-center font-normal text-base md:text-lg lg:text-xl  font-roboto"
                    >
                      Process Order
                    </Typography>
                    <Formik
                      initialValues={{
                        category: ""
                      }}
                      onSubmit={updateProcessOrder}
                    >
                      {({ isSubmitting, handleSubmit, setFieldValue }) => (
                        <Form
                          className="signupForm flex flex-col gap-6 items-center m-auto pt-9 px-[2vmax] transition-all"
                          onSubmit={handleSubmit}
                        >
                          <div className="registerPassword flex w-full items-center">
                            <AccountTreeIcon className="absolute translate-x-0 text-6xl ml-8" />
                            <Field

                              as="select"
                              className="px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500"
                              name="category"
                            >
                              <option value="">Choose Category</option>
                             {orderDetail && orderDetail.orderStatus=="Shipped" && <option value="Delivered">Delivered</option>}
                              {orderDetail && orderDetail.orderStatus == "Processing" && <option value="Shipped">Shipped</option>}
                            </Field>
                          </div>
                          {console.log(orderDetail)}
                          <button
                            type="submit"
                            className="loginBtn text-lg bg-fuchsia-950 rounded p-2 w-full transition-all text-white hover:bg-fuchsia-900"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Processing order..." : "Process Order"}
                          </button>
                        </Form>
                      )}
                    </Formik>
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
