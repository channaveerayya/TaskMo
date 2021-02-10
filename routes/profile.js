const express = require("express")

const router = express.Router()
const auth = require("../middleware/auth")
const Profile = require("../models/Profile")
const User = require("../models/LoginUser")
// const Post = require("../../models/Post")
const { check, validationResult } = require("express-validator")
const LoginUser = require("../models/LoginUser")

router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.user.id })
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" })
    }

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
  }
})

router.post(
  "/",
  [
    auth,
    check("name", "name is required").not().isEmpty(),
    check("phone", "phone is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const checkProfile = await Profile.findOne({ user: req.user.id })
      if (checkProfile) {
        return res.status(400).json({ msg: "user existed" })
      }
      let newProfile = new Profile({
        user: req.user.id,
        ...req.body,
      })
      await newProfile.save()
      res.json(newProfile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Serve error")
    }
  }
)

router.put(
  "/",
  [
    auth,
    check("name", "name is required").not().isEmpty(),
    check("phone", "phone is required").not().isEmpty(),
    check("email", "email is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const updateProfile = await Profile.findOne({ user: req.user.id })
      updateProfile.name = req.body.name
      updateProfile.phone = req.body.phone
      updateProfile.age = req.body.age
      updateProfile.county = req.body.county
      updateProfile.city = req.body.city
      updateProfile.lat = req.body.lat
      updateProfile.long = req.body.long
      updateProfile.skills = req.body.skills
      updateProfile.gitHub = req.body.gitHub
      updateProfile.experience = req.body.experience
      updateProfile.higherDeg = req.body.higherDeg
      updateProfile.user = req.user.id

      const updateLoginUser = await LoginUser.findById(req.user.id)
      updateLoginUser.email = req.body.email
      await updateProfile.save()
      await updateLoginUser.save()
      res.json(updateProfile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Serve error")
    }
  }
)

module.exports = router
