import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Postcard } from '../Posts/Postcard';
import Comment from '../Posts/Comment';



export default function PostDetails() {
const [postData, setPostData] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(true);
  

  async function getPost() {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts/${_id}`,
        {
          headers: { token: localStorage.getItem('token') },
        }
      );
      console.log(data.post);
      

      setPostData(data.post);
    } catch (error) {
      console.error(error);
      setApiError(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPost();
  }, []);
  
  const { id: _id } = useParams();
  return (

    
    <div className="py-5">
      <div className="mx-auto flex flex-col gap-4">
      <Postcard post={postData} commentsLimit={9999}/>
      </div>
    </div>
  )
}
