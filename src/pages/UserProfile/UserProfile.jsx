import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import CommentsWrapper from "../../components/CommentsWrapper/CommentsWrapper";
import PostCard from "../../components/PostCard/PostCard";
import SharePostForm from "../../components/SharePostForm/SharePostForm";
import Empty from "../../components/Empty/Empty";

export default function UserProfile() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  console.log(id);

  const [isFollowing, setIsFollowing] = useState()
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const [postId, setPostId] = useState();
  const [isLiked, setIsLiked] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggle = () => setIsFormOpen(!isFormOpen);

  const [post, setPost] = useState();

  const { data: userData } = useQuery({
    queryFn: getUserProfile,
    queryKey: ["user", id],
    enabled: Boolean(id),
  });

  async function getUserProfile() {
    try {
      const response = await axios.get(
        `https://route-posts.routemisr.com/users/${id}/profile`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response);
      setIsFollowing(response.data.data.isFollowing)
      
      return response.data.data.user;
    } catch (error) {
      console.log(error);
    }
  }

  const {
    data: posts,
    isFetched,
    isLoading,
  } = useQuery({
    queryFn: getUserPosts,
    queryKey: ["userPosts"],
    enabled: Boolean(userData),
  });

  async function getUserPosts() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/users/${id}/posts?limit=20`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(data.data.posts);
      return data.data.posts;
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="container mx-auto px-4 py-4 lg:max-w-5xl">
      <ProfileSection userData={userData} isFollowing={isFollowing} />
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
  );
}
