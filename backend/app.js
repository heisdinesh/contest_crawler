const express = require("express")
const dotenv = require("dotenv").config()
const connectWithDb = require("./config/db")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const scrapped_hackathons =require("./routes/scrapped_hackathons");

app.use("/api/v1",scrapped_hackathons)

connectWithDb()

module.exports = app