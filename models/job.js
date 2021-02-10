const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "loginUsers",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  applied: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "loginUsers",
      },

      email: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  ],
})

module.exports = Job = mongoose.model("job", PostSchema)
