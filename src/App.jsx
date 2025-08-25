import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './Components/Layout'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Posts from './Pages/Posts'
import NotFound from './Pages/NotFound'
import { createBrowserRouter, RouterProvider ,  } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext'
import CounterContextProvider from './context/CounterContext'
import ProtectedAuthRoutes from './ProtectRoutes/ProtectedAuthRoutes'
import ProtectedRoutes from './ProtectRoutes/ProtectedRoutes';
import PostDetails from './Pages/PostDetails'
import { Profile } from './Pages/Profile'


function App() {
const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <Posts /> },
      { path: "posts", element: <Posts /> }
    ]
  },
  {
    element: <Layout />,
    children: [

      
        {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        )
      },
        {
        path: "/posts/postdetails/:id",
        element: (
          <ProtectedRoutes>
            <PostDetails />
          </ProtectedRoutes>
        )
      },
      {
        path: "/login",
        element: (
          <ProtectedAuthRoutes>
            <Login />
          </ProtectedAuthRoutes>
        )
      },
      {
        path: "/register",
        element: (
          <ProtectedAuthRoutes>
            <Register />
          </ProtectedAuthRoutes>
        )
      }
    ]
  },
  { path: "*", element: <NotFound /> }
]);


  return (
    <AuthContextProvider>
      <CounterContextProvider>
        <RouterProvider router={route} />
      </CounterContextProvider>
    </AuthContextProvider>
  );
}

export default App;
