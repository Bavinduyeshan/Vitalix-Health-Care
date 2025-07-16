import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaHome, FaVenusMars, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
// import hospitalImage from "../../assets/hospital-image.jpg";

export default function PatientRegister() {
  const { state } = useLocation();
  const userId = state?.userId;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    date_of_birth: "",
    address: "",
    gender: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const patientData = {
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      phone: form.phone,
      dateOfBirth: form.date_of_birth,
      address: form.address,
      gender: form.gender,
      userId: userId,
    };

    try {
      const response = await fetch("http://localhost:8083/pateints/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Registration Complete!",
          text: "Your patient profile has been successfully created.",
          showConfirmButton: false,
          timer: 1500,
          background: "#f0f9ff",
          iconColor: "#2563eb",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.error || data.message || "Failed to complete registration",
          confirmButtonColor: "#2563eb",
          background: "#f0f9ff",
          iconColor: "#dc2626",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
        confirmButtonColor: "#2563eb",
        background: "#f0f9ff",
        iconColor: "#dc2626",
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

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Registration Error</h2>
          <p className="text-gray-700 mb-6">No user ID provided. Please complete your account registration first.</p>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

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
            <h2 className="text-4xl font-bold mb-6">Complete Your Patient Profile</h2>
            <p className="text-blue-100 text-lg mb-8">
              Please provide your personal details to complete your patient registration with Vitalix Healthcare.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <FaUser className="text-white" />
                </div>
                <p>Personal information</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <FaEnvelope className="text-white" />
                </div>
                <p>Contact details</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <FaVenusMars className="text-white" />
                </div>
                <p>Demographic information</p>
              </div>
            </div>
          </div>
          
          {/* <img 
            src={hospitalImage} 
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
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Patient Details</h1>
            <p className="text-gray-500 text-center mb-8">
              Please fill in your personal information
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    required
                    placeholder="First name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    required
                    placeholder="Last name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
              </motion.div>
            </div>

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
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBirthdayCake className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="date_of_birth"
                  value={form.date_of_birth}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaHome className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="Full address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">Gender</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaVenusMars className="text-gray-400" />
                </div>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition duration-300"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
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
                    <span className="mr-2">Processing...</span>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <FaArrowRight className="ml-2" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}