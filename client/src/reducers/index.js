import { combineReducers } from "redux"
import alert from "./alert"
import auth from "./auth"
import profile from "./profile"
import jobs from "./job"

export default combineReducers({
  alert,
  auth,
  profile,
  jobs,
})
