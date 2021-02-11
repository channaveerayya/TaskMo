import React from "react"
import { Button, Grid, Typography, Switch } from "@material-ui/core"
import InputField from "./InputField"
import { makeStyles, withStyles } from "@material-ui/styles"

import PropTypes from "prop-types"
const useStyles = makeStyles((theme) => ({
  loginContainer: {
    border: `2px solid ${theme.palette.common.blue}`,
    borderRadius: 10,
    boxShadow: `0px 4px 8px ${theme.palette.common.blue}`,
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  loginItems: {
    padding: 10,
    width: "100%",
  },
  btn: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 145,
    marginRight: 40,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}))

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    margin: 5,
    display: "flex",
  },
  switchBase: {
    padding: 4,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch)

const Login = ({
  title,
  inputProps,
  onSubmit,
  btnName,
  isEmployer,
  isEmployerProps,
}) => {
  const classes = useStyles()

  return (
    <form autoComplete="on" style={{ margin: "10% auto" }} onSubmit={onSubmit}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={classes.loginContainer}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item className={classes.loginItems}>
              <Typography variant="h2" align="center">
                {title}
              </Typography>
            </Grid>
            <Grid item className={classes.loginItems}>
              <InputField {...inputProps} />
            </Grid>
            {isEmployer ? (
              <Grid item className={classes.loginItems}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="h4">
                      <Grid
                        component="label"
                        container
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item>User</Grid>
                        <Grid item>
                          <AntSwitch
                            {...isEmployerProps}
                            name="employer"
                            color="primary"
                          />
                        </Grid>
                        <Grid item>Employee</Grid>
                      </Grid>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
            <Grid item className={classes.loginItems}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "5%", width: "90%" }}
                className={classes.btn}
              >
                {btnName}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
Login.propTypes = {
  title: PropTypes.string.isRequired,
  inputProps: PropTypes.object.isRequired,
  isEmployerProps: PropTypes.object,
  btnName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEmployer: PropTypes.bool,
}
export default Login
