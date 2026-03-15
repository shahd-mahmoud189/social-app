import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BallTriangle, Rings } from "react-loader-spinner";
import NotificationSkeleton from "../../components/NotificationSkeleton/NotificationSkeleton";
import { Link } from "react-router-dom";
import Empty from "../../components/Empty/Empty";

export default function Notifications() {
  const { token } = useContext(AuthContext);

  async function getNotifications() {
    try {
      const response = await axios.get(
        `https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response.data.data.notifications);

      return response.data.data.notifications;
    } catch (error) {
      console.log(error.response);
    }
  }

  const {
    data: notifications,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["allnotifications"],
    queryFn: getNotifications,
  });

  async function getUnreadCount() {
    try {
      const response = await axios.get(
        `https://route-posts.routemisr.com/notifications/unread-count`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response.data.data.unreadCount);

      return response.data.data.unreadCount;
    } catch (error) {
      console.log(error.response);
    }
  }

  const { data: count } = useQuery({
    queryKey: ["count"],
    queryFn: getUnreadCount,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      console.log("successssss");
      queryClient.invalidateQueries(["allnotifications"]);
      queryClient.invalidateQueries(["count"]);
    },
    onError: () => {
      console.log("errorrrrrrr");
    },
  });

  async function markAsRead(id) {
    try {
      const response = await axios.patch(
        `https://route-posts.routemisr.com/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response.data.data.notification);

      return response.data.data.notification;
    } catch (error) {
      console.log(error.response);
    }
  }

  const { mutate: mutateAll } = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      console.log("successssss");
      queryClient.invalidateQueries(["allnotifications"]);
      queryClient.invalidateQueries(["count"]);
    },
    onError: () => {
      console.log("errorrrrrrr");
    },
  });

  async function markAllAsRead() {
    try {
      const response = await axios.patch(
        `https://route-posts.routemisr.com/notifications/read-all`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Modern Header Section */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Notifications
                <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                  {count} New
                </span>
              </h1>
              <p className="text-slate-500 font-medium">
                Manage your latest interactions
              </p>
            </div>

            <button
              onClick={() => mutateAll()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:shadow-sm transition-all active:scale-95"
            >
              <i className="fa-solid fa-check-double text-blue-600"></i>
              <span>Mark all read</span>
            </button>
          </header>

          {/* Filter Tabs */}

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications?.length === 0&&<><Empty/></>}
            {isLoading && (
              <>
                <NotificationSkeleton/>
              </>
            )}
            {notifications?.map((n) => (
              <div
                key={n._id}
                className={`group relative flex items-start gap-5 p-5 rounded-4xl transition-all duration-500 border-2 bg-white border-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)]`}
              >
                {/* Profile Wrapper */}
                <div className="relative shrink-0">
                  <img
                    src={n.actor.photo}
                    alt={n.actor.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50 group-hover:ring-blue-50 transition-all shadow-md"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                        {n.actor.name}
                      </h3>
                      <Link to={`/postDetails/${n.entityId}`} className="text-sm font-semibold text-slate-500 capitalize">
                        {n.type}
                      </Link>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter italic">
                        {new Date(n.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>

                      {/* Mark as Read Button */}
                      <button
                        onClick={() => mutate(n._id)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all duration-300"
                      >
                        <i className="fa-solid fa-check"></i>
                        <span>Read</span>
                      </button>
                    </div>
                  </div>

                  {n.entity.body && (
                    <div className="relative p-4 bg-slate-50 rounded-2xl text-sm text-slate-600 font-medium leading-relaxed border border-slate-100">
                      "{n.entity.body}"
                    </div>
                  )}
                </div>

                {/* Unread Indicator Glow */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
