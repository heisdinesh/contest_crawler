const mongoose = require("mongoose");
const Schema = mongoose.Schema

const scrapped_hackathons_schema = new Schema({

    name:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    date:{
        type:String,
    },
    source:{
        type:String,
        required:true
    },
    image:{
        type:String,
       
    },
    isbookMarked:{
        type:Boolean,
        default:false
    },
    bookMarkCount:{
        type:Number,
        default:0
    },
    highestBookMarkCount:{
        type:Number,
        default:0
    },

});

const scrapped_hackathons = mongoose.model('scrapped_hackathons',scrapped_hackathons_schema)

module.exports = scrapped_hackathons

