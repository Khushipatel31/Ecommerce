import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews
} from "../../actions/productAction";
import { Button, Typography } from "@material-ui/core";
import MetaData from "../Layouts/MetaData"
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { useFormik } from "formik";
import userUpdate from "../../constants/validationSchema/userUpdate";
import { DELETE_REVIEW_RESET } from "../../constants/productConstant";
const Swal = require("sweetalert2");

const ProductReviews = () => {
  const dispatch = useDispatch();
  const deleteProductHandler = (id) => {
    // dispatch(deleteProduct(id));
  };

  const { error, reviews, isDeleted } = useSelector((state) => state.productSlice);

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
    // dispatch(());
    if (isDeleted) {
      Swal.fire({
        icon: "success",
        title: "Review Deleted Successfully",
        text: "You have successfully deleted review!",
        confirmButtonText: "OK",
      }).then(() => {
        dispatch({ type: DELETE_REVIEW_RESET });
        window.location.replace('/admin/reviews');
      })
    }
  }, [dispatch, error, isDeleted]);

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
    },
    validationSchema: userUpdate,
    onSubmit: productReviewSubmitHandler,
  });

  const productReviewSubmitHandler = (values, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(updateUser(id, values)).then(() => {
      setSubmitting(false);
    });
  };

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
    { field: "id", headerName: "Review ID", headerClassName: "text-xl block text-white mx-auto ", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      headerClassName: "text-xl block text-white",
      minWidth: 150,
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
      minWidth: 270,
      headerClassName: "text-xl block text-white",
      flex: 0.5,
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
      minWidth: 150,
      headerClassName: "text-xl block text-white",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() =>
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

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        name: item.user,
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
            className=" pb-9  signupForm flex flex-col items-center m-auto pt-9 px-[2vmax] justify-evenly gap-4 h-[90%] transition-all createProductForm"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex w-full items-center">
              <PersonIcon className="absolute translate-x-0 text-6xl ml-8" />
              <input
                className="px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500"
                type="text"
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="error text-red-600">
                {formik.errors.name}
              </div>
            ) : null}
            <div className="flex w-full items-center">
              <MailOutlineIcon className="absolute translate-x-0 text-6xl ml-8" />
              <input
                type="email"
                name="email"
                className="px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="error text-red-600">
                {formik.errors.email}
              </div>
            ) : null}

            <div className="flex w-full items-center">
              <VerifiedUserIcon className="absolute translate-x-0 text-6xl ml-8" />
              <select
                className="px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500"
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {console.log(user.role)}
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            {formik.touched.role && formik.errors.role ? (
              <div className="error text-red-600">
                {formik.errors.role}
              </div>
            ) : null}

            <button
              id="createProductBtn"
              type="submit"
              className="text-lg bg-fuchsia-950 rounded p-2 w-full transition-all text-white hover:bg-fuchsia-900"
              disabled={formik.isSubmitting}
            >
              Update
            </button>
          </form>
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
}

export default ProductReviews