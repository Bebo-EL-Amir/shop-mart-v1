import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Componet/Navbar'
import { createBrowserRouter, RouterProvider,} from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import FeedPage from './Pages/FeedPage'
import Profile from './Pages/Profile'
import PostDetails from './Pages/PostDetails'
import NotFoundPage from './Pages/NotFoundPage'
import Register from './Pages/Register'
import Login from './Pages/Login'
import ProtectedRoute from './Componet/ProtectedRoute'
import AuthProtectedRoute from './Componet/AuthProtectedRoute'


const router= createBrowserRouter([
  {path:'',element:<MainLayout /> ,children:[
    {index:true,element:<ProtectedRoute><FeedPage/></ProtectedRoute>},
    {path:'profile',element:<ProtectedRoute><Profile/></ProtectedRoute>} ,
    {path:'post-details/:id',element: <ProtectedRoute><PostDetails/></ProtectedRoute>},
    {path:'*',element: <ProtectedRoute><NotFoundPage/></ProtectedRoute>},
  ]
  },

  {path:'',element:<AuthLayout/>,children:[
    {path:'login',element:<AuthProtectedRoute><Login/></AuthProtectedRoute> },
    {path:'register',element: <AuthProtectedRoute><Register/></AuthProtectedRoute>},
    
  ]
},
])
 function App() {
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}


export default App
