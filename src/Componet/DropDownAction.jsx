import React, { useState } from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from '@heroui/react'
import { deleteCommentApi } from '../Serivces/CommentSerivces'

export default function DropDownAction({commentId, callBack,setIsUpdating}) {
   const [isLoading, setIsLoading] = useState(false)
  async function deleteComment(commentId){
    setIsLoading(true)
    const res= await deleteCommentApi(commentId)
    if (res.message) {
       await callBack()
    }
    setIsLoading(false)
   }
  return (
    <>
       {
        isLoading? <Spinner/>:
         <Dropdown>
      <DropdownTrigger>
        <svg className="w-16 outline-0 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit" onClick={()=>setIsUpdating(true)}>Edit file</DropdownItem>
        <DropdownItem key="delete" onClick={()=>deleteComment(commentId)} className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
       }
    </>
  )
}
