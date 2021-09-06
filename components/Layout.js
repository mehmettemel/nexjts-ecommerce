import React from 'react'
import { Footer } from './Footer'
import Navbar from './Navbar'
import Notify from './Notify'

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <Notify />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
