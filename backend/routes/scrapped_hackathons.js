const express = require("express");
const router = express.Router()

const {insert_scrapped_hackathons_devfolio, incrementBookMarks, get_scrapped_hackathons,decrementBookMarks} = require("../controllers/scrapped_hackathons")

router.route('/devfolio').get(insert_scrapped_hackathons_devfolio)


//get all the hackathons
router.route('/allHackathons').get(get_scrapped_hackathons)
//update bookMarks count
router.route('/incrementBookMarkCount').post(incrementBookMarks)
router.route('/decrementBookMarkCount').post(decrementBookMarks)





module.exports =router