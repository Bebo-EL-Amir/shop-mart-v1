import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { schema } from '../assets/schema/loginSchema'
import { signIn } from '../Serivces/AuthSerivces'
import { AuthContext } from '../Context/AuthContext'

export default function Login() {
 useState
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const {setIsLoggedIn}= useContext(AuthContext)
  let{handleSubmit,register ,formState:{errors,touchedFields}}=useForm({
    defaultValues:{
      email:'',
      password:'',
    },
    resolver:zodResolver(schema),
    mode:'onBlur',
    reValidateMode:'onBlur',
  })

  const navigate = useNavigate()
  async function sendData(userData){
    setLoading(true)
   const res= await signIn(userData)
   setLoading(false)
   if (res.message == 'success') {
    localStorage.setItem('token',res.token)
    setIsLoggedIn(res.token)
    navigate('/')
   }else{
    setApiError(res.error)
   }
   

  }
  return (
   <>
   <div className='bg-white rounded-2xl shadow-2xl py-10 px-6 min-w-md'>
    <h1 className='text-2xl text-center mb-4'>Login Now</h1>

    <form on onSubmit={handleSubmit(sendData)} className='flex flex-col gap-3'>
    <Input label="Email" type="email" {...register('email')} variant='bordered' isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage={errors.email?.message}/>
    <Input label="Password" type="password" {...register('password')} variant='bordered' isInvalid={Boolean(errors.password && touchedFields.password)} errorMessage={errors.password?.message}/>
      <Button isLoading={loading} type='submit'>Login</Button>
      <div>new user  <Link className='text-blue-500' to={'/Register'}>Register Now</Link> </div>
      {apiError && <span className='text-center text-red-500'>{apiError} </span> }
      </form>
   </div>
   
   </>
  )
}
