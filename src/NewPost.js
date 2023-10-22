import React from 'react'
import {useNavigate} from "react-router-dom";
import { useContext, useState } from 'react';
import DataContext from './context/DataContext';
import api from './api/posts';
import { format } from 'date-fns';

const NewPost = () => {
  
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const {posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length? posts[posts.length - 1].id + 1 : 1 ;

  
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody};
    try{

      var response = await api.post('/posts', newPost);
      setPosts([...posts, response.data]);
      setPostTitle('');
      setPostBody('');

    }
    catch(err){

      if (err.response) {
        // Not in the 200 response range 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }

    }
    
  };

  
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={(e) => {handleSubmit(e) ; navigate('/')}}>
        <label htmlFor='postTitle'>Title: </label>
        <input 
          id='postTitle'
          type='text'
          required
          value={postTitle}
          onChange={(e)=>{setPostTitle(e.target.value)}}
          tabIndex="1"
        />
        <label htmlFor='postBody'>Post: </label>
        <textarea
          id='postBody'
          required
          value={postBody}
          onChange={(e)=>{setPostBody(e.target.value)}}
          tabIndex="2"
        />

        <button type='submit'>Submit</button>
          

      </form>
    </main>
  )
}

export default NewPost