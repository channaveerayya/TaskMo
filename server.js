const express = require("express")
const connectDB = require("./config/db")
const path = require("path")
const app = express()
var cors = require("cors")
//connect Database
connectDB()
app.get("/", (req, res) => res.send("API Running..."))

// Init Middleware
// Extending the limit for uploading profile Image and Resume
app.use(express.json({ extended: false, limit: "50mb" }))
app.use(cors())

app.use("/api/login", require("./routes/login"))
app.use("/api/jobs", require("./routes/job"))
app.use("/api/profile", require("./routes/profile"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
