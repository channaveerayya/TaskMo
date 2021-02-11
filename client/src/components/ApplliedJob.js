import React, { Fragment, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getJobs, applyJob } from "../actions/job"
import { setAlert } from "../actions/alerts"
import TableGrid from "./TableGrid"
import { Container, Paper, Typography, Grid } from "@material-ui/core"
import Card from "./card"
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

const AppliedJob = ({ job, index }) => {
  const classes = useStyles()
  return (
    <Container maxWidth="lg" style={{ padding: 10 }}>
      <Typography variant="h4">
        {index} -- {job.title}
        <Grid container spacing={3}>
          {job.applied.map((j, i) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
              <Card name={j.name} email={j.email} />
            </Grid>
          ))}
        </Grid>
      </Typography>
    </Container>
  )
}

export default AppliedJob
