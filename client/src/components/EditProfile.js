import React, { useState } from "react"
import { Button, Grid, Typography } from "@material-ui/core"
import InputField from "./InputField"
import { makeStyles } from "@material-ui/styles"

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

const EditProfile = ({ onSubmit, profile }) => {
  const [formData, setFormData] = useState(profile)
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
      </Grid>
    </form>
  )
}

export default EditProfile
