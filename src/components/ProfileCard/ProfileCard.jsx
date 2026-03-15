import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function ProfileCard() {

    const { userData } = useContext(AuthContext);

  return (
//     <div className="mt-5 max-w-sm mx-auto overflow-hidden bg-slate-300/50 backdrop-blur-md rounded-3xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all duration-500 group">
  
//   {/* Header/Banner Area with a modern mesh gradient */}
//   <div className="h-32 relative">
//     <div className="absolute inset-0"></div>
    
//     {/* Profile Photo - Overlapping with refined ring */}
//     <div className="absolute -bottom-12 left-6">
//       <div className="relative">
//         <div className="absolute inset-0 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
//         <img
//           src={userData?.photo}
//           alt="Profile"
//           className="relative w-24 h-24 rounded-full border-[6px] border-white shadow-xl object-cover"
//         />
//       </div>
//     </div>
//   </div>

//   {/* Content Section */}
//   <div className="pt-16 pb-8 px-8">
//     <div className="flex justify-between items-start">
//       <div className="space-y-1">
//         {/* Name with tighter tracking and better weight */}
//         <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
//           {userData?.name || "Shahd Mahmoud"}
//         </h1>
        
//         {/* Role/Status Badge */}
//         <div className="flex items-center gap-2">
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
//             {userData?.username}
//           </span>
//         </div>
//       </div>
//     </div>

//     {/* Contact Info with subtle icon-less styling */}
//     <div className="mt-6 pt-6 border-t border-slate-100">
//       <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Contact</p>
//       <p className="text-sm text-slate-600 mt-1 font-medium hover:text-indigo-600 transition-colors cursor-pointer">
//         {userData?.email}
//       </p>
//     </div>
//   </div>
// </div>

<div className=" bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Cover/Banner */}
      <div className="h-20 bg-linear-to-r from-blue-500 to-blue-600" />

      {/* Profile Content */}
      <div className="px-5 pb-5">
        {/* Profile Photo */}
        <div className="relative -mt-12 mb-4">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
            <img
              src={userData?.photo}
              alt="Profile photo"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online Status */}
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        </div>

        {/* User Info */}
        <div className="space-y-1 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{userData?.name}</h2>
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            <i className="fa-solid fa-at text-xs text-blue-500" />
            {userData?.username}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            <i className="fa-solid fa-envelope text-xs text-blue-500" />
            {userData?.email}
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-between py-3 border-t border-b border-gray-100 mb-4">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{userData?.bookmarksCount}</p>
            <p className="text-xs text-gray-500">Bookmarks</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{userData?.followersCount}</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{userData?.followingCount}</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link to={'/profile'} className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors">
            <i className="fa-solid fa-pen-to-square" />
            Edit Profile
          </Link>
          <Link to={'/changePassword'} className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors">
            <i className="fa-solid fa-gear" />
          </Link>
        </div>
      </div>
    </div>
  )
}
