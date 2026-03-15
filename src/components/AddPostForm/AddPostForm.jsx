import React, { useContext, useState } from "react";
import { Label, Textarea, FileInput, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { ThreeDots } from "react-loader-spinner";

export default function AddPostForm() {

  const [loading, setLoading] = useState();
  const {token} = useContext(AuthContext)

  const { register, handleSubmit,  } = useForm({
    defaultValues: {
      body: "",
      image: null,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      console.log("successsss");

      queryClient.invalidateQueries(["allPosts"]);
    },
    onError: () => {
      console.log("errorrrrrr");
    },
  });

  async function addPost(value) {
    const formData = new FormData();
    formData.append("body", value.body);
    if (value.image) {
      formData.append("image", value.image[0]);
    }
    console.log(value);
    setLoading(true);
    try {
      const {data} = await axios.post(
        "https://route-posts.routemisr.com/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        },
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden my-4">
      {/* Header with gradient matching profile card */}
      <div className="border-b border-gray-200 px-5 py-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <i className="fa-solid fa-pen-to-square text-blue-500" />
          Create a New Post
        </h2>
      </div>

      {/* Form Content */}
      <div className="p-5">
        <form className="space-y-5" onSubmit={handleSubmit(mutate)}>
          {/* Post Text Area */}
          <div className="space-y-2">
            <Label 
              htmlFor="postText" 
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <i className="fa-regular fa-comment text-blue-500" />
              What's on your mind?
            </Label>
            <Textarea
              id="postText"
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              {...register("body")}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label 
              htmlFor="postImage" 
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <i className="fa-regular fa-image text-blue-500" />
              Upload an Image
            </Label>
            <div className="relative">
              <FileInput
                id="postImage"
                accept="image/*"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 border-dashed rounded-lg text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600 file:cursor-pointer cursor-pointer transition-all"
                {...register("image")}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Submit Button */}
          <div className="flex">
            <button 
              type="submit" 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 px-6 rounded-lg transition-colors"
            >
              {/* <i className="fa-solid fa-paper-plane" /> */}
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
            <i className="fa-solid fa-paper-plane" />
          )}
          Post
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
