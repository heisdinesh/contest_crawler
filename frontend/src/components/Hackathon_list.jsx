import React, { useState, useEffect} from 'react'
import Hackathon_card from './Hackathon_card'
import Axios from "axios"

const Hackthon_list = () => {
 
  const [hackathons, setHackathons]=useState([])
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await Axios.get("http://localhost:5000/api/v1/allHackathons");
        const apiHackathons = response.data.hackathons;
        console.log(apiHackathons)
        
        const localStorageHackathons = JSON.parse(localStorage.getItem('bookmarks')) || [];
        
        const mergedHackathons = apiHackathons.map(apiHackathon => {
          const localStorageHackathon = localStorageHackathons.find(h => h.name === apiHackathon.name);
          
          if (localStorageHackathon) {
            return {
              ...apiHackathon,
              // bookMarkCount: localStorageHackathon.bookMarkCount,
              isBookMarked: true
            };
          }
          
          return apiHackathon;
        });
        console.log("merged",mergedHackathons)
        setHackathons(mergedHackathons);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchHackathons();
  }, []);
  
  

 
  const toggleBookmark = (_id,hackathonName,link,date,source,bookMarkCount) => {
    
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
      Axios.post("http://localhost:5000/api/v1/decrementBookMarkCount",{_id:_id})
    .then((res)=>{console.log(res)
      setHackathons(updatedHackathons);})
    .catch((error)=>{console.log(error)})
      
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
      Axios.post("http://localhost:5000/api/v1/incrementBookMarkCount",{_id:_id})
    .then((res)=>{console.log(res)
      setHackathons(updatedHackathons);})
    .catch((error)=>{console.log(error)})
      
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
          toggleBookmark={toggleBookmark}
          _id={hackathon._id} />
        ))
      }
     </div>
    </div>
  )
}

export default Hackthon_list