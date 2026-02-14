import { Input, Spinner } from '@heroui/react'
import React, { useState } from 'react'
import staticImage from '../assets/1.avif'
import { createPostApi } from '../Serivces/PostSerivces';
import { div } from 'framer-motion/client';


export default function CreatePost({ callBack }) {
  const [postBody, setPostBody] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  function handleImage(e) {
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = '';
  }
  async function createPost(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData()
    if (postBody) {
      formData.append('body', postBody)
    }
    if (image) {
      formData.append('image', image)
    }
    const res = await createPostApi(formData)

    if (res.message) {
      await callBack()
      setPostBody('');
      setImage(null)
      setImageUrl('')
    } else {
      console.error("Failed to create post", res);
    }
    setLoading(false);
  }
  return (
    <>
      <div className="bg-white relative w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
        <form onSubmit={createPost}>
          <textarea name="" value={postBody} onChange={(e) => setPostBody(e.target.value)} placeholder='what is on your mind ...' className='border w-full p-4 rounded-md resize-none'></textarea>
          {imageUrl && <div className='relative'>
            <img src={imageUrl} className='w-full' alt="" />
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setImageUrl('')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-0 end-0 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>}
          <div className='flex justify-between items-center'>
            <label className='cursor-pointer hover:text-blue-500 flex items-center gap-2 my-2'>
              <Input type='file' onChange={handleImage} className='border hidden' />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </label>

            <button type='submit' className='bg-blue-500 text-white my-2 px-4 py-2 rounded-md cursor-pointer'>Create Post</button>
          </div>
        </form>
        {loading &&
          <div className='flex justify-center items-center inset-0 bg-gray-300/50 absolute'>
            <Spinner />
          </div>}
      </div>

    </>
  )
}
