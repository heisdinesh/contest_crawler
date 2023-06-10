const express = require("express");
const router = express.Router()

const {insert_scrapped_hackathons_devfolio, updateBookMarks, get_scrapped_hackathons} = require("../controllers/scrapped_hackathons")

router.route('/devfolio').get(insert_scrapped_hackathons_devfolio)


//get all the hackathons
router.route('/allHackathons').get(get_scrapped_hackathons)





module.exports =router