import React from 'react'
import Header from '../Layouts/Header/Header'
import Footer from '../Layouts/Footer/Footer'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <>
      <div className="scrollbar-hide ">
        {/* <div class="flex whitespace-nowrap overflow-auto scrollbar-hide"> */}
        <div>
          <Header />
        </div>
        <div className=''>
          <Outlet />
        </div>
        <div >
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Dashboard