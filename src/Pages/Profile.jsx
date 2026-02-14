import { useContext, useEffect, useState, useRef } from 'react'
import userImage from '../assets/1.avif'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import PostCard from '../Componet/PostCard'
import { getUserPostsApi } from '../Serivces/PostSerivces'
import LoadingScreen from '../Componet/LoadingScreen'
import { uploadProfilePhotoApi } from '../Serivces/AuthSerivces'

export default function Profile() {
 
 const {userData, setUserData}= useContext(AuthContext)
 const [posts, setPosts] = useState([])
 const [isLoading, setIsLoading] = useState(false)
 const [isImageLoading, setIsImageLoading] = useState(false)
 const fileInputRef = useRef(null)

 async function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
        setIsImageLoading(true)
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('photo', file)
        
        const res = await uploadProfilePhotoApi(formData)
        if(res.user){
            setUserData(res.user)
        }
        setIsImageLoading(false)
    }
 }

 async function getUserPosts() {
     if (userData?._id) {
        setIsLoading(true)
        const res = await getUserPostsApi(userData._id)
        setPosts(res.posts || [])
        setIsLoading(false)
     }
 }

 useEffect(() => {
    getUserPosts()
 }, [userData])

return (
  <>
     <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      
        <div className="md:col-span-4 lg:col-span-3">
          <div className="bg-white rounded-md shadow-md py-5 px-3 my-5 text-center relative">
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleImageChange}
                accept="image/*"
            />
            <div className="relative w-24 h-24 mx-auto cursor-pointer" onClick={() => fileInputRef.current.click()}>
                <img 
                src={userData?.photo} 
                onError={(e) => e.target.src=userImage} 
                alt='profile pic' 
                className={`w-full h-full rounded-full border-2 border-blue-500 object-cover ${isImageLoading ? 'opacity-50' : ''}`} 
                />
                {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700"></div>
                    </div>
                )}
            </div>
            <h1 className="font-bold text-xl mt-3">{userData?.name}</h1>
            <p className="text-gray-500 text-sm">{userData?.email}</p>
          </div>
        </div>
          
    
        <div className="md:col-span-8 lg:col-span-9">
          <div className="bg-gray-50 rounded-md shadow-inner p-5 my-5">
            <h2 className="text-lg font-semibold mb-4">My Posts</h2>
            {isLoading ? <LoadingScreen/> : posts.map((post) => <PostCard key={post._id} post={post} callBack={getUserPosts} />)}
           </div>
        </div>
      </div>
    </div>
    </>
  )
}
 
  
