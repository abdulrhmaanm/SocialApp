import React, { useEffect, useState } from "react";
import { Postcard } from "./Postcard";
import axios from "axios";

export default function Postslists() {
  const [postsData, setPostsData] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getPostsData() {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(data.posts);

      setPostsData(data.posts);
    } catch (error) {
      console.error(error);
      setApiError(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPostsData();
  }, []);

  if (loading) return <p className="text-center py-5">Loading posts...</p>;
  if (apiError)
    return <p className="text-center text-red-500 py-5">{apiError}</p>;
  if (postsData.length === 0)
    return <p className="text-center py-5">No posts available.</p>;

  return (
    <div className="py-5">
      <div className="mx-auto flex flex-col gap-4">
        {postsData.map((post, index) => (
          <Postcard key={post?._id || index} post={post || {}} />
        ))}
      </div>
    </div>
  );
}
