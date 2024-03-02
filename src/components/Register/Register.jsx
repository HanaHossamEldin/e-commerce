
import React from 'react'
import style from './Register.module.css';
import {useFormik, formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {

  let navigate = useNavigate()
  const [errorMessage,setErrorMessage] = useState('')

  async function submitRegister(values){
    console.log('submit');
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch(err=>setErrorMessage(err.data.response.message));
   console.log(data)

   if (data.message =="success" ){
    navigate('/Login')
   }
  }
  

  let phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
 

  let validationSchema = Yup.object({
    name:Yup.string().min(3, 'minlength is 3').max(10,'maxlength is 10').required('This field is required'),
    email:Yup.string().email('This email is invalid').required('This field is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'This password should start with uppercase, contains lowercase with minlength 5 and maxlength 10').required('This field is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'Password and repassword dont match').required('This field is required'),
    phone:Yup.string().matches(phoneRegex,'This phone is invalid').required('This field is required'),

  })


  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    }, 
    validationSchema,
    onSubmit:submitRegister

  })

  return  <>
<div className='w-75 mx-auto py-5'>
    <h3>Register Now</h3>
    {errorMessage? <div className='alert alert-danger'>{errorMessage}</div>:''}
  
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor='name'>Name:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value= {formik.values.name} id='name' type='text' className='form-control mb-2' name='name'></input>
    {formik.errors.name && formik.touched.name?<div className="alert mt-2 p-2 alert-danger">{formik.errors.name}</div>:''}

    <label htmlFor='email'>Email:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value= {formik.values.email} id='email' type='email' className='form-control mb-2' name='email'></input>
    {formik.errors.email && formik.touched.email?<div className="alert mt-2 p-2 alert-danger">{formik.errors.email}</div>:''}


    <label htmlFor='password'>Password:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value= {formik.values.password} id='password' type= 'password' className=' mb-2 form-control' name='password'></input>
    {formik.errors.password && formik.touched.password?<div className="alert mt-2 p-2 alert-danger">{formik.errors.password}</div>:''}


    <label htmlFor='rePassword'>Re-password:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value= {formik.values.rePassword} id='rePassword' type= 'password' className='mb-2 form-control' name='rePassword'></input>
    {formik.errors.rePassword && formik.touched.rePassword?<div className="alert mt-2 p-2 alert-danger">{formik.errors.rePassword}</div>:''}

    <label htmlFor='phone'>Phone:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value= {formik.values.phone} id='phone' type= 'tel' className='mb-2 form-control' name='phone'></input>
    {formik.errors.phone && formik.touched.phone?<div className="alert mt-2 p-2 alert-danger">{formik.errors.phone}</div>:''}

    <button disabled= {!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>
  </form>
  </div>
 
  </>

}




