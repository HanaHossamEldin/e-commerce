
import React, { useContext } from 'react'
import style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { cartContext } from '../../Context2/CartContext';
import toast, {Toaster} from 'react-hot-toast'

export default function ProductDetails() {

  const{addToCart} = useContext(cartContext)
  
  async function addProduct(productId)
  {
    let response = await addToCart(productId)
    console.log(response)
    if(response.data.status =='success'){
        toast.success('Product added succesfully')
    }else{
      toast.error('Product added succesfully')
    }
  
  }

  let params = useParams();
  function getProductDetails(id)
  {
     return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let {isLoading, isError, data} =useQuery('ProductDetails', ()=>getProductDetails(params.id));
  console.log(data?.data.data)

  return  <>
  {data?.data.data?<div className="row py-2 align-items-center">
  <div className="col-md-4">
     <img className="w-100" src= {data?.data.data.imageCover} alt={data?.data.data.title}/>
  </div>
  <div className="col-md-8">
    <h2>{data?.data.data.title}</h2>
    <p>{data?.data.data.description}</p>
    <div className='d-flex justify-content-between'>
      <h6>{data?.data.data.price} EGP</h6>
          <p><i style={{color:'yellowgreen'}}className='fa-solid fa-star'></i>{data?.data.data.ratingsAverage}</p>
    </div>
    <button onClick={()=>addProduct(data?.data.data.id)} className='btn bg-main text-white ps-5 pe-5 d-block m-auto w-100'> + Add </button>
  </div>
  </div>:''}
  </>
}
