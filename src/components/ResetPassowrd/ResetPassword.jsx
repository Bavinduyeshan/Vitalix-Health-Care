import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function ResetPassword() {
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get("token");
    if (resetToken) {
      setToken(resetToken);
    } else {
      setError("Invalid or missing reset token. Please request a new password reset link.");
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password strength (optional)
    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const resetData = {
      token: token,
      newPassword: form.newPassword,
    };

    try {
      const response = await fetch("http://localhost:8080/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetData),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Password Reset Successful!",
          text: "Your password has been updated. You can now log in with your new password.",
          showConfirmButton: true,
        });
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Reset Password Error:", data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || data.message || "Failed to reset password.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
        showConfirmButton: true,
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-blue-900 opacity-50"></div>

      <motion.div
        className="relative bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-md w-full z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          Reset Password
        </h2>

        {error && (
          <motion.div
            className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
              placeholder="Enter your new password"
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
              placeholder="Confirm your new password"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={fieldVariants}
            disabled={!token} // Disable button if token is missing
          >
            Reset Password
          </motion.button>
        </form>

        <p className="text-gray-600 text-center mt-6">
          Back to{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}