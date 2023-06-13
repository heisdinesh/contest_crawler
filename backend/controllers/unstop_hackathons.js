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

  exports.insert_scrapped_hackathons_unstop = async( req,res,next)=>{
   
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://unstop.com/hackathons');

    // Wait for the hackathons to load
    await page.waitForSelector('.single_profile');

    // Extract hackathon information
    const unstopHackathons = await page.$$eval('.single_profile', elements => {
      return elements.map(element => {
        const nameElement = element.querySelector('h2');
        const imageElement = element.querySelector('img.custom-alt');
        const dateElement = element.querySelector('.seperate_box:nth-child(3)'|| '.seperate_box:nth-child(2)');
        const id = element.id.replace('opp_', ''); 
        const link = `https://unstop.com/competitions/${id}`;

        const name = nameElement?.textContent.trim() || '';
        const image = imageElement?.getAttribute('src') || '';
        const separateBoxes = element.querySelectorAll('.seperate_box');
        let dateleft = '';

        for (let i = 0; i < separateBoxes.length; i++) {
          const box = separateBoxes[i];
          const textContent = box.textContent.trim();

          // Check for specific condition based on the text content of the element
          if (textContent.includes('days left')) {
            dateleft = textContent.replace('days left', '').trim();
            break;
          }
        }
       

// Calculate the date of the event
const currentDate = new Date();

// Calculate the date of the event
const eventDate = new Date(currentDate.getTime() + (dateleft * 24 * 60 * 60 * 1000));

// Extract the components of the event date
const year = eventDate.getFullYear().toString().slice(-2);
const month = (eventDate.getMonth() + 1).toString().padStart(2, '0');
const day = eventDate.getDate().toString().padStart(2, '0');

// Format the event date as a string (e.g., "DD-MM-YY")
const date = `${day}/${month}/${year}`;

        return { name, link, image, date, source:"Unstop" };
      });
    });

    

    await browser.close();
    
    const newHackathons = [];
for (const hackathon of unstopHackathons) {
    const { name, link } = hackathon;
    const hackathonExists = await checkIfHackathonExists(name, link);
    if (!hackathonExists ) {
        // console.log(hackathon)
        newHackathons.push(hackathon);
    }
  }
  const db_hackathons = await scrapped_hackathons.create(newHackathons);

  res.status(200).json({ hackathons: db_hackathons });
    
//    res.status(200).json(db)
    
   

}