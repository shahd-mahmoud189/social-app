import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function SuggestedFriends() {
  const { token } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState();

  const toggle = () => setIsOpen(!isOpen);
  const queryClient = useQueryClient();
  const {
    data: suggestions,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["suggestions"],
    queryFn: getSuggestions,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: follow,
    onSuccess: () => {
      console.log("successssss");
      queryClient.invalidateQueries(["suggestions"]);
    },
    onError: () => {
      console.log("errorrrrrrr");
    },
  });

  async function getSuggestions() {
    try {
      const response = await axios.get(
        "https://route-posts.routemisr.com/users/suggestions?limit=10",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response.data.data.suggestions);

      return response.data.data.suggestions;
    } catch (error) {
      console.log(error);
    }
  }

  async function follow(id) {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="flex justify-center items-start mt-4">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden" >
        {/* Header with gradient */}
        <div className=" px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-user-group text-lg text-blue-500"></i>
              <h2 className="text-lg font-bold ">
                Suggested Friends
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-blue-100 font-semibold px-2.5 py-0.5 rounded-full text-sm">
                {suggestions?.length || 0}
              </span>
              <button
                onClick={() => toggle()}
                className=" cursor-pointer font-medium text-sm transition-colors"
              >
                {isOpen ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Friends List */}
        <div className={`p-4 ${isOpen ? "block" : "hidden"}`}>
          <div className="space-y-3">
            {suggestions?.length === 0&&<><Empty/></>}
            {suggestions?.map((suggestion) => (
              <div
                key={suggestion._id}
                className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={suggestion.photo}
                      alt={suggestion.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <i className="fa-solid fa-plus text-white text-[8px]"></i>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/userProfile/${suggestion._id}`} className="font-semibold text-gray-900 truncate">
                      {suggestion.name}
                    </Link>
                  </div>

                  {/* Follow Button */}
                  <button
                    onClick={() => mutate(suggestion._id)}
                    className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    {/* <i className="fa-solid fa-user-plus text-xs"></i> */}
                    {/* <span>Follow</span> */}
                    {isPending ? (
                      'Following...'
                    ) : (
                      <><i className="fa-solid fa-user-plus text-xs"></i>
                      Follow</>
                    )}
                  </button>
                </div>

                {/* Stats Badges */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                  <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                    <i className="fa-solid fa-users text-gray-400"></i>
                    {suggestion.followersCount} followers
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full">
                    <i className="fa-solid fa-user-check text-blue-500"></i>
                    {suggestion.mutualFollowersCount} mutual
                  </span>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  );
}
