import React from 'react'
import Bookmarked_hackathons from '../components/Bookmarked_hackathons'

const BookMarked = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-12 px-6 py-4">
        <div>
           <p className="text-5xl font-bold " > My Bookmarks</p>
        </div>
        <div>
            <Bookmarked_hackathons />
        </div>
    </div>
  )
}

export default BookMarked