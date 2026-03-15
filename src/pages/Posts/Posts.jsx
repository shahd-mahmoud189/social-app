import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import PostCard from "../../components/PostCard/PostCard";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import CommentsWrapper from "../../components/CommentsWrapper/CommentsWrapper";
import SharePostForm from "../../components/SharePostForm/SharePostForm";
import SuggestedFriends from "../../components/SuggestedFriends/SuggestedFriends";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Empty from "../../components/Empty/Empty";

export default function Posts() {
  const [isLiked, setIsLiked] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggle = () => setIsFormOpen(!isFormOpen);

  const [postId, setPostId] = useState();
  const [post, setPost] = useState();

  const { token } = useContext(AuthContext);

  const {
    data: posts,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getPosts,
  });

  async function getPosts() {
    try {
      const response = await axios.get(
        "https://route-posts.routemisr.com/posts?limit=50",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response.data.data.posts);

      return response.data.data.posts;
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      {/* أضفنا overflow-hidden للمنع، وقمنا بتعديل الـ mx-8 إلى px-4 ليكون أكثر أماناً */}
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-10 px-4 md:px-8 max-w-full overflow-x-hidden">
        {/* العمود الأيسر (فارغ في الشاشات الكبيرة) - مخفي في الموبايل لعدم حجز مساحة */}
        <div className="hidden lg:block lg:col-span-1 mt-4">
          <ProfileCard />
        </div>

        {/* العمود الأوسط (المنشورات) */}
        <div className="col-span-1 lg:col-span-2 w-full max-w-full">
          <AddPostForm />

          {isLoading && <CardSkeleton />}
          
          <div className="flex flex-col gap-5">
            
            {" "}
            {posts?.length === 0&&<><Empty/></>}
            {/* إضافة container للمنشورات لضمان التنسيق */}
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
          </div>

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

        {/* عمود الاقتراحات - يظهر في الأول في الموبايل وفي مكانه في الكبير */}
        <div className="col-span-1 lg:col-span-1 order-first lg:order-last mb-5 lg:mb-0">
          <SuggestedFriends />
        </div>
      </div>
    </>
  );
}
