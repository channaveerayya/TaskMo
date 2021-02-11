import React, { useState, useEffect } from "react"
import { Button, Grid, Typography, Switch } from "@material-ui/core"
import InputField from "./InputField"
import { makeStyles, withStyles } from "@material-ui/styles"
import { connect } from "react-redux"
import { setAlert } from "../actions/alerts"
import axios from "axios"

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

const EditProfile = ({ onSubmit, setAlert }) => {
  const [formData, setFormData] = useState({
    name: " ",
    phone: null,
    age: null,
    county: "",
    city: "",
    lat: null,
    long: null,
    skills: "",
    gitHub: "",
    experience: null,
    higherDeg: "",
  })
  const [loading, setLoading] = useState(true)
  const classes = useStyles()
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  useEffect(() => {
    axios
      .get("/api/login")
      .then((res) => {
        setLoading(false)
        setFormData({ ...formData, email: res.data.user.email })
      })
      .catch((error) => {
        setLoading(true)
        const e = error.response.data.errors
        if (e) {
          e.forEach((err) => setAlert(err.msg, "error"))
        } else {
          setAlert("Oops error", "error")
        }
      })
  }, [])
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
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item className={classes.loginItems}>
            <Typography variant="h2" align="center">
              Add Jobs Here
            </Typography>
          </Grid>
          <Grid item className={classes.loginItems}>
            <InputField
              title="Name"
              name="name"
              value={formData.name}
              handleOnChange={onChange}
              labelWidth={70}
              multi={false}
              row={5}
            />
          </Grid>
          <Grid item className={classes.loginItems}>
            <InputField
              title="Email"
              name="email"
              value={formData.email}
              handleOnChange={onChange}
              labelWidth={70}
              multi={false}
              row={5}
            />
          </Grid>
          <Grid item className={classes.loginItems}>
            <InputField
              title="Phone"
              name="phone"
              value={formData.phone}
              handleOnChange={onChange}
              labelWidth={70}
              multi={false}
              row={5}
            />
          </Grid>
          <Grid item className={classes.loginItems}>
            <InputField
              title="age"
              name="age"
              value={formData.age}
              handleOnChange={onChange}
              labelWidth={70}
              multi={false}
              row={5}
            />
          </Grid>
          <Grid item className={classes.loginItems}>
            <InputField
              title="City"
              name="city"
              value={formData.city}
              handleOnChange={onChange}
              labelWidth={70}
              multi={false}
              row={5}
            />
          </Grid>
          <Grid item className={classes.loginItems}>
            <InputField
              title="County"
              name="county"
              value={formData.county}
              handleOnChange={onChange}
              labelWidth={70}
              multi={false}
              row={5}
            />
          </Grid>
          <Grid item className={classes.loginItems}>
            <InputField
              title="experience"
              name="experience"
              value={formData.experience}
              handleOnChange={onChange}
              labelWidth={70}
              multi={false}
              row={5}
            />
          </Grid>
          <Grid item className={classes.loginItems}>
            <InputField
              title="GitHub"
              name="gitHub"
              value={formData.gitHub}
              handleOnChange={onChange}
              labelWidth={70}
              multi={false}
              row={5}
            />
          </Grid>
          <Grid item className={classes.loginItems}>
            <InputField
              title="HigherDeg"
              name="higherDeg"
              value={formData.higherDeg}
              handleOnChange={onChange}
              labelWidth={70}
              multi={false}
              row={5}
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
            />
          </Grid>
          <Grid item className={classes.loginItems}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ margin: "5%", width: "90%" }}
              className={classes.btn}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default connect(null, { setAlert })(EditProfile)