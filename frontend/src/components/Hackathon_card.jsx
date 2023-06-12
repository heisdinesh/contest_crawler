import React, { useState } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Hackathon_card = ({_id,name, date, link,source,isBookmarked, bookMarkCount,toggleBookmark}) => {
  

  const handleBookmarkToggle = () => {
    toggleBookmark(_id,name,link,date,source,bookMarkCount);
  };
  // console.log(name,isBookmarked)

  return (
    <div>
      <div className="group border-2 hover:border-primary p-4 w-80 rounded-lg flex flex-col gap-6 shadow-md bg-white">
        <div className="flex justify-between  items-center ">
        <div>
          <p className="text-3xl  group-hover:text-primary font-semibold">{name}</p>
          <p className="text-md text-stone-400">{source}</p>
        </div>
        <div className="w-10 h-10 hover:border-primary rounded-3xl p-3 cursor-pointer text-primary font-semibold  bg-slate-100" >
          <button onClick={handleBookmarkToggle} >{isBookmarked ? <BsBookmarkFill /> :<BsBookmark  />}</button>
        </div>
        </div>
        <div>
          <p className="text-xl">{date}</p>
        </div>
        <div className='flex justify-between items-center'>
        <p className="text-md text-cta font-semibold">{bookMarkCount} bookmarks</p>
        <Link target="_blank" to={link} className="py-2 px-4 rounded-md bg-primary font-bold text-white">Apply now</Link>
        
        </div>

      </div>
    </div>
  )
}

export default Hackathon_card