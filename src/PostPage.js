import React from 'react'
import { useParams, Link , useNavigate} from "react-router-dom";
import { useContext } from 'react';
import DataContext from './context/DataContext';
import api from './api/posts';

const PostPage = () => {
  const {id} = useParams();
  const { posts, setPosts } = useContext(DataContext);
  const post = posts.find(post => post.id == id);
  const navigate = useNavigate();


  const handleDelete = async (id) => {

    try{
      await api.delete('/posts/'+ id);
      setPosts(posts.filter(post => post.id !== id));
    }
    catch(err){
      console.log(`Error: ${err.message}`);
    }
    
  };


  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>

            <button className='editButton' onClick={()=> {navigate('/edit/' + id ) ;} }>
              Edit Post
            </button>
            <button className='deleteButton' onClick={()=> {handleDelete(post.id)  ; navigate('/') ;} }>
              Delete Post
            </button>
          </>
        }
        {!post && 
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to='/'>Visit Our HomePage</Link>
            </p>
          </>
        }
      </article>
    
    </main>
  )
}

export default PostPage