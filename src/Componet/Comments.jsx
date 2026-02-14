import React, { useContext, useState } from 'react'
import PostHeader from './Card/PostHeader'
import { AuthContext } from '../Context/AuthContext'
import DropDownAction from './DropDownAction'
import { Button, Input } from '@heroui/react'
import { updateCommentApi } from '../Serivces/CommentSerivces'

export default function Comments({comment,postUserId,callBack}) {
  const {userData}=useContext(AuthContext)
  const [updatedvalue, setUpdatedvalue] = useState(comment.content)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
 
 async function handleUpdate(e) {
  e.preventDefault()
  setIsLoading(true)
 const res =await updateCommentApi(comment._id,updatedvalue)
 if(res.message){
  await callBack()
  setIsUpdating(false)
 }
 setIsLoading(false)

 }
  return (
   <>
     <div className='p-4 bg-gray-100'> 
      <div className='w-full h-16 flex items-center justify-between'>
    <PostHeader photo={comment.commentCreator.photo} 
                name={comment.commentCreator.name} 
                date={comment.createdAt}/>
     {
      userData._id===comment.commentCreator._id && userData._id===postUserId &&
    <DropDownAction setIsUpdating={setIsUpdating} callBack={callBack} commentId={comment._id}/>
     }
    </div>
      <p className="p-4 pb-0">{comment.content}</p>
      {isUpdating && 
      <form onSubmit={handleUpdate} className='flex items-center gap-2'>
        <Input variant='bordered' value={updatedvalue} onChange={(e)=>setUpdatedvalue(e.target.value)}/>
        <Button color='primary' isLoading={isLoading} type='submit'>update</Button>
      </form>}
      </div>

   </>
  )
}
