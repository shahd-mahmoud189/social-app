import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Label, Radio, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "../../validation/RegisterSchema";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState();
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    mode: "onsubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  async function sendData(data) {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://route-posts.routemisr.com/users/signup",
        data
      );
      if (response.data.success === true) {
        setMsg(response.data.message);
        console.log(response);
        
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMsg(error.response.data.message || "Something went wrong!");
      console.log(error.response.data);
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-user-plus text-white text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-blue-100 mt-1">Join our community today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(sendData)} className="p-6 space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
              >
                <i className="fa-solid fa-user text-blue-500"></i>
                Name
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
              {formState.errors.name && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
              >
                <i className="fa-solid fa-user text-blue-500"></i>
                Username
              </label>
              <input
                {...register("username")}
                id="username"
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
              />
              {formState.errors.username && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {formState.errors.username.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email2"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
              >
                <i className="fa-solid fa-envelope text-blue-500"></i>
                Email
              </label>
              <input
                {...register("email")}
                id="email2"
                type="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
              {formState.errors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password2"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
              >
                <i className="fa-solid fa-lock text-blue-500"></i>
                Password
              </label>
              <input
                {...register("password")}
                id="password2"
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Create a password"
              />
              {formState.errors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Repeat Password Field */}
            <div>
              <label
                htmlFor="repeat-password"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
              >
                <i className="fa-solid fa-lock text-blue-500"></i>
                Repeat password
              </label>
              <input
                {...register("rePassword")}
                id="repeat-password"
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Confirm your password"
              />
              {formState.errors.rePassword && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {formState.errors.rePassword.message}
                </p>
              )}
            </div>

            {/* Date of Birth Field */}
            <div>
              <label
                htmlFor="dob"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
              >
                <i className="fa-solid fa-calendar text-blue-500"></i>
                Date of birth
              </label>
              <input
                {...register("dateOfBirth")}
                id="dob"
                type="date"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {formState.errors.dateOfBirth && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {formState.errors.dateOfBirth.message}
                </p>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <i className="fa-solid fa-venus-mars text-blue-500"></i>
                Gender
              </label>
              <div className="flex gap-6">
                <label
                  htmlFor="male"
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      {...register("gender")}
                      id="male"
                      name="gender"
                      value="male"
                      type="radio"
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-200 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                    </div>
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                    <i className="fa-solid fa-mars mr-1"></i> Male
                  </span>
                </label>
                <label
                  htmlFor="female"
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      {...register("gender")}
                      id="female"
                      name="gender"
                      value="female"
                      type="radio"
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-200 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                    </div>
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                    <i className="fa-solid fa-venus mr-1"></i> Female
                  </span>
                </label>
              </div>
              {formState.errors.gender && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {formState.errors.gender.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin text-xl"></i>
              ) : (
                <>
                  <i className="fa-solid fa-user-plus"></i>
                  Register new account
                </>
              )}
            </button>

            {/* Alert Message */}
            {msg && (
              <div
                className={`p-4 rounded-xl flex items-center gap-3 ${
                  msg === "account created"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                <i
                  className={`fa-solid ${
                    msg === "account created"
                      ? "fa-circle-check text-green-500"
                      : "fa-circle-xmark text-red-500"
                  } text-lg`}
                ></i>
                <span className="font-medium">{msg}</span>
              </div>
            )}

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By registering, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
