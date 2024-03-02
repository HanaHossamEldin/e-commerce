import axios from "axios";
import { useContext, useState } from "react";
import { createContext } from "react";



export let cartContext = createContext();

export function CartContextProvider (props){

  const [ noOfCartItems, setnoOfCartItems] = useState(0);
  const [ totalCartPrice, setTotalCartPrice] = useState(0);
  const [ allProducts, setAllProducts] = useState(null);

  

  let headers = {
    token:localStorage.getItem('userToken')
  }

  function addToCart(x){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      productId:x
    },
    {
      headers:headers

    }).then ((response) =>response)
    .catch ((error)=>error);
  }

  function getCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers:headers

    }).then ((response) =>response)
    .catch ((error)=>error);
  }

 

  return <cartContext.Provider value={{
    addToCart,
    getCart,

  }}>
       {props.children}
</cartContext.Provider>

}