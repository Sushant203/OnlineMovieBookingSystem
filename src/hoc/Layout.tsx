import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/shared-component/Navbar'
import Footer from '../components/shared-component/Footer'


const Layout = () => {
  return (
    <div>
      <Navbar/>
    
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout