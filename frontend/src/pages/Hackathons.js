import React, { useState, useContext, useEffect } from 'react'
import Hackthon_list from '../components/Hackathon_list'
import { Link } from 'react-router-dom'
import hackathonContext from '../context/hackathonContext'
import { BsSearchHeart } from 'react-icons/bs'

const Hackathons = () => {
  const {handleSearch} = useContext(hackathonContext)
  const [searchTerm,setSearchTerm]=useState('')

  const handleChange=(event)=>{
    const value=event.target.value
    setSearchTerm(value);
   
  }
  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);
  return (
    <div className="flex items-center justify-center flex-col gap-12 px-6 py-4">
        <div>
            <p className="text-6xl font-bold ">Hackathons</p>
        </div>
        <div className="flex justify-center items-center gap-4 w-full">
          <div className="hidden md:block px-4  py-4 shadow-md w-2/5 bg-stone-100 bg-white flex justify-center items-center rounded-lg">
            <input className='text-lg  hover:border-primary border-stone-300 border-2 w-full px-4 h-12 rounded-lg'
            type="text" value={searchTerm} placeholder="Search Hackathon" onChange={handleChange} />
          </div>
          <Link className="md:text-lg hover:border-primary hover:border-2 font-semibold bg-sky-100 shadow-md text-primary rounded-lg md:py-6 md:px-6 px-4 py-4" to="/hackathons/bookmarked">My Hackathons &gt; </Link>
        </div>
        <div>
            <Hackthon_list />
        </div>
    </div>
  )
}

export default Hackathons