const scrapped_hackathons = require("../models/scrapped_hackathons");
const cheerio = require("cheerio");
const request = require("request");
const puppeteer = require('puppeteer');

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

  exports.insert_scrapped_hackathons_hackerearth = async( req,res,next)=>{
   
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const hackerearthHackathons=[]
  
    // Go to the initial page with the list of hackathons
    const url = 'https://www.hackerearth.com/challenges/hackathon/';
    await page.goto(url);
  
    // Extract the necessary details
    const hackathons = await page.evaluate(() => {
      const $ = window.$;
      const hackathonsData = [];
  
      // Find each hackathon element on the page
      const hackathonElements = $('.challenge-card-wrapper.challenge-card-link');
  
      // Loop through each hackathon element and extract details
      hackathonElements.each((index, element) => {
        const hackathonName = $(element).find('.challenge-list-title.challenge-card-wrapper').text();
        const hackathonLink = $(element).attr('href');
        const bgUrlStyle = $(element).find('.event-image').attr('style');
        const bgUrlMatch = bgUrlStyle.match(/url\('(.+)'\)/);
        const bgUrl = bgUrlMatch ? bgUrlMatch[1] : null;
  
        // Store the details in an object and push it to the array
        const hackathonDetails = {
          name: hackathonName,
          link: hackathonLink,
          image:bgUrl,
          source:"Hackerearth"
          
        };
        hackathonsData.push(hackathonDetails);
      });
  
      return hackathonsData;
    });
  
   
    // Loop through each hackathon and navigate to its details page
    for (const hackathon of hackathons) {
      // Go to the hackathon's details page
      const hackathonUrl = `${hackathon.link}`;
      await page.goto(hackathonUrl);
  
      // Extract necessary details from the hackathon's details page
      const hackathonDetails = await page.evaluate(() => {
        const $ = window.$;
        // Extract the necessary details from the page using Cheerio or other techniques
        // Example:
        const date = $('.end-time-block').text().trim();
        
        
        const regex = /(\w{3} \d{1,2}, \d{4}, \d{2}:\d{2} [AP]M \w+)/g;
        const matches = date.match(regex);
  
        if (matches && matches.length > 0) {
          const dateString = matches[0];
          const regex = /(\w{3}) (\d{1,2}), (\d{4})/;
  const matchTested = dateString.match(regex);
  
  if (matchTested && matchTested.length === 4) {
    const monthAbbreviation = matchTested[1];
    const day = parseInt(matchTested[2]);
    const year = parseInt(matchTested[3].substring(2));
  
    const monthIndices = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const monthIndex = monthIndices[monthAbbreviation];
  
    const formattedDate = `${day}/${monthIndex + 1}/${year}`;
    return {
      formattedDate,
      
      
    };}    
    }
  });
  
      // Fetch only future hackathons
      const dateString =hackathonDetails.formattedDate
      const [day, month, year] = dateString.split('/').map(Number);
  const providedDate = new Date(year + 2000, month - 1, day);
  const currentDate = new Date();
  
  // Comparing the provided date with the current date
  if (providedDate > currentDate) {
    hackerearthHackathons.push({name:hackathon.name,date:hackathonDetails.formattedDate,link:hackathon.link, image:hackathon.image, source:"Hackerearth"})
  } 
     
      // console.log('Hackathon:', hackathon.name);
      // console.log('date:', hackathonDetails.formattedDate);
      // console.log('link:', hackathon.link);
      // console.log('image:', hackathon.image);
      // console.log("******************************************* \n")
  
      // Go back to the list of hackathons
      await page.goBack();
    }
//   console.log(hackerearthHackathons)
    // Close the browser
    await browser.close();
    
    const newHackathons = [];
for (const hackathon of hackerearthHackathons) {
    const { name, link } = hackathon;
    const hackathonExists = await checkIfHackathonExists(name, link);
    if (!hackathonExists ) {
        console.log(hackathon)
        newHackathons.push(hackathon);
    }
  }
  const db_hackathons = await scrapped_hackathons.create(newHackathons);

  res.status(200).json({ hackathons: db_hackathons });
    
//    res.status(200).json(db)
    
   

}