import { Card, Avatar, Button} from "flowbite-react";
import DropdownActions from "../DropdownActions/DropdownActions";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function PostCard({
  post,
  setIsOpen,
  setPostId,
  setPost,
  toggle,
  setIsLiked,
}) {
  const { token, userData } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      console.log("successssss");
      queryClient.invalidateQueries(["allPosts"]);
      queryClient.invalidateQueries(["userPosts"]);
    },
    onError: () => {
      console.log("errorrrrrrr");
    },
  });

  async function deletePost() {
    try {
      const { data } = await axios.delete(
        `https://route-posts.routemisr.com/posts/${post._id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  // async function getLikes() {
  //   try {
  //     const response = await axios.get(
  //       `https://route-posts.routemisr.com/posts/:${post._id}/likes?page=1&limit=20`,
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     );
  //     console.log(response.data.data.posts);

  //     return response.data.data.posts;
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }

  const { mutate: mutateLike } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      console.log("successssss");
      queryClient.invalidateQueries(["allPosts"]);
      queryClient.invalidateQueries(["userPosts"]);
      queryClient.invalidateQueries(["myPosts"]);
    },
    onError: () => {
      console.log("errorrrrrrr");
    },
  });

  async function likePost(id) {
    try {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/posts/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(data);
      setIsLiked(data.data.liked);
      return data.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  async function savePost() {
    try {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/posts/${post._id}/bookmark`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(data);
      setIsLiked(data.data.liked);
      return data.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
     {post&&<div className="mb-5 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header with User Info */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full border-2 border-blue-100 shadow-sm overflow-hidden bg-gray-200">
            <img
              src={post.user.photo}
              alt="user avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Link to={`/userProfile/${post.user._id}`} className="font-semibold text-gray-900 text-sm leading-tight">
              {post.user.name}
            </Link>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
              <i className="fa-regular fa-clock text-[10px] text-blue-500"></i>
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <DropdownActions delete={mutate} userId={post.user._id} save={savePost} />
      </div>

      {post?.isShare === true ? (
        <>
          {/* Shared Post Caption */}
          <div className="px-4 pb-3">
            <Link
              to={`/postDetails/${post._id}`}
              className="text-blue-500 text-xs font-medium hover:underline inline-flex items-center gap-1"
            >
              <i className="fa-solid fa-up-right-from-square text-[10px]"></i>
              View Post
            </Link>
            <p className="text-gray-900 text-sm leading-relaxed mt-1">{post.body}</p>
          </div>

          {/* Shared Post Content */}
          <div className="mx-4 mb-4 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-200">
                  <img
                    src={post.sharedPost?.user.photo}
                    alt="user avatar"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <Link to={`/userProfile/${post.sharedPost?.user._id}`} className="font-semibold text-gray-900 text-sm">
                    {post.sharedPost?.user.name}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {new Date(post.sharedPost?.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <Link
                to={`/postDetails/${post.sharedPost?._id}`}
                className="text-blue-500 text-xs font-medium hover:underline inline-flex items-center gap-1"
              >
                <i className="fa-solid fa-up-right-from-square text-[10px]"></i>
                View Original Post
              </Link>
              <p className="text-gray-900 text-sm leading-relaxed mt-1">
                {post.sharedPost?.body}
              </p>
            </div>

            {/* Shared Post Image */}
            {post.sharedPost?.image && (
              <img
                src={post.sharedPost?.image}
                alt="post content"
                className="max-h-140 w-full object-cover"
              />
            )}
          </div>
        </>
      ) : (
        <>
          {/* Post Content */}
          <div className="px-4 pb-3">
            <Link
              to={`/postDetails/${post._id}`}
              className="text-blue-500 text-xs font-medium hover:underline inline-flex items-center gap-1"
            >
              <i className="fa-solid fa-up-right-from-square text-[10px]"></i>
              View Post
            </Link>
            <p className="text-gray-900 text-sm leading-relaxed mt-1">{post.body}</p>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="px-4 pb-4">
              <img
                src={post.image}
                alt="post content"
                className="max-h-140 w-full object-cover"
              />
            </div>
          )}
        </>
      )}

      {/* Post Stats */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
        <span className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer transition-colors">
          <i className="fa-solid fa-heart text-red-500"></i>
          {post.likesCount} Likes
        </span>
        <span className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer transition-colors">
          <i className="fa-regular fa-comment text-blue-500"></i>
          {post.commentsCount} Comments
        </span>
        <span className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer transition-colors">
          <i className="fa-solid fa-share-nodes text-blue-500"></i>
          {post.sharesCount} Shares
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex border-t border-gray-100">
        <Button
         
          className={`flex-1 rounded-none h-11 text-sm font-medium gap-2 ${
            post.likes.includes(userData._id) === true
              ? "text-blue-500 bg-blue-50"
              : "text-gray-600 bg-white hover:text-blue-500 hover:bg-blue-50"
          }`}
          onClick={() => mutateLike(post._id)}
        >
          <i className={`${post.likes.includes(userData._id) ? "fa-solid" : "fa-regular"} fa-thumbs-up`}></i>
          Like
        </Button>
        <Button
          
          className="bg-white flex-1 rounded-none h-11 text-sm font-medium text-gray-600 hover:text-blue-500 hover:bg-blue-50 gap-2 border-x border-gray-100"
          onClick={() => {
            setIsOpen(true)
            setPostId(post._id)
          }}
        >
          <i className="fa-regular fa-comment"></i>
          Comment
        </Button>
        <Button
          
          className="bg-white flex-1 rounded-none h-11 text-sm font-medium text-gray-600 hover:text-blue-500 hover:bg-blue-50 gap-2"
          onClick={() => {
            toggle();
            setPostId(post._id);
            setPost(post);
          }}
        >
          <i className="fa-solid fa-share-nodes"></i>
          Share
        </Button>
      </div>
    </div>}
    </>
  );
}
