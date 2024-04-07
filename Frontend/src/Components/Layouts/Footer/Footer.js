import React from 'react'
import playStore from "../../../Assets/playstore.png"
import appStore from "../../../Assets/Appstore.png"

const Footer = () => {
  return (
    <footer className=' items-center flex bg-black space-x-5  text-white mt-10  p-4 '  >
        <div className='leftFooter flex flex-col justify-center  space-y-4  items-center   w-1/4 '>
            <h4 className='text-center' >DOWNLOAD OUR APP</h4>
            <p className='text-center'>Download App for Android and IOS mobile Phone</p>
            <img src={playStore} width={180} className='cursor-pointer' alt='playstore' ></img>
            <img src={appStore} width={180} className='cursor-pointer' alt='appStore' ></img>
        </div>
        <div className='midFooter flex flex-col space-y-2  items-center w-3/5 '>
            <h1 className='font-sans font-bold  text-4xl mb-4'>ECOMMERCE</h1>
            <p className='text-center  '>High Quality is our first priority</p>
            <p className='text-center'>Copyrights 2021 &copy; Website.</p>
        </div>
        <div className='rightFooter w-1/4 flex flex-col items-center justify-center  '>
            <h4 className='font-bold underline font-sans text-center text-xl underline-offset-8 m-4  '>Follow Us</h4>
            <a href='https://www.instagram.com/'>Instagram</a>
            <a href='https://www.youtube.com/'>Youtube</a>
            <a href='https://www.facebook.com/'>Facebook</a>
        </div>
    </footer>
  )
}

export default Footer