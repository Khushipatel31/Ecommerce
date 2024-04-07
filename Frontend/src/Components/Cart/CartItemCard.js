import React from 'react'
import { Link } from "react-router-dom";

const CartItemCard = ({item,deleteCartItem}) => {
  return (
    <>
      <div className='CartItemCard col-span-2 flex p-[1vmax] h-[8vmax] '>
        <img width={120}  src={item.image} alt='Product Image'></img>
        <div className='flex flex-col'>
          <Link to={`product/${item.product}`}>{item.name}</Link>
          <span>{`Price: $${item.price}`}</span>
          <p onClick={()=>deleteCartItem(item.product)} className='text-red-500 cursor-pointer'>Remove</p>
        </div>
      </div>
    </>
  )
}

export default CartItemCard