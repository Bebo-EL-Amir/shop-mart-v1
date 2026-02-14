import axios from "axios";

export async function getAllPostsApi() {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts', {
            headers: {
                token: localStorage.getItem('token')
            },
            params: {
                sort: '-createdAt'
            }
        })
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function getSinglePostApi(postId) {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts/' + postId, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}
export async function createPostApi(formData) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/posts', formData,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}


export async function getPostCommentsApi(postId) {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts/'+postId+'/comments',{
            headers: {
                token: localStorage.getItem('token')
            },
        })
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function getUserPostsApi(userId) {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/users/'+userId+'/posts',{
            headers: {
                token: localStorage.getItem('token')
            },
        })
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}