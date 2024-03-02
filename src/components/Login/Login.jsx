
import React, { useContext } from 'react'
import style from './Login.module.css';
import {useFormik, formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { UserContext } from '../../Context2/UserContext';


export default function Login() {

  let {setUserToken} = useContext(UserContext);
  let navigate = useNavigate();
  const [errorMessage,setErrorMessage] = useState('');

  async function submitLogin(values){
    console.log('submit');
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch(err=>setErrorMessage(err.data.response.message));
   console.log(data)

   if (data.message =="success" ){
    localStorage.setItem('userToken' , data.token);
    setUserToken(data.token)
    navigate('/')
   }
  }
  

  let phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
 

  let validationSchema = Yup.object({
  
    email:Yup.string().email('This email is invalid').required('This field is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'This password should start with uppercase, contains lowercase with minlength 5 and maxlength 10').required('This field is required'),
  

  })


  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
     
    }, 
    validationSchema,
    onSubmit:submitLogin

  })

  return  <>
<div className='w-75 mx-auto py-5'>
    <h3>Login Now</h3>
    {errorMessage? <div className='alert alert-danger'>{errorMessage}</div>:''}
  
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor='email'>Email:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value= {formik.values.email} id='email' type='email' className='form-control mb-2' name='email'></input>
    {formik.errors.email && formik.touched.email?<div className="alert mt-2 p-2 alert-danger">{formik.errors.email}</div>:''}


    <label htmlFor='password'>Password:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value= {formik.values.password} id='password' type= 'password' className=' mb-2 form-control' name='password'></input>
    {formik.errors.password && formik.touched.password?<div className="alert mt-2 p-2 alert-danger">{formik.errors.password}</div>:''}
    
    <div className='d-flex align-items-center'>
    <button disabled= {!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2 mx-2'>Login</button><Link to ={'/Register'}>Register Now</Link>
    </div>
  </form>
  </div>
  </>

}






