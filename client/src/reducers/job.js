/* eslint-disable import/no-anonymous-default-export */
import { GET_JOBS, JOB_ERROR, ADD_JOB } from "../actions/types"
const initState = { jobs: [], loading: true, error: {} }

export default function (state = initState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false,
      }

    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, payload],
        loading: false,
      }

    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}
