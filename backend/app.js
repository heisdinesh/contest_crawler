const express = require("express")
const dotenv = require("dotenv").config()
const connectWithDb = require("./config/db")
const cors = require("cors")
const cron = require('node-cron');
const axios = require('axios');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const scrapped_hackathons =require("./routes/scrapped_hackathons");

app.use("/api/v1",scrapped_hackathons)

connectWithDb()


function scrape(){
    axios.get("https://contest-crawler.vercel.app/api/v1/devfolio")
    .then(()=>console.log("devfolio sucess"))
    .catch((error)=>console.log("devfolio error",error))

    axios.get("https://contest-crawler.vercel.app/api/v1/hackerearth")
    .then(()=>console.log("hackerearth sucess"))
    .catch((error)=>console.log("hackerearth error",error))

    axios.get("https://contest-crawler.vercel.app/api/v1/unstop")
    .then(()=>console.log("unstop sucess"))
    .catch((error)=>console.log("unstop error",error))
}

cron.schedule('0 2 * * *', () => {
    console.log("scrape started")
    scrape();
  });

module.exports = app