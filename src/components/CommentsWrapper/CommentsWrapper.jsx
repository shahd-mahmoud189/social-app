"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Avatar,
} from "flowbite-react";
import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Comment from "../Comment/Comment";
import CommentSkeleton from "../CommentSkeleton/CommentSkeleton";
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";

export default function CommentsWrapper({ handleClose, isOpen, postId }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState();
  const [commentBtn, setCommentBtn] = useState("add");
  const [commentId, setCommentId] = useState();

  const {
    data: comments,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: getComments,
    enabled: Boolean(postId),
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });

  async function getComments() {
    try {
      const response = await axios.get(
        `https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response.data.data.comments);
      return response.data.data.comments;
    } catch (error) {
      console.log(error);
    }
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: handleComment,
    onSuccess: () => {
      console.log("successssss");
      queryClient.invalidateQueries(["comments", postId]);
      reset({
        content: "",
      });
    },
    onError: () => {
      console.log("errorrrrrrr");
    },
  });

  async function handleComment(values) {
    const formData = new FormData();
    formData.append("content", values.content);
    if (values.image) {
      formData.append("image", values.image[0]);
    }
    setLoading(true);
    if (commentBtn === "add") {
      try {
        const response = await axios.post(
          `https://route-posts.routemisr.com/posts/${postId}/comments`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else if(commentBtn === "update"){
      try {
        const data = { content: values.content };
        const response = await axios.put(
          `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setCommentBtn("add");
      }
    }
  }

  const { mutate:deleteCommentt } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      console.log("successssss");
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: () => {
      console.log("errorrrrrrr");
    },
  });

  async function deleteComment(id) {
    try {
      const response = await axios.delete(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response.data.message);
      return response.data.message
      
    } catch (error) {
        console.log(error);
        
    }
  }

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="bottom"
        className="md:w-150 mx-auto"
      >
        <DrawerHeader title="Comments" />
        <DrawerItems>
          {isLoading && <CommentSkeleton />}
          {isFetched &&
            (comments?.length === 0 ? (
              <p className="text-center text-gray-500">No comments yet</p>
            ) : (
              <div className="space-y-4 max-h-60 md:max-h-96 overflow-y-auto pr-2">
                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    setCommentBtn={setCommentBtn}
                    setCommentId={setCommentId}
                    deleteComment={deleteCommentt}
                  />
                ))}
              </div>
            ))}
        </DrawerItems>

        {/* Fixed bottom form (design only) */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 px-4 py-3">
          <form
            className="flex gap-2 items-center"
            onSubmit={handleSubmit(mutate)}
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              {...register("content")}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="25"
                  width="25"
                  color="white"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : commentBtn === "add" ? (
                "Comment"
              ) : (
                "Update"
              )}
            </button>
          </form>
        </div>
      </Drawer>
    </>
  );
}
