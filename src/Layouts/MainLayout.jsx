import React from 'react'
import Navbar from '../Componet/navbar'
import Footer from '../Componet/Footer'
import { Outlet } from 'react-router-dom'
import FeedPage from '../Pages/FeedPage'

export default function MainLayout() {
  return (
  <>
  <Navbar/>
  <div className="min-h-screen bg-gray-200 pt-4"><Outlet/></div>
  <Footer/>
  </>
  )
}
