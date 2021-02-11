import React from "react"
import AddJob from "../components/AddJob"
import { addJob } from "../actions/job"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Loading from "../components/Loading"

const AddJobPage = (props) => {
  const onSubmit = (data) => {
    props.addJob(data, props.history)
  }

  return (
    <div>{props.loading ? <Loading /> : <AddJob onSubmit={onSubmit} />}</div>
  )
}

AddJobPage.prototype = {
  isAuthenticated: PropTypes.bool,
  addJob: PropTypes.func,
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { addJob })(AddJobPage)
