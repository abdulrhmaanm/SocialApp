import React, { useState, useEffect } from "react";
import Postslists from "./../Posts/Postslists";
import AddPost from "./../Posts/AddPost";
import axios from "axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const token = localStorage.getItem("token");
  const getPostsData = async () => {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50",
        { headers: { token } }
      );
      setPosts(data.posts || []);
    } catch (error) {
      console.error(error);
      setApiError(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  const handlePostAdded = async () => {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50",
        { headers: { token } }
      );

      if (data.posts && data.posts.length > 0) {
        const newestPost = data.posts[0];

        setPosts((prev) => {
          const filtered = prev.filter((p) => p._id !== newestPost._id);
          return [newestPost, ...filtered];
        });
      }
    } catch (error) {
      console.error("Failed to refetch posts after adding:", error);
    }
  };

  return (
    <div className="space-y-6">
      <AddPost onPostAdded={handlePostAdded} />

      {loading && <p className="text-center py-5">Loading posts...</p>}
      {apiError && <p className="text-center text-red-500 py-5">{apiError}</p>}
      {!loading && !apiError && <Postslists postsData={posts} />}
    </div>
  );
}
