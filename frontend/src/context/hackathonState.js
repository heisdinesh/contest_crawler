import React, { useState, useEffect, useContext } from "react";
import HackathonContext from "./hackathonContext";
import Axios from 'axios'

const HackathonState =(props)=>{

const [hackathons, setHackathons] = useState([])
const [searchTerm, setSearchTerm] = useState("")
const [searchResults, setSearchResults] = useState([]);

const modifyHackathon =(hack)=>{
    setHackathons(hack)
}



const handleSearch = (term)=>{
  setSearchTerm(term)
  console.log(term)
  if(searchTerm !=""){
    const newHackathonList = hackathons.filter((hackathon)=>{
      return Object.values(hackathon)
      .join(" ")
      .toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase())
    })
    setSearchResults(newHackathonList)
    // console.log(newHackathonList)
  }
  else{
    setSearchResults(hackathons)
  }
}


useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await Axios.get("https://contest-crawler.vercel.app/api/v1/allHackathons");
        const apiHackathons = response.data.hackathons;
        // console.log(apiHackathons)
        
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
        // console.log("merged",mergedHackathons)
        modifyHackathon(mergedHackathons);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchHackathons();
  }, []);

    return(
        <HackathonContext.Provider value={{hackathons,modifyHackathon, searchResults, handleSearch,searchTerm}}>
            {props.children }
        </HackathonContext.Provider>
    )

}


export default HackathonState