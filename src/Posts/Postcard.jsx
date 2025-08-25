import { Card, Avatar, Button } from "flowbite-react";
import { FaComments } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

export function Postcard({ post = {} ,commentsLimit = 5}) {
  const { body = "", comments =[], _id, image, createdAt, user = {} } = post;
  const { name: userName = "", photo: userImage } = user;
  const { id } = useParams();
  return (
    <Card className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar img={userImage} rounded size="md" />
          <div className="font-medium dark:text-white">
            <div>{userName}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <IoIosMore size={20} />
        </button>
      </div>


      <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">{body}</p>
      {image && (
        <div className="mb-3">
          <img
            src={image}
            alt={ userName}
            className="w-full rounded-lg object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
        <div className="flex items-center gap-2 text-gray-600 hover:text-blue-500 dark:text-gray-300">
          <AiOutlineLike size={20} /> Like
        </div>
        <div className="flex items-center gap-2 text-gray-600 hover:text-blue-500 dark:text-gray-300">
          <FaComments size={20} /> {comments.length}
        </div>
        <div className="flex items-center gap-2 text-gray-600 hover:text-blue-500 dark:text-gray-300">
          <Link to={`/posts/postdetails/${_id}`} className="flex items-center gap-2">
            <IoIosMore size={20} />
            More Details
          </Link>
        </div>


      </div>

<div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
  {comments && comments.length > 0 ? (
    comments.slice(0,commentsLimit).map((comment) => {
      const commentUser = {
        ...comment.commentCreator,
        createdAt: comment.createdAt,
        content: comment.content,
      };

      return (
        <div key={comment._id} className="flex items-start gap-3 mb-3">
          <Avatar img={commentUser.photo} rounded size="sm" />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {commentUser.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(commentUser.createdAt).toLocaleString()}
            </div>
            <p className="text-gray-700 dark:text-gray-300">{commentUser.content}</p>
          </div>
        </div>
      );
    })
  ) : (
    <p className="text-gray-500 dark:text-gray-400 text-sm">No comments yet</p>
  )}
</div>
    </Card>
  );
}
