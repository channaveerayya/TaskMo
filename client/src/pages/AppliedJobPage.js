import React from "react"
import { Container, Typography } from "@material-ui/core"
import { connect } from "react-redux"

import AppliedJob from "../components/ApplliedJob"
const AppliedJobPage = ({
  jobs: { jobs, loading },
  profile,
  isAuthenticated,
}) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2">Applied Jobs Candidate Names</Typography>

      {!loading
        ? jobs.map((jo, i) =>
            jo.user === profile.user ? (
              <AppliedJob key={i} index={i} job={jo} />
            ) : null
          )
        : null}
    </Container>
  )
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  profile: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(AppliedJobPage)
