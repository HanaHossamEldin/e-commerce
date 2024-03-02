
import React from 'react'
import style from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';


export default function Categories() {
 function getCategories(){

 
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}
    let{isLoading, isError, data } = useQuery('category', getCategories);
    console.log(data?.data.data);

  return  <>
<div className="row py-5">
{data?.data.data.map((category)=> <div className="col-md-4 product">
  <img key={category._id}  height={250} src = {category.image} className='w-100'/>
          <h2>{category.name}</h2>
          </div>)}
          </div>
  </>
}
