const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")

const auth = require("../middleware/auth")
const Job = require("../models/job")
const User = require("../models/LoginUser")
const Profile = require("../models/Profile")

// @router    POST api/jobs
// @desc      Create a new job
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
      check("county", "county is required").not().isEmpty(),
      check("city", "city is required").not().isEmpty(),
      check("lat", "lat is required").not().isEmpty(),
      check("long", "long is required").not().isEmpty(),
      check("expireDate", "expireDate is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const newJob = new Job({
        title: req.body.title,
        description: req.body.description,
        county: req.body.county,
        city: req.body.city,
        lat: req.body.lat,
        long: req.body.long,
        expireDate: req.body.expireDate,
        skills: req.body.skills,
        user: req.user.id,
      })

      const job = await newJob.save()
      res.json(job)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server error")
    }
  }
)

// @router    GET api/jobs
// @desc      Get all jobs
// @access    Private
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({})
    res.json(jobs)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
  }
})

// @router    DELETE api/jobs/:id
// @desc      DELETE Job by id
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) return res.status(404).json({ msg: "Job not Found" })

    if (job.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "USER not authorized" })

    await job.remove()
    res.json({ msg: "Job removed" })
  } catch (error) {
    console.error(error.message)
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Job not Found" })
    res.status(500).send("Server error")
  }
})

// @router    PUT api/jobs/apply/:id
// @desc      apply a job
// @access    Private
router.put("/apply/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    const user = await User.findById(req.user.id).select("-otp")
    const profile = await Profile.findOne({ user: req.user.id })

    if (
      job.applied.filter((apply) => apply.user.toString() === req.user.id)
        .length
    ) {
      return res.status(400).json({ msg: "Job already applied" })
    }

    if (user.isEmployer) {
      return res
        .status(400)
        .json({ msg: "your employer you don't have access" })
    }
    job.applied.unshift({
      user: req.user.id,
      email: user.email,
      name: profile.name,
    })

    await job.save()
    res.json(job.title)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
