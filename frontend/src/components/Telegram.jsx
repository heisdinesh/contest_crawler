import React from 'react'
import {FaTelegramPlane} from "react-icons/fa"
import { Link } from 'react-router-dom'

const Telegram = () => {
  return (
  <Link to="https://t.me/+4jzuPEoHntg3ZTdl" target="_blank">  <div className="w-16 h-16 border-2 border-amber-600 flex items-center justify-center pr-2 cursor-pointer rounded-full text-4xl bg-amber-500  fixed bottom-16 right-16">
  <FaTelegramPlane />
</div></Link>
  )
}

export default Telegram