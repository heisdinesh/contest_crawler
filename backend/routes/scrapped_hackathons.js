const express = require("express");
const router = express.Router()

const {insert_scrapped_hackathons_devfolio, incrementBookMarks, get_scrapped_hackathons,decrementBookMarks} = require("../controllers/scrapped_hackathons")
const {insert_scrapped_hackathons_hackerearth} = require("../controllers/hackerearth_hackathons")
const {insert_scrapped_hackathons_unstop} = require("../controllers/unstop_hackathons")

router.route('/devfolio').get(insert_scrapped_hackathons_devfolio)
router.route('/hackerearth').get(insert_scrapped_hackathons_hackerearth)
router.route('/unstop').get(insert_scrapped_hackathons_unstop)

//get all the hackathons
router.route('/allHackathons').get(get_scrapped_hackathons)
//update bookMarks count
router.route('/incrementBookMarkCount').post(incrementBookMarks)
router.route('/decrementBookMarkCount').post(decrementBookMarks)





module.exports =router