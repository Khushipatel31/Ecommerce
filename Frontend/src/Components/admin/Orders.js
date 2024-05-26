import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllOrders,
  deleteOrder,
  myOrders,
} from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import MetaData from "../Layouts/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import Loader from "../Layouts/Loader/Loader";
const Swal = require("sweetalert2");

const Orders = () => {
  const dispatch = useDispatch();
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  const {
    error,
    orders,
    loading,
    isDeleted,
    error: deleteError,
  } = useSelector((state) => state.orderSlice);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch])

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        footer: '<a href="#">Why do I have this issue?</a>',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(clearErrors());
          window.location.replace("/");
        }
      });
    }
  }, [error])

  useEffect(() => {

    if (isDeleted) {
      Swal.fire({
        icon: "success",
        title: "Order Deleted Successfully",
        text: "You have successfully deleted order!",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: DELETE_ORDER_RESET });
        }
      });
    }
  }, [dispatch, isDeleted]);

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
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "text-xl block text-white",
      minWidth: 150,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "text-green-600"
          : "text-red-600";
      },
    },
    {
      field: "itemQty",
      headerName: "Items Qty",
      headerClassName: "text-xl block text-white",
      type: "number",
      minWidth: 150,
      flex: 0.4,
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
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon style={{ color: " rgb(74 4 78)" }} />
            </Link>
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon style={{ color: " rgb(74 4 78)" }} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL ORDERS - Admin`} />
          <style>{customStyles}</style>
          <div className="dashboard w-full max-w-full h-screen flex">
            <SideBar />
            <div className="productListContainer flex flex-col items-center col-span-2 p-4 w-full">
              <Typography
                component="h1"
                style={{ fontSize: "2rem", textAlign: "center" }}
                className="text-black opacity-75 font-light py-6"
              >
                Orders
              </Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable bg-white w-[80vw] shadow-md "
                autoHeight
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
