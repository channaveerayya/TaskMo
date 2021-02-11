import axios from "axios"
import { setAlert } from "./alerts"

import { GET_PROFILE, PROFILE_ERROR, USER_LOADED } from "./types"

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile")

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

//Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${userId}`)

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

export const createProfile = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await axios.post("/api/profile", formData, config)
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert("Profile Created please login again ", "success"))

    // history.push("/")
  } catch (error) {
    const e = error.response.data.errors
    if (e) {
      e.forEach((err) => dispatch(setAlert(err.msg, "error")))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

export const updateProfile = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await axios.put("/api/profile", formData, config)
    const res2 = await axios.get("/api/login")
    dispatch({
      type: GET_PROFILE,
      payload: { ...res.data, ...res2.data.user },
    })
    dispatch({
      type: USER_LOADED,
      payload: { ...res.data, ...res2.data },
    })
    dispatch(setAlert("Profile Updated", "success"))
  } catch (error) {
    const e = error.response.data.errors
    if (e) {
      e.forEach((err) => dispatch(setAlert(err.msg, "error")))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}
