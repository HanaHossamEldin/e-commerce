
import React, { useContext } from 'react'
import style from './Home.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { cartContext } from '../../Context2/CartContext';
import { Link } from 'react-router-dom';
import MainSlider from '../MainSlider/MainSlider'
import toast, {Toaster} from 'react-hot-toast'




export default function Home() {

  let {addToCart} = useContext(cartContext)

  async function addProduct(productId)
  {
    let response = await addToCart(productId)
    console.log(response)
    if(response.data.status =='success'){
        toast('Product added succesfully')
    }else{

    }
    
    
  }
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
  function getAllProducts(){
    
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
    let {isLoading, isError, data, isFeching} = useQuery('AllProducts', getAllProducts)
  

    return  <>
    <MainSlider />

  <div className='container'>
  <input className="form-control mt-5 m-auto" type="text" placeholder="Search" aria-label="default input example"></input>
    <div className="row ">
      {data?.data.data.map((product)=><div key={product.id} className="col-md-3 overflow-hidden">

        <Link to= {`/ProductDetails/${product.id}`}>
        <div className="product py-3 py-3">
          <img src = {product.imageCover} className='w-100' alt={product.title}/>
          <div>
          <h3 className="h6">{product.category.name}</h3>
          <h2 className="h5">{product.title}</h2>
          <div className='d-flex justify-content-between'>
          <p>{product.price}</p>
          <p><i style={{color:'yellowgreen'}}className='fa-solid fa-star'></i>{product.ratingsAverage}</p>
          </div>
          </div>
        </div>
        </Link>
        <button onClick={()=>addProduct(product.id)} className='btn bg-main text-white ps-5 pe-5 d-flex d-block m-auto product'> + Add </button>
      </div>)}
    </div>
  </div>
  </>
}
