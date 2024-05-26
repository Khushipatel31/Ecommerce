import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { Button, Typography } from "@material-ui/core";
import MetaData from "../Layouts/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { useFormik } from "formik";
import { DELETE_REVIEW_RESET } from "../../constants/productConstant";
import Star from "@material-ui/icons/Star";
const Swal = require("sweetalert2");

const ProductReviews = () => {
  const dispatch = useDispatch();
  
  const { error, reviews, isDeleted } = useSelector(
    (state) => state.productSlice
  );
  const productReviewSubmitHandler = (values, { setSubmitting }) => {
    if (values.productId == "") {
      return;
    }
    setSubmitting(true);
    dispatch(getAllReviews(values.productId, values)).then(() => {
      setSubmitting(false);
    });
  };
  const formik = useFormik({
    initialValues: {
      productId: "",
    },
    onSubmit: productReviewSubmitHandler,
  });
  
  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId,formik.values.productId));
  };
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
    if (isDeleted) {
      Swal.fire({
        icon: "success",
        title: "Review Deleted Successfully",
        text: "You have successfully deleted review!",
        confirmButtonText: "OK",
      }).then((result) => {
        if(result.isConfirmed){
        dispatch({ type: DELETE_REVIEW_RESET });
        window.location.replace("/admin/reviews");
        }
      });
    }
  }, [dispatch, error, isDeleted,formik.values.productId]);


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
      headerName: "Review ID",
      headerClassName: "text-xl block text-white mx-auto ",
      minWidth: 180,
      flex: 0.5,
    },

    {
      field: "name",
      headerName: "Name",
      headerClassName: "text-xl block text-white",
      minWidth: 140,
      flex: 0.3,
    },

    {
      field: "comment",
      headerName: "Comment",
      headerClassName: "text-xl block text-white",
      minWidth: 300,
      flex: 0.5,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 150,
      headerClassName: "text-xl block text-white",
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "text-green-600"
          : "text-red-600";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      headerClassName: "text-xl block text-white",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
            onClick={() =>
              deleteReviewHandler(params.getValue(params.id, "id"))
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

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL Reviews - Admin`} />
      <style>{customStyles}</style>
      <div className="dashboard w-full max-w-full h-screen flex">
        <SideBar />
        <div className="productListContainer flex flex-col items-center col-span-2 p-4 w-full">
          <Typography
            component="h1"
            style={{ fontSize: "2rem", textAlign: "center" }}
            className="text-black opacity-75 font-light py-6"
          >
            All Reviews
          </Typography>
          <form
            className=" relative signupForm flex w-full justify-center gap-3 items-center m-auto  px-[2vmax]  mb-5 transition-all createProductForm"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex w-[25%] items-center">
              <Star className="absolute translate-x-0 text-6xl ml-8" />
              <input
                className="px-1 py-2 rounded pl-20 w-full box-border border-2 border-gray-500"
                type="text"
                name="productId"
                placeholder=""
                value={formik.values.productId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <button
              id="createProductBtn"
              type="submit"
              className="text-lg bg-fuchsia-950 w-[20%] rounded px-1 py-2 transition-all text-white hover:bg-fuchsia-900"
              disabled={formik.isSubmitting}
            >
              Search
            </button>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable bg-white w-[80vw] shadow-md "
              autoHeight
            />
          ) : (
            <Typography
              component="h1"
              style={{ fontSize: "2rem", textAlign: "center" }}
              className="text-black opacity-75 font-light py-6"
            >
              No reviews found
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
