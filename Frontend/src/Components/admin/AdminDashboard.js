import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { Typography } from "@material-ui/core";
import { Doughnut, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import MetaData from "../Layouts/MetaData.js";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productAction.js";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productSlice);
  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length-outOfStock],
      },
    ],
  };

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  return (
    <>
      <MetaData title="Dashboard - Admin Panel" />
      <div className="dashboard w-full max-w-full h-screen flex">
        <Sidebar />

        <div className="dashboardContainer col-span-2 p-4 w-full">

          <div className="dashboardSummary flex items-center w-full flex-col h-[90%] ">
            <div>
              <p className="bg-fuchsia-950 bg-opacity-95 text-white font-light text-center py-6 px-6 w-[83vw]">
                Total Amount <br /> ₹kjj
              </p>
            </div>
            <div className="dashboardSummaryBox2 flex justify-evenly items-center w-full mt-8">
              <Link
                to="/admin/products"
                className="w-80 text-center py-20 rounded shadow-md text-2xl bg-fuchsia-100"
              >
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link
                to="/admin/orders"
                className="w-80 text-center py-20 rounded shadow-md text-2xl bg-fuchsia-100"
              >
                <p>Orders</p>
                <p>cmksamn</p>
              </Link>
              <Link
                to="/admin/users"
                className="w-80 text-center py-20 rounded shadow-md text-2xl bg-fuchsia-100"
              >
                <p>Users</p>
                <p>sckm</p>
              </Link>
            </div>
            <div className="flex w-full h-80 items-center justify-evenly mt-8">
              <div className="h-[95%] w-[40%] mt-4">
                <Line
                  data={lineState}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
              <div className="flex flex-grow-1  h-full mt-4">
                <Doughnut data={doughnutState} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
