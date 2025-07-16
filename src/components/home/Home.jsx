import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner, FaUserMd, FaCalendarAlt, FaFileMedical, FaQrcode } from "react-icons/fa";
import { MdEmail, MdSchool, MdWork } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import Footer from "../footer/Footer";
import qrImage from "../../assets/qrimg2.jpeg";
import hosimg from "../../assets/hosimg.jpeg";
import docimg from "../../assets/doimage.webp";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation controls
  const heroControls = useAnimation();
  const servicesControls = useAnimation();
  const doctorsControls = useAnimation();

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [doctorsRef, doctorsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    if (servicesInView) servicesControls.start("visible");
    if (doctorsInView) doctorsControls.start("visible");
  }, [heroControls, servicesControls, doctorsControls, heroInView, servicesInView, doctorsInView]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8082/doctors/getAll");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        const formattedDoctors = data.map((doctor) => ({
          id: doctor.doctor_Id,
          name: `${doctor.firstname} ${doctor.lastname}`,
          specialty: doctor.specilization || "General Practitioner",
          description:
            doctor.description ||
            `Dr. ${doctor.lastname} is a dedicated professional with extensive experience in ${
              doctor.specilization || "healthcare"
            }.`,
          education: doctor.education || "MD, Medical School",
          experience: doctor.experience || "Not specified",
          contact: doctor.email || doctor.phonenumber || "Not available",
        }));
        setDoctors(formattedDoctors);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

// VALID easing function
const validEase = [0.6, 0.05, 0.01, 0.99]; // replaces invalid [-0.01]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: validEase,
      staggerChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: validEase,
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: validEase,
    },
  },
};

const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: validEase,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: validEase,
    },
  }),
};

const modalVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: validEase,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  },
};

  const handleBookAppointment = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative overflow-hidden  min-h-[100vh]"
        variants={containerVariants}
        initial="hidden"
        animate={heroControls}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-800 opacity-95 " />
        
        {/* Floating circles */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400 opacity-20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [-50, 50, -50],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-teal-400 opacity-20 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [50, -50, 50],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUpVariants}>
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6  mt-24"
                variants={fadeUpVariants}
              >
                Your Health, <span className="text-teal-300">Our Priority</span>
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl text-blue-100 mb-8 max-w-lg"
                variants={fadeUpVariants}
              >
                At Vitalix Health Care, we combine cutting-edge technology with compassionate care to deliver exceptional healthcare experiences.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeUpVariants}>
                <motion.button
                  className="px-8 py-3 bg-teal-400 hover:bg-teal-300 text-blue-900 font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBookAppointment}
                >
                  <FaCalendarAlt />
                  Book Appointment
                </motion.button>
                <Link to="/profile">
                  <motion.button
                    className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaQrcode />
                    Generate QR
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex justify-center"
              variants={scaleUpVariants}
            >
              <div className="relative">
                <motion.img
                  src={qrImage}
                  alt="Patient QR Code"
                  className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl border-4 border-teal-300 shadow-2xl object-cover mt-24"
                  whileHover={{ rotate: 2, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border-2 border-blue-100"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <FaUserMd className="text-blue-600 text-3xl" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        className="py-16 sm:py-24"
        variants={containerVariants}
        initial="hidden"
        animate={servicesControls}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeUpVariants}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              variants={fadeUpVariants}
            >
              Comprehensive <span className="text-blue-600">Healthcare</span> Services
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              variants={fadeUpVariants}
            >
              We offer a wide range of medical services to meet all your healthcare needs with excellence and care.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Patient Registration",
                description: "Quick and easy registration process to get you started with our healthcare services.",
                link: "/register",
                icon: <FaUserMd className="text-4xl text-blue-600" />,
                color: "bg-blue-100"
              },
              {
                title: "Appointment Booking",
                description: "Schedule your visit with our specialists at your convenience.",
                link: "/book-appointment",
                icon: <FaCalendarAlt className="text-4xl text-teal-600" />,
                color: "bg-teal-100"
              },
              {
                title: "Medical Records",
                description: "Access your health information securely anytime, anywhere.",
                link: "/profile",
                icon: <FaFileMedical className="text-4xl text-indigo-600" />,
                color: "bg-indigo-100"
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                className={`${service.color} p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300`}
                variants={cardVariants}
                custom={i}
                whileHover={{ y: -10 }}
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link to={service.link}>
                  <motion.button
                    className="text-blue-600 font-semibold flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Doctors Section */}
<motion.section
  ref={doctorsRef}
  className="py-16 sm:py-24 bg-gradient-to-b from-white to-blue-50"
  variants={containerVariants}
  initial="hidden"
  animate={doctorsControls}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div className="text-center mb-16" variants={fadeUpVariants}>
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        variants={fadeUpVariants}
      >
        Meet Our <span className="text-blue-600">Expert</span> Team
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 max-w-3xl mx-auto"
        variants={fadeUpVariants}
      >
        Our dedicated healthcare professionals are committed to providing you with the best medical care.
      </motion.p>
    </motion.div>

    {loading ? (
      <motion.div
        className="flex justify-center items-center h-64"
        variants={spinnerVariants}
        animate="animate"
      >
        <FaSpinner className="text-blue-600 text-4xl" />
      </motion.div>
    ) : error ? (
      <motion.div
        className="text-center text-red-600 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Error: {error}. Please try again later.
      </motion.div>
    ) : doctors.length === 0 ? (
      <motion.div
        className="text-center text-gray-600 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        No doctors available at this time.
      </motion.div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor, i) => (
          <motion.div
            key={doctor.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
            custom={i}
            whileHover={{ y: -10 }}
          >
            <div className="relative">
              {/* Background Image */}
              <img
                src={hosimg}
                alt={doctor.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl" />

              {/* Center Circular Doctor Image */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <img
                        src={docimg}
                        alt={doctor.name}
                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl"
                      />
               </div>

              {/* Doctor Info Bottom Left */}
              <div className="absolute bottom-4 left-4 z-10">
                <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                <p className="text-blue-200">{doctor.specialty}</p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <p className="text-gray-600 mb-4 line-clamp-2">{doctor.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  <MdSchool /> {doctor.education.split(",")[0]}
                </span>
                <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">
                  <MdWork /> {doctor.experience}
                </span>
              </div>
              <motion.button
                onClick={() => setSelectedDoctor(doctor)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Profile
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </div>
</motion.section>


      {/* Doctor Profile Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDoctor(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={hosimg} 
                  alt={selectedDoctor.name} 
                  className="w-full h-64 object-cover"
                />
                <button 
                  onClick={() => setSelectedDoctor(null)}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white">{selectedDoctor.name}</h3>
                  <p className="text-blue-200">{selectedDoctor.specialty}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">About</h4>
                  <p className="text-gray-600">{selectedDoctor.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MdSchool className="text-blue-600" /> Education
                    </h4>
                    <p className="text-gray-600">{selectedDoctor.education}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MdWork className="text-blue-600" /> Experience
                    </h4>
                    <p className="text-gray-600">{selectedDoctor.experience}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <MdEmail className="text-blue-600" /> Contact
                  </h4>
                  <p className="text-gray-600">{selectedDoctor.contact}</p>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBookAppointment}
                  >
                    <FaCalendarAlt /> Book Appointment
                  </motion.button>
                  <button
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-300"
                    onClick={() => setSelectedDoctor(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}