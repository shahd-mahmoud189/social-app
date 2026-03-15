import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [loading, setLoading] = useState();
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const {setToken} = useContext(AuthContext);

  const { register, handleSubmit, formState } = useForm({
    mode: "onsubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function sendData(data) {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://route-posts.routemisr.com/users/signin",
        data
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 ">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-user text-white text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-blue-100 mt-1 text-sm">Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-5" onSubmit={handleSubmit(sendData)}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email2"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
              >
                <i className="fa-solid fa-envelope text-blue-500"></i>
                Your email
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  id="email2"
                  type="email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
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
                Your password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  id="password2"
                  type="password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
              {formState.errors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <span>Login</span>
                </>
              )}
            </button>

            {/* Alert Message */}
            {msg && (
              <div
                className={`p-4 rounded-xl flex items-center gap-3 ${
                  msg === "signed in successfully"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                <i
                  className={`fa-solid ${
                    msg === "signed in successfully"
                      ? "fa-circle-check text-green-500"
                      : "fa-circle-xmark text-red-500"
                  }`}
                ></i>
                <span className="font-medium">{msg}</span>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="px-6 pb-6 pt-2 text-center border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              {"Don't have an account? "}
              <a
                href="/register"
                className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Social Login */}
        
      </div>
    </div>
  );
}
