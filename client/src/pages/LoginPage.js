import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { login } from "../actions/auth"
import { setAlert } from "../actions/alerts"
import { Redirect } from "react-router-dom"
import axios from "axios"
import Login from "../components/Login"
import Loading from "../components/Loading"

const LoginPage = (props) => {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isEmployer, setIsEmployer] = useState(false)
  if (props.isAuthenticated) {
    return <Redirect to="/" />
  }
  const getOtp = (e) => {
    e.preventDefault()
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const body = JSON.stringify({ email })
    setLoading(true)
    axios
      .post("/api/login/email", body, config)
      .then((res) => {
        setLoading(false)
        setIsOtpSent(true)
        props.setAlert("OTP sent to your mail pls Check", "success")
      })
      .catch((error) => {
        setLoading(true)
        const e = error.response.data.errors
        if (e) {
          e.forEach((err) => props.setAlert(err.msg, "error"))
        } else {
          props.setAlert("Oops error", "error")
        }
      })
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    props.login(email, otp)
  }

  const handleChange = (event) => {
    setIsEmployer(event.target.checked)
  }

  const registerUser = (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const body = JSON.stringify({ email, isEmployer })
    setLoading(true)
    axios
      .post("/api/login/register", body, config)
      .then((res) => {
        setLoading(false)
        setIsOtpSent(true)
        props.setAlert("OTP sent to your mail pls Check", "success")
      })
      .catch((error) => {
        setLoading(false)
        const e = error.response.data.errors
        if (e) {
          e.forEach((err) => props.setAlert(err.msg, "error"))
        } else {
          props.setAlert("Oops error", "error")
        }
      })
  }
  const emailField = (
    <Login
      title="Login"
      btnName="Get Otp"
      onSubmit={getOtp}
      inputProps={{
        title: "Email",
        name: "email",
        value: email,
        handleOnChange: (e) => {
          setEmail(e.target.value)
        },
        labelWidth: 70,
        multi: false,
        row: 5,
      }}
    />
  )

  const emailWithField = (
    <Login
      title="Verify OTP"
      btnName="Send Otp"
      onSubmit={verifyOtp}
      inputProps={{
        title: "OTP",
        name: "otp",
        value: otp,
        handleOnChange: (e) => {
          setOtp(e.target.value)
        },
        labelWidth: 70,
        multi: false,
        row: 5,
      }}
    />
  )
  const register = (
    <Login
      title="Register"
      btnName="Verify"
      onSubmit={registerUser}
      inputProps={{
        title: "Email",
        name: "email",
        value: email,
        handleOnChange: (e) => {
          setEmail(e.target.value)
        },
        labelWidth: 70,
        multi: false,
        row: 5,
      }}
      isEmployer={true}
      isEmployerProps={{ checked: isEmployer, onChange: handleChange }}
    />
  )
  let inputFiles =
    props.register && !isOtpSent
      ? register
      : isOtpSent
      ? emailWithField
      : emailField

  return loading ? (
    <div style={{ position: "absolute", top: " 50%", left: "50%" }}>
      <Loading />
    </div>
  ) : (
    inputFiles
  )
}

LoginPage.prototype = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
  setAlert: PropTypes.func,
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login, setAlert })(LoginPage)
