import React from 'react'
import { Link } from 'react-router-dom'

const Hero_section = () => {
  return (
    <div className="mb-16">
        <div className="flex flex-col items-center justify-center gap-8 bg-stone-50">
            <p className="text-8xl font-bold">Propel</p>
            <p className="text-center text-xl md:text-3xl px-4 md:px-0">Join the Ultimate Hackathon Experience!<br />
            Discover, Learn, and Create with Hackathons Near You.
            </p>
            <Link to="/hackathons" className="bg-primary font-bold py-4 text-center px-6 text-white rounded-md">Find Hackathons</Link>
        </div>
    </div>
  )
}

export default Hero_section