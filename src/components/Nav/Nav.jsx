import { useContext, useState } from "react";
import { Link,  NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import React from "react";

export default function Nav() {

  const {token, setToken, userData} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  function logOut(){
    setToken(null);
    localStorage.removeItem('token')
  }

  return (
     <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <i className="fa-solid fa-users text-2xl text-blue-500"></i>
            <span className="text-xl font-bold text-gray-900">Social App</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {token && (
              <>
                <Link
                  to="/"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                >
                  <i className="fa-solid fa-globe"></i>
                  <span>Community</span>
                </Link>
                <Link
                  to="/feed"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                >
                  <i className="fa-solid fa-newspaper"></i>
                  <span>Feed</span>
                </Link>
                <Link
                  to="/saved"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                >
                  <i className="fa-solid fa-bookmark"></i>
                  <span>Saved Posts</span>
                </Link>
                <Link
                  to="/notifications"
                  className="relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                >
                  <i className="fa-solid fa-bell"></i>
                  <span>Notifications</span>
                </Link>
              </>
            )}
            {!token && (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                >
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600"
                >
                  <i className="fa-solid fa-user-plus"></i>
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Right Side - User Dropdown & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* User Dropdown - Only when logged in */}
            {token && (
              <div className="group relative">
                <button className="flex items-center gap-2 rounded-full border-2 border-gray-200 p-0.5 transition-all hover:border-blue-500">
                  <img
                    src={userData?.photo || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                    alt="User settings"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                </button>

                {/* Dropdown Menu */}
                <div className="invisible absolute right-0 top-full mt-2 w-56 origin-top-right scale-95 transform rounded-2xl border border-gray-100 bg-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  {/* User Info Header */}
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {userData && userData.name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {userData && userData.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    >
                      <i className="fa-solid fa-user w-4 text-center text-gray-400"></i>
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/changePassword"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    >
                      <i className="fa-solid fa-gear w-4 text-center text-gray-400"></i>
                      <span>Settings</span>
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-gray-100 py-2">
                    <Link
                      to="/login"
                      onClick={() => logOut && logOut()}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                      <i className="fa-solid fa-right-from-bracket w-4 text-center"></i>
                      <span>Sign out</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Menu Toggle - Always visible on mobile */}
            <button
              onClick={toggle}
              className="rounded-lg p-2 text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600 md:hidden"
            >
              <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`border-t border-gray-100 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="space-y-1 px-4 py-3">
          {token && (
            <>
              <Link
                onClick={() => setIsOpen(false)}
                to="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
              >
                <i className="fa-solid fa-globe w-5 text-center"></i>
                <span>Community</span>
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/feed"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
              >
                <i className="fa-solid fa-newspaper w-5 text-center"></i>
                <span>Feed</span>
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/saved"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
              >
                <i className="fa-solid fa-bookmark w-5 text-center"></i>
                <span>Saved Posts</span>
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/notifications"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
              >
                <i className="fa-solid fa-bell w-5 text-center"></i>
                <span>Notifications</span>
              </Link>
            </>
          )}
          {!token && (
            <>
              <Link
                onClick={() => setIsOpen(false)}
                to="/login"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
              >
                <i className="fa-solid fa-right-to-bracket w-5 text-center"></i>
                <span>Login</span>
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/register"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
              >
                <i className="fa-solid fa-user-plus w-5 text-center"></i>
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
