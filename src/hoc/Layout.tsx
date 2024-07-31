import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
    <a href='/about'>About</a>
    <Outlet/>
    </div>
  )
}

export default Layout