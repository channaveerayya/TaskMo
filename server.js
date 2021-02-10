const express = require("express")
const app = express()
var cors = require("cors")

app.get("/", (req, res) => res.send("API Running..."))

// Init Middleware
// Extending the limit for uploading profile Image and Resume
app.use(express.json({ extended: false, limit: "50mb" }))
app.use(cors())
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
