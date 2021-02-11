import axios from "axios"
import { setAlert } from "./alerts"
import { ADD_JOB, GET_JOBS, JOB_ERROR } from "./types"

export const getJobs = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/jobs")
    dispatch({
      type: GET_JOBS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: JOB_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

export const addJob = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    var res = await axios.post("/api/jobs", formData, config)
    dispatch({
      type: ADD_JOB,
      payload: res.data,
    })
    history.push("/")
    dispatch(setAlert("Job Created", "success"))
  } catch (error) {
    dispatch({
      type: JOB_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

export const applyJob = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    var res = await axios.put(`api/jobs/apply/${id}`, config)
    dispatch(getJobs())
    dispatch(setAlert("Job Applied", "success"))
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, "error"))
  }
}
