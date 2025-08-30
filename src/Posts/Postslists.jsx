import React from "react";
import { Postcard } from "./Postcard";

export default function Postslists({ postsData }) {
  if (!postsData || postsData.length === 0)
    return <p className="text-center py-5">No posts available.</p>;

  return (
    <div className="py-5">
      <div className="mx-auto flex flex-col gap-4">
        {postsData.map((post, index) => (
          <Postcard key={post._id || index} post={post} />
        ))}
      </div>
    </div>
  );
}
