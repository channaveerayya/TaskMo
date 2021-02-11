import axios from "axios"
import { setAlert } from "./alerts"
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types"
import setAuthToken from "../utils/setAuthToken"

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get("/api/profile/me")
    const res2 = await axios.get("/api/login")
    dispatch({
      type: USER_LOADED,
      payload: { ...res.data, ...res2.data.user },
    })
  } catch (error) {
    if (error.data && error.data.msg !== "There is no profile for this user") {
      dispatch({ type: AUTH_ERROR })
    }
  }
}

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post("/api/users", body, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })

    dispatch(loadUser())
  } catch (error) {
    const e = error.response.data.errors
    if (e) {
      e.forEach((err) => dispatch(setAlert(err.msg, "error")))
    }
    dispatch({
      type: REGISTER_FAIL,
    })
  }
}

export const login = (email, otp) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const body = JSON.stringify({ email, otp })

  try {
    const res = await axios.post("/api/login/emailWithOtp", body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })
    setAlert("Login success, Welcome", "success")
    dispatch(loadUser())
  } catch (error) {
    const e = error.response.data.errors
    if (e) {
      e.forEach((err) => dispatch(setAlert(err.msg, "error")))
    }
    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })
  dispatch({ type: LOGOUT })
}

export const customErrors = (error) => (dispatch) => {
  const e = error.response.data.errors
  if (e) {
    e.forEach((err) => dispatch(setAlert(err.msg, "error")))
  }
  dispatch({
    type: LOGIN_FAIL,
  })
}
