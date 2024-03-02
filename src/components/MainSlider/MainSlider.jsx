
import React from 'react'
import style from './MainSlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };
  function getMainSlider()
{
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}
    let{isLoading, isError, data } = useQuery('mainSlider', getMainSlider);
    console.log(data?.data.data);

  return  <>
  {data?.data.data?<Slider {...settings}>
    {data?.data.data.map((category)=> <img height={250} key={category._id} src = {category.image} className='w-100'/>)}
  </Slider>:''}
 </>
}