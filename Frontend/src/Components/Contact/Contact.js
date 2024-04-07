import React from 'react'
import { useSelector } from 'react-redux';

const Contact = () => {
  const kk = useSelector((state) => state.productSlice.products);
  console.log(kk);
  return (
    <div>Contact</div>
  )
}

export default Contact