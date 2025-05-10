import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { setCookie } from "../../utils";
import toast from "react-hot-toast";
import { setCredentials } from "../../Store/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", {
        identifier: data.email,
        password: data.password,
      });

      const userData = response.data.data.data.user;
      if (userData.isBanned) {
        toast.error(
          "This account has been banned. Please contact support for assistance."
        );
        return;
      }

      console.log("Login Success:", response.data.data.data.token);
      setCookie("__session", response.data.data.data.token);

      const receivedUser = response.data.data.data.user;
      dispatch(setCredentials(receivedUser)); // Store user data in Redux
      toast.success("Login successful!");

      navigate("/");
    } catch (error) {
      if (
        error.response?.data?.data?.message
          ?.toLowerCase()
          .includes("password") ||
        error.response?.status === 401
      ) {
        toast.error("Password is incorrect. Please try again.");
      } else {
        toast.error(
          error.response?.data?.data?.message ||
            "Login failed. Please try again."
        );
      }
      console.error("Login Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen w-[85%] mx-auto">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://www.swotahtravel.com/_next/image?url=https%3A%2F%2Fapi.swotahtravel.com%2Fimages%2Fblogs%2Fcover%2Ftrekking-in-Nepal.jpg&w=1920&q=75"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-6 text-blue-500">
            <a href="/forgotpassword" className="text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-green-500 text-center">
          <Link to="/guideuserbtn" className="text-decoration-none">
            Sign up Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
