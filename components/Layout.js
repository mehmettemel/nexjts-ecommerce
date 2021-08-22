import React from 'react'
import Navbar from './Navbar'
import Notify from './Notify'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Notify />
      <div className='max-w-screen-2xl mx-auto'>{children}</div>
    </div>
  )
}

export default Layout
