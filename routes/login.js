const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const User = require("../models/LoginUser")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const { check, validationResult } = require("express-validator/check")
const nodemailer = require("nodemailer")

//@route    GET api/login
//@desc     user email id by token
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-otp")
    res.json({ user })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Serve error")
  }
})

//@route    POST api/login/email
//@desc     sent OTP using registered email address
//@access   Public
router.post(
  "/email",
  [check("email", "please enter a valid email id").isEmail()],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User not Found" }] })
      }
      let otp = Math.floor(100000 + Math.random() * 900000)

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "channutaskmo@gmail.com",
          pass: "channu9980972009",
        },
      })

      let mailDetails = {
        from: "channutaskmo@gmail.com",
        to: email,
        subject: "Otp for login  is: ",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>",
      }

      mailTransporter.sendMail(mailDetails, async function (err, data) {
        if (err) {
          res.status(400).json({ errors: [{ msg: "Error Occurs" }] })
        } else {
          const salt = await bcrypt.genSalt(10)
          user.otp = await bcrypt.hash(otp.toString(), salt)
          let d1 = new Date(),
            d2 = new Date(d1)
          d2.setMinutes(d1.getMinutes() + 30)

          user.expire_at = d2
          await user.save()
          res.json({ msg: `email sent to the ${email}` })
        }
      })
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Serve error")
    }
  }
)

//@route    POST api/login/emailWithOtp
//@desc     login with otp and send back Token
//@access   Public
router.post(
  "/emailWithOtp",
  [
    check("email", "please enter a valid email id").isEmail(),
    check("otp", "please enter a otp").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, otp } = req.body
    try {
      let user = await User.findOne({ email })
      const presentTime = new Date()
      const expData = new Date(user.expire_at)

      if (presentTime > expData) {
        res.status(400).json({ errors: [{ msg: "OTP is expired" }] })
      }

      const isMatch = await bcrypt.compare(otp.toString(), user.otp)
      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "Invalid OTP" }] })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error
          res.json({ token })
        }
      )
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Serve error")
    }
  }
)

//@route    POST api/login/register
//@desc     Register User
//@access   Public
router.post(
  "/register",
  [check("email", "Please include valid Email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const { email, isEmployer } = req.body

    try {
      let user = await User.findOne({ email })
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] })
      }
      user = new User({ email, isEmployer })

      let otp = Math.floor(100000 + Math.random() * 900000)

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "channutaskmo@gmail.com",
          pass: "channu9980972009",
        },
      })

      let mailDetails = {
        from: "channutaskmo@gmail.com",
        to: email,
        subject: "Otp for login  is: ",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>",
      }

      mailTransporter.sendMail(mailDetails, async function (err, data) {
        if (err) {
          res.status(400).json({ errors: [{ msg: "Error Occurs" }] })
        } else {
          let d1 = new Date(),
            d2 = new Date(d1)
          d2.setMinutes(d1.getMinutes() + 30)

          const salt = await bcrypt.genSalt(10)
          user.otp = await bcrypt.hash(otp.toString(), salt)

          user.expire_at = d2
          await user.save()
          res.json({ msg: `email sent to the ${email}` })
        }
      })
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server error")
    }
  }
)

module.exports = router
