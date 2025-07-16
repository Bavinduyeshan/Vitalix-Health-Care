import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  CalendarIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  HomeIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon as ClockOutlineIcon
} from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import heroBanner from "../../assets/healthcareBook.jpg"; // Replace with a vibrant healthcare SVG

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
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
        setFormData((prev) => ({ ...prev, patientId: data.patientId }));
      } else if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      } else if (response.status === 404) {
        setFetchError("No patient record found. Please register as a patient first.");
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
        appoinment_Date: formData.date,
        appoinment_Time: `${formData.time}:00`,
        reason: formData.reason,
      };

      const response = await fetch('http://localhost:8086/appoinments/add', {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 font-sans py-8 md:py-12 relative overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="w-[95%] sm:w-[90%] max-w-6xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border-t-4 border-gradient-to-r from-teal-500 to-blue-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div className="text-center md:text-left" variants={cardVariants}>
              <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 mb-4 tracking-tight">
                Schedule Your Appointment
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Book with ease and connect with top healthcare professionals at Unity Health Care.
              </p>
              <motion.button
                onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                data-tooltip-id="start-booking"
                data-tooltip-content="Start booking your appointment"
              >
                Book Now
              </motion.button>
            </motion.div>
            <motion.img
              src={heroBanner}
              alt="Healthcare Booking"
              className="w-48 md:w-64 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              variants={cardVariants}
            />
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="w-[95%] sm:w-[90%] max-w-6xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-extrabold text-teal-800 text-center mb-8">Why Book with Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: HeartIcon,
              title: "Expert Care",
              description: "Access a network of highly qualified doctors and specialists.",
            },
            {
              icon: ClockOutlineIcon,
              title: "Flexible Scheduling",
              description: "Choose appointments that fit your busy lifestyle.",
            },
            {
              icon: ShieldCheckIcon,
              title: "Secure & Private",
              description: "Your data is protected with state-of-the-art security.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-teal-500"
              variants={cardVariants}
            >
              <div className="flex items-center mb-4">
                <benefit.icon className="w-8 h-8 text-teal-600 mr-3" />
                <h3 className="text-xl font-bold text-teal-800">{benefit.title}</h3>
              </div>
              <p className="text-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Booking Form Section */}
      <motion.section
        id="booking-form"
        className="w-[95%] sm:w-[90%] max-w-3xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border-t-4 border-teal-500">
          <motion.h2
            className="text-3xl font-extrabold text-teal-800 mb-6 text-center"
            variants={cardVariants}
          >
            Book Your Appointment
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient ID Display */}
            <motion.div variants={cardVariants}>
              <label className="block text-teal-800 font-semibold text-lg mb-2" htmlFor="patientId">
                Your Patient ID
              </label>
              <div className="relative">
                <UserIcon className="absolute w-6 h-6 text-teal-600 top-1/2 transform -translate-y-1/2 left-3" />
                <input
                  type="text"
                  id="patientId"
                  name="patientId"
                  value={formData.patientId || 'Fetching...'}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  disabled
                  aria-label="Patient ID"
                />
              </div>
            </motion.div>

            {/* Doctor Selection */}
            <motion.div variants={cardVariants}>
              <label className="block text-teal-800 font-semibold text-lg mb-2" htmlFor="doctorId">
                Physician <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <UserIcon className="absolute w-6 h-6 text-teal-600 top-1/2 transform -translate-y-1/2 left-3" />
                <select
                  id="doctorId"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 appearance-none"
                  required
                  aria-label="Select Physician"
                  data-tooltip-id="doctor-select"
                  data-tooltip-content="Choose a physician for your appointment"
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
            </motion.div>

            {/* Date Selection */}
            <motion.div variants={cardVariants}>
              <label className="block text-teal-800 font-semibold text-lg mb-2" htmlFor="date">
                Appointment Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CalendarIcon className="absolute w-6 h-6 text-teal-600 top-1/2 transform -translate-y-1/2 left-3" />
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  min={new Date().toISOString().split("T")[0]}
                  required
                  aria-label="Appointment Date"
                  data-tooltip-id="date-select"
                  data-tooltip-content="Select the date for your appointment"
                />
              </div>
            </motion.div>

            {/* Time Selection */}
            <motion.div variants={cardVariants}>
              <label className="block text-teal-800 font-semibold text-lg mb-2" htmlFor="time">
                Appointment Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <ClockIcon className="absolute w-6 h-6 text-teal-600 top-1/2 transform -translate-y-1/2 left-3" />
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  required
                  aria-label="Appointment Time"
                  data-tooltip-id="time-select"
                  data-tooltip-content="Select the time for your appointment"
                />
              </div>
            </motion.div>

            {/* Reason for Visit */}
            <motion.div variants={cardVariants}>
              <label className="block text-teal-800 font-semibold text-lg mb-2" htmlFor="reason">
                Reason for Visit
              </label>
              <div className="relative">
                <DocumentTextIcon className="absolute w-6 h-6 text-teal-600 top-4 left-3" />
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 resize-none"
                  rows="4"
                  placeholder="Please provide a brief description of your visit..."
                  aria-label="Reason for Visit"
                  data-tooltip-id="reason-input"
                  data-tooltip-content="Describe the reason for your appointment"
                />
              </div>
            </motion.div>

            {/* Fetch Error Message */}
            {fetchError && (
              <motion.p
                className="text-red-600 font-semibold text-center bg-red-50 p-4 rounded-lg"
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
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={submitStatus.loading || !formData.patientId}
                data-tooltip-id="submit-button"
                data-tooltip-content="Confirm your appointment"
              >
                {submitStatus.loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Confirm Appointment"
                )}
              </motion.button>
              <Link to="/profile">
                <motion.button
                  className="bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  data-tooltip-id="cancel-button"
                  data-tooltip-content="Cancel and return to profile"
                >
                  Cancel
                </motion.button>
              </Link>
            </div>

            {/* Status Messages */}
            {submitStatus.success && (
              <motion.p
                className="text-green-600 font-semibold text-center bg-green-50 p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {submitStatus.success}
              </motion.p>
            )}
            {submitStatus.error && (
              <motion.p
                className="text-red-600 font-semibold text-center bg-red-50 p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {submitStatus.error}
              </motion.p>
            )}
          </form>
        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.section
        className="w-[95%] sm:w-[90%] max-w-6xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 text-center">
          <motion.h3
            className="text-2xl font-bold text-teal-800 mb-4"
            variants={cardVariants}
          >
            Need Assistance?
          </motion.h3>
          <motion.p
            className="text-gray-700 mb-6"
            variants={cardVariants}
          >
            Contact our support team at{" "}
            <a href="mailto:support@hospital.com" className="text-teal-600 hover:text-teal-700 font-semibold">
              support@hospital.com
            </a>{" "}
            or call us at <span className="font-semibold">+1-800-555-1234</span>.
          </motion.p>
          <motion.div variants={cardVariants}>
            <Link
              to="/"
              className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300"
              data-tooltip-id="home-link"
              data-tooltip-content="Return to homepage"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Return to Home
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-96 h-96 bg-teal-100/20 rounded-full absolute -top-40 -left-40 blur-3xl" />
        <div className="w-96 h-96 bg-blue-100/20 rounded-full absolute -bottom-40 -right-40 blur-3xl" />
      </div>

      {/* Tooltips */}
      <Tooltip id="start-booking" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="doctor-select" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="date-select" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="time-select" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="reason-input" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="submit-button" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="cancel-button" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="home-link" place="top" className="bg-teal-800 text-white rounded-lg" />
    </div>
  );
}