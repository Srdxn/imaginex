import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <>
    <hr className='py-3 mt-15 border-gray-400'/>
    <div className='flex items-center justify-between gap-5 mb-3'>
        <img src={assets.logo} alt="logo" className='w-[150px] max-sm:w-32 max-lg:w-35' />

        <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-400 max-sm:hidden'>© {new Date().getFullYear()} Imaginex - All rights reserved</p>

        <div className='flex gap-2.5'>
            <img className='shadow-md shadow-black/60 rounded-full cursor-pointer hover:scale-[1.05] tramsition-all duration-300 hover:shadow-none' src={assets.facebook_icon} alt="facebook_icon" width={35} />
            <img className='shadow-md shadow-black/60 rounded-full cursor-pointer hover:scale-[1.05] tramsition-all duration-300' src={assets.twitter_icon} alt="twitter_icon" width={35} />
            <img className='shadow-md shadow-black/60 rounded-full cursor-pointer hover:scale-[1.05] tramsition-all duration-300' src={assets.instagram_icon} alt="instagram_icon" width={35} />
        </div>
    </div>
    </>
  )
}

export default Footer