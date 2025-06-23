import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageNotFound from './pages/PageNotFound'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify';

const App = () => {

  const { showLogin } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-20 flex flex-col min-h-[100vh] bg-gradient-to-b from-[#141419] to-[#1F2235]'>

      <ToastContainer position='bottom-right'/>
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy-credit' element={<BuyCredit />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />

    </div>

  )
}

export default App