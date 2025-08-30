import React, { useRef, useState } from "react";
import { Label, Textarea, Button } from "flowbite-react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AddPost({ onPostAdded }) {
  const fileInputRef = useRef();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  async function handleAddPost(data) {
    setLoading(true);
    setApiError(null);

    try {
      const formData = new FormData();
      formData.append("body", data.body);

      if (fileInputRef.current.files.length > 0) {
        formData.append("image", fileInputRef.current.files[0]);
      }

      const token = localStorage.getItem("token");

      const { data: response } = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        formData,
        { headers: { token } }
      );

      console.log("POST response:", response);

      if (response.message === "success") {``
        const { data: postsData } = await axios.get(
          "https://linked-posts.routemisr.com/posts?limit=50",
          { headers: { token } }
        );

        if (postsData.posts && postsData.posts.length > 0) {
          onPostAdded(postsData.posts[0]);
        }

        setSuccess(true);
        reset();
        fileInputRef.current.value = null;
      } else {
        setApiError("Failed to retrieve post data");
      }
    } catch (error) {
      console.error(error);
      setApiError(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleAddPost)}>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <Label htmlFor="comment" className="text-gray-700 dark:text-gray-200">
          Post something
        </Label>

        <div className="flex items-start gap-3 mb-4 mt-2">
          <Textarea
            {...register("body")}
            id="comment"
            placeholder="Leave a comment..."
            rows={4}
            className="flex-1"
            required
          />
          <div
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <IoCloudUploadOutline
              size={24}
              className="text-gray-600 dark:text-gray-300"
            />
          </div>
          <input type="file" ref={fileInputRef} className="hidden" />
        </div>

        {apiError && <p className="text-red-500 mb-2">{apiError}</p>}
        {success && <p className="text-green-500 mb-2">Post added successfully!</p>}

        <Button type="submit" color="blue" className="w-full" disabled={loading}>
          {loading ? "Posting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
