import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../context/AuthContext';
import { ThreeDots } from 'react-loader-spinner';
import { Alert } from 'flowbite-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function SharePostForm({ toggle, isFormOpen, postId, setIsLiked, post }) {

    const {token} = useContext(AuthContext)
    const [loading, setLoading] = useState();
    const [msg, setMsg] = useState(null);

    const {handleSubmit, register} = useForm({
        defaultValues:{
            body: ''
        },
    })

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
    mutationFn: sharePost,
    onSuccess: () => {
      console.log("successsss");

      queryClient.invalidateQueries(["allPosts"]);
      queryClient.invalidateQueries(["feed"]);
    },
    onError: () => {
      console.log("errorrrrrr");
    },
  });

    
  async function sharePost(value) {
    const formData = new FormData();
    if (value.body) {
      formData.append("body", value.body);
    }
    setLoading(true)    
    try {
      const { data } = await axios.post(`https://route-posts.routemisr.com/posts/${postId}/share`, formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success === true) {
        setMsg(data.message);
        console.log(data);
      }
      setIsLiked(data.data.liked)
      return data.data
    } catch (error) {
      setMsg(error.response.data.message || "Something went wrong!");
      console.log(error);
    }finally {
      setLoading(false);
    }
  }

  return (
    <>
      
      {/* Container to mimic the main content layout */}
      <div className={`w-full max-w-7xl mx-auto  gap-6 relative ${isFormOpen?'flex':'hidden'}`}>        
        <div onClick={()=>toggle()} className="fixed inset-0 bg-black/50 z-40"></div>

        {/* Share Post Modal */}
        <form onSubmit={handleSubmit(mutate)} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-137.5 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
          
          {/* Modal Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Share post</h2>
            <button className="text-gray-400 hover:text-gray-600 text-xl leading-none" onClick={()=>toggle()}>
              &times;
            </button>
          </div>

          {msg && (
          <Alert
            color={msg == "post shared successfully" ? "success" : "failure"}
            className="font-medium"
          >
            {msg}
          </Alert>
        )}

          {/* Modal Body */}
          <div className="p-5">
            {/* Input Field */}
            <div className="mb-4">
              <textarea 
                {...register('body')}
                type="text"
                placeholder="say something about this...."
                className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-300 placeholder-gray-400"
              />
            </div>

            {/* Post Preview Box */}
            <div className="bg-[#f9fafc] border border-gray-200 rounded-lg p-5 flex flex-col gap-4">
              
              {/* Profile Row */}
              <div className="flex items-center gap-3">
                <img 
                  src={post?.user.photo} 
                  alt="user avatar" 
                  className="w-10 h-10 rounded-full border border-gray-100"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-950">{post?.user.name}</p>
                  <p className="text-xs text-gray-500">@{post?.user.username}</p>
                </div>
              </div>

              {/* Share Icon and Text */}
              <div className="flex flex-col gap-2.5">
                <p>{post?.body}</p>
                {post?.image&&<img src={post.image} alt="" className="mt-2 max-h-55 w-full rounded-lg object-cover" />}
              </div>

            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 p-5 pt-1 border-t border-gray-100">
            <button onClick={()=>toggle()} className="px-6 py-2.5 bg-[#f0f2f5] hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg">
              Cancel
            </button>
            <button className="px-6 py-2.5 bg-[#1877f2] hover:bg-[#166fe5] text-white text-sm font-semibold rounded-lg shadow-sm">
              {loading ? (
            <ThreeDots
              visible={true}
              height="20"
              width="20"
              color="white"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Share Now"
          )}
            </button>
          </div>
          
        </form>

      </div>

    </>
  )
}
