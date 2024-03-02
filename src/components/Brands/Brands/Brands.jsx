
import React from 'react'
import style from './Brands.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Brands() {
  function getAllBrands(){
    
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    
  }
    let {isLoading, isError, data, isFeching} = useQuery('allBrands', getAllBrands)
    console.log(data)
    return  <>
  <div className='container py-5'>
    <h2>All Brands</h2>
    <div className="row ">
      {data?.data.data.map((brand)=><div key={brand._id} className="col-md-3 overflow-hidden">
        <div className="product py-3 py-3">
          <img src = {brand.image} className='w-100' alt={brand.title}/>
          <div>
          <h2 className="h5">{brand.name}</h2>
          <div className='d-flex justify-content-between'>
          </div>
          </div>
        </div>
      </div>)}
    </div>
  </div>
  </>
}

