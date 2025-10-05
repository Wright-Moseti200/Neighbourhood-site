import React from 'react'
import {Link,Outlet} from "react-router-dom"
import Footer from './Footer'
const Navbar = () => {
  return (
    <div>
        <nav className='flex w-full justify-around h-20 items-center shadow-md'>
       <h1 className='text-green-800 text-2xl font-bold'><Link to="/">Neighbourhood KE</Link></h1>
       <div className='flex w-1/2 justify-around items-center'>
        <p><Link to="/about">About</Link></p>
        <p><Link to="/news">News</Link></p>
        <p><Link to="/products">Products</Link></p>
        <p><Link to="/jobs">Jobs</Link></p>
        <button className='border border-black p-2 pl-5 pr-5 rounded-full'>Logout</button>
       </div>
       </nav>
       <Outlet/>
       <Footer/>
    </div>
  )
}

export default Navbar