import React, { useRef } from "react";
import { Label, Textarea, Button, FileInput } from "flowbite-react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Postslists from "./Postslists";


export default function AddPost(onPostAdded ) {
  const fileInputRef = useRef();
    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);



  const { register, handleSubmit ,reset} = useForm({});
  async function AddPost(data) {
    setLoading(true);
    setApiError(null);
    try {


    const formData = new FormData()
    formData.append("body",data.body)
    formData.append("image",fileInputRef.current.files[0])
      const { data: response } = await axios.post(
"https://linked-posts.routemisr.com/posts",
  formData,
  {
    headers: {
      token: localStorage.getItem("token")
    }
  }
      );
      console.log(response);
      setSuccess(true);
      reset()
    } catch (error) {
      console.error(error);
      setApiError(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(AddPost)}>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <div className="mb-4">
          <Label htmlFor="comment" className="text-gray-700 dark:text-gray-200">
            Post something
          </Label>
        </div>

        <div className="flex items-start gap-3 mb-4 ">
          <Textarea
            {...register("body")}
            id="comment"
            placeholder="Leave a comment..."
            rows={4}
            className="flex-1"
          />
          <button
            type="button"
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <input
              className="hidden"
              {...register("image")}
              ref={fileInputRef}
              type="file"
              id="fileInput"
            />
            <IoCloudUploadOutline
              onClick={() => fileInputRef.current.click()}
              size={24}
              className="text-gray-600 dark:text-gray-300 "
            />
          </button>
        </div>

        <Button type="submit" color="blue" className="w-full">
          Submit
        </Button>
      </div>
    </form>
  );
}
