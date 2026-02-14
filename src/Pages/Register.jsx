import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signUp } from '../Serivces/AuthSerivces'
import { Link, useNavigate } from 'react-router-dom'
import { schema } from '../assets/schema/registerSchema'

export default function Register() {
 useState
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  let{handleSubmit,register ,formState:{errors,touchedFields}}=useForm({
    defaultValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      dateOfBirth:'',
      gender:'',
    },
    resolver:zodResolver(schema),
    mode:'onBlur',
    reValidateMode:'onBlur',
  })

  const navigate = useNavigate()
  async function sendData(userData){
    setLoading(true)
   const res= await signUp(userData)
   setLoading(false)
   if (res.message == 'success') {
    navigate('/login')
   }else{
    setApiError(res.error)
   }
   

  }
  return (
   <>
   <div className='bg-white rounded-2xl shadow-2xl py-10 px-6 min-w-md'>
    <h1 className='text-2xl text-center mb-4'>Register Now</h1>
    <form on onSubmit={handleSubmit(sendData)} className='flex flex-col gap-3'>
    <Input label="Name" isInvalid={Boolean(errors.name && touchedFields.name)} errorMessage={errors.name?.message} type="text" {...register('name')} variant='bordered' />
    <Input label="Email" type="email" {...register('email')} variant='bordered' isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage={errors.email?.message}/>
    <Input label="Password" type="password" {...register('password')} variant='bordered' isInvalid={Boolean(errors.password && touchedFields.password)} errorMessage={errors.password?.message}/>
    <Input label="rePassword" type="password" {...register('rePassword')} variant='bordered' isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)} errorMessage={errors.rePassword?.message}/>
    <div className="flex gap-3">
      <Input label="DateOfBirth" isInvalid={Boolean(errors.dateOfBirth && touchedFields.dateOfBirth)} errorMessage={errors.dateOfBirth?.message} type="date" {...register('dateOfBirth')} variant='bordered' />
    <Select variant='bordered' label="Select your gender" {...register('gender')} isInvalid={Boolean(errors.gender&& touchedFields.gender)} errorMessage={errors.gender?.message}>
          <SelectItem key={'male'}>Male</SelectItem>
          <SelectItem key={'female'}>Female</SelectItem>
      </Select>
    </div>
      <Button isLoading={loading} type='submit'>Register</Button>
      <div>Alreadly have account ? please <Link className='text-blue-500' to={'/login'}>Login</Link> </div>
      {apiError && <span className='text-center text-red-500'>{apiError} </span> }
      </form>
   </div>
   
   </>
  )
}
