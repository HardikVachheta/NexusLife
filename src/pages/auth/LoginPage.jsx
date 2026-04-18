import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "@/services/authService";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await login(values); 
        console.log("Login success:", res);
        authLogin(res.data.token, res.data.user); // ✅ Proper login call via context
        toast.success("Login successful!");
        navigate("/");
      } catch (err) {
        toast.error(err.response?.data?.msg || "Login failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url('/bg.jpg')` }}
    >
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 sm:p-8 w-full max-w-xs sm:max-w-sm text-white">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm sm:text-base">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="you@example.com"
              className="w-full bg-white/20 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-md outline-none placeholder-gray-200"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm sm:text-base">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter your password"
                className="w-full bg-white/20 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-md outline-none pr-10 placeholder-gray-200"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Extras */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-sm sm:text-base gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5" /> Remember me
            </label>
            <Link to="/recovery" className="hover:underline text-white">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-white text-blue-800 font-semibold py-2.5 sm:py-3 rounded-md hover:bg-gray-100 transition disabled:opacity-50"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm sm:text-base mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline text-white">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
