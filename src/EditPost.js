import React from 'react'
import { useEffect,useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from './api/posts';
import DataContext from './context/DataContext';
import { format } from 'date-fns';

const EditPost = () => {

    const {id} =useParams();

    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');

    const { posts, setPosts } = useContext(DataContext);
    const navigate = useNavigate()

    const post = posts.find(post => post.id == id);

    useEffect(() => {

        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
       

    }, [post] )


    const handleEdit = async (id) => {
        try{
    
          const datetime = format(new Date(), 'MMMM dd, yyyy pp');
          const updatedPost = {id, title: editTitle, datetime, body: editBody};
          var response = await api.put('/posts/' + id , updatedPost);
          setPosts(posts.map(post => post.id == id ? {...response.data} : post));
          setEditBody('');
          setEditTitle('');
    
        }
        catch(err){
          console.log(`Error: ${err.message}`);
        }
      }

  return (
    <main className='NewPost'>
    {editTitle &&
        <>
            <h2>Edit Post</h2>
            <form className='newPostForm' onSubmit={(e) => {e.preventDefault() ; navigate('/')}}>
            <label htmlFor='postTitle'>Title: </label>
            <input 
                id='postTitle'
                type='text'
                required
                value={editTitle}
                onChange={(e)=>{setEditTitle(e.target.value)}}
                tabIndex="1"
            />
            <label htmlFor='postBody'>Post: </label>
            <textarea
                id='postBody'
                required
                value={editBody}
                onChange={(e)=>{setEditBody(e.target.value)}}
                tabIndex="2"
            />

            <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                

            </form>
        </>
    }

    {!editTitle &&
    
        <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
                <Link to='/'>Visit Our Homepage</Link>
            </p>
      
        </> 
    }
    
  </main>
  )
}

export default EditPost