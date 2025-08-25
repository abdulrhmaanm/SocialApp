import { Navigate } from "react-router-dom";

import React from 'react'

export default function ProtectedRoutes({children}) {

    if(localStorage.getItem("token")){
        return <Navigate to="/" />
    }
  return children
}
