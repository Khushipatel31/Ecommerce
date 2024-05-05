import axios from "axios";
import Swal from "sweetalert2";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_PROFILE_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../constants/userConstant";
import { userRedux } from "../store/slices/userSlice";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userRedux.abc({ type: LOGIN_REQUEST }));
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    dispatch(
      userRedux.abc({
        type: LOGIN_SUCCESS,
        data: data,
      })
    );
  } catch (error) {
    dispatch(
      userRedux.abc({
        type: LOGIN_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch(userRedux.abc({ type: LOGOUT_SUCCESS }));
  } catch (error) {
    dispatch(
      userRedux.abc({ type: LOGOUT_FAIL, error: error.response.data.message })
    );
  }
};

export const register = (userdata) => async (dispatch) => {
  try {
    dispatch(userRedux.abc({ type: REGISTER_USER_REQUEST }));
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/api/v1/register`, userdata, config);
    dispatch(
      userRedux.abc({
        type: REGISTER_USER_SUCCESS,
        data: data,
      })
    );
    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: "You have successfully registered!",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.replace("/login");
      }
    });
  } catch (error) {
    dispatch(
      userRedux.abc({
        type: REGISTER_USER_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

export const updateProfile = (userdata) => async (dispatch) => {
  try {
    dispatch(userRedux.abc({ type: UPDATE_PROFILE_REQUEST }));
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(`/api/v1/me/update`, userdata, config);
    dispatch(
      userRedux.abc({
        type: UPDATE_PROFILE_SUCCESS,
        data: data,
      })
    );
    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: "You have successfully registered!",
      confirmButtonText: "OK",
    });
  } catch (error) {
    dispatch(
      userRedux.abc({
        type: UPDATE_PROFILE_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch(userRedux.abc({ type: UPDATE_PASSWORD_REQUEST }));
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/update`,
      password,
      config
    );
    dispatch(
      userRedux.abc({
        type: UPDATE_PASSWORD_SUCCESS,
        data: data,
      })
    );
    Swal.fire({
      icon: "success",
      title: "Password chenaged",
      text: "Your Password Changed Successfully",
      confirmButtonText: "OK",
    });
  } catch (error) {
    dispatch(
      userRedux.abc({
        type: UPDATE_PASSWORD_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

export const forgotPasswordFunc = (email) => async (dispatch) => {
  try {
    dispatch(userRedux.forgotPassword({ type: FORGOT_PASSWORD_REQUEST }));
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
    dispatch(
      userRedux.forgotPassword({
        type: FORGOT_PASSWORD_SUCCESS,
        data: data,
      })
    );
  } catch (error) {
    dispatch(
      userRedux.forgotPassword({
        type: FORGOT_PASSWORD_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch(userRedux.forgotPassword({ type: RESET_PASSWORD_REQUEST }));
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `http://localhost:8080/api/v1/password/reset/${token}`,
      password,
      config
    );
    dispatch(
      userRedux.forgotPassword({
        type: RESET_PASSWORD_SUCCESS,
        data: data,
      })
    );
  } catch (error) {
    dispatch(
      userRedux.forgotPassword({
        type: RESET_PASSWORD_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

//admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(userRedux.allUsers({ type: ALL_USERS_REQUEST }));
    const { data } = await axios.get(`/api/v1/admin/users`);
    dispatch(userRedux.allUsers({ type: ALL_USERS_SUCCESS, data }));
  } catch (error) {
    dispatch(
      userRedux.allUsers({
        type: ALL_USERS_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(userRedux.userDetails({ type: USER_DETAILS_REQUEST }));
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    dispatch(userRedux.userDetails({ type: USER_DETAILS_SUCCESS, data }));
  } catch (error) {
    dispatch(
      userRedux.userDetails({
        type: USER_DETAILS_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch(userRedux.abc({ type: UPDATE_USER_REQUEST }));
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );
    dispatch(
      userRedux.abc({
        type: UPDATE_USER_SUCCESS,
        data,
      })
    );
  } catch (error) {
    dispatch(
      userRedux.abc({
        type: UPDATE_PROFILE_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(userRedux.abc({ type: DELETE_USER_REQUEST }));
    const { data } = await axios.delete(
      `/api/v1/admin/user/${id}`
    );
    dispatch(
      userRedux.abc({
        type: DELETE_USER_SUCCESS,
        data
      })
    );
  } catch (error) {
    dispatch(
      userRedux.abc({
        type: DELETE_USER_FAIL,
        error: error.response.data.message,
      })
    );
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(userRedux.abc({ type: CLEAR_ERRORS }));
};
