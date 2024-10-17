import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { json, useParams } from 'react-router-dom'
import { addToWishList } from '../Redux/slice/wishListSlice'
import { addToCart } from '../Redux/slice/cartSlice'

function View() {
  const {id}=useParams()
  // console.log(id);
  const {loading} = useSelector((state)=>state.productReducer)
  const [product,setProduct]=useState({})
  const {wishlist} = useSelector((state)=>state.wishlistReducer)
  const cart = useSelector((state)=>state.cartReducer)
  const dispatch=useDispatch()

  useEffect(()=>{
    const products =JSON.parse(localStorage.getItem("products"))
    setProduct(products?.find(product=>product?.id==id))
  },[])

  // console.log(product);
  
  const handleWishlist =(product)=>{
    const existingProduct = wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      alert("product already exist in wishlist")
    }else{
      dispatch(addToWishList(product))
    }
  }

  const handleCart =(product)=>{
    const existingProduct = cart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      alert("items added")
    }else{
      dispatch(addToCart(product))
      alert("item added")
    }
  }
  
  return (
    <div className='mt-5'>
{
  loading?<div>
     <Spinner animation="border" variant="success" /> Loading ...
     </div>:
 <div className='container row' style={{marginTop:"100px"}}> 
 <div className="col-lg-4">
   <img style={{width:"100%",height:"400px"}} src={product?.thumbnail} alt="" />
 </div>
 <div className="col-lg-2"></div>
 <div className="col-lg-6">
   <p>Pid:{product.id}</p>
   <h5 className='fw-bolder'>Price: <span style={{color:"red"}}>{product.price}</span></h5>
   <p>{product.description}</p>
   <div className='d-flex justify-content-between mt-4'>
     <Button className='btn btn-outline-dark' onClick={()=>handleWishlist(product)}> <i className='fa-solid fa-heart text-danger me-2'></i>WishList</Button>
     <Button className='btn btn-outline-light' onClick={()=>handleCart(product)}> <i className='fa-solid fa-cart-shopping text-dark me-2'></i>Cart</Button>
   </div>
 </div>
</div>
}

    </div>
   
  )
}

export default View