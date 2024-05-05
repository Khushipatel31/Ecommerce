import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import MetaData from "../Layouts/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_USER_RESET } from "../../constants/userConstant";
const Swal = require("sweetalert2");

const Users = () => {
  const dispatch = useDispatch();
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const { error, users, loading, isDeleted, message } = useSelector(
    (state) => state.userSlice
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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
        title: "User Deleted Successfully",
        text: message,
        confirmButtonText: "OK",
      }).then(() => {
        dispatch({ type: DELETE_USER_RESET });
        window.location.replace("/admin/users");
      });
    }
  }, [dispatch, error, isDeleted]);

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
      headerName: "User ID",
      headerClassName: "text-xl block text-white mx-auto ",
      minWidth: 180,
      flex: 0.1,
    },

    {
      field: "email",
      headerName: "Email",
      headerClassName: "text-xl block text-white",
      minWidth: 200,
      flex: 0.2,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "text-xl block text-white",
      minWidth: 150,
      flex: 0.1,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      headerClassName: "text-xl block text-white",
      flex: 0.1,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "text-green-600"
          : "text-red-600";
      },
    },

    {
      field: "actions",
      flex: 0.1,
      headerName: "Actions",
      minWidth: 150,
      headerClassName: "text-xl block text-white",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon style={{ color: " rgb(74 4 78)" }} />
            </Link>
            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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
  console.log(users);
  {
    users &&
      users.forEach((item) => {
        rows.push({
          id: item._id,
          role: item.role,
          email: item.email,
          name: item.name,
        });
      });
  }

  return (
    <>
      <MetaData title={`ALL USERS - Admin`} />
      <style>{customStyles}</style>
      <div className="dashboard w-full max-w-full h-screen flex">
        <SideBar />
        <div className="productListContainer flex flex-col items-center col-span-2 p-4 w-full">
          <Typography
            component="h1"
            style={{ fontSize: "2rem", textAlign: "center" }}
            className="text-black opacity-75 font-light py-6"
          >
            Users
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable bg-white w-full shadow-md "
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default Users;
