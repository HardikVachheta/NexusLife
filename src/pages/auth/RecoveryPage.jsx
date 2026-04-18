import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { recoverAccount } from "@/services/authService";
import { Link } from "react-router-dom";

const RecoverPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        await recoverAccount(values);
        setSubmitted(true);
      } catch (err) {
        alert(err?.response?.data?.msg || "Recovery failed");
      }
    },
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url('/bg.jpg')` }}
    >
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 sm:p-8 w-full max-w-xs sm:max-w-sm text-white">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Account Recovery</h2>

        {submitted ? (
          <p className="text-center text-green-300 text-sm sm:text-base">
            If the email is registered, a recovery link has been sent.
          </p>
        ) : (
          <>
            <p className="text-sm mb-4 text-center">
              Enter your email address to reset your password
            </p>

            <form onSubmit={formik.handleSubmit}>
              <label className="block mb-4">
                <span className="text-sm">Email</span>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full bg-white/20 text-white px-4 py-2 rounded-md outline-none mt-1 placeholder-gray-200"
                  placeholder="example@mail.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
                )}
              </label>

              <div className="flex justify-between items-center gap-2">
                <Link
                  to="/login"
                  className="w-1/2 text-center border border-white/30 py-2 rounded-md hover:bg-white/10 transition"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  className="w-1/2 bg-white text-blue-800 font-semibold py-2 rounded-md hover:bg-gray-100 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RecoverPage;
