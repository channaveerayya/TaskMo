import React from "react"
import { Grid, Typography } from "@material-ui/core"

import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    border: `2px solid ${theme.palette.common.blue}`,
    borderRadius: 10,
    boxShadow: `0px 4px 8px ${theme.palette.common.blue}`,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  loginItems: {
    padding: 10,
    width: "100%",
  },
}))

const Card = ({ email, name }) => {
  const classes = useStyles()

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item className={classes.loginContainer}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item className={classes.loginItems}>
            <Typography variant="h5" align="center">
              Name- {name}
            </Typography>
          </Grid>
          <Grid item className={classes.loginItems}>
            <Typography variant="h5" align="center">
              Email- {email}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Card
