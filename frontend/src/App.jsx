import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar'
import Login from './pages/login'
import Home from './pages/home'
import "./App.css"
import Products from './pages/products'
import News from './pages/news'
import Jobs from './pages/jobs'
import About from './pages/about'
//import ProtectedRoute from './ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Navbar/>}>
          <Route index element={<Home/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/jobs" element={<Jobs/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/about" element={<About/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App