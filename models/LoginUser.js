const mongoose = require("mongoose")

const LoginUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
  },
  isEmployer: {
    type: Boolean,
    default: false,
  },
  expire_at: { type: Date, default: Date.now },
})

module.exports = LoginUser = mongoose.model("loginUser", LoginUserSchema)
