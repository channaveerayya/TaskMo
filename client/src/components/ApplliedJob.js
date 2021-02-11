import React from "react"
import { Container, Typography, Grid } from "@material-ui/core"
import Card from "./card"

const AppliedJob = ({ job, index }) => {
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
