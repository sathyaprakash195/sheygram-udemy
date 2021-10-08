import axios from "axios";
import {message} from 'antd'

export const addPost =(values)=>async dispatch=>{

    values.user = JSON.parse(localStorage.getItem('user'))._id
    values.likes = [] 
    values.comments = []

    console.log(values)
    dispatch({type:'LOADING' , payload:true})

    try {
        await axios.post('/api/posts/addpost' , values)
        dispatch({type:'LOADING' , payload:false})
        message.success('Post added successfully')
        window.location.href='/'
        
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING' , payload:false})
        message.error('something went wrong')
    }

}


export const getAllPosts =()=>async dispatch=>{

   

    
    dispatch({type:'LOADING' , payload:true})

    try {
        const response = await axios.get('/api/posts/getallposts')
        dispatch({type:'LOADING' , payload:false})
        dispatch({type:'GET_ALL_POSTS' , payload:response.data})
        
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING' , payload:false})
        message.error('something went wrong')
    }

}


export const likeOrUnlikePost =(values)=>async dispatch=>{

    values.userid = JSON.parse(localStorage.getItem('user'))._id.toString()
  

    console.log(values)
    dispatch({type:'LIKE_UNLIKE_LOADING' , payload:true})

    try {
        await axios.post('/api/posts/likeorunlikepost' , values)
        dispatch({type:'LIKE_UNLIKE_LOADING' , payload:false})
       
        
    } catch (error) {
        console.log(error)
        dispatch({type:'LIKE_UNLIKE_LOADING' , payload:false})
        message.error('something went wrong')
    }

}


export const addComment =(values)=>async dispatch=>{

    values.userid = JSON.parse(localStorage.getItem('user'))._id.toString()
  

    console.log(values)
    dispatch({type:'ADD_COMMENT_LOADING' , payload:true})

    try {
        await axios.post('/api/posts/addcomment' , values)
        dispatch({type:'ADD_COMMENT_LOADING' , payload:false})
       
        
    } catch (error) {
        console.log(error)
        dispatch({type:'ADD_COMMENT_LOADING' , payload:false})
        message.error('something went wrong')
    }

}

export const editPost =(values)=>async dispatch=>{

    

    console.log(values)
    dispatch({type:'EDIT_POST_LOADING' , payload:true})

    try {
        await axios.post('/api/posts/editpost' , values)
        dispatch({type:'EDIT_POST_LOADING' , payload:false})
        message.success('Post updated successfully')
        
    } catch (error) {
        console.log(error)
        dispatch({type:'EDIT_POST_LOADING' , payload:false})
        message.error('something went wrong')
    }

}


export const deletePost =(values)=>async dispatch=>{

    

    console.log(values)
    dispatch({type:'DELETE_POST_LOADING' , payload:true})

    try {
        await axios.post('/api/posts/deletepost' , values)
        dispatch({type:'DELETE_POST_LOADING' , payload:false})
        message.success('Post deleted successfully')
        
    } catch (error) {
        console.log(error)
        dispatch({type:'DELETE_POST_LOADING' , payload:false})
        message.error('something went wrong')
    }

}
