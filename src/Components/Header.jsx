import React, { useEffect, useState } from 'react'
import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { searchProducts } from '../Redux/slice/productSlice'
import { useDispatch, useSelector } from 'react-redux'

function Header({insideHome}) {
  const dispatch=useDispatch()
  const [wishlistCount,setWishlistCount]=useState(0)
  const [cartCount,serCartCount]=useState(0)
  const wishlist = useSelector((state)=>state.wishlistReducer.wishlist)
  const cart = useSelector((state)=>state.cartReducer)


useEffect(()=>{
  setWishlistCount(wishlist?.length)
  serCartCount(cart.length)
},[wishlist,cart])

  return (
    <div>
        <Navbar expand="lg" className="bg-primary position-fixed top-0 w-100" style={{zIndex:1}}>
        <Container>
        <Navbar.Brand> <Link to={'/'} style={{color:"white",fontWeight:"bold",textDecoration:"none"}} > <i class="fa-solid fa-truck-fast fa-bounce text-dark"></i> E-Cart </Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {insideHome&&
            <Nav.Link className=''>
              <input onChange={e=>dispatch(searchProducts(e.target.value.toLowerCase()))} type="text" className='form-control' placeholder='search products' style={{width:"500px"}}/>
            </Nav.Link>}

            <Nav.Link className='btn btn-outline-light'> 
            <Link to={'/wishlist'} style={{color:"black",fontWeight:"bold",textDecoration:"none"}}>
            <i class="fa-solid fa-heart text-danger"></i>WishList<Badge bg="success rounded ms-2">{wishlistCount}</Badge>
            </Link></Nav.Link>

            <Nav.Link className='btn btn-outline-light ms-2'> 
            <Link to={'/cart'} style={{color:"black",fontWeight:"bold",textDecoration:"none"}}>
            <i class="fa-solid fa-cart-shopping text-warning"></i>Cart<Badge bg="success rounded ms-2">{cartCount}</Badge>
            </Link></Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header