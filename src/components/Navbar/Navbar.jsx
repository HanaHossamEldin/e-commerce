
import React, { useContext } from 'react'
import style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/Images/freshcart-logo.svg';
import { UserContext } from '../../Context2/UserContext';


export default function Navbar() {

  let {userToken , setUserToken} = useContext(UserContext)
  let navigate = useNavigate()

  function logout(){
  localStorage.removeItem('userToken')
  setUserToken(null)
  navigate('/Login')
  }

  return  <>
 
 <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand ms-5" to="/"><img src= {logo} width= "200" alt="fresh market logo"/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">

        {userToken !== null? <>
               <li className="nav-item">
          <Link className="nav-link " to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/Cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/WishList">Wish List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/Products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/Categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/Brands">Brands</Link>
        </li>
        </>:''}
 
      </ul>
      <ul className="navbar-nav me-5 mb-2 mb-lg-0">

        {userToken !== null? 
        <>
        <li className="nav-item">
        <span onClick={()=> logout()} className="nav-link cursor-pointer ">Logout</span>
        </li>
        </>:<>
        <li className="nav-item">
          <Link className="nav-link " to="/Register">Register</Link>
        </li>
        </>

        }
        <li className="nav-item">
          <Link className="nav-link " to="/Cart"> <i className="fa-solid fa-cart-shopping fa-xl"></i></Link>
        </li>
        </ul>
    </div>
  </div>
</nav>
  </>
}


