

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaUser,
//   FaFileMedical,
//   FaHome,
//   FaQuestionCircle,
//   FaSignOutAlt,
//   FaEdit,
//   FaQrcode,
//   FaDownload,
//   FaShareAlt,
//   FaCalendarPlus,
// } from "react-icons/fa";
// import profileImg from "../../assets/profile2.jpg";
// import hospitalIllustration from "../../assets/hosimg.jpeg";

// // Profile component for managing patient data and interactions
// export default function Profile() {
//   const navigate = useNavigate();

//   // State management
//   const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
//   const [patientData, setPatientData] = useState(null);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [fetchStatus, setFetchStatus] = useState({ loading: false, error: null });
//   const [medicalFetchStatus, setMedicalFetchStatus] = useState({ loading: false, error: null });
//   const [currentView, setCurrentView] = useState("dashboard");
//   const [username, setUsername] = useState(localStorage.getItem("username") || "");
//   const [showPatientDataError, setShowPatientDataError] = useState(false);
//   const [updateFormData, setUpdateFormData] = useState(null);
//   const [updateStatus, setUpdateStatus] = useState({ loading: false, success: null, error: null });
//   const [qrCodeData, setQrCodeData] = useState(null);
//   const [qrCodeStatus, setQrCodeStatus] = useState({ loading: false, error: null });

//   const token = localStorage.getItem("token");

//   // Fetch user data based on username
//   const fetchUserData = async () => {
//     setFetchStatus({ loading: true, error: null });
//     try {
//       const storedUsername = localStorage.getItem("username")?.split(" ")[0];
//       const response = await fetch(`http://localhost:8080/users/byUsername/${storedUsername}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         setUserId(userData.id);
//         setUsername(`${userData.username}`);
//         localStorage.setItem("userId", userData.id);
//         localStorage.setItem("username", `${userData.username}`);
//         setFetchStatus({ loading: false, error: null });
//       } else {
//         throw new Error("Failed to load user data.");
//       }
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//       setFetchStatus({ loading: false, error: "Authentication error. Please log in again." });
//     }
//   };

//   // Fetch patient data by user ID
//   const fetchPatientData = async () => {
//     setFetchStatus({ loading: true, error: null });
//     try {
//       const response = await fetch(`http://localhost:8083/pateints/patient/byUserId/${userId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPatientData(data);
//         setFetchStatus({ loading: false, error: null });
//         return data;
//       } else {
//         throw new Error("Failed to fetch patient data.");
//       }
//     } catch (err) {
//       setFetchStatus({ loading: false, error: err.message });
//       setShowPatientDataError(true);
//     }
//   };

//   // // Fetch medical records for the patient
//   const fetchMedicalRecords = async () => {
//     // if (!patientData) await fetchPatientData();
//     // if (!patientData) return;

//     setMedicalFetchStatus({ loading: true, error: null });
    
//     try {
//           // Fetch patient data if userId is available
//       let patientId = patientData?.patientId;
//       if (!patientId && userId) {
//         const patient = await fetchPatientData();
//         patientId = patient?.patientId;
//       }
  
//       if (!patientId) {
//         throw new Error("Patient data not available.");
//       }


//       const response = await fetch(`http://localhost:8081/medical-records/medical-records/${patientId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const recordsWithDoctorNames = await Promise.all(
//           data.map(async (record) => ({
//             ...record,
//             doctorName: await fetchDoctorName(record.doctor_Id),
//           }))
//         );
//         setMedicalRecords(recordsWithDoctorNames);
//         setMedicalFetchStatus({ loading: false, error: null });
//       } else if (response.status === 204) {
//         setMedicalRecords([]);
//         setMedicalFetchStatus({ loading: false, error:null});
//       } else {
//         throw new Error("Failed to fetch medical records.");
//       }
//     } catch (err) {
//       setMedicalFetchStatus({ loading: false, error: err.message });
//     }
//   };


//   // Fetch doctor name by doctor ID
//   const fetchDoctorName = async (doctorId) => {
//     try {
//       const response = await fetch(`http://localhost:8082/doctors/ByDoc/${doctorId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         return data.firstname;
//       }
//       throw new Error("Failed to fetch doctor name.");
//     } catch (err) {
//       return "Unknown Doctor";
//     }
//   };

//   const fetchUpcomingAppointments = async () => {
//     if (!patientData?.patientId) {
//       console.warn("No patientId available for fetching appointments");
//       return;
//     }
//     try {
//       const response = await fetch(`http://localhost:8086/appoinments/GET/${patientData.patientId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (response.ok) {
//         const contentType = response.headers.get("Content-Type");
//         if (contentType && contentType.includes("application/json")) {
//           const data = await response.json();
//           console.log("Upcoming appointments response:", data); // Debug log
  
//           let nextAppointment = null;
  
//           // Check if data is an array or a single object
//           if (Array.isArray(data)) {
//             // If it's an array, find the next future appointment
//             nextAppointment = data.find(appointment => new Date(appointment.appoinment_Date) > new Date());
//           } else if (data && typeof data === 'object') {
//             // If it's a single object, check if it's a future appointment
//             if (new Date(data.appoinment_Date) > new Date()) {
//               nextAppointment = data;
//             }
//           }
  
//           // If we found an appointment, fetch the doctor's name
//           if (nextAppointment && nextAppointment.doctorID) {
//             const doctorName = await fetchDoctorName(nextAppointment.doctorID);
//             nextAppointment.doctorName = doctorName;
//           }
  
//           setPatientData((prev) => ({ ...prev, upcomingAppointment: nextAppointment || null }));
//         } else {
//           const text = await response.text();
//           console.warn("Non-JSON response from appointments API:", text);
//           if (text.includes("not found")) {
//             setPatientData((prev) => ({ ...prev, upcomingAppointment: null }));
//           } else {
//             throw new Error(`Unexpected response format: ${text}`);
//           }
//         }
//       } else if (response.status === 404) {
//         console.log("No appointments found for patient");
//         setPatientData((prev) => ({ ...prev, upcomingAppointment: null }));
//       } else {
//         throw new Error(`Failed to fetch appointments: ${response.status}`);
//       }
//     } catch (err) {
//       console.error("Failed to fetch appointments:", err);
//       setPatientData((prev) => ({ ...prev, upcomingAppointment: null }));
//     }
//   };
//   // Check authentication and fetch user data on mount
//   // useEffect(() => {
//   //   if (!token) {
//   //     navigate("/login");
//   //     return;
//   //   }
//   //   if (!userId) {
//   //     fetchUserData();
//   //   }
//   //   if (patientData?.patientId) {
//   //     fetchUpcomingAppointments();
//   //     fetchMedicalRecords(); // Ensure medical records are fetched
//   //   } else {
//   //     fetchPatientData().then(() => {
//   //       if (patientData?.patientId) {
//   //         fetchUpcomingAppointments();
//   //         fetchMedicalRecords();
//   //       }
//   //     });
//   //   }
//   // }, [userId, token, navigate]);
//   useEffect(() => {
//     const fetchAllData = async () => {
//       // Step 1: Check for token and userId
//       if (!token) {
//         navigate("/login");
//         return;
//       }
  
//       if (!userId) {
//         await fetchUserData();
//       }
  
//       // Step 2: Fetch patient data if not already available
//       if (!patientData) {
//         const patient = await fetchPatientData();
//         if (!patient?.patientId) {
//           console.error("No patientId found after fetching patient data");
//           return;
//         }
//       }
  
//       // Step 3: Fetch upcoming appointments and medical records
//       if (patientData?.patientId) {
//         await Promise.all([
//           fetchUpcomingAppointments(),
//           fetchMedicalRecords(),
//         ]);
//       }
//     };
  
//     fetchAllData();
//   }, [userId, token, navigate, patientData?.patientId]);

//   // Handler to book an appointment
//   const handleBookAppointment = () => {
//     if (!patientData) {
//       fetchPatientData().then(() => {
//         if (patientData) {
//           navigate("/book-appointment", { state: { patientId: patientData.patientId } });
//         }
//       });
//     } else {
//       navigate("/book-appointment", { state: { patientId: patientData.patientId } });
//     }
//   };

//   // Handler to view patient data
//   const handleViewPatientData = () => {
//     setCurrentView("patientData");
//     if (!patientData) fetchPatientData();
//   };

//   // Handler to update patient data
//   const handleUpdatePatientData = () => {
//     if (!patientData) {
//       fetchPatientData().then(() => {
//         if (patientData) {
//           setUpdateFormData({
//             firstname: patientData.firstname,
//             lastname: patientData.lastname,
//             email: patientData.email,
//             phone: patientData.phone,
//             date_of_birth: patientData.dateOfBirth,
//             address: patientData.address,
//             gender: patientData.gender,
//             userId: patientData.userId,
//           });
//           setCurrentView("updatePatientData");
//         }
//       });
//     } else {
//       setUpdateFormData({
//         firstname: patientData.firstname,
//         lastname: patientData.lastname,
//         email: patientData.email,
//         phone: patientData.phone,
//         date_of_birth: patientData.dateOfBirth,
//         address: patientData.address,
//         gender: patientData.gender,
//         userId: patientData.userId,
//       });
//       setCurrentView("updatePatientData");
//     }
//   };

//   // Handler for form input changes
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handler to submit updated patient data
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     setUpdateStatus({ loading: true, success: null, error: null });

//     const { patientId, dateOfBirth, ...updateData } = updateFormData;
//     updateData.dateOfBirth = updateFormData.date_of_birth;

//     try {
//       const response = await fetch(`http://localhost:8083/pateints/update/${patientData.patientId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updateData),
//       });

//       if (response.ok) {
//         setUpdateStatus({ loading: false, success: "Patient data updated successfully!", error: null });
//         setPatientData({ ...patientData, ...updateData, dateOfBirth: updateData.date_of_birth });
//         setCurrentView("patientData");
//       } else {
//         throw new Error("Failed to update patient data.");
//       }
//     } catch (err) {
//       setUpdateStatus({ loading: false, success: null, error: err.message });
//     }
//   };

//   // Handler to view medical records
//   const handleViewMedicalData = () => {
//     setCurrentView("medicalData");
//     setSelectedRecord(null);
//     // if (medicalRecords.length === 0 && !medicalFetchStatus.error) fetchMedicalRecords();
//     fetchMedicalRecords();
//   };

//   // Handler to generate QR code
//   const handleGenerateQR = async () => {
//     // if (!patientData) {
//     //   try {
//     //     await fetchPatientData();
//     //   } catch (err) {
//     //     setQrCodeStatus({ loading: false, error: "Failed to fetch patient data. Please try again." });
//     //     setCurrentView("qrCode");
//     //     return;
//     //   }
//     // }

//     // if (!patientData || !patientData.patientId) {
//     //   setQrCodeStatus({ loading: false, error: "Patient data not available. Please try again." });
//     //   setCurrentView("qrCode");
//     //   return;
//     // }

//     setQrCodeStatus({ loading: true, error: null });
//     setCurrentView("qrCode");

//     try {

//       let patientId = patientData?.patientId;
//       if (!patientId && userId) {
//         const patient = await fetchPatientData();
//         patientId = patient?.patientId;
//       }
  
//       if (!patientId) {
//         throw new Error("Patient data not available.");
//       }

//       const response = await fetch(`http://localhost:8085/qrcode/generate/${patientId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const qrCodeBase64 = await response.text();
//         if (!qrCodeBase64 || !qrCodeBase64.startsWith("data:image/png;base64,")) {
//           throw new Error("Invalid QR code data received from server.");
//         }
//         setQrCodeData(qrCodeBase64);
//         setQrCodeStatus({ loading: false, error: null });
//       } else {
//         throw new Error("Failed to generate QR code.");
//       }
//     } catch (err) {
//       setQrCodeStatus({ loading: false, error: err.message });
//     }
//   };

//   // Handler to return to homepage
//   const handleBackToHome = () => {
//     navigate("/");
//   };

//   // Handler to show help section
//   const handleHelp = () => {
//     setCurrentView("help");
//   };

//   // Handler to log out
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("username");
//     navigate("/login");
//   };

//   // Handler to view a specific medical record
//   const handleViewRecord = (record) => {
//     setSelectedRecord(record);
//   };

//   // Handler to close a medical record view
//   const handleCloseRecord = () => {
//     setSelectedRecord(null);
//   };

//   // Handler to save QR code to device
//   const handleSaveToDevice = () => {
//     if (!qrCodeData) {
//       setQrCodeStatus({ loading: false, error: "No QR code data available to download." });
//       return;
//     }
//     const link = document.createElement("a");
//     link.href = qrCodeData;
//     link.download = `patient-qr-${patientData.patientId}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Handler to share QR code
//   const handleShareQR = async () => {
//     if (!qrCodeData) {
//       setQrCodeStatus({ loading: false, error: "No QR code data available to share." });
//       return;
//     }

//     try {
//       if (navigator.share) {
//         const response = await fetch(qrCodeData);
//         const blob = await response.blob();
//         const file = new File([blob], `patient-qr-${patientData.patientId}.png`, { type: "image/png" });
//         await navigator.share({
//           title: "Patient QR Code",
//           text: "Here is my patient QR code for medical records.",
//           files: [file],
//         });
//       } else {
//         setQrCodeStatus({ loading: false, error: "Sharing is not supported on this device." });
//       }
//     } catch (err) {
//       setQrCodeStatus({ loading: false, error: "Failed to share QR code." });
//     }
//   };

//   // Render content based on current view
//   const renderContent = () => {
//     if (!userId && fetchStatus.loading) {
//       return <p className="text-center text-gray-500">Loading profile...</p>;
//     }

//     if (fetchStatus.error) {
//       return <p className="text-center text-red-500">{fetchStatus.error}</p>;
//     }

//     switch (currentView) {
//       case "dashboard":
//         return (
//           <motion.div
//             className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 md:p-8 relative"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             {/* Hero Section */}
//             <motion.div
//               className="bg-white rounded-xl shadow-lg p-6 mb-6 border-t-4 border-teal-400 flex flex-col md:flex-row items-center justify-between"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <div className="text-center md:text-left mb-4 md:mb-0">
//                 <h2 className="text-3xl text-teal-600 font-semibold mb-2 tracking-tight ">
//                   Welcome, {username ? ` ${username}` : "Patient"}!
//                 </h2>
//                 <p className="text-gray-600">
//                   Your healthcare hub. Check your upcoming appointments, recent records, or manage your profile.
//                 </p>
//               </div>
//               <motion.img
//                 src={hospitalIllustration}
//                 alt="Hospital Illustration"
//                 className="w-48 md:w-64 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//               />
//             </motion.div>
      
//           {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Upcoming Appointment Card */}
//         <motion.div
//           className="bg-white p-4 w- rounded-xl shadow-md border-l-4 border-teal-400 hover:shadow-lg transition-all duration-300"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <div className="flex items-center mb-3">
//             <FaCalendarPlus className="text-teal-500 mr-2" size={20} />
//             <h3 className="text-lg font-semibold text-teal-600">Upcoming Appointment</h3>
//           </div>
//           <p className="text-gray-600 mb-2">
//             {patientData?.upcomingAppointment ? (
//               <>
//                 Next: {new Date(patientData.upcomingAppointment.appoinment_Date).toLocaleDateString()}
//                 {patientData.upcomingAppointment.appoinment_Time && ` at ${patientData.upcomingAppointment.appoinment_Time}`}
//                 {patientData.upcomingAppointment.doctorName && ` with Dr. ${patientData.upcomingAppointment.doctorName}`}
//               </>
//             ) : (
//               <>
//                 No upcoming appointments.{" "}
//                 <button
//                   onClick={handleBookAppointment}
//                   className="text-teal-500 hover:underline"
//                 >
//                   Book one now!
//                 </button>
//               </>
//             )}
//           </p>
//         </motion.div>
      
//               {/* Recent Medical Record Card */}
//               <motion.div
//                 className="bg-white p-4 rounded-xl shadow-md border-l-4 border-teal-400 hover:shadow-lg transition-all duration-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.5 }}
//               >
//                 <div className="flex items-center mb-3">
//                   <FaFileMedical className="text-teal-500 mr-2" size={20} />
//                   <h3 className="text-lg font-semibold text-teal-600">Recent Medical Record</h3>
//                 </div>
//                 <p className="text-gray-600 mb-2">
//                   {medicalRecords.length > 0 ? (
//                     <>
//                       Last: {new Date(medicalRecords[0].createdAt).toLocaleDateString()}
//                       {medicalRecords[0].disease?.name && ` - ${medicalRecords[0].disease.name}`}
//                       {medicalRecords[0].doctorName && ` by Dr. ${medicalRecords[0].doctorName}`}
//                     </>
//                   ) : (
//                     "No medical records found."
//                   )}
//                 </p>
//               </motion.div>
      
//               {/* Profile Status Card */}
//               <motion.div
//                 className="bg-white p-4 rounded-xl shadow-md border-l-4 border-teal-400 hover:shadow-lg transition-all duration-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.6 }}
//               >
//                 <div className="flex items-center mb-3">
//                   <FaUser className="text-teal-500 mr-2" size={20} />
//                   <h3 className="text-lg font-semibold text-teal-600">Profile Status</h3>
//                 </div>
//                 <p className="text-gray-600 mb-2">
//                   {patientData && patientData.firstname && patientData.email
//                     ? "Profile complete"
//                     : "Complete your profile to get started."}
//                 </p>
//               </motion.div>
//             </div>
      
//             {/* Decorative Background Element */}
//             <div className="absolute inset-0 -z-10 overflow-hidden">
//               <div className="w-96 h-96 bg-teal-100 rounded-full opacity-20 absolute -top-20 -left-40 blur-3xl" />
//               <div className="w-96 h-96 bg-blue-100 rounded-full opacity-20 absolute -bottom-20 -right-40 blur-3xl" />
//             </div>
//           </motion.div>
//         );

//       case "patientData":
//         if (fetchStatus.loading) {
//           return <p className="text-center text-gray-500">Loading...</p>;
//         }
//         if (fetchStatus.error && showPatientDataError) {
//           return <p className="text-center text-red-500">{fetchStatus.error}</p>;
//         }
//         if (patientData) {
//           return (
//             <motion.div
//               className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto border-t-4 border-teal-400"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: "easeOut" }}
//             >
//               <h3 className="text-2xl text-teal-600 font-semibold mb-4">Patient Information</h3>
//               <div className="space-y-3 text-gray-700">
//                 <p>
//                   <strong>First Name:</strong> {patientData.firstname}
//                 </p>
//                 <p>
//                   <strong>Last Name:</strong> {patientData.lastname}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {patientData.email}
//                 </p>
//                 <p>
//                   <strong>Phone:</strong> {patientData.phone}
//                 </p>
//                 <p>
//                   <strong>Date of Birth:</strong> {patientData.dateOfBirth}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {patientData.address}
//                 </p>
//                 <p>
//                   <strong>Gender:</strong> {patientData.gender}
//                 </p>
//               </div>
//             </motion.div>
//           );
//         }
//         return <p className="text-center text-gray-500">Click "View Patient Data" to load your information.</p>;

//       case "updatePatientData":
//         if (!updateFormData) {
//           return <p className="text-center text-gray-500">Loading patient data for update...</p>;
//         }
//         return (
//           <motion.div
//             className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto border-t-4 border-teal-400"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//           >
//             <h3 className="text-2xl text-teal-600 font-semibold mb-4">Update Patient Information</h3>
//             {updateStatus.success && <p className="text-green-500 mb-4">{updateStatus.success}</p>}
//             {updateStatus.error && <p className="text-red-500 mb-4">{updateStatus.error}</p>}
//             <form onSubmit={handleUpdateSubmit} className="space-y-4">
//               <div>
//                 <label className="text-gray-700 block">First Name</label>
//                 <input
//                   type="text"
//                   name="firstname"
//                   value={updateFormData.firstname || ""}
//                   onChange={handleFormChange}
//                   className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="text-gray-700 block">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastname"
//                   value={updateFormData.lastname || ""}
//                   onChange={handleFormChange}
//                   className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="text-gray-700 block">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={updateFormData.email || ""}
//                   onChange={handleFormChange}
//                   className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="text-gray-700 block">Phone</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={updateFormData.phone || ""}
//                   onChange={handleFormChange}
//                   className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="text-gray-700 block">Date of Birth</label>
//                 <input
//                   type="date"
//                   name="date_of_birth"
//                   value={updateFormData.date_of_birth || ""}
//                   onChange={handleFormChange}
//                   className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="text-gray-700 block">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={updateFormData.address || ""}
//                   onChange={handleFormChange}
//                   className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="text-gray-700 block">Gender</label>
//                 <select
//                   name="gender"
//                   value={updateFormData.gender || ""}
//                   onChange={handleFormChange}
//                   className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div className="flex space-x-4">
//                 <motion.button
//                   type="submit"
//                   className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   disabled={updateStatus.loading}
//                 >
//                   {updateStatus.loading ? "Updating..." : "Update"}
//                 </motion.button>
//                 <motion.button
//                   type="button"
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
//                   onClick={() => setCurrentView("patientData")}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Cancel
//                 </motion.button>
//               </div>
//             </form>
//           </motion.div>
//         );

//       case "medicalData":
//         if (medicalFetchStatus.loading) {
//           return <p className="text-center text-gray-500">Loading medical records...</p>;
//         }
//         if (medicalFetchStatus.error) {
//           return <p className="text-center text-red-500">{medicalFetchStatus.error}</p>;
//         }
//         if (medicalRecords.length === 0) {
//           return (
//             <motion.div
//               className="p-6 text-center bg-white rounded-xl shadow-md"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <h3 className="text-2xl text-teal-600 font-semibold mb-4">Medical Records</h3>
//               <p className="text-gray-500">No medical records found.</p>
//             </motion.div>
//           );
//         }
//         return (
//           <motion.div
//             className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h3 className="text-2xl text-teal-600 font-semibold mb-6">Medical Records</h3>
//             <div className="max-w-3xl mx-auto space-y-4">
//               {medicalRecords.map((record) => (
//                 <motion.div
//                   key={record.id}
//                   className="bg-white p-4 rounded-lg shadow-md border-l-4 border-teal-400 hover:shadow-lg transition-all duration-300"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="text-gray-600">
//                         <strong>Record ID:</strong> {record.id}
//                       </p>
//                       <p className="text-gray-600">
//                         <strong>Date:</strong> {new Date(record.createdAt).toLocaleDateString()}
//                       </p>
//                       <p className="text-gray-600">
//                         <strong>Doctor:</strong> {record.doctorName}
//                       </p>
//                     </div>
//                     <motion.button
//                       onClick={() => handleViewRecord(record)}
//                       className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       View
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//             {selectedRecord && (
//               <motion.div
//                 className="mt-6 bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-400 max-w-3xl mx-auto"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <h4 className="text-xl text-teal-600 font-semibold mb-4">Medical Record Details</h4>
//                 <div className="space-y-2 text-gray-700">
//                   <p >
//                     <strong>Disease:</strong> {selectedRecord.disease?.name || "N/A"}
//                   </p>
//                   <p>
//                     <strong>Diagnosis:</strong> {selectedRecord.diagnosticData || "N/A"}
//                   </p>
//                   <p>
//                     <strong>Treatment:</strong> {selectedRecord.treatments || "N/A"}
//                   </p>
//                   <p>
//                     <strong>Date:</strong> {new Date(selectedRecord.createdAt).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <strong>Doctor:</strong> {selectedRecord.doctorName || "N/A"}
//                   </p>
//                   <p>
//                     <strong>Report:</strong>{" "}
//                     {selectedRecord.reportUrl ? (
//                       <a
//                         href={`http://localhost:8081${selectedRecord.reportUrl}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-teal-500 hover:underline"
//                       >
//                         View Report
//                       </a>
//                     ) : (
//                       "N/A"
//                     )}
//                   </p>
//                 </div>
//                 <motion.button
//                   onClick={handleCloseRecord}
//                   className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Close
//                 </motion.button>
//               </motion.div>
//             )}
//           </motion.div>
//         );

//       case "qrCode":
//         return (
//           <motion.div
//             className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h3 className="text-2xl text-teal-600 font-semibold mb-6">Your Patient QR Code</h3>
//             {qrCodeStatus.loading && <p className="text-center text-gray-500">Generating QR code...</p>}
//             {qrCodeStatus.error && <p className="text-center text-red-500">{qrCodeStatus.error}</p>}
//             {qrCodeData && !qrCodeStatus.loading && !qrCodeStatus.error ? (
//               <motion.div
//                 className="bg-white p-6 rounded-lg shadow-md border-t-4 border-teal-400 max-w-md mx-auto"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <img
//                   src={qrCodeData}
//                   alt="Patient QR Code"
//                   className="w-64 h-64 mx-auto rounded-lg shadow-sm"
//                 />
//                 <p className="text-center text-gray-600 mt-4">Scan to access your patient information.</p>
//                 <div className="mt-4 flex space-x-4 justify-center">
//                   <motion.button
//                     onClick={handleSaveToDevice}
//                     className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <FaDownload className="mr-2" /> Save
//                   </motion.button>
//                   <motion.button
//                     onClick={handleShareQR}
//                     className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <FaShareAlt className="mr-2" /> Share
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ) : (
//               !qrCodeStatus.loading &&
//               !qrCodeStatus.error && (
//                 <p className="text-center text-gray-500">Click "Generate QR" to create your QR code.</p>
//               )
//             )}
//           </motion.div>
//         );

//       case "help":
//         return (
//           <motion.div
//             className="p-6 text-center bg-white rounded-xl shadow-md"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h3 className="text-2xl text-teal-600 font-semibold mb-4">Help & Support</h3>
//             <p className="text-gray-500">
//               Need assistance? Contact us at{" "}
//               <a href="mailto:support@hospital.com" className="text-teal-500 hover:underline">
//                 support@hospital.com
//               </a>
//               .
//             </p>
//           </motion.div>
//         );

//       default:
//         return null;
//     }
//   };

//   // Main render
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 font-sans md:flex-row">
//       {/* Sidebar */}
//       <motion.div
//         className="flex flex-col bg-white shadow-xl rounded-b-3xl md:rounded-r-3xl md:w-1/4 p-6 border-r border-gray-100"
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <motion.img
//           src={profileImg}
//           alt="Profile Picture"
//           className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-teal-200 mx-auto mb-4 shadow-sm"
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5 }}
//         />
//         <h2 className="text-xl font-semibold text-teal-600 text-center mb-6">
//          {username || "Patient"}
//         </h2>
//         <div className="space-y-4">
//           {[
//             { icon: FaUser, text: "View Patient Data", onClick: handleViewPatientData },
//             { icon: FaEdit, text: "Update Patient Data", onClick: handleUpdatePatientData },
//             { icon: FaFileMedical, text: "View Medical Data", onClick: handleViewMedicalData },
//             { icon: FaQrcode, text: "Generate QR", onClick: handleGenerateQR },
//             { icon: FaCalendarPlus, text: "Book Appointment", onClick: handleBookAppointment },
//             { icon: FaHome, text: "Back to Home", onClick: handleBackToHome },
//             { icon: FaQuestionCircle, text: "Help", onClick: handleHelp },
//           ].map((item, index) => (
//             <motion.button
//               key={index}
//               className="flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200 w-full text-left px-4 py-2 rounded-lg hover:bg-teal-50"
//               onClick={item.onClick}
//               whileHover={{ scale: 1.03, x: 5 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <item.icon className="mr-3" />
//               <span>{item.text}</span>
//             </motion.button>
//           ))}
//         </div>
//         <motion.button
//           className="mt-auto bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
//           onClick={handleLogout}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <div className="flex items-center justify-center">
//             <FaSignOutAlt className="mr-2" />
//             <span>Logout</span>
//           </div>
//         </motion.button>
//       </motion.div>

//       {/* Main Content */}
//       <motion.div
//         className="flex-1 p-6 md:p-8 bg-gradient-to-br from-blue-50 to-gray-50 rounded-t-3xl md:rounded-l-3xl overflow-y-auto"
//         initial={{ opacity: 0, x: 100 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
//       >
//         {renderContent()}


        
//       </motion.div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserIcon,
  DocumentTextIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon,
  PencilIcon,
  QrCodeIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import profileImg from "../../assets/hosimg.jpeg"; // Replace with a modern SVG
import heroBanner from "../../assets/hosimg.jpeg"; // Replace with a vibrant healthcare SVG

export default function Profile() {
  const navigate = useNavigate();

  // State management
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [patientData, setPatientData] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({ loading: false, error: null });
  const [medicalFetchStatus, setMedicalFetchStatus] = useState({ loading: false, error: null });
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);
  const [prescriptionFetchStatus, setPrescriptionFetchStatus] = useState({ loading: false, error: null });
  const [currentView, setCurrentView] = useState("dashboard");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [showPatientDataError, setShowPatientDataError] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null);
  const [updateStatus, setUpdateStatus] = useState({ loading: false, success: null, error: null });
  const [qrCodeData, setQrCodeData] = useState(null);
  const [qrCodeStatus, setQrCodeStatus] = useState({ loading: false, error: null });

  const token = localStorage.getItem("token");

  // Fetch user data based on username
  const fetchUserData = async () => {
    setFetchStatus({ loading: true, error: null });
    try {
      const storedUsername = localStorage.getItem("username")?.split(" ")[0];
      const response = await fetch(`http://localhost:8080/users/byUsername/${storedUsername}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserId(userData.id);
        setUsername(`${userData.username}`);
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("username", `${userData.username}`);
        setFetchStatus({ loading: false, error: null });
      } else {
        throw new Error("Failed to load user data.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setFetchStatus({ loading: false, error: "Authentication error. Please log in again." });
    }
  };

  // Fetch patient data by user ID
  const fetchPatientData = async () => {
    setFetchStatus({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:8083/pateints/patient/byUserId/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPatientData(data);
        setFetchStatus({ loading: false, error: null });
        return data;
      } else {
        throw new Error("Failed to fetch patient data.");
      }
    } catch (err) {
      setFetchStatus({ loading: false, error: err.message });
      setShowPatientDataError(true);
    }
  };

  // Fetch medical records for the patient
  const fetchMedicalRecords = async () => {
    setMedicalFetchStatus({ loading: true, error: null });
    try {
      let patientId = patientData?.patientId;
      if (!patientId && userId) {
        const patient = await fetchPatientData();
        patientId = patient?.patientId;
      }

      if (!patientId) {
        throw new Error("Patient data not available.");
      }

      const response = await fetch(`http://localhost:8081/medical-records/medical-records/${patientId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const recordsWithDoctorNames = await Promise.all(
          data.map(async (record) => ({
            ...record,
            doctorName: await fetchDoctorName(record.doctor_Id),
          }))
        );
        setMedicalRecords(recordsWithDoctorNames);
        setMedicalFetchStatus({ loading: false, error: null });
      } else if (response.status === 204) {
        setMedicalRecords([]);
        setMedicalFetchStatus({ loading: false, error: null });
      } else {
        throw new Error("Failed to fetch medical records.");
      }
    } catch (err) {
      setMedicalFetchStatus({ loading: false, error: err.message });
    }
  };

  // Fetch doctor name by doctor ID
  const fetchDoctorName = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:8082/doctors/ByDoc/${doctorId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.firstname;
      }
      throw new Error("Failed to fetch doctor name.");
    } catch (err) {
      return "Unknown Doctor";
    }
  };

  // Fetch prescriptions for a medical record
  const fetchPrescriptions = async (medicalRecordId) => {
    setPrescriptionFetchStatus({ loading: true, error: null });
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`http://localhost:8081/prescription/prescriptions/medicalRecord/${medicalRecordId}`, { headers });
      setSelectedPrescriptions(response.data || []);
      setPrescriptionFetchStatus({ loading: false, error: null });
      setPrescriptionModalOpen(true);
    } catch (error) {
      console.error("Error fetching prescriptions:", error.message);
      setPrescriptionFetchStatus({ loading: false, error: "Failed to fetch prescriptions: " + (error.response?.data?.message || error.message) });
    }
  };

  const generatePrescriptionPDF = (prescription, index) => {
  const doc = new jsPDF();

  // Header Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 102, 102);
  doc.text("Vitalix HealthCare", 20, 20);

  // Subheading
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text("Prescription Report", 20, 30);

  // Metadata
  const issuedDate = new Date(prescription.dateIssued).toLocaleDateString();
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(`Prescription #: ${index + 1}`, 20, 40);
  doc.text(`Date Issued: ${issuedDate}`, 20, 46);
  doc.text(`Notes: ${prescription.notes || "N/A"}`, 20, 52);

  // Table
  autoTable(doc, {
    startY: 60,
    head: [["Medicine", "Dosage", "Frequency", "Duration", "Instructions"]],
    body: prescription.prescriptionDetails.map((detail) => [
      detail.medicineName || "N/A",
      detail.dosage || "N/A",
      detail.frequency || "N/A",
      detail.duration || "N/A",
      detail.instructions || "N/A",
    ]),
    styles: {
      fontSize: 10,
      cellPadding: 3,
      halign: 'left',
      valign: 'middle',
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: [0, 128, 128],
      textColor: 255,
      fontStyle: "bold",
    },
    bodyStyles: {
      textColor: 50,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 60, left: 20, right: 20 },
  });

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Generated by Vitalix HealthCare", 20, doc.internal.pageSize.height - 10);

  doc.save(`prescription-${index + 1}-${issuedDate.replaceAll("/", "-")}.pdf`);
};
  // Fetch upcoming appointments
  const fetchUpcomingAppointments = async () => {
    if (!patientData?.patientId) {
      console.warn("No patientId available for fetching appointments");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8086/appoinments/GET/${patientData.patientId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          let nextAppointment = null;

          if (Array.isArray(data)) {
            nextAppointment = data.find(appointment => new Date(appointment.appoinment_Date) > new Date());
          } else if (data && typeof data === 'object') {
            if (new Date(data.appoinment_Date) > new Date()) {
              nextAppointment = data;
            }
          }

          if (nextAppointment && nextAppointment.doctorID) {
            const doctorName = await fetchDoctorName(nextAppointment.doctorID);
            nextAppointment.doctorName = doctorName;
          }

          setPatientData((prev) => ({ ...prev, upcomingAppointment: nextAppointment || null }));
        } else {
          const text = await response.text();
          console.warn("Non-JSON response from appointments API:", text);
          if (text.includes("not found")) {
            setPatientData((prev) => ({ ...prev, upcomingAppointment: null }));
          } else {
            throw new Error(`Unexpected response format: ${text}`);
          }
        }
      } else if (response.status === 404) {
        console.log("No appointments found for patient");
        setPatientData((prev) => ({ ...prev, upcomingAppointment: null }));
      } else {
        throw new Error(`Failed to fetch appointments: ${response.status}`);
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      setPatientData((prev) => ({ ...prev, upcomingAppointment: null }));
    }
  };

  // Fetch data on mount
  useEffect(() => {
    const fetchAllData = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      if (!userId) {
        await fetchUserData();
      }

      if (!patientData) {
        const patient = await fetchPatientData();
        if (!patient?.patientId) {
          console.error("No patientId found after fetching patientData");
          return;
        }
      }

      if (patientData?.patientId) {
        await Promise.all([
          fetchUpcomingAppointments(),
          fetchMedicalRecords(),
        ]);
      }
    };

    fetchAllData();
  }, [userId, token, navigate, patientData?.patientId]);

  // Handler functions
  const handleBookAppointment = () => {
    if (!patientData) {
      fetchPatientData().then(() => {
        if (patientData) {
          navigate("/book-appointment", { state: { patientId: patientData.patientId } });
        }
      });
    } else {
      navigate("/book-appointment", { state: { patientId: patientData.patientId } });
    }
  };

  const handleViewPatientData = () => {
    setCurrentView("patientData");
    if (!patientData) fetchPatientData();
  };

  const handleUpdatePatientData = () => {
    if (!patientData) {
      fetchPatientData().then(() => {
        if (patientData) {
          setUpdateFormData({
            firstname: patientData.firstname,
            lastname: patientData.lastname,
            email: patientData.email,
            phone: patientData.phone,
            date_of_birth: patientData.dateOfBirth,
            address: patientData.address,
            gender: patientData.gender,
            userId: patientData.userId,
          });
          setCurrentView("updatePatientData");
        }
      });
    } else {
      setUpdateFormData({
        firstname: patientData.firstname,
        lastname: patientData.lastname,
        email: patientData.email,
        phone: patientData.phone,
        date_of_birth: patientData.dateOfBirth,
        address: patientData.address,
        gender: patientData.gender,
        userId: patientData.userId,
      });
      setCurrentView("updatePatientData");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateStatus({ loading: true, success: null, error: null });

    const { patientId, dateOfBirth, ...updateData } = updateFormData;
    updateData.dateOfBirth = updateFormData.date_of_birth;

    try {
      const response = await fetch(`http://localhost:8083/pateints/update/${patientData.patientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setUpdateStatus({ loading: false, success: "Patient data updated successfully!", error: null });
        setPatientData({ ...patientData, ...updateData, dateOfBirth: updateData.date_of_birth });
        setCurrentView("patientData");
      } else {
        throw new Error("Failed to update patient data.");
      }
    } catch (err) {
      setUpdateStatus({ loading: false, success: null, error: err.message });
    }
  };

  const handleViewMedicalData = () => {
    setCurrentView("medicalData");
    setSelectedRecord(null);
    fetchMedicalRecords();
  };

  const handleGenerateQR = async () => {
    setQrCodeStatus({ loading: true, error: null });
    setCurrentView("qrCode");

    try {
      let patientId = patientData?.patientId;
      if (!patientId && userId) {
        const patient = await fetchPatientData();
        patientId = patient?.patientId;
      }

      if (!patientId) {
        throw new Error("Patient data not available.");
      }

      const response = await fetch(`http://localhost:8085/qrcode/generate/${patientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const qrCodeBase64 = await response.text();
        if (!qrCodeBase64 || !qrCodeBase64.startsWith("data:image/png;base64,")) {
          throw new Error("Invalid QR code data received from server.");
        }
        setQrCodeData(qrCodeBase64);
        setQrCodeStatus({ loading: false, error: null });
      } else {
        throw new Error("Failed to generate QR code.");
      }
    } catch (err) {
      setQrCodeStatus({ loading: false, error: err.message });
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleHelp = () => {
    setCurrentView("help");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
  };

  const handleCloseRecord = () => {
    setSelectedRecord(null);
  };

  const handleClosePrescriptionsModal = () => {
    setPrescriptionModalOpen(false);
    setSelectedPrescriptions([]);
  };

  const handleSaveToDevice = () => {
    if (!qrCodeData) {
      setQrCodeStatus({ loading: false, error: "No QR code data available to download." });
      return;
    }
    const link = document.createElement("a");
    link.href = qrCodeData;
    link.download = `patient-qr-${patientData.patientId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareQR = async () => {
    if (!qrCodeData) {
      setQrCodeStatus({ loading: false, error: "No QR code data available to share." });
      return;
    }

    try {
      if (navigator.share) {
        const response = await fetch(qrCodeData);
        const blob = await response.blob();
        const file = new File([blob], `patient-qr-${patientData.patientId}.png`, { type: "image/png" });
        await navigator.share({
          title: "Patient QR Code",
          text: "Here is my patient QR code for medical records.",
          files: [file],
        });
      } else {
        setQrCodeStatus({ loading: false, error: "Sharing is not supported on this device." });
      }
    } catch (err) {
      setQrCodeStatus({ loading: false, error: "Failed to share QR code." });
    }
  };

  // Render content based on current view
  const renderContent = () => {
    if (!userId && fetchStatus.loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
        </div>
      );
    }

    if (fetchStatus.error) {
      return (
        <motion.div
          className="text-center text-red-600 font-semibold bg-white/90 p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {fetchStatus.error}
        </motion.div>
      );
    }

    switch (currentView) {
      case "dashboard":
        return (
          <motion.div
            className="flex flex-col h-full bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Hero Section */}
            <motion.div
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border-t-4 border-gradient-to-r from-teal-500 to-blue-500"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-800 mb-2 sm:mb-3 tracking-tight">
                    Hello, {username ? ` ${username}` : "Patient"}!
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                    Your healthcare, simplified. Explore your records, appointments, and more.
                  </p>
                </div>
                <motion.img
                  src={heroBanner}
                  alt="Healthcare Banner"
                  className="w-32 sm:w-40 md:w-64 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Appointment Card */}
              <motion.div
                className="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-teal-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <CalendarIcon className="text-teal-600 w-6 sm:w-8 h-6 sm:h-8 mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-bold text-teal-800">Next Appointment</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">
                  {patientData?.upcomingAppointment ? (
                    <>
                      {new Date(patientData.upcomingAppointment.appoinment_Date).toLocaleDateString()}
                      {patientData.upcomingAppointment.appoinment_Time && ` at ${patientData.upcomingAppointment.appoinment_Time}`}
                      {patientData.upcomingAppointment.doctorName && ` with Dr. ${patientData.upcomingAppointment.doctorName}`}
                    </>
                  ) : (
                    <>
                      No upcoming appointments.{" "}
                      <button
                        onClick={handleBookAppointment}
                        className="text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                      >
                        Book now
                      </button>
                    </>
                  )}
                </p>
              </motion.div>

              {/* Medical Record Card */}
              <motion.div
                className="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <DocumentTextIcon className="text-blue-600 w-6 sm:w-8 h-6 sm:h-8 mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-bold text-teal-800">Recent Record</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">
                  {medicalRecords.length > 0 ? (
                    <>
                      {new Date(medicalRecords[0].createdAt).toLocaleDateString()}
                      {medicalRecords[0].disease?.name && ` - ${medicalRecords[0].disease.name}`}
                      {medicalRecords[0].doctorName && ` by Dr. ${medicalRecords[0].doctorName}`}
                    </>
                  ) : (
                    "No medical records found."
                  )}
                </p>
              </motion.div>

              {/* Profile Status Card */}
              <motion.div
                className="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <UserIcon className="text-purple-600 w-6 sm:w-8 h-6 sm:h-8 mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-bold text-teal-800">Profile Status</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">
                  {patientData && patientData.firstname && patientData.email
                    ? "Profile complete"
                    : "Complete your profile to get started."}
                </p>
              </motion.div>
            </div>

            {/* Decorative Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="w-64 sm:w-96 h-64 sm:h-96 bg-teal-100/20 rounded-full absolute -top-40 -left-40 blur-3xl" />
              <div className="w-64 sm:w-96 h-64 sm:h-96 bg-blue-100/20 rounded-full absolute -bottom-40 -right-40 blur-3xl" />
            </div>
          </motion.div>
        );

      case "patientData":
        if (fetchStatus.loading) {
          return (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-t-4 border-b-4 border-teal-600"></div>
            </div>
          );
        }
        if (fetchStatus.error && showPatientDataError) {
          return (
            <motion.div
              className="text-center text-red-600 font-semibold bg-white/90 p-4 sm:p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {fetchStatus.error}
            </motion.div>
          );
        }
        if (patientData) {
          return (
            <motion.div
              className="bg-white/95 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl max-w-3xl mx-auto border-t-4 border-teal-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-800 mb-4 sm:mb-6">Your Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">First Name</p>
                  <p>{patientData.firstname}</p>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Last Name</p>
                  <p>{patientData.lastname}</p>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Email</p>
                  <p>{patientData.email}</p>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Phone</p>
                  <p>{patientData.phone}</p>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Date of Birth</p>
                  <p>{patientData.dateOfBirth}</p>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Address</p>
                  <p>{patientData.address}</p>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Gender</p>
                  <p>{patientData.gender}</p>
                </div>
              </div>
            </motion.div>
          );
        }
        return (
          <motion.div
            className="text-center text-gray-700 p-4 sm:p-6 bg-white/90 rounded-2xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Click "View Profile" to load your information.
          </motion.div>
        );

      case "updatePatientData":
        if (!updateFormData) {
          return (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-t-4 border-b-4 border-teal-600"></div>
            </div>
          );
        }
        return (
          <motion.div
            className="bg-white/95 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl max-w-3xl mx-auto border-t-4 border-teal-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-800 mb-4 sm:mb-6">Edit Your Profile</h3>
            {updateStatus.success && (
              <motion.p
                className="text-green-600 font-semibold mb-4 sm:mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {updateStatus.success}
              </motion.p>
            )}
            {updateStatus.error && (
              <motion.p
                className="text-red-600 font-semibold mb-4 sm:mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {updateStatus.error}
              </motion.p>
            )}
            <form onSubmit={handleUpdateSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-gray-700 block font-semibold mb-1 sm:mb-2 text-sm sm:text-base">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={updateFormData.firstname || ""}
                    onChange={handleFormChange}
                    className="border border-gray-300 p-3 sm:p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 bg-gray-50 text-sm sm:text-base"
                    required
                    aria-label="First Name"
                  />
                </div>
                <div>
                  <label className="text-gray-700 block font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={updateFormData.lastname || ""}
                    onChange={handleFormChange}
                    className="border border-gray-300 p-3 sm:p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 bg-gray-50 text-sm sm:text-base"
                    required
                    aria-label="Last Name"
                  />
                </div>
                <div>
                  <label className="text-gray-700 block font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={updateFormData.email || ""}
                    onChange={handleFormChange}
                    className="border border-gray-300 p-3 sm:p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 bg-gray-50 text-sm sm:text-base"
                    required
                    aria-label="Email"
                  />
                </div>
                <div>
                  <label className="text-gray-700 block font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={updateFormData.phone || ""}
                    onChange={handleFormChange}
                    className="border border-gray-300 p-3 sm:p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 bg-gray-50 text-sm sm:text-base"
                    required
                    aria-label="Phone"
                  />
                </div>
                <div>
                  <label className="text-gray-700 block font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={updateFormData.date_of_birth || ""}
                    onChange={handleFormChange}
                    className="border border-gray-300 p-3 sm:p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 bg-gray-50 text-sm sm:text-base"
                    required
                    aria-label="Date of Birth"
                  />
                </div>
                <div>
                  <label className="text-gray-700 block font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={updateFormData.address || ""}
                    onChange={handleFormChange}
                    className="border border-gray-300 p-3 sm:p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 bg-gray-50 text-sm sm:text-base"
                    required
                    aria-label="Address"
                  />
                </div>
                <div>
                  <label className="text-gray-700 block font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Gender</label>
                  <select
                    name="gender"
                    value={updateFormData.gender || ""}
                    onChange={handleFormChange}
                    className="border border-gray-300 p-3 sm:p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 bg-gray-50 text-sm sm:text-base"
                    required
                    aria-label="Gender"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  disabled={updateStatus.loading}
                >
                  {updateStatus.loading ? "Updating..." : "Update Profile"}
                </motion.button>
                <motion.button
                  type="button"
                  className="bg-gray-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto"
                  onClick={() => setCurrentView("patientData")}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        );

      case "medicalData":
        if (medicalFetchStatus.loading) {
          return (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-t-4 border-b-4 border-teal-600"></div>
            </div>
          );
        }
        if (medicalFetchStatus.error) {
          return (
            <motion.div
              className="text-center text-red-600 font-semibold bg-white/90 p-4 sm:p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {medicalFetchStatus.error}
            </motion.div>
          );
        }
        if (medicalRecords.length === 0) {
          return (
            <motion.div
              className="p-4 sm:p-6 text-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-800 mb-4">Medical Records</h3>
              <p className="text-gray-700 text-sm sm:text-base">No medical records found.</p>
            </motion.div>
          );
        }
        return (
          <motion.div
            className="p-4 sm:p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-800 mb-4 sm:mb-6">Medical Records</h3>
            <div className="max-w-4xl mx-auto space-y-4">
              {medicalRecords.map((record, index) => (
                <motion.div
                  key={record.id}
                  className="bg-white/90 p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-3 sm:mb-0">
                      <p className="text-gray-700 font-semibold text-sm sm:text-base">Record ID: {record.id}</p>
                      <p className="text-gray-700 text-sm sm:text-base">Date: {new Date(record.createdAt).toLocaleDateString()}</p>
                      <p className="text-gray-700 text-sm sm:text-base">Doctor: {record.doctorName}</p>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => handleViewRecord(record)}
                        className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        data-tooltip-id={`view-record-${record.id}`}
                        data-tooltip-content="View record details"
                        aria-label={`View details for record ${record.id}`}
                      >
                        <DocumentTextIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => fetchPrescriptions(record.id)}
                        className="bg-green-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        data-tooltip-id={`view-prescriptions-${record.id}`}
                        data-tooltip-content="View Prescriptions"
                        aria-label={`View prescriptions for record ${record.id}`}
                        disabled={prescriptionFetchStatus.loading}
                      >
                        <DocumentTextIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <AnimatePresence>
              {selectedRecord && (
                <motion.div
                  className="mt-4 sm:mt-6 bg-white/95 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border-t-4 border-teal-500 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                >
                  <h4 className="text-xl sm:text-2xl font-bold text-teal-800 mb-4 sm:mb-6">Record Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-700 text-sm sm:text-base">
                    <p><strong>Disease:</strong> {selectedRecord.disease?.name || "N/A"}</p>
                    <p><strong>Diagnosis:</strong> {selectedRecord.diagnosticData || "N/A"}</p>
                    <p><strong>Treatment:</strong> {selectedRecord.treatments || "N/A"}</p>
                    <p><strong>Date:</strong> {new Date(selectedRecord.createdAt).toLocaleDateString()}</p>
                    <p><strong>Doctor:</strong> {selectedRecord.doctorName || "N/A"}</p>
                    <p>
                      <strong>Report:</strong>{" "}
                      {selectedRecord.reportUrl ? (
                        <a
                          href={`http://localhost:8081${selectedRecord.reportUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-700 font-semibold"
                        >
                          View Report
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                  <motion.button
                    onClick={handleCloseRecord}
                    className="mt-4 sm:mt-6 bg-gray-600 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close record details"
                  >
                    Close
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            {/* View Prescriptions Modal */}
            {prescriptionModalOpen && (
              <motion.div
                className="fixed top-0 right-0 md:top-4 md:left-4 z-50 w-full md:w-[90vw] max-w-[400px] sm:max-w-[600px] md:max-w-[800px] h-full md:h-[90vh] bg-white p-3 sm:p-4 md:p-6 rounded-none md:rounded-xl shadow-2xl overflow-y-auto"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                role="dialog"
                aria-labelledby="prescriptions-modal-title"
                aria-modal="true"
              >
                <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">
                  <h4 id="prescriptions-modal-title" className="text-lg sm:text-xl md:text-2xl font-bold text-teal-800">
                    Prescriptions
                  </h4>
                  <motion.button
                    onClick={handleClosePrescriptionsModal}
                    className="text-gray-600 hover:text-gray-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close prescriptions modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                {prescriptionFetchStatus.loading ? (
                  <div className="flex justify-center items-center h-24 sm:h-32">
                    <div className="animate-spin rounded-full h-10 sm:h-12 w-10 sm:w-12 border-t-4 border-b-4 border-teal-600"></div>
                  </div>
                ) : prescriptionFetchStatus.error ? (
                  <p className="text-red-600 text-center text-sm sm:text-base">{prescriptionFetchStatus.error}</p>
                ) : selectedPrescriptions.length > 0 ? (
                  <div className="space-y-4 sm:space-y-6">
                    {selectedPrescriptions.map((prescription, index) => (
                      <div key={index} className="border-2 border-gray-300 rounded-lg p-3 sm:p-4 bg-gray-50">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-3">
                          <h5 className="text-base sm:text-lg font-semibold text-teal-700">Prescription {index + 1}</h5>
                          <motion.button
                            onClick={() => generatePrescriptionPDF(prescription, index)}
                            className="bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 mt-2 sm:mt-0 w-full sm:w-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            data-tooltip-id={`download-prescription-${index}`}
                            data-tooltip-content="Download Prescription PDF"
                            aria-label={`Download prescription ${index + 1}`}
                          >
                            <ArrowDownTrayIcon className="w-4 sm:w-5 h-4 sm:h-5 inline-block mr-1 sm:mr-2" />
                            Download
                          </motion.button>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base"><strong>Notes:</strong> {prescription.notes || "N/A"}</p>
                        <p className="text-gray-700 text-sm sm:text-base"><strong>Date:</strong> {new Date(prescription.dateIssued).toLocaleDateString()}</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-gray-700 mt-2 sm:mt-3 text-xs sm:text-sm">
                            <thead>
                              <tr className="bg-teal-100">
                                <th className="p-1 sm:p-2 border-b-2 border-teal-500 font-semibold">Medicine</th>
                                <th className="p-1 sm:p-2 border-b-2 border-teal-500 font-semibold">Dosage</th>
                                <th className="p-1 sm:p-2 border-b-2 border-teal-500 font-semibold hidden sm:table-cell">Frequency</th>
                                <th className="p-1 sm:p-2 border-b-2 border-teal-500 font-semibold hidden sm:table-cell">Duration</th>
                                <th className="p-1 sm:p-2 border-b-2 border-teal-500 font-semibold">Instructions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {prescription.prescriptionDetails.map((detail, detailIndex) => (
                                <tr key={detailIndex} className="border-b">
                                  <td className="p-1 sm:p-2 border-r border-gray-200">{detail.medicineName || "N/A"}</td>
                                  <td className="p-1 sm:p-2 border-r border-gray-200">{detail.dosage || "N/A"}</td>
                                  <td className="p-1 sm:p-2 border-r border-gray-200 hidden sm:table-cell">{detail.frequency || "N/A"}</td>
                                  <td className="p-1 sm:p-2 border-r border-gray-200 hidden sm:table-cell">{detail.duration || "N/A"}</td>
                                  <td className="p-1 sm:p-2">{detail.instructions || "N/A"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="sm:hidden mt-2 space-y-2">
                            {prescription.prescriptionDetails.map((detail, detailIndex) => (
                              <div key={detailIndex} className="border-t border-gray-200 pt-2">
                                <p className="text-gray-700 text-xs"><strong>Frequency:</strong> {detail.frequency || "N/A"}</p>
                                <p className="text-gray-700 text-xs"><strong>Duration:</strong> {detail.duration || "N/A"}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 italic text-center text-sm sm:text-base">No prescriptions found for this medical record.</p>
                )}
              </motion.div>
            )}
          </motion.div>
        );

      case "qrCode":
        return (
          <motion.div
            className="p-4 sm:p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-800 mb-4 sm:mb-6">Your QR Code</h3>
            {qrCodeStatus.loading && (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-t-4 border-b-4 border-teal-600"></div>
              </div>
            )}
            {qrCodeStatus.error && (
              <motion.div
                className="text-center text-red-600 font-semibold bg-white/90 p-4 sm:p-6 rounded-2xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {qrCodeStatus.error}
              </motion.div>
            )}
            {qrCodeData && !qrCodeStatus.loading && !qrCodeStatus.error ? (
              <motion.div
                className="bg-white/90 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border-t-4 border-teal-500 max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <img
                  src={qrCodeData}
                  alt="Patient QR Code"
                  className="w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 mx-auto rounded-lg shadow-md"
                />
                <p className="text-center text-gray-700 mt-3 sm:mt-4 font-medium text-sm sm:text-base">
                  Scan to access your patient information.
                </p>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                  <motion.button
                    onClick={handleSaveToDevice}
                    className="flex items-center bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    data-tooltip-id="save-qr"
                    data-tooltip-content="Download QR code"
                  >
                    <ArrowDownTrayIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" /> Save
                  </motion.button>
                  <motion.button
                    onClick={handleShareQR}
                    className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    data-tooltip-id="share-qr"
                    data-tooltip-content="Share QR code"
                  >
                    <ShareIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" /> Share
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              !qrCodeStatus.loading &&
              !qrCodeStatus.error && (
                <motion.div
                  className="text-center text-gray-700 p-4 sm:p-6 bg-white/90 rounded-2xl shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Click "Generate QR" to create your QR code.
                </motion.div>
              )
            )}
          </motion.div>
        );

      case "help":
        return (
          <motion.div
            className="p-4 sm:p-6 text-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-800 mb-4">Help & Support</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Need assistance? Contact us at{" "}
              <a href="mailto:support@hospital.com" className="text-teal-600 hover:text-teal-700 font-semibold">
                support@hospital.com
              </a>
              .
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Main render
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 font-sans md:flex-row">
      {/* Sidebar */}
      <motion.div
        className="flex flex-col bg-white/95 backdrop-blur-lg shadow-2xl rounded-b-3xl md:rounded-r-3xl md:w-64 lg:w-80 p-4 sm:p-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.img
          src={profileImg}
          alt="Profile Picture"
          className="w-20 sm:w-28 h-20 sm:h-28 rounded-full border-4 border-teal-200 mx-auto mb-4 sm:mb-6 shadow-lg hover:scale-105 transition-transform duration-300"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        />
        <h2 className="text-xl sm:text-2xl font-extrabold text-teal-800 text-center mb-6 sm:mb-8">
          {username || "Patient"}
        </h2>
        <div className="space-y-2 sm:space-y-3">
          {[
            { icon: UserIcon, text: "View Profile", onClick: handleViewPatientData, tooltip: "View your personal information" },
            { icon: PencilIcon, text: "Edit Profile", onClick: handleUpdatePatientData, tooltip: "Update your personal details" },
            { icon: DocumentTextIcon, text: "Medical Records", onClick: handleViewMedicalData, tooltip: "View your medical history" },
            { icon: QrCodeIcon, text: "Generate QR", onClick: handleGenerateQR, tooltip: "Create a QR code for your profile" },
            { icon: CalendarIcon, text: "Book Appointment", onClick: handleBookAppointment, tooltip: "Schedule a new appointment" },
            { icon: HomeIcon, text: "Home", onClick: handleBackToHome, tooltip: "Return to homepage" },
            { icon: QuestionMarkCircleIcon, text: "Help", onClick: handleHelp, tooltip: "Get support" },
          ].map((item, index) => (
            <motion.button
              key={index}
              className="flex items-center text-teal-800 hover:text-white hover:bg-gradient-to-r from-teal-600 to-blue-600 transition-all duration-300 w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
              onClick={item.onClick}
              whileHover={{ scale: 1.05, x: 5, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              data-tooltip-id={`sidebar-${index}`}
              data-tooltip-content={item.tooltip}
            >
              <item.icon className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
              <span className="font-medium">{item.text}</span>
            </motion.button>
          ))}
        </div>
        <motion.button
          className="mt-auto bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300"
          onClick={handleLogout}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          data-tooltip-id="logout"
          data-tooltip-content="Sign out of your account"
        >
          <div className="flex items-center justify-center">
            <ArrowLeftOnRectangleIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" />
            <span>Logout</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-3xl md:rounded-l-3xl overflow-y-auto"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        {renderContent()}
      </motion.div>

      {/* Tooltips */}
      {medicalRecords.map((record, index) => (
        <React.Fragment key={`tooltip-${record.id}`}>
          <Tooltip id={`view-record-${record.id}`} place="top" className="bg-teal-800 text-white rounded-lg" content="View record details" />
          <Tooltip id={`view-prescriptions-${record.id}`} place="top" className="bg-teal-800 text-white rounded-lg" content="View Prescriptions" />
          {selectedPrescriptions.map((_, idx) => (
            <Tooltip
              key={`download-prescription-${idx}`}
              id={`download-prescription-${idx}`}
              place="top"
              className="bg-teal-800 text-white rounded-lg"
              content="Download Prescription PDF"
            />
          ))}
        </React.Fragment>
      ))}
      <Tooltip id="save-qr" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="share-qr" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="logout" place="top" className="bg-teal-800 text-white rounded-lg" />
      {[
        "View Profile",
        "Edit Profile",
        "Medical Records",
        "Generate QR",
        "Book Appointment",
        "Home",
        "Help",
      ].map((_, index) => (
        <Tooltip key={index} id={`sidebar-${index}`} place="right" className="bg-teal-800 text-white rounded-lg" />
      ))}
    </div>
  );
}