import React from 'react'
import Hackthon_list from '../components/Hackathon_list'

const Hackathons = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-12 px-6 py-4">
        <div>
            <p className="text-6xl font-bold ">Hackathons</p>
        </div>
        <div>
            <Hackthon_list />
        </div>
    </div>
  )
}

export default Hackathons