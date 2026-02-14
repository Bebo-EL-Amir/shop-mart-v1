import React, { useContext } from 'react'
import {Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CounterContext } from '../Context/CounterContext';
import { AuthContext } from '../Context/AuthContext';

export default function Navbar(userId) {
//  const [isLoggedIn,setIsLoggedIn ]=useState(localStorage.getItem('token')!=null)
const{isLoggedIn,setIsLoggedIn,setUserData}=useContext(AuthContext)
let {counter,setCounter}= useContext(CounterContext)
 const navigate=useNavigate()
 function LogOut(){
  localStorage.removeItem('token')
  setIsLoggedIn(null)
  navigate('/Login')
  setUserData(null)
 }
 
  return (
   <>
  <HeroNavbar>
      <NavbarBrand>
        <p className="font-bold text-inherit"><Link to={'/'}> Linked posts {counter}</Link></p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {isLoggedIn?<>
        <NavbarItem>
          <NavLink to={'profile'} >profile</NavLink>
        </NavbarItem>
        <NavbarItem onClick={LogOut} className='cursor-pointer' >LogOut</NavbarItem> 
        </>
        :
        <>
        <NavbarItem>
          <NavLink to={'Register'} >SignUp</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to={'Login'} >SignIn</NavLink>
        </NavbarItem> 
        </>
      }
        
        
      </NavbarContent>
    </HeroNavbar>
   </>
  )
}
