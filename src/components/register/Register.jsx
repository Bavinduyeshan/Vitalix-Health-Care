import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaUserShield, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import doctorImage from "../../assets/patietnfront.avif";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "PATIENT",
    email: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "confirmPassword") {
      setPasswordMatch(value === form.password);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!passwordMatch) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match!",
        confirmButtonColor: "#3b82f6",
      });
      setIsLoading(false);
      return;
    }

    const userData = {
      username: form.username,
      password: form.password,
      role: form.role,
      email: form.email,
    };

    try {
      const registerResponse = await fetch("http://localhost:8080/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const registerText = await registerResponse.text();
      let registerData;
      try {
        registerData = JSON.parse(registerText);
      } catch {
        registerData = { message: registerText };
      }

      if (registerResponse.ok) {
        await Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have been successfully registered.",
          showConfirmButton: false,
          timer: 1500,
          background: "#f0f9ff",
          iconColor: "#2563eb",
        });

        const fetchUserResponse = await fetch(
          `http://localhost:8080/users/byUsername/${form.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (fetchUserResponse.ok) {
          const fetchUserData = await fetchUserResponse.json();
          const userId = fetchUserData.id;

          if (userId && form.role === "PATIENT") {
            navigate("/patient-register", { state: { userId } });
          } else {
            navigate("/");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch user ID. Redirecting to home.",
            confirmButtonColor: "#3b82f6",
          });
          navigate("/");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: registerData.error || registerData.message || "Unknown error occurred",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setIsLoading(false);
    }
  };

 // ✅ Animation variants (Fixed easing issue)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99], // ✅ fixed here
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99] // ✅ fixed here
    }
  }
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
  tap: { scale: 0.98 }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Left Side - Illustration */}
        <motion.div 
          className="hidden md:flex flex-col justify-center p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating circles */}
          <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-white/10 blur-xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-white/15 blur-xl animate-float-medium" />
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Join Vitalix Healthcare</h2>
            <p className="text-blue-100 text-lg mb-8">
              Create your account to access personalized healthcare services, manage appointments, and view medical records.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <FaUser className="text-white" />
                </div>
                <p>Easy account creation</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <FaLock className="text-white" />
                </div>
                <p>Secure data protection</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <FaUserShield className="text-white" />
                </div>
                <p>Role-based access control</p>
              </div>
            </div>
          </div>
          
          {/* <img 
            src={doctorImage} 
            alt="Healthcare professional" 
            className="absolute bottom-0 right-0 w-64 opacity-90"
          /> */}
        </motion.div>

        {/* Right Side - Registration Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <FaUser className="text-blue-600 text-2xl" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-500 text-center mb-8">
              Fill in your details to get started
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ${
                    !passwordMatch ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {!passwordMatch && (
                <p className="text-red-500 text-sm mt-2">Passwords do not match</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">Role</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserShield className="text-gray-400" />
                </div>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition duration-300"
                >
                  <option value="PATIENT">Patient</option>
                  <option value="DOCTOR">Doctor</option>
                </select>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <span className="mr-2">Creating account...</span>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <span>Register Now</span>
                    <FaArrowRight className="ml-2" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-8 text-center">
            <p className="text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
              >
                Sign in here
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}