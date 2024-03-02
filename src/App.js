import logo from './logo.svg';
import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Categories from './components/Categories/Categories'
import WishList from './components/WishList/WishList'
import NotFound from './components/NotFound/NotFound'
import Brands from './components/Brands/Brands/Brands'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { UserContext, UserContextProvider } from './Context2/UserContext';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './components/Protected Route/ProtectedRoute/ProtectedRoute';
import { CartContextProvider } from './Context2/CartContext';


let routers = createBrowserRouter 
( [

{path:'/' , element: <Layout/> ,  children:[
  {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path:'Products' , element: <ProtectedRoute><Products/></ProtectedRoute>},
  {path:'Cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {path:'Login' , element:<Login/>},
  {path:'Register' , element:<Register/>},
  {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
  {path:'wishlist' , element:<ProtectedRoute><WishList/></ProtectedRoute>},
  {path:'Brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
  {path:'ProductDetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path:'*' , element:<NotFound/>},
]}
])


function App() {

  return <>
   <CartContextProvider>
  <UserContextProvider> 
  <RouterProvider router={routers}></RouterProvider>
  </UserContextProvider>
  </CartContextProvider>
  </>

}

export default App;
