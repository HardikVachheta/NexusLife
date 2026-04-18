import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { register } from "@/services/authService";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin }  = useAuth(); 

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values) => {
      try {
        const { name, email, password } = values;
        await register({ name, email, password }).then(res => {
          console.log("Register user :",res.data)
          authLogin(res.data.token, res.data.user); // save user info
          toast.success('🎉 Account created successfully!');
          setTimeout(() => navigate("/"), 1500);
        });
        // await register({ name, email, password });
        // toast.success('🎉 Account created successfully!');
        // setTimeout(() => navigate("/"), 1500);
      } catch (err) {
        toast.error(err?.response?.data?.msg || "Registration failed");
      }
    }
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url('/bg.jpg')` }}
    >
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 sm:p-8 w-full max-w-xs sm:max-w-sm text-white">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full bg-white/20 text-white px-3 py-2 sm:py-2.5 rounded-md outline-none placeholder-gray-200"
              placeholder="John Doe"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full bg-white/20 text-white px-3 py-2 sm:py-2.5 rounded-md outline-none placeholder-gray-200"
              placeholder="example@mail.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full bg-white/20 text-white px-3 py-2 sm:py-2.5 rounded-md pr-10 outline-none placeholder-gray-200"
                placeholder="Create a password"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="w-full bg-white/20 text-white px-3 py-2 sm:py-2.5 rounded-md pr-10 outline-none placeholder-gray-200"
                placeholder="Repeat password"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-white text-blue-800 font-semibold py-2 sm:py-2.5 rounded-md hover:bg-gray-100 transition disabled:opacity-50"
          >
            {formik.isSubmitting ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="underline text-white">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
