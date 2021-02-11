import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Alert, AlertTitle } from "@material-ui/lab"
import PropTypes from "prop-types"
import { connect } from "react-redux"
const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    margin: "auto",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}))

function AlertMSG({ alerts }) {
  const classes = useStyles()
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className={classes.root} key={alert.id}>
        <Alert severity={alert.alertType} variant="filled">
          <AlertTitle>{alert.alertType}</AlertTitle>
          {alert.msg}
        </Alert>
      </div>
    ))
  )
}

AlertMSG.propTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
})

export default connect(mapStateToProps)(AlertMSG)
