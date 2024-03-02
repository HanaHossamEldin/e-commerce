
import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css';
import { cartContext } from '../../Context2/CartContext';
import Product from '../Products/Products';



export default function Cart() {
  const[cartDetails ,setCartDetails] = useState(null)
  let{ getCart} = useContext(cartContext)

  async function getCartDetails(){
   let data =  await getCart()
   setCartDetails(data)
  }

  useEffect(()=>{
    getCartDetails()
  },[]);

  return <>
  <div className="container py-5">
   <div className='mx-auto bg-main-light w-85 p-5'>
  <h2> Shop Cart</h2>
  <div className='d-flex justify-content-between align-items-center'>
  <h5> Total Cart Price:</h5>
  <h5>Total no of items:</h5>
  </div>
  </div>
  </div>
  </>
}
