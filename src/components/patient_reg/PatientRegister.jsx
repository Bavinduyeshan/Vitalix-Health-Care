import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; // Added for animations

export default function PatientRegister() {
  const { state } = useLocation();
  const userId = state?.userId;
  const navigate = useNavigate();

  console.log("PatientRegister - userId from state:", userId);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    date_of_birth: "",
    address: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    console.log("Submitting patient data:", patientData);

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
        Swal.fire({
          icon: "success",
          title: "Patient Registration Successful!",
          text: "You have been successfully registered.",
          showConfirmButton: false,
          timer: 1500,
          background: "#f0f9ff", // Light blue background
          iconColor: "#2563eb", // Blue icon
        });
        console.log("Patient Registration Success:", data);
        navigate("/login");
      } else {
        console.error("Patient Registration Error:", data);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.error || data.message,
          showConfirmButton: true,
          confirmButtonColor: "#2563eb",
          background: "#f0f9ff",
          iconColor: "#dc2626",
        });
      }
    } catch (error) {
      console.error("Error during patient registration:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
        showConfirmButton: true,
        confirmButtonColor: "#2563eb",
        background: "#f0f9ff",
        iconColor: "#dc2626",
      });
    }
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for form fields
  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (!userId) {
    return <div className="text-center text-red-500 mt-10">Error: No user ID provided. Please register a user first.</div>;
  }

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
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-blue-900 opacity-50 h-[103vh]"></div>

      <motion.div
        className="relative bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-md w-full z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">Patient Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
              placeholder="Enter your first name"
            />
          </motion.div>
          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
              placeholder="Enter your last name"
            />
          </motion.div>
          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
              placeholder="Enter your email"
            />
          </motion.div>
          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
              placeholder="Enter your phone number"
            />
          </motion.div>
          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
            />
          </motion.div>
          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
              placeholder="Enter your address"
            />
          </motion.div>
          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={fieldVariants}
          >
            Submit Patient Details
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}