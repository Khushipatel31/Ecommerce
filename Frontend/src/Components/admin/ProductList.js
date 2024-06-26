import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import MetaData from "../Layouts/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";
const Swal = require("sweetalert2");

const ProductList = () => {
  const dispatch = useDispatch();
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const {
    error,
    products,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.productSlice);

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
    if (isDeleted) {
      Swal.fire({
        icon: "success",
        title: "Product Deleted Successfully",
        text: "You have successfully deleted product!",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: DELETE_PRODUCT_RESET });
        }
      });
    }
  }, [dispatch, error, deleteError, isDeleted]);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

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
      headerName: "Product ID",
      headerClassName: "text-xl block text-white mx-auto ",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "name",
      headerName: "Name",
      headerClassName: "text-xl block text-white",
      minWidth: 300,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      headerClassName: "text-xl block text-white",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      headerClassName: "text-xl block text-white",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon style={{ color: " rgb(74 4 78)" }} />
            </Link>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      <style>{customStyles}</style>
      <div className="dashboard w-full max-w-full h-screen flex">
        <SideBar />
        <div className="productListContainer flex flex-col items-center col-span-2 p-4 w-full">
          <Typography
            component="h1"
            style={{ fontSize: "2rem", textAlign: "center" }}
            className="text-black opacity-75 font-light py-6"
          >
            Products
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
  );
};

export default ProductList;
