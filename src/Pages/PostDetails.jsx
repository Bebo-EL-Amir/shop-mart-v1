import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePostApi } from '../Serivces/PostSerivces'
import PostCard from '../Componet/PostCard'
import LoadingScreen from '../Componet/LoadingScreen'

export default function PostDetails() {
 let{id}=useParams()
 const [post, setPost] = useState(null)
 
async function getPost(){
const response= await getSinglePostApi(id)
if (response.message) {
  setPost(response.post)
}
 }
 useEffect(()=>{
  getPost()
 },[])

 return (
 <>
 <div className="w-4/6 mx-auto">
{post ? <PostCard commentLimit={post.comments.length} post={post} callBack={getPost}/>:<LoadingScreen/>}
</div>
 </>
  )
}

