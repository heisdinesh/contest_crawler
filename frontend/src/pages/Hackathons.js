import React from 'react'
import Hackthon_list from '../components/Hackathon_list'
import { Link } from 'react-router-dom'

const Hackathons = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-12 px-6 py-4">
        <div>
            <p className="text-6xl font-bold ">Hackathons</p>
        </div>
        <div className="flex  ">
          {/* <div className="w-full bg-stone-100"></div> */}
          <Link className="w-max font-bold bg-stone-300 rounded-md py-4 px-4" to="/hackathons/bookmarked">My Hackathons &gt; </Link>
        </div>
        <div>
            <Hackthon_list />
        </div>
    </div>
  )
}

export default Hackathons