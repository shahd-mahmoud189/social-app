import axios from "axios";
import React, { useContext, useOptimistic } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProfileSection({ postsLength, userData, isFollowing}) {
  const { token, userData: myData } = useContext(AuthContext);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      photo: null,
    },
  });

   const queryClient = useQueryClient();

  const { mutate:mutatePhoto } = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: () => {
      console.log("successssss");
      queryClient.invalidateQueries(["user", myData?._id]);
      queryClient.invalidateQueries(["myPosts"]);
    },
    onError: () => {
      console.log("errorrrrrrr");
    },
  });

  async function uploadPhoto(value) {
    const formData = new FormData();
    formData.append("photo", value.photo[0]);
    try {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/users/upload-photo`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success === true) {
        // setMsg(data.message);
        console.log(data);
      }
      return data.data;
    } catch (error) {
      // setMsg(error.response.data.message || "Something went wrong!");
      console.log(error);
              console.log(formState.errors.photo.message);

    }
  }

 

  const { mutate, isPending } = useMutation({
    mutationFn: follow,
    onSuccess: () => {
      console.log("successssss");
      queryClient.invalidateQueries(["user", userData._id]);
    },
    onError: () => {
      console.log("errorrrrrrr");
    },
  });

  async function follow(id) {
    // setLoading(true);
    try {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/users/${id}/follow`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error.response);

    }
     //finally {
    //   setLoading(false);
    // }
  }

  

  return (
    <>
      <div className="mx-auto p-6 rounded-2xl mb-4 font-sans text-gray-900 max-w-5xl bg-white border border-gray-100 shadow-lg">
        {/* Header Section */}
        <div className="pt-8 pb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            {/* Avatar with Ring Effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <img
                src={userData?.photo}
                alt="Profile"
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover bg-gray-100"
              />
              <form
                onSubmit={handleSubmit(mutatePhoto)}
                className="absolute bottom-1 right-1"
              >
                {myData?._id === userData?._id && (
                  <>
                    <label className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-full cursor-pointer transition-all">
                      <i className="fa-solid fa-camera text-sm"></i>
                      <input
                        accept="image/*"
                        type="file"
                        className="hidden"
                        {...register("photo", {
                          onChange: () => {
                            handleSubmit(mutatePhoto)();
                          },
                        })}
                      />
                    </label>
                  </>
                )}
                {/* {formState.errors.photo && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {formState.errors.photo.message}
                </p>
              )} */}
              </form>
            </div>

            {/* Name and Handle */}
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 capitalize">
                {userData?.name}
              </h1>
              <p className="text-lg text-gray-500 font-medium flex items-center gap-2">
                <i className="fa-solid fa-envelope text-blue-500"></i>
                {userData?.email}
              </p>
            </div>
          </div>

          {/* Right Side: Quick Stats Row */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex gap-8 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {userData?.followersCount}
                </p>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Followers
                </p>
              </div>
              <div className="w-px h-10 bg-gray-200 self-center"></div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {userData?.followingCount}
                </p>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Following
                </p>
              </div>
            </div>

            {/* Follow Button - Only show if it's not the user's own profile */}
            {myData?._id !== userData?._id && (
              <button onClick={()=>mutate(userData?._id)} className="w-full md:w-auto px-8 py-3 rounded-xl font-bold transition-all duration-200 active:scale-95 bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <i className="fa-solid fa-user-plus text-sm"></i>
                {isFollowing===true ?'Following':'Follow'}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Section: Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* About Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                About
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-gray-400">
                      Email Address
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      {userData?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Stats Column */}
          <div className="space-y-4">
            <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <p className="text-xs font-semibold text-blue-100 uppercase mb-1 tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-newspaper"></i>
                  Posts
                </p>
                <p className="text-4xl font-black">{postsLength}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                  Saved Items
                </p>
                <p className="text-2xl font-black text-gray-900">
                  {userData?.bookmarksCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <i className="fas fa-bookmark text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
