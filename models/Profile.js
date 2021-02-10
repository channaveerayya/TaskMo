const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "loginUsers",
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
  },
  county: {
    type: String,
  },
  city: {
    type: String,
  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  skills: {
    type: String,
  },
  gitHub: {
    type: String,
  },
  experience: {
    type: Number,
  },
  higherDeg: {
    type: String,
  },
})

module.exports = Profile = mongoose.model("profile", ProfileSchema)
