import React, { useState, useEffect } from "react";
import HackathonContext from "./hackathonContext";
import Axios from 'axios'

const HackathonState =(props)=>{

const [hackathons, setHackathons] = useState([])

const modifyHackathon =(hack)=>{
    setHackathons(hack)
}
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
        modifyHackathon(mergedHackathons);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchHackathons();
  }, []);

    return(
        <HackathonContext.Provider value={{hackathons,modifyHackathon}}>
            {props.children }
        </HackathonContext.Provider>
    )

}


export default HackathonState