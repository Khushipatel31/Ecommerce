import React, { Fragment, useEffect } from "react";
import LaunchIcon from "@material-ui/icons/Launch";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import MetaData from "../Layouts/MetaData";
import Loader from "../Layouts/Loader/Loader";
const Swal = require("sweetalert2");
export const MyOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const { loading, error, orders } = useSelector((state) => state.orderSlice);
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
    dispatch(myOrders());
  }, [dispatch,  error]);
  const customStyles = `
  .MuiDataGrid-columnHeader {
    padding: 1vmax !important;
    background-color: rgb(74 4 78);
  }
  .MuiDataGrid-iconSeparator{
    display:none !important
  }
`;

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      headerClassName: "text-xl block text-white mx-auto ",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "text-xl block text-white",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "text-green-600"
          : "text-red-600";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      headerClassName: "text-xl block text-white",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "text-xl block text-white",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      headerClassName: "text-xl block text-white",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  const getRowClassName = (params) => {
    return " sm:text-sm md:text-base lg:text-lg ";
  };

  return (
    <>
      <MetaData title="My Orders" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <style>{customStyles}</style>
          <Typography
            id="myOrdersHeading"
            className="text-center block text-fuchsia-950  transition-all   "
            style={{ fontSize: "2rem", padding: "1rem" }}
          >
            {user.name}'s Orders{" "}
          </Typography>
          <div className="myOrdersPage w-full px-[7vw] h-[100vh]  flex flex-col  ">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable  bg-white  shadow-md "
              getRowClassName={getRowClassName}
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};
