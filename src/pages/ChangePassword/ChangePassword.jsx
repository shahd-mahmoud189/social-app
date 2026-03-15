import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ChangePassword() {
  const [loading, setLoading] = useState();
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const {setToken, token} = useContext(AuthContext);

  const schema = z.object({
    password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'requires a mix of uppercase letters, lowercase letters, numbers, and special characters'),
    newPassword:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'requires a mix of uppercase letters, lowercase letters, numbers, and special characters'),
})

  const { register, handleSubmit, formState } = useForm({
    mode: "onsubmit",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver:zodResolver(schema)
  });

  

  async function sendData(data) {
    setLoading(true);
    try {
      const response = await axios.patch(
        "https://route-posts.routemisr.com/users/change-password",
        data,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success == true) {
        console.log(response);
        setToken(response.data.data.token);
        localStorage.setItem('token',response.data.data.token)
        setMsg(response.data.message);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setMsg(error.response.data.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-100 p-8 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-lock text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-white">Change Password</h1>
          </div>
        </div>

        {/* Form */}
        <form
          className="p-6 space-y-5"
          onSubmit={handleSubmit(sendData)}
        >
          {/* Current Password */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <i className="fa-solid fa-key text-gray-400 text-xs"></i>
              Current Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Enter your current password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <i className="fa-solid fa-eye-slash absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"></i>
            </div>
            {formState.errors.password && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <i className="fa-solid fa-circle-exclamation text-xs"></i>
                <span>{formState.errors.password.message}</span>
              </div>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label 
              htmlFor="newPassword" 
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <i className="fa-solid fa-lock text-gray-400 text-xs"></i>
              New Password
            </label>
            <div className="relative">
              <input
                {...register("newPassword")}
                id="newPassword"
                type="password"
                placeholder="Enter your new password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <i className="fa-solid fa-eye-slash absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"></i>
            </div>
            {formState.errors.newPassword && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <i className="fa-solid fa-circle-exclamation text-xs"></i>
                <span>{formState.errors.newPassword.message}</span>
              </div>
            )}
          </div>

        

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Updating...</span>
              </div>
            ) : (
              <>
                <i className="fa-solid fa-shield-check"></i>
                <span>Update Password</span>
              </>
            )}
          </button>

          {/* Success/Error Message */}
          {msg && (
            <div
              className={`flex items-center gap-3 p-4 rounded-xl ${
                msg === "password changed successfully"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              <i
                className={`fa-solid ${
                  msg === "password changed successfully"
                    ? "fa-circle-check text-green-500"
                    : "fa-circle-xmark text-red-500"
                }`}
              ></i>
              <span className="font-medium">{msg}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
