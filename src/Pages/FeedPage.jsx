import React, { use, useEffect, useState } from 'react'
import PostCard from '../Componet/PostCard'
import { getAllPostsApi } from '../Serivces/PostSerivces'
import { get } from 'react-hook-form'
import LoadingScreen from '../Componet/LoadingScreen'
import CreatePost from '../Componet/CreatePost'

export default function FeedPage() {
const [posts, setPosts] = useState([])
   async function getPosts() {
     const res= await getAllPostsApi()
      setPosts(res.posts)
  }
  useEffect(() => {
 getPosts()
  },[])
  return (
   <>
  <div className="w-4/6 mx-auto">
  <CreatePost callBack={getPosts}/>
  {posts.length==0 ? <LoadingScreen/> : posts.map((post)=> <PostCard commentLimit={1} post={post} callBack={getPosts} key={post.id}/>)}
</div>
   </>
  )
}
