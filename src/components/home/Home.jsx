import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import qrImage from "../../assets/qrimg2.jpeg"; // Your QR code image
import hosimg from "../../assets/hosimg.jpeg"; // Your hospital/doctor image
import { FaSpinner } from "react-icons/fa";


export default function Home() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]); // Added for API data
  const [loading, setLoading] = useState(true); // Added for loading state
  const [error, setError] = useState(null); // Added for error state
  useEffect(() => {
    const box = document.querySelector('.home-box');
    if (box) {
      box.classList.add('opacity-0');
      setTimeout(() => box.classList.remove('opacity-0'), 100);
    }


    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8082/doctors/getAll");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        // Map API data to UI format
        const formattedDoctors = data.map((doctor) => ({
          id: doctor.doctor_Id,
          name: `${doctor.firstname}  ${doctor.lastname}`,
          specialty: doctor.specilization || "General Practitioner",
          description: doctor.description || `Dr. ${doctor.lastname} is a dedicated professional with extensive experience in ${doctor.specilization || "healthcare"}.`,
          education: doctor.education || "MD, Medical School",
          experience: doctor.experience || "Not specified",
          contact: doctor.emial || doctor.phonenumber || "Not available",
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

  

  
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut", staggerChildren: 0.3 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 70 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // Sample doctor data
  // const doctors = [
  //   {
  //     id: 1,
  //     name: "Dr. John Smith",
  //     specialty: "Cardiologist",
  //     description: "Specializing in heart health with over 15 years of experience. Expertise in cardiovascular diagnostics and treatment.",
  //     education: "MD, Harvard Medical School",
  //     experience: "15+ years",
  //     contact: "john.smith@healthcarehub.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Dr. Emily Johnson",
  //     specialty: "Neurologist",
  //     description: "Expert in neurological disorders with a focus on patient care. Skilled in managing epilepsy and stroke cases.",
  //     education: "MD, Johns Hopkins University",
  //     experience: "12+ years",
  //     contact: "emily.johnson@healthcarehub.com",
  //   },
  //   {
  //     id: 3,
  //     name: "Dr. Michael Brown",
  //     specialty: "Pediatrician",
  //     description: "Dedicated to the health and well-being of children. Experienced in pediatric care and developmental health.",
  //     education: "MD, Stanford University",
  //     experience: "10+ years",
  //     contact: "michael.brown@healthcarehub.com",
  //   },
  // ];

  const openProfile = (doctor) => setSelectedDoctor(doctor);
  const closeProfile = () => setSelectedDoctor(null);

  const handleBookAppointment = () => {
    if (!token) {
      navigate("/login");
    } else {
      // Optionally fetch patientId here and pass it, or rely on BookAppointment to fetch it
      navigate("/profile");
    }
  };

  

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen font-sans relative">
      {/* Hero Section */}
      <motion.div
        className="relative flex flex-col md:flex-row items-center justify-between min-h-[60vh] md:h-[80vh] p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-[95%] sm:w-[90%] max-w-11xl mx-auto mt-4 md:mt-5 overflow-hidden"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 rounded-3xl"></div>
        <motion.div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 w-full md:w-1/2 relative space-y-6 z-10" variants={textVariants}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight tracking-tight">
            Welcome to <span className="text-blue-300">HealthCare Hub</span>
          </h1>
          <p className="text-gray-100 text-base sm:text-lg md:text-xl leading-relaxed">
            At HealthCare Hub, we provide world-class medical care with compassion and innovation. Access your health records, book appointments, and connect with our expert doctors—all in one place.
          </p>
          <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-6 md:mt-8" variants={buttonVariants}>
            
              <motion.button
                className="bg-blue-500 text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 123, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookAppointment}
              >
                Book Appointment
              </motion.button>
            
            <Link to="/profile">
              <motion.button
                className="bg-transparent border-2 border-blue-300 text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-full shadow-lg hover:bg-blue-300 hover:text-blue-900 transition-all duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 123, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Generate QR
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div className="flex justify-center p-6 sm:p-8 md:p-10 w-full md:w-1/2 items-center relative z-10" variants={imageVariants}>
          <motion.img
            src={qrImage}
            alt="Patient QR Code"
            className="border-4 border-blue-200 h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-2xl shadow-xl object-cover"
            whileHover={{ scale: 1.1, rotate: 3, boxShadow: "0px 0px 20px rgba(0, 123, 255, 0.4)" }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </motion.div>

      {/* Services Section */}
      <motion.div className="w-[95%] sm:w-[90%] max-w-7xl mx-auto mt-12 md:mt-20 py-8 md:py-16" variants={containerVariants} initial="hidden" animate="visible">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-blue-900 text-center font-bold mb-8 md:mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-0">
          <motion.div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-blue-50" variants={cardVariants} whileHover={{ scale: 1.05, y: -10 }}>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-transparent opacity-0 hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <motion.div className="text-blue-600 mb-4" whileHover={{ scale: 1.2, rotate: 15 }} transition={{ duration: 0.3 }}>
                <svg className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </motion.div>
              <h3 className="text-xl sm:text-2xl text-blue-900 font-semibold mb-3">Patient Registration</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Sign up easily to start your healthcare journey with us.</p>
              <Link to="/register">
                <motion.button className="mt-4 sm:mt-6 bg-blue-500 text-white font-medium px-4 sm:px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  Register Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-blue-50" variants={cardVariants} whileHover={{ scale: 1.05, y: -10 }}>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-transparent opacity-0 hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <motion.div className="text-blue-600 mb-4" whileHover={{ scale: 1.2, rotate: 15 }} transition={{ duration: 0.3 }}>
                <svg className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </motion.div>
              <h3 className="text-xl sm:text-2xl text-blue-900 font-semibold mb-3">Book Appointment</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Schedule a visit with our expert doctors at your convenience.</p>
              <Link to="/book-appointment">
                <motion.button className="mt-4 sm:mt-6 bg-blue-500 text-white font-medium px-4 sm:px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  Book Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-blue-50" variants={cardVariants} whileHover={{ scale: 1.05, y: -10 }}>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-transparent opacity-0 hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <motion.div className="text-blue-600 mb-4" whileHover={{ scale: 1.2, rotate: 15 }} transition={{ duration: 0.3 }}>
                <svg className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5V8h14v10z" />
                </svg>
              </motion.div>
              <h3 className="text-xl sm:text-2xl text-blue-900 font-semibold mb-3">View Medical Records</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Access your health records anytime, anywhere.</p>
              <Link to="/profile">
                <motion.button className="mt-4 sm:mt-6 bg-blue-500 text-white font-medium px-4 sm:px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  View Records
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Doctors Section */}
      {/* Doctors Section */}
      <motion.div
        className="w-[95%] sm:w-[90%] max-w-7xl mx-auto mt-12 md:mt-20 mb-12 md:mb-20 py-8 md:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-blue-900 text-center font-bold mb-8 md:mb-12">
          Meet Our Expert Doctors
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="text-blue-600 text-4xl animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 text-lg">
            Error: {error}. Please try again later.
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No doctors available at this time.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-0">
            {doctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-blue-50 "
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-transparent opacity-0 hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <motion.img
                    src={hosimg}
                    alt={doctor.name}
                    className="border-4 border-blue-200 h-32 w-32 sm:h-40 sm:w-40 rounded-full mb-4 mx-auto object-cover"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3 className="text-lg sm:text-2xl text-blue-900 font-semibold mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm sm:text-base">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
                    {doctor.description.split(".")[0] + "."}
                  </p>
                  <motion.button
                    onClick={() => openProfile(doctor)}
                    className="mt-4 sm:mt-6 bg-blue-500 text-white font-medium px-4 sm:px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProfile}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-lg md:max-w-xl p-6 sm:p-8 relative overflow-y-auto max-h-[90vh]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProfile}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl sm:text-2xl font-bold"
            >
              ×
            </button>
            <div className="flex flex-col items-center">
              <img
                src={hosimg}
                alt={selectedDoctor.name}
                className="border-4 border-blue-200 h-24 w-24 sm:h-32 sm:w-32 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl sm:text-2xl md:text-3xl text-blue-900 font-semibold mb-2 text-center">
                {selectedDoctor.name}
              </h3>
              <p className="text-blue-600 font-medium text-sm sm:text-base md:text-lg mb-4">
                {selectedDoctor.specialty}
              </p>
              <div className="text-gray-700 text-sm sm:text-base md:text-lg space-y-3">
                <p>
                  <strong>About:</strong> {selectedDoctor.description}
                </p>
                <p>
                  <strong>Education:</strong> {selectedDoctor.education}
                </p>
                <p>
                  <strong>Experience:</strong> {selectedDoctor.experience}
                </p>
                <p>
                  <strong>Contact:</strong> {selectedDoctor.contact}
                </p>
              </div>
              <motion.button
                onClick={closeProfile}
                className="mt-6 bg-blue-500 text-white font-medium px-4 sm:px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}


//correct above 2



//deepseek down


// import React, { useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useInView } from 'react-intersection-observer';
// import qrImage from "../../assets/qrimg2.jpeg";
// import hosimg from "../../assets/hosimg.jpeg";

// // Reusable Animated Component
// const SectionWrapper = ({ children }) => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({ threshold: 0.25 });

//   useEffect(() => {
//     if (inView) controls.start("visible");
//   }, [controls, inView]);

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={{
//         hidden: { opacity: 0, y: 50 },
//         visible: {
//           opacity: 1,
//           y: 0,
//           transition: { duration: 0.8, staggerChildren: 0.3 }
//         }
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default function Home() {
//   // Hero Animation
//   const heroVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.3, delayChildren: 0.2 }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen overflow-hidden">
//       {/* Hero Section */}
//       <SectionWrapper>
//         <motion.div
//           className="relative flex flex-col md:flex-row items-center justify-between min-h-[90vh] px-5 md:px-20 py-16 rounded-[40px] w-[95%] max-w-7xl mx-auto mt-8"
//           style={{
//             background: `linear-gradient(135deg, rgba(12, 74, 110, 0.95) 0%, rgba(8, 47, 73, 0.95) 100%), url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//           variants={heroVariants}
//         >
//           {/* Left Content */}
//           <motion.div 
//             className="flex flex-col justify-center space-y-8 z-10 md:w-1/2"
//             variants={{
//               hidden: { opacity: 0, x: -50 },
//               visible: { opacity: 1, x: 0 }
//             }}
//           >
//             <motion.h1 
//               className="text-5xl md:text-6xl text-white font-bold leading-tight"
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, type: 'spring' }}
//             >
//               Modern Healthcare<br/>
//               <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                 Made Simple
//               </span>
//             </motion.h1>

//             <motion.p 
//               className="text-xl text-blue-100 leading-relaxed"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               Seamless patient management, instant access to records, and premium care through innovative technology.
//             </motion.p>

//             <motion.div 
//               className="flex gap-6"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6 }}
//             >
//               <Link to="/book-appointment">
//                 <motion.button
//                   className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-xl transition-all duration-300"
//                   whileHover={{ scale: 1.05, rotate: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Book Now ➔
//                 </motion.button>
//               </Link>
//             </motion.div>
//           </motion.div>

//           {/* QR Code Floating Card */}
//           <motion.div 
//             className="relative z-10 md:w-1/2 mt-12 md:mt-0"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: 'spring', stiffness: 50 }}
//           >
//             <motion.div 
//               className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border-2 border-white/20 relative"
//               animate={{ y: [0, -20, 0] }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             >
//               <img
//                 src={qrImage}
//                 alt="QR Code"
//                 className="w-full h-auto rounded-2xl border-4 border-white/20"
//               />
//               <div className="absolute -inset-4 bg-cyan-400/20 blur-3xl -z-10" />
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </SectionWrapper>

//       {/* Services Section */}
//       <SectionWrapper>
//         <div className="max-w-7xl mx-auto px-5 py-24">
//           <motion.h2 
//             className="text-4xl md:text-5xl font-bold text-center mb-20 text-blue-900"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Our Services
//           </motion.h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             {['Patient Registration', 'Digital Records', 'Virtual Consult'].map((service, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white p-8 rounded-3xl border-2 border-blue-50 hover:border-cyan-100 relative group transition-all duration-500"
//                 whileHover={{ y: -10 }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 <div className="relative z-10">
//                   <div className="w-20 h-20 bg-cyan-100 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
//                     <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       {/* Icon paths */}
//                     </svg>
//                   </div>
//                   <h3 className="text-2xl font-bold text-blue-900 mb-4">{service}</h3>
//                   <p className="text-blue-600 mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//                   <motion.div whileHover={{ x: 5 }}>
//                     <Link to="/" className="text-cyan-500 font-semibold flex items-center gap-2">
//                       Learn More
//                       <span className="transition-transform duration-300">→</span>
//                     </Link>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </SectionWrapper>

//       {/* Doctors Section */}
//       <SectionWrapper>
//         <div className="max-w-7xl mx-auto px-5 py-24">
//           <motion.h2 
//             className="text-4xl md:text-5xl font-bold text-center mb-20 text-blue-900"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Meet Our Specialists
//           </motion.h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[1, 2, 3].map((_, index) => (
//               <motion.div
//                 key={index}
//                 className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500"
//                 whileHover="hover"
//                 variants={{
//                   hover: { scale: 1.02 }
//                 }}
//               >
//                 <div className="relative h-96 overflow-hidden">
//                   <img
//                     src={hosimg}
//                     alt="Doctor"
//                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
//                 </div>
                
//                 <div className="p-6 absolute bottom-0 w-full bg-gradient-to-t from-blue-900/90">
//                   <h3 className="text-2xl font-bold text-white mb-2">Dr. Jane Smith</h3>
//                   <p className="text-cyan-300 font-medium mb-4">Cardiology Specialist</p>
//                   <motion.button
//                     className="bg-cyan-400 text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-cyan-300 transition-colors"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     View Profile
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </SectionWrapper>
//     </div>
//   );
// }