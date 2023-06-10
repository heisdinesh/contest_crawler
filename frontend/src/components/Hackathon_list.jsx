import React, { useState, useEffect} from 'react'
import Hackathon_card from './Hackathon_card'
import Axios from "axios"

const Hackthon_list = () => {
 
  const [hackathons, setHackathons]=useState([])
  useEffect(()=>{
    Axios.get("http://localhost:5000/api/v1/allHackathons")
    .then((res)=>{
      // console.log(res.data.hackathons)
      setHackathons(res.data.hackathons)
    })
    .catch((error)=>{
      console.log(error)
    })

  },[])
  useEffect(() => {
    // Retrieve bookmarks from local storage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
 
const updatedHackathons = hackathons.map(hackathon => {
      const bookmark = bookmarks.find(item => item.name === hackathon.name);
      if (bookmark) {
        return { ...hackathon, isBookMarked: true, bookMarkCount: bookmark.bookMarkCount };
      }
      return hackathon;
    });
// console.log(updatedHackathons)
    setHackathons(updatedHackathons);
   
  }, []); 
 
  const toggleBookmark = (hackathonName,link,date,source,bookMarkCount) => {
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  
    const isAlreadyBookmarked = bookmarks.some(item => item.name === hackathonName);
  
    if (isAlreadyBookmarked) {
      // Remove the hackathon from bookmarks
      const updatedBookmarks = bookmarks.filter(item => item.name !== hackathonName);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      const updatedHackathons = hackathons.map(hackathon => {
        if (hackathon.name === hackathonName) {
          return { ...hackathon, isBookMarked: !hackathon.isBookMarked,bookMarkCount:hackathon.bookMarkCount-1  };
        }
        return hackathon;
      });
      setHackathons(updatedHackathons);
    } else {
      // Add the hackathon to bookmarks
      const newBookmark = { name: hackathonName, link, date, source,bookMarkCount:bookMarkCount+1, isBookmarked: true };
      bookmarks.push(newBookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      const updatedHackathons = hackathons.map(hackathon => {
        if (hackathon.name === hackathonName) {
          return { ...hackathon, isBookMarked: !hackathon.isBookMarked,bookMarkCount:hackathon.bookMarkCount+1  };
        }
        return hackathon;
      });
      setHackathons(updatedHackathons);
    }
    
  };
  
  return (
    <div >
     <div className="flex flex-wrap gap-12">
      {
        hackathons.map((hackathon)=>(
          <Hackathon_card
          name={hackathon.name}
          link={hackathon.link}
          bookMarkCount={hackathon.bookMarkCount}
          isBookmarked={hackathon.isBookMarked}
          date={hackathon.date}
          source={hackathon.source}
          toggleBookmark={toggleBookmark} />
        ))
      }
     </div>
    </div>
  )
}

export default Hackthon_list