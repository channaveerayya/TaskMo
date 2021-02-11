import React from "react"
import { Container, Grid } from "@material-ui/core"
import ProfileCard from "../components/ProfileCard"
import AddProfile from "../components/AddProfile"
import { makeStyles } from "@material-ui/styles"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Loading from "../components/Loading"
import { createProfile } from "../actions/profile"
import { logout } from "../actions/auth"

const useStyles = makeStyles((theme) => ({
  container: {
    border: `2px solid ${theme.palette.common.blue}`,
    borderRadius: 10,
    boxShadow: `0px 4px 8px ${theme.palette.common.blue}`,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  items: {
    padding: 10,
    width: "100%",
  },
}))

const ProfilePage = (props) => {
  const classes = useStyles()
  const onSubmit = (data) => {
    props.createProfile(data)
    props.logout()
  }
  return (
    <Container maxWidth="lg">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={classes.container}>
          {props.loading ? (
            <Loading />
          ) : props.profile ? (
            <ProfileCard data={props.profile} />
          ) : (
            <>
              <h1>Create profile</h1>
              <AddProfile onSubmit={onSubmit} />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

ProfilePage.prototype = {
  profile: PropTypes.object,
}

const mapStateToProps = (state) => ({
  profile: state.auth.user,
  loading: state.auth.loading,
})
export default connect(mapStateToProps, { createProfile, logout })(ProfilePage)
