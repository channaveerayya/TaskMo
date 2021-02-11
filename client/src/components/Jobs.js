import React, { Fragment, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getJobs, applyJob } from "../actions/job"
import { setAlert } from "../actions/alerts"
import TableGrid from "./TableGrid"
import { Container, Typography } from "@material-ui/core"
import Loading from "./Loading"
const Jobs = ({
  getJobs,
  jobs: { jobs, loading },
  isAuthenticated,
  profile,
  applyJob,
  setAlert,
}) => {
  useEffect(() => {
    getJobs()
  }, [getJobs])

  const apply = (id) => {
    if (isAuthenticated) {
      if (profile && !profile.isEmployer) {
        applyJob(id)
      } else {
        setAlert(
          "Your are Employer of this job You don't have permission",
          "error"
        )
      }
    }
  }

  const rowCell = [
    "Title",
    "Description",
    "Skills",
    "Expire Date",
    "County",
    "City",
    "Latitude",
    "Longitude",
  ]
  return loading ? (
    <div style={{ position: "absolute", top: " 50%", left: "50%" }}>
      <Loading />
    </div>
  ) : (
    <Container maxWidth="lg">
      <Typography variant="h2">Opening Jobs</Typography>
      <TableGrid
        rowData={jobs}
        rowCell={rowCell}
        onClick={apply}
        profile={profile}
        isAuthenticated={isAuthenticated}
      />
    </Container>
  )
}

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  profile: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { getJobs, applyJob, setAlert })(Jobs)
