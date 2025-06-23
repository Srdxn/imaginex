import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const { user, menuOpen, setMenuOpen, setShowLogin, logout, credit } = useContext(AppContext);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = useNavigate();

    return (
        <div >
            <div className='flex items-center justify-between py-5'>
                <Link to='/'>
                    <img src={assets.logo} alt='logo' className='w-28 sm:w-32 lg:w-40' />
                </Link>

                <div>
                    {user ? (
                        <div className='flex text-center gap-2 sm:gap-3'>
                            <button className='flex items-center gap-2 bg-blue-100 text-black px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700' onClick={() => navigate('/buy-credit')}>
                                <img className='w-5' src={assets.credit_star} alt="credit_star" />
                                <p className='text-xs sm:text-sm font-medium text-gray-600 cursor-pointer'>Credit Left: {credit}</p>
                            </button>

                            <div className='flex items-center gap-2 '>
                                <p className='text-gray-200 max-sm:hidden pl-4'>Hi, {user}</p>
                                <div className='relative group'>
                                    <img className='w-8 drop-shadow cursor-pointer' src={assets.profile_icon} onClick={toggleMenu} alt="profile_icon" />
                                    {menuOpen && (
                                        <div className='absolute top-0 right-0 z-10 mt-12 cursor-pointer px-2 py-2 sm:px-10 rounded-full text-sm bg-[#404044] hover:bg-blue-100 hover:text-black transition-all duration-200'>
                                            <ul className='list-none'>
                                                <li onClick={logout}>Logout</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center gap-4 sm:gap-5'>
                            <button className='outline-nonecursor-pointer hover:text-blue-100 transition-all duration-200' onClick={() => navigate('/buy-credit')}>Pricing</button>
                            <button className='bg-[#404044] px-7 py-2 sm:px-10 rounded-full shadow-black/50 shadow-md text-sm cursor-pointer hover:bg-blue-100 hover:shadow-none hover:text-black hover:scale-[1.02] transition-all duration-200' onClick={() => setShowLogin(true)} >Login</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar