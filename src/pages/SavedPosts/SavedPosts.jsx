import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import PostCard from "../../components/PostCard/PostCard";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import CommentsWrapper from "../../components/CommentsWrapper/CommentsWrapper";
import SuggestedFriends from "../../components/SuggestedFriends/SuggestedFriends";
import SharePostForm from "../../components/SharePostForm/SharePostForm";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Empty from "../../components/Empty/Empty";

export default function SavedPosts() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggle = () => setIsFormOpen(!isFormOpen);

  const [postId, setPostId] = useState();
  const [post, setPost] = useState();
  const [isLiked, setIsLiked] = useState(false);

  const { token } = useContext(AuthContext);

  const {
    data: bookmarks,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["allbookmarks"],
    queryFn: getBookmarks,
  });

  async function getBookmarks() {
    try {
      const response = await axios.get(
        "https://route-posts.routemisr.com/users/bookmarks",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response.data.data.bookmarks);

      return response.data.data.bookmarks;
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-10 mx-8">
        <div className="hidden lg:block lg:col-span-1 mt-4"><ProfileCard/></div>
        <div className="lg:col-span-2 mt-4">
          {isLoading && <CardSkeleton />}
          {bookmarks?.length === 0&&<><Empty/></>}
          {isFetched &&
            bookmarks.map(
              (post) =>
                (
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
                ),
            )}
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
        <div className="lg:col-span-1 order-first lg:order-1">
          <SuggestedFriends />
        </div>
      </div>
    </>
  );
}
