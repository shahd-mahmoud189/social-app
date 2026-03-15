import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import PostCard from "../../components/PostCard/PostCard";
import CommentsWrapper from "../../components/CommentsWrapper/CommentsWrapper";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import React from "react";
import SharePostForm from "../../components/SharePostForm/SharePostForm";
import Empty from "../../components/Empty/Empty";

export default function Profile() {
  const { token, userData } = useContext(AuthContext);
  console.log(userData);

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const [postId, setPostId] = useState();
  const [isLiked, setIsLiked] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggle = () => setIsFormOpen(!isFormOpen);

  const [post, setPost] = useState();

  const {
    data: posts,
    isFetched,
    isLoading,
  } = useQuery({
    queryFn: getUserPosts,
    queryKey: ["myPosts"],
    enabled: Boolean(userData),
  });

  async function getUserPosts() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/users/${userData._id}/posts?limit=20`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(data.data.posts);
      return data.data.posts;
    } catch (error) {
      console.log(error.response);
    }
  }

  

  return (
    <>
      <div className="container mx-auto px-4 py-4 lg:max-w-5xl">
        <ProfileSection postsLength={posts?.length} userData={userData} />

        {isLoading && <CardSkeleton />}
        <div className="flex flex-col gap-5">
          {posts?.length === 0&&<><Empty/></>}
          {isFetched &&
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                setIsOpen={setIsOpen}
                setPostId={setPostId}
                toggle={toggle}
                setIsLiked={setIsLiked}
                isLiked={isLiked}
                setPost={setPost}
              />
            ))}
          <CommentsWrapper
            isOpen={isOpen}
            handleClose={handleClose}
            postId={postId}
          />
          <SharePostForm
            toggle={toggle}
            isFormOpen={isFormOpen}
            postId={postId}
            setIsLiked={setIsLiked}
            post={post}
          />
        </div>
      </div>
    </>
  );
}
