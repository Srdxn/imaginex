import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div flex items-center justify-center>
        <h1 className='text-5xl font-bold text-center pt-10'>404</h1>
        <h2 className='text-3xl font-semibold text-center pt-5'>Oops!  Page Not Found</h2>
        <p className=' font-light text-center mt-2'>The page you are looking for might have been removed and had its name changed or is temporarily unavailable.</p>
        <Link to='/'>
            <button className='bg-[#404044] px-7 py-2 sm:px-10 rounded-full shadow-md shadow-black hover:shadow-none text-sm cursor-pointer hover:bg-blue-100 hover:text-black transition-all duration-200 mt-5 mx-auto block'>Back to Home</button>
        </Link>
            
    </div>
  )
}

export default PageNotFound