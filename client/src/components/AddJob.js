import React, { useState } from "react"
import { Button, Grid, Typography, Switch } from "@material-ui/core"
import InputField from "./InputField"
import { makeStyles, withStyles } from "@material-ui/styles"

import MomentUtils from "@date-io/moment"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

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

const AddJob = ({ onSubmit, profile }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    county: "",
    city: "",
    lat: null,
    long: null,
    expireDate: null,
    skills: "",
  })
  const classes = useStyles()
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <form
      autoComplete="on"
      style={{ margin: "10% auto" }}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
    >
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
                Add Jobs Here
              </Typography>
            </Grid>
            <Grid item className={classes.loginItems}>
              <InputField
                title="title"
                name="title"
                value={formData.title}
                handleOnChange={onChange}
                labelWidth={70}
                multi={false}
                row={5}
                required={true}
              />
            </Grid>
            <Grid item className={classes.loginItems}>
              <InputField
                title="description"
                name="description"
                value={formData.description}
                handleOnChange={onChange}
                labelWidth={70}
                multi={true}
                row={3}
              />
            </Grid>
            <Grid item className={classes.loginItems}>
              <InputField
                title="county"
                name="county"
                value={formData.county}
                handleOnChange={onChange}
                labelWidth={70}
                multi={false}
                row={5}
                required={true}
              />
            </Grid>
            <Grid item className={classes.loginItems}>
              <InputField
                title="city"
                name="city"
                value={formData.city}
                handleOnChange={onChange}
                labelWidth={70}
                multi={false}
                row={5}
                required={true}
              />
            </Grid>
            <Grid item className={classes.loginItems}>
              <InputField
                title="lat"
                name="lat"
                value={formData.lat}
                handleOnChange={onChange}
                labelWidth={70}
                multi={false}
                row={5}
                required={true}
                type="Number"
              />
            </Grid>
            <Grid item className={classes.loginItems}>
              <InputField
                title="long"
                name="long"
                value={formData.long}
                handleOnChange={onChange}
                labelWidth={70}
                multi={false}
                row={5}
                required={true}
                type="Number"
              />
            </Grid>
            <Grid item className={classes.loginItems}>
              <InputField
                title="skills"
                name="skills"
                value={formData.skills}
                handleOnChange={onChange}
                labelWidth={70}
                multi={false}
                row={5}
                required={true}
              />
            </Grid>
            <Grid item className={classes.loginItems}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disabled={false}
                    margin="normal"
                    id="expireDate"
                    label="expireDate"
                    format="DD-MM-YYYY"
                    value={formData.expireDate}
                    minDate={Date.now()}
                    required={true}
                    onChange={(date) => {
                      setFormData({
                        ...formData,
                        expireDate: date._d,
                      })
                    }}
                    name="expireDate"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item className={classes.loginItems}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "5%", width: "90%" }}
                className={classes.btn}
              >
                Add Job
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddJob
