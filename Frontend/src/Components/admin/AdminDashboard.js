import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
// import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layouts/MetaData.js";

const AdminDashboard = () => {
  return (
    <>
      <div className="dashboard w-full max-w-full grid grid-cols-1fr 5fr absolute ">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />

        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>

          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹kjj
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>"kdmvs"</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>cmksamn</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>sckm</p>
              </Link>
            </div>
          </div>

          {/* <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
