import React from 'react'
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  if(!localStorage.getItem("auth-token")){
    return <Navigate to="/login" />
  }
  return children  // Return children, not <Outlet/>
}

export default ProtectedRoute