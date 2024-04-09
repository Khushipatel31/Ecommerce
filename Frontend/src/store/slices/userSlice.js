import { createSlice } from "@reduxjs/toolkit";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAIL, CLEAR_ERRORS, UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_RESET, UPDATE_PROFILE_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_REQUEST,RESET_PASSWORD_FAIL } from "../../constants/userConstant";

const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: userFromLocalStorage || {
    id: "",
    token: "",
    createdAt: "",
    email: "",
    name: "",
    profileUrl: "",
    role: "",
  },
  error: null,
  success:null,
  message: null,
  loading: false,
  isUpdated: false,
  isAuthenticated: localStorage.getItem("token") ? true : false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    abc: (state, action) => {
      switch (action.payload.type) {
        case LOGIN_REQUEST:
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
          return {
            ...state,
            loading: true,
            isAuthenticated: false,
            user: {},
          };
        case LOGIN_SUCCESS:
          const { id, createdAt, email, name, profile, role } = action.payload.data.user;
          const user = {
            id,
            createdAt,
            email,
            name,
            profileUrl: profile[0].url,
            role,
          };
          const token=action.payload.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user,
          };
        case LOGOUT_SUCCESS:
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          return {
            ...state,
            isAuthenticated: false,
            user: {},
          };
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
          return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: {},
            error: action.payload.error,
          };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
          const updatedUser = {
            id: action.payload.data.user.id,
            token: action.payload.data.user.token,
            createdAt: action.payload.data.user.createdAt,
            email: action.payload.data.user.email,
            name: action.payload.data.user.name,
            profileUrl: action.payload.data.user.profile[0].url,
            role: action.payload.data.user.role,
          };
          localStorage.setItem("token", action.payload.data.user.token);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return {
            ...state,
            loading: false,
            isUpdated: true,
            user: updatedUser,
          };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
          return {
            ...state,
            isUpdated: false,
          };
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
    },
    forgotPassword: (state, action) => {
      switch (action.payload.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case FORGOT_PASSWORD_SUCCESS:
          return {
            ...state,
            loading: false,
            message: action.payload.data.message,
          };
        case RESET_PASSWORD_SUCCESS:
          return {
            ...state,
            loading: false,
            success: action.payload.data,
          };
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload.error,
          };

        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };

        default:
          return state;
      }
    }
  },
});

export const { abc,forgotPassword } = userSlice.actions;
export default userSlice.reducer;
