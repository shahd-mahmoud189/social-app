"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Comment from "../Comment/Comment";
import CommentSkeleton from "../CommentSkeleton/CommentSkeleton";
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";

export default function CommentsWrapper({ handleClose, isOpen, postId }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [commentBtn, setCommentBtn] = useState("add");
  const [commentId, setCommentId] = useState();

  const {
    data: comments,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: getComments,
    enabled: Boolean(postId) && isOpen, // مبيجبش البيانات غير لو الـ Drawer مفتوح
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const queryClient = useQueryClient();

  async function getComments() {
    const response = await axios.get(
      `https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=10`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data.comments;
  }

  const { mutate } = useMutation({
    mutationFn: handleComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
      reset({ content: "" });
      setCommentBtn("add");
    },
  });

  async function handleComment(values) {
    setLoading(true);
    try {
      if (commentBtn === "add") {
        const formData = new FormData();
        formData.append("content", values.content);
        // لو في صورة تقدري تضيفيها هنا زي كودك القديم
        const response = await axios.post(
          `https://route-posts.routemisr.com/posts/${postId}/comments`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
      } else {
        const response = await axios.put(
          `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
          { content: values.content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const { mutate: deleteCommentt } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 ">
      {/* الـ Overlay عشان لما تدوسي بره يقفل */}
      <div className="absolute inset-0" onClick={handleClose}></div>

      {/* محتوى الكومنتات (الـ Drawer البديل) */}
      <div className="relative w-full max-w-2xl bg-white rounded-t-2xl shadow-xl flex flex-col max-h-[80vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h3 className="text-xl font-semibold text-gray-900">Comments</h3>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:bg-gray-200  p-2 rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading && <CommentSkeleton />}
          
          {isFetched && comments?.length === 0 && (
            <p className="text-center text-gray-500 py-10">No comments yet</p>
          )}

          {isFetched && comments?.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              setCommentBtn={setCommentBtn}
              setCommentId={setCommentId}
              deleteComment={deleteCommentt}
            />
          ))}
        </div>

        {/* Input Form Footer */}
        <div className="p-4  bg-gray-50 ">
          <form
            className="flex gap-2 items-center"
            onSubmit={handleSubmit(mutate)}
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              {...register("content", { required: true })}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center min-w-25"
            >
              {loading ? (
                <ThreeDots height="20" width="40" color="#fff" />
              ) : commentBtn === "add" ? (
                "Comment"
              ) : (
                "Update"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}