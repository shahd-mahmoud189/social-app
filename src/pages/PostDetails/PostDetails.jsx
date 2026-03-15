import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import axios from "axios";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { AuthContext } from "../../context/AuthContext";
import CommentsWrapper from "../../components/CommentsWrapper/CommentsWrapper";
import SharePostForm from "../../components/SharePostForm/SharePostForm";

export default function PostDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggle = () => setIsFormOpen(!isFormOpen);

  const [postId, setPostId] = useState();
  const [post, setPost] = useState();

  const { data, isFetched, isLoading } = useQuery({
    queryFn: getSinglePost,
    queryKey: ["onePost", id],
    enabled: Boolean(id),
  });

  async function getSinglePost() {
    try {
      const response = await axios.get(
        `https://route-posts.routemisr.com/posts/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response);
      // setPostId(post._id)
      return response.data.data.post;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container mx-auto w-full md:w-150 py-4">
        {isLoading && <CardSkeleton />}
        {isFetched && (
          <PostCard
            post={data}
            setIsOpen={setIsOpen}
            setPostId={setPostId}
            toggle={toggle}
            setIsLiked={setIsLiked}
            isLiked={isLiked}
            setPost={setPost}
          />
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
    </>
  );
}
