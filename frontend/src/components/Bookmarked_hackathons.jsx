import React, { useEffect, useState, useContext } from 'react'
import Hackathon_card from './Hackathon_card'
import Axios from "axios"
import hackathonContext from '../context/hackathonContext'


const Bookmarked_hackathons = () => {
  const {hackathons,modifyHackathon} = useContext(hackathonContext)
  const [bookMarked,setBookMarked] =useState([])
  const [isPresent, setIsPresent] =useState(false)
  useEffect(()=>{
    

    const filtred = hackathons.filter((item)=> item.isBookMarked)
    // console.log(filtred)
    setBookMarked(filtred)
    // console.log("first")
    // console.log(filtred.length)
    if(filtred.length !=0){
      setIsPresent(true)
    }else{
      setIsPresent(false)
    }
   
    
  },[hackathons])


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
      Axios.post("https://contest-crawler.vercel.app/api/v1/decrementBookMarkCount",{_id:_id})
    .then((res)=>{
      modifyHackathon(updatedHackathons);})
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
      Axios.post("https://contest-crawler.vercel.app/api/v1/incrementBookMarkCount",{_id:_id})
    .then((res)=>{
      // console.log(res)
      modifyHackathon(updatedHackathons);})
    .catch((error)=>{console.log(error)})
      
    }
    
  };
  return (
    <div className="h-screen" >
      {
        isPresent ? 
        <div className="h-screen flex flex-wrap md:gap-12">
        {
          bookMarked.map((hackathon)=>(
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
       </div> : 
       <div>
        <p>No BookMarks yet</p>
       </div>
      }
    
    </div>
  )
}

export default Bookmarked_hackathons