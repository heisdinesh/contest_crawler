const scrapped_hackathons = require("../models/scrapped_hackathons");
const cheerio = require("cheerio");
const request = require("request")

async function checkIfHackathonExists(name, link) {
    try {
      // Assuming you have a "Hackathon" model or collection in your database
      // Replace "Hackathon" with the actual name of your model or collection
      const existingHackathon = await scrapped_hackathons.findOne({ name, link });
  
      if (existingHackathon) {
        return true; // Hackathon already exists in the database
      }
  
      return false; // Hackathon does not exist in the database
    } catch (error) {
      console.error('Error occurred while checking hackathon existence:', error);
      throw error;
    }
  }

exports.insert_scrapped_hackathons_devfolio = async( req,res,next)=>{
    const url = 'https://devfolio.co/hackathons';
  
    request(url, async (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const hackathonDetails = [];
        const hackathonDetails2 = [];
        
        const devfolioHackathons = $('.Link__LinkBase-sc-af40de1d-0.lkflLS');
    
  
        devfolioHackathons.each((index, element) => {
          const name = $(element).find('.sc-tQuYZ.kHbpBI').text();
          const link = $(element).attr('href');
          hackathonDetails.push({ name, link });
        });
  
        const date = $(".sc-iWajrY.sc-jKDlA-D.fIIKMx");
        date.each((index, element) => {
          const date = $(element).find('.sc-tQuYZ.EdbiX').text();
          const [status, startDate] = date.split("Starts");
          hackathonDetails2.push({ source:"devfolio", date:startDate });
        });
  
        const AllDetails = hackathonDetails.map((element, index) => {
          return { ...element, ...hackathonDetails2[index] };
        });
        
        //inserts only new hackathon and which are open to applly
        const newHackathons = [];
        for (const detail of AllDetails) {
            const { name, link,date } = detail;
            const hackathonExists = await checkIfHackathonExists(name, link);
            if (!hackathonExists && date) {
                console.log(date)
                newHackathons.push(detail);
            }
    }

    const hackathons = await scrapped_hackathons.create(newHackathons);

    res.status(200).json({ hackathons: hackathons });
    
    }});
   

}

exports.get_scrapped_hackathons = async( req,res,next)=>{
    try {
        const hackathons = await scrapped_hackathons.find();
        res.status(200).json({ hackathons: hackathons });
      } catch (error) {
        console.error('Error occurred while retrieving hackathons:', error);
        throw error;
      }
}

exports.updateBookMarks = async( req,res,next)=>{

}