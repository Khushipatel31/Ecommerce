import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layouts/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../Layouts/Loader/Loader";
import { useFormik } from "formik";
import userUpdate from "../../constants/validationSchema/userUpdate";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    loading,
    error,
    userDetail: user,
    isUpdated,
  } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      Swal.fire({
        icon: "success",
        title: "User Updated Successfully",
        text: "You have successfully updated user!",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
        dispatch({ type: UPDATE_USER_RESET });
        window.location.replace("/admin/users");
        }
      });
    }
    if (user) {
      formik.setValues({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [dispatch, id, user, error, isUpdated]);

  const updateUserSubmitHandler = (values, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(updateUser(id, values)).then(() => {
      setSubmitting(false);
    });
  };

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
    },
    validationSchema: userUpdate,
    onSubmit: updateUserSubmitHandler,
  });

  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard w-full max-w-full h-screen flex">
        <SideBar />
        <div className="dashboardContainer col-span-2 p-4 w-full">
          <div className="dashboardSummary justify-center  flex items-center w-full flex-col h-[90%] ">
            {loading ? (
              <Loader />
            ) : (
              <div className="newProductContainer rounded shadow-md pb-9    bg-white w-1/3    box-border">
                <div>
                  <div className="flex h-[3vmax]">
                    <p className="transition-all text-xl cursor-pointer grid place-items-center w-full hover:text-fuchsia-700 hover:font-bold text-fuchsia-700 font-bold border-b-4 border-fuchsia-950">
                      Update User
                    </p>
                  </div>
                </div>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
