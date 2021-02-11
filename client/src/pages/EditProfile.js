import React from "react"
import EditProfile from "../components/EditProfile"
import { updateProfile } from "../actions/profile"
import { logout } from "../actions/auth"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Loading from "../components/Loading"

const AddJobPage = (props) => {
  const onSubmit = (data) => {
    if (data.email !== props.profile.email) {
      props.updateProfile(data)
      props.logout()
    } else {
      props.updateProfile(data)
      props.history.push("/profile")
    }
  }
  return (
    <div>
      {props.loading ? (
        <Loading />
      ) : (
        <EditProfile profile={props.profile} onSubmit={onSubmit} />
      )}
    </div>
  )
}

AddJobPage.prototype = {
  isAuthenticated: PropTypes.bool,
  profile: PropTypes.object,
  updateProfile: PropTypes.func,
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  profile: state.auth.user,
})

export default connect(mapStateToProps, { updateProfile, logout })(AddJobPage)
