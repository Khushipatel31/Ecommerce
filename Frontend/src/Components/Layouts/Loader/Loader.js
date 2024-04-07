import React from 'react';
import './loader.css';
const Loader = () => {
  return (
    <div className='grid place-items-center  max-w-[100%] w-full bg-white'>
      <div className=' border-b-4 border-black rounded-br-full rounded-bl-full' style={{ animation: 'spin 800ms linear infinite' }}></div>
    </div>
  );
}

export default Loader;
