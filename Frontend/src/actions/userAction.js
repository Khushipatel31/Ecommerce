import axios from "axios";
import Swal from 'sweetalert2';
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_REQUEST,RESET_PASSWORD_FAIL } from "../constants/userConstant";
import { abc, forgotPassword } from "../store/slices/userSlice";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(abc({ type: LOGIN_REQUEST }));
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/login`, { email, password }, config);
    dispatch(abc({
      type: LOGIN_SUCCESS,
      data: data
    }))

  } catch (error) {
    dispatch(abc({
      type: LOGIN_FAIL,
      error: error.response.data.message
    }));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch(abc({ type: LOGOUT_SUCCESS }));
  } catch (error) {
    dispatch(abc({ type: LOGOUT_FAIL, error: error.response.data.message }))
  }
}


export const register = (userdata) => async (dispatch) => {
  try {
    dispatch(abc({ type: REGISTER_USER_REQUEST }));
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/api/v1/register`, userdata, config);
    dispatch(abc({
      type: REGISTER_USER_SUCCESS,
      data: data
    }))
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You have successfully registered!',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.replace("/login");
      }
    });
  } catch (error) {
    dispatch(abc({
      type: REGISTER_USER_FAIL,
      error: error.response.data.message
    }));
  }
};


export const updateProfile = (userdata) => async (dispatch) => {
  try {
    dispatch(abc({ type: UPDATE_PROFILE_REQUEST }));
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(`/api/v1/me/update`, userdata, config);
    console.log(data);
    dispatch(abc({
      type: UPDATE_PROFILE_SUCCESS,
      data: data
    }))
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You have successfully registered!',
      confirmButtonText: 'OK'
    })
  } catch (error) {
    dispatch(abc({
      type: UPDATE_PROFILE_FAIL,
      error: error.response
    }));
  }
};



export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch(abc({ type: UPDATE_PASSWORD_REQUEST }));
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/password/update`, password, config);
    console.log(data);
    dispatch(abc({
      type: UPDATE_PASSWORD_SUCCESS,
      data: data
    }))
    Swal.fire({
      icon: 'success',
      title: 'Password chenaged',
      text: 'Your Password Changed Successfully',
      confirmButtonText: 'OK'
    })
  } catch (error) {
    dispatch(abc({
      type: UPDATE_PASSWORD_FAIL,
      error: error.response.data.message
    }));
  }
};

export const forgotPasswordFunc = (email) => async (dispatch) => {
  try {
    dispatch(forgotPassword({ type: FORGOT_PASSWORD_REQUEST }));
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
    dispatch(forgotPassword({
      type: FORGOT_PASSWORD_SUCCESS,
      data: data
    }))
  } catch (error) {
    dispatch(forgotPassword({
      type: FORGOT_PASSWORD_FAIL,
      error: error.response.data
    }));
  }
};



export const resetPassword = (token,password) => async (dispatch) => {
  try {
    console.log(token)
    dispatch(forgotPassword({ type: RESET_PASSWORD_REQUEST }));
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`http://localhost:8080/api/v1/password/reset/${token}`, password, config);
    dispatch(forgotPassword({
      type: RESET_PASSWORD_SUCCESS,
      data: data
    }))
  } catch (error) {
    dispatch(forgotPassword({
      type: RESET_PASSWORD_FAIL,
      error: error.response.data
    }));
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(abc({ type: CLEAR_ERRORS }));
};
