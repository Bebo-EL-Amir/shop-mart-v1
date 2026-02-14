import React, { useContext, useState } from 'react'

import PostHeader from './Card/PostHeader'
import PostBody from './Card/PostBody'
import PostFooter from './Card/PostFooter'
import Comments from './Comments'
import { Button, Input} from '@heroui/react'
import { createCommentApi } from '../Serivces/CommentSerivces'
import { AuthContext } from '../Context/AuthContext'
import DropDownAction from './DropDownAction'
import { getPostCommentsApi } from '../Serivces/PostSerivces'


export default function PostCard({post,commentLimit,callBack}) {
   
  const {userData,setUserData}= useContext(AuthContext)
  const [commentContent, setCommentContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState(post.comments)
 
  React.useEffect(() => {
    setComments(post.comments)
  }, [post.comments])
 
  async function createComment(e){
    e.preventDefault()
    setLoading(true)
  const response= await createCommentApi(commentContent,post._id)
   if(response.message){
    setComments(response.comments)
  // await callBack()
  setCommentContent('')
   }
  setLoading(false)
  }
   async function getPostComments(){
  const res= await getPostCommentsApi(post._id)
   setComments(res.comments)
    
  }

  return (
   <>
   <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
    <div className="w-full h-16 flex items-center justify-between ">
     <PostHeader photo={post.user.photo} name={post.user.name} date={post.createdAt}/>
    {
      userData._id===post.user._id && 
      <>
   <DropDownAction/>
       
    </>
    }

    </div>
   <PostBody body={post.body} image={post.image}/>

    <form onSubmit={createComment} className='flex gap-2 my-2'>
      <Input value={commentContent} onChange={(e)=>setCommentContent(e.target.value)} variant='bordered' placeholder='comment...'/>
      <Button isLoading={loading} color='primary' type='submit' disabled={commentContent.length < 2}>Add comment</Button>
    </form>
  <PostFooter postId={post._id} commentsNum={comments.length}/>

   {comments.length > 0 && [...comments].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, commentLimit).map((comment)=><Comments callBack={getPostComments} comment={comment} postUserId={post.user._id} key={comment._id}/>)}
  
  </div>
   </>
  )
}
