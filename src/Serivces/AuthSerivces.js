import axios from "axios";

export async function signUp(userData) {

try{
   let {data}= await axios.post('https://linked-posts.routemisr.com/users/signup',userData)
   return data
}
catch(err){
    console.log(err.response.data.error);
    return err.response.data

}
}

export async function signIn(userData) {

try{
   let {data}= await axios.post('https://linked-posts.routemisr.com/users/signin',userData)
   return data
}
catch(err){
    console.log(err.response.data.error);
    return err.response.data

}
}

export async function getUserDataApi() {

try{
   let {data}= await axios.get('https://linked-posts.routemisr.com/users/profile-data',{
    headers:{
        token:localStorage.getItem('token')
    }
   },)
   return data
}
catch(err){
    console.log(err.response.data.error);
    return err.response.data

}
}

export async function uploadProfilePhotoApi(formData) {
    try {
        const { data } = await axios.put('https://linked-posts.routemisr.com/users/upload-photo', formData, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (err) {
        console.log(err);
        return err.response?.data
    }
}