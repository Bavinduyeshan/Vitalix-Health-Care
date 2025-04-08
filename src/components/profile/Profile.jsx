

// //corect one below

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaUser, FaFileMedical, FaHome, FaQuestionCircle, FaSignOutAlt, FaEdit, FaQrcode, FaDownload, FaShareAlt,FaCalendarPlus } from "react-icons/fa";
// import profileimg from "../../assets/profileimg.jpg"; // Adjust path
// import hospitalIllustration from "../../assets/hosimg.jpeg"; // Adjust path

// export default function Profile() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const initialUserId = state?.userId;
//   const [userId, setUserId] = useState(initialUserId);
//   const [patientData, setPatientData] = useState(null);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [fetchStatus, setFetchStatus] = useState({ loading: false, error: null });
//   const [medicalFetchStatus, setMedicalFetchStatus] = useState({ loading: false, error: null });
//   const [currentView, setCurrentView] = useState("dashboard");
//   const [username, setUserName] = useState("");
//   const [showPatientDataError, setShowPatientDataError] = useState(false);
//   const [updateFormData, setUpdateFormData] = useState(null);
//   const [updateStatus, setUpdateStatus] = useState({ loading: false, success: null, error: null });
//   const [qrCodeData, setQrCodeData] = useState(null);
//   const [qrCodeStatus, setQrCodeStatus] = useState({ loading: false, error: null });

//   const token = localStorage.getItem("token");


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

//   // --- Handlers Defined Up Top ---
//   const handleViewPatientData = () => {
//     setCurrentView("patientData");
//     if (!patientData) fetchPatientData();
//   };

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

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     setUpdateStatus({ loading: true, success: null, error: null });
//     const { patientId, dateOfBirth, ...updateData } = updateFormData;
//     updateData.date_of_birth = updateFormData.date_of_birth;

//     try {
//       const response = await fetch(`http://localhost:8083/pateints/update/${patientData.patientId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(updateData),
//       });

//       if (response.ok) {
//         setUpdateStatus({ loading: false, success: "Patient data updated successfully!", error: null });
//         setPatientData({ ...patientData, ...updateData, dateOfBirth: updateData.date_of_birth });
//         setCurrentView("patientData");
//       } else {
//         throw new Error("Failed to update patient data");
//       }
//     } catch (err) {
//       setUpdateStatus({ loading: false, success: null, error: err.message });
//     }
//   };

//   const handleViewMedicalData = () => {
//     setCurrentView("medicalData");
//     setSelectedRecord(null);
//     if (medicalRecords.length === 0 && !medicalFetchStatus.error) fetchMedicalRecords();
//   };

//   const handleGenerateQR = async () => {
//     if (!patientData) {
//       try {
//         await fetchPatientData();
//       } catch (err) {
//         setQrCodeStatus({ loading: false, error: "Failed to fetch patient data. Please try again." });
//         setCurrentView("qrCode");
//         return;
//       }
//     }
//     if (!patientData || !patientData.patientId) {
//       setQrCodeStatus({ loading: false, error: "Patient data not available. Please try again." });
//       setCurrentView("qrCode");
//       return;
//     }
//     setQrCodeStatus({ loading: true, error: null });
//     setCurrentView("qrCode");
//     try {
//       const response = await fetch(`http://localhost:8085/qrcode/generate/${patientData.patientId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const qrCodeBase64 = await response.text();
//         if (!qrCodeBase64 || !qrCodeBase64.startsWith("data:image/png;base64,")) {
//           throw new Error("Invalid QR code data received from server.");
//         }
//         setQrCodeData(qrCodeBase64);
//         setQrCodeStatus({ loading: false, error: null });
//       } else {
//         throw new Error("Failed to generate QR code");
//       }
//     } catch (err) {
//       setQrCodeStatus({ loading: false, error: err.message });
//     }
//   };

//   const handleBackToHome = () => {
//     navigate("/");
//   };

//   const handleHelp = () => {
//     setCurrentView("help");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleViewRecord = (record) => {
//     setSelectedRecord(record);
//   };

//   const handleCloseRecord = () => {
//     setSelectedRecord(null);
//   };

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

//   // --- Fetch Functions ---
//   const fetchPatientData = async () => {
//     setFetchStatus({ loading: true, error: null });
//     try {
//       const response = await fetch(`http://localhost:8083/pateints/patient/byUserId/${userId}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setPatientData(data);
//         setFetchStatus({ loading: false, error: null });
//       } else {
//         throw new Error("Failed to fetch patient data");
//       }
//     } catch (err) {
//       setFetchStatus({ loading: false, error: err.message });
//       setShowPatientDataError(true);
//     }
//   };

//   const fetchMedicalRecords = async () => {
//     if (!patientData) await fetchPatientData();
//     if (!patientData) return;
//     setMedicalFetchStatus({ loading: true, error: null });
//     try {
//       const response = await fetch(`http://localhost:8081/medical-records/medical-records/${patientData.patientId}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         const recordsWithDoctorNames = await Promise.all(
//           data.map(async (record) => {
//             const doctorName = await fetchDoctorName(record.doctor_Id);
//             return { ...record, doctorName };
//           })
//         );
//         setMedicalRecords(recordsWithDoctorNames);
//         setMedicalFetchStatus({ loading: false, error: null });
//       } else if (response.status === 204) {
//         setMedicalRecords([]);
//         setMedicalFetchStatus({ loading: false, error: "No medical records found." });
//       } else {
//         throw new Error("Failed to fetch medical records");
//       }
//     } catch (err) {
//       setMedicalFetchStatus({ loading: false, error: err.message });
//     }
//   };

//   const fetchDoctorName = async (doctorId) => {
//     try {
//       const response = await fetch(`http://localhost:8082/doctors/ByDoc/${doctorId}`, {
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         return data.firstname;
//       }
//       throw new Error("Failed to fetch doctor name");
//     } catch (err) {
//       return "Unknown Doctor";
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     if (!userId) {
//       const fetchUserData = async () => {
//         try {
//           const userResponse = await fetch("http://localhost:8080/users/api/user/me", {
//             method: "GET",
//             headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//           });
//           if (userResponse.ok) {
//             const userData = await userResponse.json();
//             setUserId(userData.id);
//             setUserName(`${userData.firstname} ${userData.lastname}`);
//           } else {
//             navigate("/login");
//           }
//         } catch (err) {
//           navigate("/login");
//         }
//       };
//       fetchUserData();
//     }
//   }, [userId, navigate]);

//   const renderContent = () => {
//     switch (currentView) {
//       case "dashboard":
//         return (
//           <motion.div
//             className="flex flex-col h-full justify-center items-center bg-gradient-to-b from-blue-50 to-white rounded-lg p-6 shadow-lg"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <h2 className="text-3xl text-center text-teal-600 font-semibold mb-6 tracking-tight">
//               Welcome, {username || "Patient"}!
//             </h2>
//             <img
//               src={hospitalIllustration}
//               alt="Hospital Illustration"
//               className="w-full max-w-md rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
//             />
//           </motion.div>
//         );
//       case "patientData":
//         if (fetchStatus.loading) return <p className="text-center text-gray-500">Loading...</p>;
//         if (fetchStatus.error && showPatientDataError) return <p className="text-center text-red-500">{fetchStatus.error}</p>;
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
//                 <p><strong>First Name:</strong> {patientData.firstname}</p>
//                 <p><strong>Last Name:</strong> {patientData.lastname}</p>
//                 <p><strong>Email:</strong> {patientData.email}</p>
//                 <p><strong>Phone:</strong> {patientData.phone}</p>
//                 <p><strong>Date of Birth:</strong> {patientData.dateOfBirth}</p>
//                 <p><strong>Address:</strong> {patientData.address}</p>
//                 <p><strong>Gender:</strong> {patientData.gender}</p>
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
//         if (medicalFetchStatus.loading) return <p className="text-center text-gray-500">Loading medical records...</p>;
//         if (medicalFetchStatus.error) return <p className="text-center text-red-500">{medicalFetchStatus.error}</p>;
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
//                       <p className="text-gray-600"><strong>Record ID:</strong> {record.id}</p>
//                       <p className="text-gray-600"><strong>Date:</strong> {new Date(record.createdAt).toLocaleDateString()}</p>
//                       <p className="text-gray-600"><strong>Doctor:</strong> {record.doctorName}</p>
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
//                   <p><strong>Disease:</strong> {selectedRecord.disease?.name || "N/A"}</p>
//                   <p><strong>Diagnosis:</strong> {selectedRecord.diagnosticData || "N/A"}</p>
//                   <p><strong>Treatment:</strong> {selectedRecord.treatments || "N/A"}</p>
//                   <p><strong>Date:</strong> {new Date(selectedRecord.createdAt).toLocaleDateString()}</p>
//                   <p><strong>Doctor:</strong> {selectedRecord.doctorName || "N/A"}</p>
//                   <p><strong>Report:</strong> {selectedRecord.reportUrl ? (
//                     <a href={selectedRecord.reportUrl} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline">View Report</a>
//                   ) : "N/A"}</p>
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
//                 <img src={qrCodeData} alt="Patient QR Code" className="w-64 h-64 mx-auto rounded-lg shadow-sm" />
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
//               !qrCodeStatus.loading && !qrCodeStatus.error && (
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
//             <p className="text-gray-500">Need assistance? Contact us at <a href="mailto:support@hospital.com" className="text-teal-500 hover:underline">support@hospital.com</a>.</p>
//           </motion.div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 font-sans md:flex-row">
//       <motion.div
//         className="flex flex-col bg-white shadow-xl rounded-b-3xl md:rounded-r-3xl md:w-1/4 p-6 border-r border-gray-100"
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <motion.img
//           src={profileimg}
//           alt="Profile Picture"
//           className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-teal-200 mx-auto mb-4 shadow-sm"
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5 }}
//         />
//         <h2 className="text-xl font-semibold text-teal-600 text-center mb-6">{username || "Patient"}</h2>
//         <div className="space-y-4">
//           {[
//             { icon: FaUser, text: "View Patient Data", onClick: handleViewPatientData },
//             { icon: FaEdit, text: "Update Patient Data", onClick: handleUpdatePatientData },
//             { icon: FaFileMedical, text: "View Medical Data", onClick: handleViewMedicalData },
//             { icon: FaQrcode, text: "Generate QR", onClick: handleGenerateQR },
//             { icon: FaCalendarPlus, text: "Book Appointment", onClick: handleBookAppointment }, // Added new button
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
import { motion } from "framer-motion";
import { FaUser, FaFileMedical, FaHome, FaQuestionCircle, FaSignOutAlt, FaEdit, FaQrcode, FaDownload, FaShareAlt, FaCalendarPlus } from "react-icons/fa";
import profileimg from "../../assets/profileimg.jpg";
import hospitalIllustration from "../../assets/hosimg.jpeg";

export default function Profile() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [patientData, setPatientData] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({ loading: false, error: null });
  const [medicalFetchStatus, setMedicalFetchStatus] = useState({ loading: false, error: null });
  const [currentView, setCurrentView] = useState("dashboard");
  const [username, setUserName] = useState(localStorage.getItem("username") );
  const [showPatientDataError, setShowPatientDataError] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null);
  const [updateStatus, setUpdateStatus] = useState({ loading: false, success: null, error: null });
  const [qrCodeData, setQrCodeData] = useState(null);
  const [qrCodeStatus, setQrCodeStatus] = useState({ loading: false, error: null });

  const token = localStorage.getItem("token");

  const fetchUserData = async () => {
    setFetchStatus({ loading: true, error: null });
    try {
      const storedUsername = localStorage.getItem("username")?.split(" ")[0]; // Use first part of username
      const response = await fetch(`http://localhost:8080/users/byUsername/${storedUsername}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        const userData = await response.json();
        setUserId(userData.id);
        setUserName(`${userData.username} `);
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("username", `${userData.username} `);
        setFetchStatus({ loading: false, error: null });
      } else {
        console.error("Failed to fetch user data:", response.statusText);
        setFetchStatus({ loading: false, error: "Failed to load user data. Please try again." });
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setFetchStatus({ loading: false, error: "Authentication error. Please log in again." });
    }
  };

  useEffect(() => {
    console.log("Token:", token);
    console.log("UserId:", userId);
    if (!token) {
      navigate("/login");
      return;
    }

    if (!userId) {
      fetchUserData();
    }
  }, [userId, token, navigate]);
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
    updateData.date_of_birth = updateFormData.date_of_birth;

    try {
      const response = await fetch(`http://localhost:8083/pateints/update/${patientData.patientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setUpdateStatus({ loading: false, success: "Patient data updated successfully!", error: null });
        setPatientData({ ...patientData, ...updateData, dateOfBirth: updateData.date_of_birth });
        setCurrentView("patientData");
      } else {
        throw new Error("Failed to update patient data");
      }
    } catch (err) {
      setUpdateStatus({ loading: false, success: null, error: err.message });
    }
  };

  const handleViewMedicalData = () => {
    setCurrentView("medicalData");
    setSelectedRecord(null);
    if (medicalRecords.length === 0 && !medicalFetchStatus.error) fetchMedicalRecords();
  };

  const handleGenerateQR = async () => {
    if (!patientData) {
      try {
        await fetchPatientData();
      } catch (err) {
        setQrCodeStatus({ loading: false, error: "Failed to fetch patient data. Please try again." });
        setCurrentView("qrCode");
        return;
      }
    }
    if (!patientData || !patientData.patientId) {
      setQrCodeStatus({ loading: false, error: "Patient data not available. Please try again." });
      setCurrentView("qrCode");
      return;
    }
    setQrCodeStatus({ loading: true, error: null });
    setCurrentView("qrCode");
    try {
      const response = await fetch(`http://localhost:8085/qrcode/generate/${patientData.patientId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        const qrCodeBase64 = await response.text();
        if (!qrCodeBase64 || !qrCodeBase64.startsWith("data:image/png;base64,")) {
          throw new Error("Invalid QR code data received from server.");
        }
        setQrCodeData(qrCodeBase64);
        setQrCodeStatus({ loading: false, error: null });
      } else {
        throw new Error("Failed to generate QR code");
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

  const fetchPatientData = async () => {
    setFetchStatus({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:8083/pateints/patient/byUserId/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPatientData(data);
        setFetchStatus({ loading: false, error: null });
      } else {
        throw new Error("Failed to fetch patient data");
      }
    } catch (err) {
      setFetchStatus({ loading: false, error: err.message });
      setShowPatientDataError(true);
    }
  };

  const fetchMedicalRecords = async () => {
    if (!patientData) await fetchPatientData();
    if (!patientData) return;
    setMedicalFetchStatus({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:8081/medical-records/medical-records/${patientData.patientId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        const recordsWithDoctorNames = await Promise.all(
          data.map(async (record) => {
            const doctorName = await fetchDoctorName(record.doctor_Id);
            return { ...record, doctorName };
          })
        );
        setMedicalRecords(recordsWithDoctorNames);
        setMedicalFetchStatus({ loading: false, error: null });
      } else if (response.status === 204) {
        setMedicalRecords([]);
        setMedicalFetchStatus({ loading: false, error: "No medical records found." });
      } else {
        throw new Error("Failed to fetch medical records");
      }
    } catch (err) {
      setMedicalFetchStatus({ loading: false, error: err.message });
    }
  };

  const fetchDoctorName = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:8082/doctors/ByDoc/${doctorId}`, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        return data.firstname;
      }
      throw new Error("Failed to fetch doctor name");
    } catch (err) {
      return "Unknown Doctor";
    }
  };

  const renderContent = () => {
    if (!userId && fetchStatus.loading) {
      return <p className="text-center text-gray-500">Loading profile...</p>;
    }
    if (fetchStatus.error) {
      return <p className="text-center text-red-500">{fetchStatus.error}</p>;
    }

    switch (currentView) {
      case "dashboard":
        return (
          <motion.div
            className="flex flex-col h-full justify-center items-center bg-gradient-to-b from-blue-50 to-white rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl text-center text-teal-600 font-semibold mb-6 tracking-tight">
              Welcome, {username || "Patient"}!
            </h2>
            <img
              src={hospitalIllustration}
              alt="Hospital Illustration"
              className="w-full max-w-md rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        );
      case "patientData":
        if (fetchStatus.loading) return <p className="text-center text-gray-500">Loading...</p>;
        if (fetchStatus.error && showPatientDataError) return <p className="text-center text-red-500">{fetchStatus.error}</p>;
        if (patientData) {
          return (
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto border-t-4 border-teal-400"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3 className="text-2xl text-teal-600 font-semibold mb-4">Patient Information</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>First Name:</strong> {patientData.firstname}</p>
                <p><strong>Last Name:</strong> {patientData.lastname}</p>
                <p><strong>Email:</strong> {patientData.email}</p>
                <p><strong>Phone:</strong> {patientData.phone}</p>
                <p><strong>Date of Birth:</strong> {patientData.dateOfBirth}</p>
                <p><strong>Address:</strong> {patientData.address}</p>
                <p><strong>Gender:</strong> {patientData.gender}</p>
              </div>
            </motion.div>
          );
        }
        return <p className="text-center text-gray-500">Click "View Patient Data" to load your information.</p>;
      case "updatePatientData":
        if (!updateFormData) {
          return <p className="text-center text-gray-500">Loading patient data for update...</p>;
        }
        return (
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto border-t-4 border-teal-400"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h3 className="text-2xl text-teal-600 font-semibold mb-4">Update Patient Information</h3>
            {updateStatus.success && <p className="text-green-500 mb-4">{updateStatus.success}</p>}
            {updateStatus.error && <p className="text-red-500 mb-4">{updateStatus.error}</p>}
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="text-gray-700 block">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={updateFormData.firstname || ""}
                  onChange={handleFormChange}
                  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 block">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={updateFormData.lastname || ""}
                  onChange={handleFormChange}
                  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={updateFormData.email || ""}
                  onChange={handleFormChange}
                  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 block">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={updateFormData.phone || ""}
                  onChange={handleFormChange}
                  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 block">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={updateFormData.date_of_birth || ""}
                  onChange={handleFormChange}
                  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 block">Address</label>
                <input
                  type="text"
                  name="address"
                  value={updateFormData.address || ""}
                  onChange={handleFormChange}
                  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 block">Gender</label>
                <select
                  name="gender"
                  value={updateFormData.gender || ""}
                  onChange={handleFormChange}
                  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={updateStatus.loading}
                >
                  {updateStatus.loading ? "Updating..." : "Update"}
                </motion.button>
                <motion.button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => setCurrentView("patientData")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        );
      case "medicalData":
        if (medicalFetchStatus.loading) return <p className="text-center text-gray-500">Loading medical records...</p>;
        if (medicalFetchStatus.error) return <p className="text-center text-red-500">{medicalFetchStatus.error}</p>;
        if (medicalRecords.length === 0) {
          return (
            <motion.div
              className="p-6 text-center bg-white rounded-xl shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl text-teal-600 font-semibold mb-4">Medical Records</h3>
              <p className="text-gray-500">No medical records found.</p>
            </motion.div>
          );
        }
        return (
          <motion.div
            className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl text-teal-600 font-semibold mb-6">Medical Records</h3>
            <div className="max-w-3xl mx-auto space-y-4">
              {medicalRecords.map((record) => (
                <motion.div
                  key={record.id}
                  className="bg-white p-4 rounded-lg shadow-md border-l-4 border-teal-400 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600"><strong>Record ID:</strong> {record.id}</p>
                      <p className="text-gray-600"><strong>Date:</strong> {new Date(record.createdAt).toLocaleDateString()}</p>
                      <p className="text-gray-600"><strong>Doctor:</strong> {record.doctorName}</p>
                    </div>
                    <motion.button
                      onClick={() => handleViewRecord(record)}
                      className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            {selectedRecord && (
              <motion.div
                className="mt-6 bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-400 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="text-xl text-teal-600 font-semibold mb-4">Medical Record Details</h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Disease:</strong> {selectedRecord.disease?.name || "N/A"}</p>
                  <p><strong>Diagnosis:</strong> {selectedRecord.diagnosticData || "N/A"}</p>
                  <p><strong>Treatment:</strong> {selectedRecord.treatments || "N/A"}</p>
                  <p><strong>Date:</strong> {new Date(selectedRecord.createdAt).toLocaleDateString()}</p>
                  <p><strong>Doctor:</strong> {selectedRecord.doctorName || "N/A"}</p>
                  <p><strong>Report:</strong>{" "}
              {selectedRecord.reportUrl ? (
                <a
                  href={`http://localhost:8081${selectedRecord.reportUrl}`} // Full URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:underline"
                >
                  View Report
                </a>
              ) : (
                "N/A"
              )}</p>
                </div>
                <motion.button
                  onClick={handleCloseRecord}
                  className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        );
      case "qrCode":
        return (
          <motion.div
            className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl text-teal-600 font-semibold mb-6">Your Patient QR Code</h3>
            {qrCodeStatus.loading && <p className="text-center text-gray-500">Generating QR code...</p>}
            {qrCodeStatus.error && <p className="text-center text-red-500">{qrCodeStatus.error}</p>}
            {qrCodeData && !qrCodeStatus.loading && !qrCodeStatus.error ? (
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-teal-400 max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={qrCodeData} alt="Patient QR Code" className="w-64 h-64 mx-auto rounded-lg shadow-sm" />
                <p className="text-center text-gray-600 mt-4">Scan to access your patient information.</p>
                <div className="mt-4 flex space-x-4 justify-center">
                  <motion.button
                    onClick={handleSaveToDevice}
                    className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaDownload className="mr-2" /> Save
                  </motion.button>
                  <motion.button
                    onClick={handleShareQR}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaShareAlt className="mr-2" /> Share
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              !qrCodeStatus.loading && !qrCodeStatus.error && (
                <p className="text-center text-gray-500">Click "Generate QR" to create your QR code.</p>
              )
            )}
          </motion.div>
        );
      case "help":
        return (
          <motion.div
            className="p-6 text-center bg-white rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl text-teal-600 font-semibold mb-4">Help & Support</h3>
            <p className="text-gray-500">Need assistance? Contact us at <a href="mailto:support@hospital.com" className="text-teal-500 hover:underline">support@hospital.com</a>.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans md:flex-row">
      <motion.div
        className="flex flex-col bg-white shadow-xl rounded-b-3xl md:rounded-r-3xl md:w-1/4 p-6 border-r border-gray-100"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.img
          src={profileimg}
          alt="Profile Picture"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-teal-200 mx-auto mb-4 shadow-sm"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h2 className="text-xl font-semibold text-teal-600 text-center mb-6">{username || "Patient"}</h2>
        <div className="space-y-4">
          {[
            { icon: FaUser, text: "View Patient Data", onClick: handleViewPatientData },
            { icon: FaEdit, text: "Update Patient Data", onClick: handleUpdatePatientData },
            { icon: FaFileMedical, text: "View Medical Data", onClick: handleViewMedicalData },
            { icon: FaQrcode, text: "Generate QR", onClick: handleGenerateQR },
            { icon: FaCalendarPlus, text: "Book Appointment", onClick: handleBookAppointment },
            { icon: FaHome, text: "Back to Home", onClick: handleBackToHome },
            { icon: FaQuestionCircle, text: "Help", onClick: handleHelp },
          ].map((item, index) => (
            <motion.button
              key={index}
              className="flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200 w-full text-left px-4 py-2 rounded-lg hover:bg-teal-50"
              onClick={item.onClick}
              whileHover={{ scale: 1.03, x: 5 }}
              whileTap={{ scale: 0.97 }}
            >
              <item.icon className="mr-3" />
              <span>{item.text}</span>
            </motion.button>
          ))}
        </div>
        <motion.button
          className="mt-auto bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center justify-center">
            <FaSignOutAlt className="mr-2" />
            <span>Logout</span>
          </div>
        </motion.button>
      </motion.div>

      <motion.div
        className="flex-1 p-6 md:p-8 bg-gradient-to-br from-blue-50 to-gray-50 rounded-t-3xl md:rounded-l-3xl overflow-y-auto"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}