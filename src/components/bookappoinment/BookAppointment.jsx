import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function BookAppointment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const initialPatientId = state?.patientId;

  const [formData, setFormData] = useState({
    patientId: initialPatientId || '',
    doctorId: '',
    date: '',
    time: '',
    reason: '',
  });

  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: null, error: null });
  const [doctors, setDoctors] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const token = localStorage.getItem("token");

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 123, 255, 0.3)" },
    tap: { scale: 0.98 },
  };

  // Fetch patientId if not provided via state
  const fetchPatientId = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }
      const response = await fetch(`http://localhost:8083/pateints/patient/byUserId/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Patient Data:", data); // Debug log
        setFormData((prev) => ({ ...prev, patientId: data.patientId }));
      } else if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      } else if (response.status === 404) {
        setFetchError("No patient record found. Please register as a patient first.");
        // Optionally redirect to patient registration
        // navigate("/patient-register");
      } else {
        throw new Error("Failed to fetch patient ID");
      }
    } catch (error) {
      console.error("Error fetching patient ID:", error);
      setFetchError("Error fetching patient ID: " + error.message);
      if (error.message.includes("Unauthorized")) {
        navigate("/login");
      }
    }
  };

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8082/doctors/getAll', {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      } else {
        throw new Error("Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setFetchError("Error fetching doctors: " + error.message);
      if (error.message.includes("Unauthorized")) {
        navigate("/login");
      }
    }
  };

  // Check authentication and fetch data on mount
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!initialPatientId) {
      fetchPatientId();
    } else {
      setFormData((prev) => ({ ...prev, patientId: initialPatientId }));
    }

    fetchDoctors();
  }, [token, initialPatientId, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: null, error: null });

    try {
      const appointmentData = {
        patientID: formData.patientId,
        doctorID: formData.doctorId,
        appoinment_Date: formData.date,  // Corrected to match backend
        appoinment_Time: `${formData.time}:00`,  // Add seconds to match HH:mm:ss
        reason: formData.reason,
      };

      const response = await fetch('http://localhost:8086/appoinments/add', { // Corrected typo
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        setSubmitStatus({ 
          loading: false, 
          success: "Your appointment has been successfully scheduled.", 
          error: null 
        });
        setFormData({ 
          patientId: formData.patientId,
          doctorId: '', 
          date: '', 
          time: '', 
          reason: '' 
        });
        setTimeout(() => navigate("/profile"), 2000);
      } else if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      } else {
        throw new Error("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      setSubmitStatus({ 
        loading: false, 
        success: null, 
        error: "Error scheduling appointment: " + error.message 
      });
      if (error.message.includes("Unauthorized")) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans py-6 md:py-10">
      <motion.div
        className="w-[95%] sm:w-[90%] max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="bg-blue-600 p-6 md:p-8 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide"
            variants={formVariants}
          >
            Schedule an Appointment
          </motion.h1>
          <motion.p
            className="text-blue-100 text-sm sm:text-base mt-2"
            variants={formVariants}
          >
            Unity Health Care - Compassionate Care, Expert Solutions
          </motion.p>
        </div>

        {/* Appointment Form */}
        <motion.div
          className="p-6 sm:p-8 md:p-10"
          variants={formVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient ID Display */}
            <div>
              <label className="block text-gray-800 font-medium text-base sm:text-lg mb-2">
                Your Patient ID
              </label>
              <input
                type="text"
                name="patientId"
                value={formData.patientId || 'Fetching...'}
                className="w-full p-3 rounded-md border border-gray-300 bg-gray-100 text-gray-700"
                disabled
              />
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-gray-800 font-medium text-base sm:text-lg mb-2">
                Physician <span className="text-red-500">*</span>
              </label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 bg-gray-50"
                required
              >
                <option value="">Select a Physician</option>
                {doctors.map((doctor) => (
                  <option 
                    key={doctor.doctor_Id} 
                    value={doctor.doctor_Id} 
                  >
                    Dr. {doctor.firstname} {doctor.lastname} - {doctor.specialization || doctor.specilization || 'N/A'}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-gray-800 font-medium text-base sm:text-lg mb-2">
                Appointment Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 bg-gray-50"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-gray-800 font-medium text-base sm:text-lg mb-2">
                Appointment Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 bg-gray-50"
                required
              />
            </div>

            {/* Reason for Visit */}
            <div>
              <label className="block text-gray-800 font-medium text-base sm:text-lg mb-2">
                Reason for Visit
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 bg-gray-50 resize-none"
                rows="3"
                placeholder="Please provide a brief description of your visit..."
              />
            </div>

            {/* Fetch Error Message */}
            {fetchError && (
              <motion.p
                className="text-red-700 text-center text-base sm:text-lg bg-red-50 p-3 rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {fetchError}
              </motion.p>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <motion.button
                type="submit"
                className="bg-blue-600 text-white font-medium px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={submitStatus.loading || !formData.patientId}
              >
                {submitStatus.loading ? "Processing..." : "Confirm Appointment"}
              </motion.button>
              <Link to="/profile">
                <motion.button
                  className="bg-gray-400 text-white font-medium px-6 py-3 rounded-md shadow-md hover:bg-gray-500 transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Cancel
                </motion.button>
              </Link>
            </div>

            {/* Status Messages */}
            {submitStatus.success && (
              <motion.p
                className="text-green-700 text-center text-base sm:text-lg bg-green-50 p-3 rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {submitStatus.success}
              </motion.p>
            )}
            {submitStatus.error && (
              <motion.p
                className="text-red-700 text-center text-base sm:text-lg bg-red-50 p-3 rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {submitStatus.error}
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Back to Profile Link */}
        <motion.div
          className="p-6 md:p-8 text-center border-t border-gray-200"
          variants={formVariants}
        >
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-base sm:text-lg font-medium transition-colors duration-300">
            Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}