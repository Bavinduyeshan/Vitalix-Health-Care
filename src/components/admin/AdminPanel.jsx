// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaBars, FaTimes, FaHome, FaUserMd, FaServicestack, FaSignOutAlt } from 'react-icons/fa';
// import { h1 } from 'framer-motion/client';

// // Sidebar Component
// const Sidebar = ({ setActiveSection, isOpen, toggleSidebar }) => (
//   <motion.div
//     className={`fixed inset-y-0 left-0 w-64 bg-blue-900 text-white p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
//     initial={{ x: '-100%' }}
//     animate={{ x: isOpen ? 0 : '-100%' }}
//     transition={{ duration: 0.3 }}
//   >
//     <div className="flex justify-between items-center mb-8">
//       <h2 className="text-xl font-bold">Admin Panel</h2>
//       <button className="md:hidden text-2xl" onClick={toggleSidebar}>
//         <FaTimes />
//       </button>
//     </div>
//     <nav className="space-y-4">
//       <button className="flex items-center space-x-2 w-full p-2 rounded hover:bg-blue-700" onClick={() => setActiveSection('dashboard')}>
//         <FaHome /> <span>Dashboard</span>
//       </button>
//       <button className="flex items-center space-x-2 w-full p-2 rounded hover:bg-blue-700" onClick={() => setActiveSection('doctors')}>
//         <FaUserMd /> <span>Doctors</span>
//       </button>
//       <button className="flex items-center space-x-2 w-full p-2 rounded hover:bg-blue-700" onClick={() => setActiveSection('services')}>
//         <FaServicestack /> <span>Services</span>
//       </button>
//       <button className="flex items-center space-x-2 w-full p-2 rounded hover:bg-blue-700" onClick={() => alert('Logout')}>
//         <FaSignOutAlt /> <span>Logout</span>
//       </button>
//     </nav>
//   </motion.div>
// );

// // Dashboard Component
// const Dashboard = () => (
//   <div className="space-y-6">
//     <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">Dashboard</h1>
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//         <h3 className="text-lg font-semibold text-gray-700">Total Doctors</h3>
//         <p className="text-2xl sm:text-3xl font-bold text-blue-600">3</p>
//       </div>
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//         <h3 className="text-lg font-semibold text-gray-700">Total Services</h3>
//         <p className="text-2xl sm:text-3xl font-bold text-blue-600">3</p>
//       </div>
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//         <h3 className="text-lg font-semibold text-gray-700">Appointments Today</h3>
//         <p className="text-2xl sm:text-3xl font-bold text-blue-600">5</p>
//       </div>
//     </div>
//     <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
//       <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
//         <li>Added Dr. John Smith - 3/24/2025</li>
//         <li>Updated "Book Appointment" service - 3/23/2025</li>
//         <li>Deleted Dr. Jane Doe - 3/22/2025</li>
//       </ul>
//     </div>
//   </div>
// );

// // Doctor Management Component
// const DoctorManagement = ({ doctors, setDoctors }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editDoctor, setEditDoctor] = useState(null);

//   const initialDoctorState = { id: '', name: '', specialty: '', description: '', education: '', experience: '', contact: '' };
//   const [formData, setFormData] = useState(initialDoctorState);

//   const openModal = (doctor = null) => {
//     setEditDoctor(doctor);
//     setFormData(doctor || initialDoctorState);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditDoctor(null);
//     setFormData(initialDoctorState);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editDoctor) {
//       setDoctors(doctors.map((d) => (d.id === editDoctor.id ? { ...formData, id: d.id } : d)));
//     } else {
//       setDoctors([...doctors, { ...formData, id: Date.now() }]);
//     }
//     closeModal();
//     // TODO: Add API call here (e.g., POST/PUT to /api/doctors)
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this doctor?')) {
//       setDoctors(doctors.filter((d) => d.id !== id));
//       // TODO: Add API call here (e.g., DELETE to /api/doctors/:id)
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">Doctor Management</h1>
//         <button className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-blue-600" onClick={() => openModal()}>Add Doctor</button>
//       </div>
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
//         <table className="w-full text-left text-sm sm:text-base">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 sm:p-3">Name</th>
//               <th className="p-2 sm:p-3">Specialty</th>
//               <th className="p-2 sm:p-3 hidden md:table-cell">Experience</th>
//               <th className="p-2 sm:p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {doctors.map((doctor) => (
//               <tr key={doctor.id} className="border-b">
//                 <td className="p-2 sm:p-3">{doctor.name}</td>
//                 <td className="p-2 sm:p-3">{doctor.specialty}</td>
//                 <td className="p-2 sm:p-3 hidden md:table-cell">{doctor.experience}</td>
//                 <td className="p-2 sm:p-3 space-x-2">
//                   <button className="text-blue-500 hover:underline" onClick={() => openModal(doctor)}>Edit</button>
//                   <button className="text-red-500 hover:underline" onClick={() => handleDelete(doctor.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Doctor Modal */}
//       {isModalOpen && (
//         <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//           <motion.div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
//             <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-4">{editDoctor ? 'Edit Doctor' : 'Add Doctor'}</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-gray-700">Name</label>
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md" required />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Specialty</label>
//                 <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} className="w-full p-2 border rounded-md" required />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Description</label>
//                 <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md" rows="3" />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Education</label>
//                 <input type="text" name="education" value={formData.education} onChange={handleChange} className="w-full p-2 border rounded-md" />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Experience</label>
//                 <input type="text" name="experience" value={formData.experience} onChange={handleChange} className="w-full p-2 border rounded-md" />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Contact</label>
//                 <input type="email" name="contact" value={formData.contact} onChange={handleChange} className="w-full p-2 border rounded-md" />
//               </div>
//               <div className="flex justify-end gap-4">
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
//                 <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={closeModal}>Cancel</button>
//               </div>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// // Services Management Component
// const ServicesManagement = ({ services, setServices }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editService, setEditService] = useState(null);

//   const initialServiceState = { id: '', title: '', description: '', link: '' };
//   const [formData, setFormData] = useState(initialServiceState);

//   const openModal = (service = null) => {
//     setEditService(service);
//     setFormData(service || initialServiceState);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditService(null);
//     setFormData(initialServiceState);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editService) {
//       setServices(services.map((s) => (s.id === editService.id ? { ...formData, id: s.id } : s)));
//     } else {
//       setServices([...services, { ...formData, id: Date.now() }]);
//     }
//     closeModal();
//     // TODO: Add API call here (e.g., POST/PUT to /api/services)
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this service?')) {
//       setServices(services.filter((s) => s.id !== id));
//       // TODO: Add API call here (e.g., DELETE to /api/services/:id)
//     }
//   };

//   return (

    
//     <div className="space-y-6">
        
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">Services Management</h1>
//         <button className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-blue-600" onClick={() => openModal()}>Add Service</button>
//       </div>
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
//         <table className="w-full text-left text-sm sm:text-base">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 sm:p-3">Title</th>
//               <th className="p-2 sm:p-3 hidden sm:table-cell">Description</th>
//               <th className="p-2 sm:p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {services.map((service) => (
//               <tr key={service.id} className="border-b">
//                 <td className="p-2 sm:p-3">{service.title}</td>
//                 <td className="p-2 sm:p-3 hidden sm:table-cell">{service.description}</td>
//                 <td className="p-2 sm:p-3 space-x-2">
//                   <button className="text-blue-500 hover:underline" onClick={() => openModal(service)}>Edit</button>
//                   <button className="text-red-500 hover:underline" onClick={() => handleDelete(service.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Service Modal */}
//       {isModalOpen && (
//         <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//           <motion.div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
//             <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-4">{editService ? 'Edit Service' : 'Add Service'}</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-gray-700">Title</label>
//                 <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-md" required />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Description</label>
//                 <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md" rows="3" />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Link</label>
//                 <input type="text" name="link" value={formData.link} onChange={handleChange} className="w-full p-2 border rounded-md" />
//               </div>
//               <div className="flex justify-end gap-4">
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
//                 <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={closeModal}>Cancel</button>
//               </div>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// // Main Admin Panel Component
// export default function AdminPanel() {
//   const [activeSection, setActiveSection] = useState('dashboard');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   // Sample data (replace with API fetch)
//   const [doctors, setDoctors] = useState([
//     { id: 1, name: "Dr. John Smith", specialty: "Cardiologist", description: "Heart specialist.", education: "MD, Harvard", experience: "15+ years", contact: "john.smith@healthcarehub.com" },
//     { id: 2, name: "Dr. Emily Johnson", specialty: "Neurologist", description: "Brain expert.", education: "MD, Johns Hopkins", experience: "12+ years", contact: "emily.johnson@healthcarehub.com" },
//     { id: 3, name: "Dr. Michael Brown", specialty: "Pediatrician", description: "Child care specialist.", education: "MD, Stanford", experience: "10+ years", contact: "michael.brown@healthcarehub.com" },
//   ]);

//   const [services, setServices] = useState([
//     { id: 1, title: "Patient Registration", description: "Sign up easily.", link: "/register" },
//     { id: 2, title: "Book Appointment", description: "Schedule a visit.", link: "/book-appointment" },
//     { id: 3, title: "View Medical Records", description: "Access your records.", link: "/medical-records" },
//   ]);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar setActiveSection={setActiveSection} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <div className="flex-1 p-4 sm:p-6 md:p-8">
//         <button className="md:hidden text-2xl mb-4" onClick={toggleSidebar}>
//           <FaBars />
//         </button>
//         <motion.div
//           key={activeSection}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {activeSection === 'dashboard' && <Dashboard />}
//           {activeSection === 'doctors' && <DoctorManagement doctors={doctors} setDoctors={setDoctors} />}
//           {activeSection === 'services' && <ServicesManagement services={services} setServices={setServices} />}
//         </motion.div>
//       </div>
//     </div>
//   );
// }


// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaUsers, FaUserMd, FaCalendarCheck } from 'react-icons/fa'; // Icons for stats

// export default function AdminDashboard() {
//   // Placeholder for logged-in admin username (replace with actual auth logic)
//   const adminUsername = "Bavindu";

//   // Animation variants for smooth transitions
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 font-sans">
//       {/* Main Content */}
//       <motion.div
//         className="max-w-7xl mx-auto p-4 sm:p-6 md:p-9"  
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Header with Username */}
//         <motion.div variants={itemVariants}>
//             <img src="" alt="" />
//           <h1 className="text-2xl sm:text-3xl md:text-4xl text-blue-500 font-bold mb-4">
//             Hello, {adminUsername}
//           </h1>
//         </motion.div>

//         {/* Rounded Menu Bar */}
//         <motion.div
//           className="bg-white rounded-full shadow-md p-2 sm:p-3 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8"
//           variants={itemVariants}
//         >
//           <button className="text-blue-600 hover:bg-blue-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300">
//             Dashboard
//           </button>
//           <button className="text-blue-600 hover:bg-blue-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300">
//             Doctors
//           </button>
//           <button className="text-blue-600 hover:bg-blue-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300">
//             Patients
//           </button>
//           <button className="text-blue-600 hover:bg-blue-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300">
//             Appointments
//           </button>
//           <button className="text-blue-600 hover:bg-blue-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300">
//             Logout
//           </button>
//         </motion.div>

//         {/* Stats Boxes */}
//         <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8" variants={containerVariants}>
//           {/* Number of Patients */}
//           <motion.div
//             className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-all duration-300"
//             variants={itemVariants}
//             whileHover={{ scale: 1.03 }}
//           >
//             <FaUsers className="text-blue-500 text-3xl sm:text-4xl" />
//             <div>
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Number of Patients</h3>
//               <p className="text-2xl sm:text-3xl font-bold text-blue-600">150</p> {/* Placeholder value */}
//             </div>
//           </motion.div>

//           {/* Number of Doctors */}
//           <motion.div
//             className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-all duration-300"
//             variants={itemVariants}
//             whileHover={{ scale: 1.03 }}
//           >
//             <FaUserMd className="text-blue-500 text-3xl sm:text-4xl" />
//             <div>
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Number of Doctors</h3>
//               <p className="text-2xl sm:text-3xl font-bold text-blue-600">3</p> {/* Placeholder value */}
//             </div>
//           </motion.div>

//           {/* Number of Appointments */}
//           <motion.div
//             className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-all duration-300"
//             variants={itemVariants}
//             whileHover={{ scale: 1.03 }}
//           >
//             <FaCalendarCheck className="text-blue-500 text-3xl sm:text-4xl" />
//             <div>
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Number of Appointments</h3>
//               <p className="text-2xl sm:text-3xl font-bold text-blue-600">25</p> {/* Placeholder value */}
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Additional Section: Recent Activity */}
//         <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-md" variants={itemVariants}>
//           <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-4">Recent Activity</h2>
//           <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
//             <li className="flex items-center space-x-2">
//               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//               <span>Added Dr. John Smith - 3/24/2025, 10:30 AM</span>
//             </li>
//             <li className="flex items-center space-x-2">
//               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//               <span>Patient "Jane Doe" booked an appointment - 3/24/2025, 9:15 AM</span>
//             </li>
//             <li className="flex items-center space-x-2">
//               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//               <span>Updated "Book Appointment" service - 3/23/2025, 2:45 PM</span>
//             </li>
//           </ul>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

//correct g

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaUserMd, FaCalendarCheck, FaFileDownload, FaPlus, FaEdit, FaSearch } from "react-icons/fa";
import profileimg from "../../assets/profileimg.jpg";
import { useNavigate } from "react-router-dom";
import {  FaEye } from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Dashboard");
  const adminUsername = "Bavindu";




  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole"); // Clear role
    setIsLoggedIn(false);
    setIsAdmin(false); // Reset admin status
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  // State for data
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [diseases, setDiseases] = useState([]);

  // Search states
  const [doctorSearchId, setDoctorSearchId] = useState("");
  const [patientSearchId, setPatientSearchId] = useState("");
  const [appointmentSearchId, setAppointmentSearchId] = useState("");
  const [medicalRecordSearchId, setMedicalRecordSearchId] = useState("");
  const [userSearchId, setUserSearchId] = useState("");
  const [diseaseSearchId, setDiseaseSearchId] = useState("");

  // Modal states
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);
  const initialDoctorState = { id: "", firstname: "", lastname: "", phonenumber: "", email: "", specilization: "", userId: "", experience: "", education: "" };
  const [doctorFormData, setDoctorFormData] = useState(initialDoctorState);

  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const initialPatientState = { patientId: "", userId: "", firstname: "", lastname: "", email: "", phone: "", dateOfBirth: "", address: "", gender: "", createdDate: "", lastModifiedDate: "" };
  const [patientFormData, setPatientFormData] = useState(initialPatientState);

  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [editAppointment, setEditAppointment] = useState(null);
  const initialAppointmentState = { AppoinmentID: "", patientId: "", doctorId: "",appoinment_Date:"", appoinment_Time: "", reason: "" };
  const [appointmentFormData, setAppointmentFormData] = useState(initialAppointmentState);

  const [isMedicalRecordModalOpen, setIsMedicalRecordModalOpen] = useState(false);
  const [editMedicalRecord, setEditMedicalRecord] = useState(null);
  const initialMedicalRecordState = { recordid: "", patientId: "", doctorId: "",diseasename:"", diagnosticdata: "", treatments: "" ,reporturl:"",createdAt:""};
  const [medicalRecordFormData, setMedicalRecordFormData] = useState(initialMedicalRecordState);


  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const initialUserState = { userId: "", username: "", email: "", password: "", role: "", createdDate: "" };
  const [userFormData, setUserFormData] = useState(initialUserState);

  const [isDiseaseModalOpen, setIsDiseaseModalOpen] = useState(false);
  const [editDisease, setEditDisease] = useState(null);
  const initialDiseaseState = { id: "", name: "" };
  const [diseaseFormData, setDiseaseFormData] = useState(initialDiseaseState);

  // Animation variants
  const containerVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  // Fetch data on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8082/doctors/getAll", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => { if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`); return res.json(); })
      .then((data) => {
        const mappedDoctors = data.map((doctor) => ({
          id: doctor.doctor_Id || "", firstname: doctor.firstname || "", lastname: doctor.lastname || "",
          phonenumber: doctor.phonenumber || "", email: doctor.email || "", specilization: doctor.specilization || doctor.specialization || "",
          userId: doctor.userId || "", experience: doctor.experience || "", education: doctor.education || "",
        }));
        setDoctors(mappedDoctors);
      })
      .catch((error) => console.error("Error fetching doctors:", error));

    fetch("http://localhost:8083/pateints/patients/getAll", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        const mappedPatients = data.map((patient) => ({
          patientId: patient.patientId || "", userId: patient.userId || "", firstname: patient.firstname || "", lastname: patient.lastname || "",
          email: patient.email || "", phone: patient.phone || "", dateOfBirth: patient.dateOfBirth || "", address: patient.address || "",
          gender: patient.gender || "", createdDate: patient.createdDate || "", lastModifiedDate: patient.lastModifiedDate || "",
        }));
        setPatients(mappedPatients);
      })
      .catch((error) => console.error("Error fetching patients:", error));

    fetch("http://localhost:8086/appoinments/getAll", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        const mappedAppointments = data.map((appointment) => ({
          AppoinmentID: appointment.appoinmentId ||"", patientId: appointment.patientID ||"", doctorId:appointment.docname || "",appoinment_Date:appointment.appoinment_Date ||"", appoinment_Time:appointment.appoinment_Time || "", reason:appointment.reason || "" 
      }));
      setAppointments(mappedAppointments);
    })
      .catch((error) => console.error("Error fetching appointments:", error));

      fetch("http://localhost:8081/medical-records/getAll", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const mappedMedicalRecords = data.map((medicalRecord) => ({
          recordid: medicalRecord.id || "",
          patientId: medicalRecord.patientID || "", // Match backend field name (patientID)
          doctorId: medicalRecord.doctor_Id || "",  // Corrected from doctor_Id
          diseasename: medicalRecord.disease?.name || "",
          diagnosticdata: medicalRecord.diagnosticData || "",
          treatments: medicalRecord.treatments || "",
          reporturl: medicalRecord.reportUrl || "",
          createdAt: medicalRecord.createdAt || "",
        }));
        setMedicalRecords(mappedMedicalRecords); // Set the mapped data
        console.log("Mapped Medical Records:", mappedMedicalRecords); // Debug
      })
      .catch((error) => console.error("Error fetching medical records:", error));

      // Fetch Users
    fetch("http://localhost:8080/users/getAll", { headers: { Authorization: `Bearer ${token}` } }) // Adjust endpoint as needed
    .then((res) => { if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`); return res.json(); })
    .then((data) => {
      const mappedUsers = data.map((user) => ({
        userId: user.userId || "", username: user.username || "", email: user.email || "",
        password: user.password || "", role: user.role || "", createdDate: user.createdDate || "",
      }));
      setUsers(mappedUsers);
      console.log("Mapped Users:", mappedUsers);
    })
    .catch((error) => console.error("Error fetching users:", error));

  // Fetch Diseases
  fetch("http://localhost:8081/diseases/getAll", { headers: { Authorization: `Bearer ${token}` } }) // Adjust endpoint as needed
    .then((res) => { if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`); return res.json(); })
    .then((data) => {
      const mappedDiseases = data.map((disease) => ({
        id: disease.id || "", name: disease.name || "",
      }));
      setDiseases(mappedDiseases);
      console.log("Mapped Diseases:", mappedDiseases);
    })
    .catch((error) => console.error("Error fetching diseases:", error));




  }, []);

  const downloadReportUrl = (url, recordId) => {
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const urlObject = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = urlObject;
        link.download = `Medical_Record_${recordId}_Report_${new Date().toISOString().split("T")[0]}.pdf`;
        link.click();
        URL.revokeObjectURL(urlObject);
      })
      .catch((error) => {
        console.error("Error downloading report:", error);
        alert("Failed to download report. Please check the URL.");
      });
  };
  
  // CRUD Handlers

        // CRUD Handlers for Users
        const openUserModal = (user = null) => { setEditUser(user); setUserFormData(user || initialUserState); setIsUserModalOpen(true); };
        const closeUserModal = () => { setIsUserModalOpen(false); setEditUser(null); setUserFormData(initialUserState); };
        const handleUserChange = (e) => setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
        const handleUserSubmit = (e) => {
          e.preventDefault();
          const token = localStorage.getItem("token");
          const method = editUser ? "PUT" : "POST";
          const url = editUser ? `http://localhost:8080/users/${editUser.userId}` : "http://localhost:8080/users"; // Adjust endpoint
          fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(userFormData) })
            .then((res) => res.json())
            .then((data) => {
              if (editUser) setUsers(users.map((u) => (u.userId === data.userId ? data : u)));
              else setUsers([...users, data]);
              closeUserModal();
            })
            .catch((error) => console.error("Error saving user:", error));
        };
        const handleUserDelete = (userId) => {
          if (window.confirm("Are you sure?")) {
            const token = localStorage.getItem("token");
            fetch(`http://localhost:8080/users/${userId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
              .then(() => setUsers(users.filter((u) => u.userId !== userId)))
              .catch((error) => console.error("Error deleting user:", error));
          }
        };
      
        // CRUD Handlers for Diseases
        const openDiseaseModal = (disease = null) => { setEditDisease(disease); setDiseaseFormData(disease || initialDiseaseState); setIsDiseaseModalOpen(true); };
        const closeDiseaseModal = () => { setIsDiseaseModalOpen(false); setEditDisease(null); setDiseaseFormData(initialDiseaseState); };
        const handleDiseaseChange = (e) => setDiseaseFormData({ ...diseaseFormData, [e.target.name]: e.target.value });
        const handleDiseaseSubmit = (e) => {
          e.preventDefault();
          const token = localStorage.getItem("token");
          const method = editDisease ? "PUT" : "POST";
          const url = editDisease ? `http://localhost:8080/diseases/${editDisease.id}` : "http://localhost:8080/diseases"; // Adjust endpoint
          fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(diseaseFormData) })
            .then((res) => res.json())
            .then((data) => {
              if (editDisease) setDiseases(diseases.map((d) => (d.id === data.id ? data : d)));
              else setDiseases([...diseases, data]);
              closeDiseaseModal();
            })
            .catch((error) => console.error("Error saving disease:", error));
        };
        const handleDiseaseDelete = (id) => {
          if (window.confirm("Are you sure?")) {
            const token = localStorage.getItem("token");
            fetch(`http://localhost:8080/diseases/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
              .then(() => setDiseases(diseases.filter((d) => d.id !== id)))
              .catch((error) => console.error("Error deleting disease:", error));
          }
        };

  const openDoctorModal = (doctor = null) => { setEditDoctor(doctor); setDoctorFormData(doctor || initialDoctorState); setIsDoctorModalOpen(true); };
  const closeDoctorModal = () => { setIsDoctorModalOpen(false); setEditDoctor(null); setDoctorFormData(initialDoctorState); };
  const handleDoctorChange = (e) => setDoctorFormData({ ...doctorFormData, [e.target.name]: e.target.value });
  const handleDoctorSubmit = (e) => { e.preventDefault(); /* Add API call */ closeDoctorModal(); };
  const handleDoctorDelete = (id) => { if (window.confirm("Are you sure?")) setDoctors(doctors.filter((d) => d.id !== id)); };

  const openPatientModal = (patient = null) => { setEditPatient(patient); setPatientFormData(patient || initialPatientState); setIsPatientModalOpen(true); };
  const closePatientModal = () => { setIsPatientModalOpen(false); setEditPatient(null); setPatientFormData(initialPatientState); };
  const handlePatientChange = (e) => setPatientFormData({ ...patientFormData, [e.target.name]: e.target.value });
  const handlePatientSubmit = (e) => { e.preventDefault(); /* Add API call */ closePatientModal(); };
  const handlePatientDelete = (id) => { if (window.confirm("Are you sure?")) setPatients(patients.filter((p) => p.patientId !== id)); };

  const openAppointmentModal = (appointment = null) => { setEditAppointment(appointment); setAppointmentFormData(appointment || initialAppointmentState); setIsAppointmentModalOpen(true); };
  const closeAppointmentModal = () => { setIsAppointmentModalOpen(false); setEditAppointment(null); setAppointmentFormData(initialAppointmentState); };
  const handleAppointmentChange = (e) => setAppointmentFormData({ ...appointmentFormData, [e.target.name]: e.target.value });
  const handleAppointmentSubmit = (e) => { e.preventDefault(); /* Add API call */ closeAppointmentModal(); };
  const handleAppointmentDelete = (id) => { if (window.confirm("Are you sure?")) setAppointments(appointments.filter((a) => a.id !== id)); };

  const openMedicalRecordModal = (medicalRecords = null) => { setEditMedicalRecord(medicalRecords); setMedicalRecordFormData(medicalRecords || initialMedicalRecordState); setIsMedicalRecordModalOpen(true); };
  const closeMedicalRecordModal = () => { setIsMedicalRecordModalOpen(false); setEditMedicalRecord(null); setMedicalRecordFormData(initialMedicalRecordState); };
  const handleMedicalRecordChange = (e) => setMedicalRecordFormData({ ...medicalRecordFormData, [e.target.name]: e.target.value });
  const handleMedicalRecordSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = editMedicalRecord ? "PUT" : "POST";
    const url = editMedicalRecord ? `http://localhost:8080/medical-records/${editMedicalRecord.id}` : "http://localhost:8080/medical-records";
    fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(medicalRecordFormData) })
      .then((res) => res.json())
      .then((data) => {
        if (editMedicalRecord) setMedicalRecords(medicalRecords.map((r) => (r.id === data.id ? data : r)));
        else setMedicalRecords([...medicalRecords, data]);
        closeMedicalRecordModal();
      })
      .catch((error) => console.error("Error saving medical record:", error));
  };
  const handleMedicalRecordDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8080/medical-records/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
        .then(() => setMedicalRecords(medicalRecords.filter((r) => r.id !== id)))
        .catch((error) => console.error("Error deleting medical record:", error));
    }
  };

  // Report Generation Functions
  const downloadReport = (data, filename) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateAllDoctorsReport = () => {
    const url = "http://localhost:8087/reports/report/all"; // Replace with your Spring Boot endpoint
  
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.blob(); // Assuming the report is returned as a file (e.g., PDF or CSV)
        }
        throw new Error("Failed to generate report");
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "All_Doctors_Report.pdf"; // Customize the file name and extension as needed
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => {
        console.error("Error generating report:", error);
      });
  };
  const generateAllPatientsReport = () => downloadReport(patients, "All_Patients_Report");
  const generateAllAppointmentsReport = () => downloadReport(appointments, "All_Appointments_Report");
  const generateAllMedicalRecordsReport = () => downloadReport(medicalRecords, "All_Medical_Records_Report");
  const generateAllUsersReport = () => downloadReport(users, "All_Users_Report");
  const generateAllDiseasesReport = () => downloadReport(diseases, "All_Diseases_Report");

  const generateSpecificDoctorReport = () => {
    if (!doctorSearchId) return alert("Please enter a Doctor ID");
  
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8087/reports/report/${doctorSearchId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        //"Content-Type": "application/json",removed because we are getting a pdf
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.blob(); // Handle as blob for file download
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Doctor_${doctorSearchId}_Report_${new Date().toISOString().split("T")[0]}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching doctor report:", error);
        alert("Failed to generate report. Doctor not found or server error.");
      });
  };
  const generateSpecificPatientReport = () => {
    if (!patientSearchId) return alert("Please enter a Patient ID");
    const patientRecords = medicalRecords.filter((r) => r.patientId === patientSearchId);
    if (patientRecords.length) downloadReport(patientRecords, `Patient_${patientSearchId}_Medical_Records`);
    else alert("No records found for this patient");
  };

  const generateSpecificAppointmentReport = () => {
    if (!appointmentSearchId) return alert("Please enter an Appointment ID");
    const appointment = appointments.find((a) => a.id === appointmentSearchId);
    if (appointment) downloadReport(appointment, `Appointment_${appointmentSearchId}_Report`);
    else alert("Appointment not found");
  };

  const generateSpecificMedicalRecordReport = () => {
    if (!medicalRecordSearchId) return alert("Please enter a Medical Record ID");
    const record = medicalRecords.find((r) => r.id === medicalRecordSearchId);
    if (record) downloadReport(record, `Medical_Record_${medicalRecordSearchId}_Report`);
    else alert("Medical record not found");
  };

  const generateSpecificUserReport = () => {
    if (!userSearchId) return alert("Please enter a User ID");
    const user = users.find((u) => u.userId.toString() === userSearchId);
    if (user) downloadReport(user, `User_${userSearchId}_Report`);
    else alert("User not found");
  };
  const generateSpecificDiseaseReport = () => {
    if (!diseaseSearchId) return alert("Please enter a Disease ID");
    const disease = diseases.find((d) => d.id.toString() === diseaseSearchId);
    if (disease) downloadReport(disease, `Disease_${diseaseSearchId}_Report`);
    else alert("Disease not found");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 font-sans">
      <motion.div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8" variants={containerVariants} initial="hidden" animate="visible">
        
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center space-x-4">
        <img src={profileimg} alt="" className="w-36 h-36 object-cover rounded-full" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-blue-700 font-extrabold mb-6 tracking-tight ">
          
            Hello, {adminUsername}
          </h1>
        </motion.div>

        {/* Menu Bar */}
        <motion.div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl shadow-lg p-3 flex flex-wrap justify-center sm:justify-start gap-3 mb-8" variants={itemVariants}>
          {["Dashboard","Users", "Doctors", "Patients", "Appointments", "Medical Records","Diseases", "Reports", "Logout"].map((section) => (
            <button
              key={section}
              className={`text-white hover:bg-blue-50 px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeSection === section ? "bg-blue-100 text-black" : ""
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </motion.div>

        {/* Content Sections */}
        <motion.div key={activeSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {activeSection === "Dashboard" && (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8" variants={containerVariants}>
              <motion.div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 hover:shadow-xl transition-all duration-300 border border-gray-100" variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <FaUsers className="text-blue-600 text-4xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Patients</h3>
                  <p className="text-3xl font-bold text-blue-600">{patients.length}</p>
                </div>
              </motion.div>
              <motion.div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 hover:shadow-xl transition-all duration-300 border border-gray-100" variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <FaUserMd className="text-blue-600 text-4xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Doctors</h3>
                  <p className="text-3xl font-bold text-blue-600">{doctors.length}</p>
                </div>
              </motion.div>
              <motion.div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 hover:shadow-xl transition-all duration-300 border border-gray-100" variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <FaCalendarCheck className="text-blue-600 text-4xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Appointments</h3>
                  <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Users Section */}
          {activeSection === "Users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-blue-900">Users</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2" onClick={() => openUserModal()}>
                  <FaPlus /> Add User
                </button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search by User ID"
                  value={userSearchId}
                  onChange={(e) => setUserSearchId(e.target.value)}
                  className="p-2 border rounded-lg w-full max-w-xs"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2" onClick={generateSpecificUserReport}>
                  <FaFileDownload /> Generate Report
                </button>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left text-base">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 font-semibold">User ID</th>
                      <th className="p-4 font-semibold">Username</th>
                      <th className="p-4 font-semibold">Email</th>
                      <th className="p-4 font-semibold hidden md:table-cell">Role</th>
                      <th className="p-4 font-semibold hidden md:table-cell">Created Date</th>
                      <th className="p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter((u) => !userSearchId || u.userId.toString().includes(userSearchId))
                      .map((user) => (
                        <tr key={user.userId} className="border-b hover:bg-gray-50 transition-all">
                          <td className="p-4">{user.userId}</td>
                          <td className="p-4">{user.username}</td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4 hidden md:table-cell">{user.role || "N/A"}</td>
                          <td className="p-4 hidden md:table-cell">{user.createdDate || "N/A"}</td>
                          <td className="p-4 space-x-3">
                            <button className="text-blue-600 hover:underline" onClick={() => openUserModal(user)}><FaEdit /></button>
                            <button className="text-red-600 hover:underline" onClick={() => handleUserDelete(user.userId)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {isUserModalOpen && (
                <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.div className="bg-white rounded-lg p-6 w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">{editUser ? "Edit User" : "Add User"}</h3>
                    <form onSubmit={handleUserSubmit} className="space-y-4">
                      <div><label className="block text-gray-700">Username</label><input type="text" name="username" value={userFormData.username} onChange={handleUserChange} className="w-full p-2 border rounded-md" required /></div>
                      <div><label className="block text-gray-700">Email</label><input type="email" name="email" value={userFormData.email} onChange={handleUserChange} className="w-full p-2 border rounded-md" required /></div>
                      <div><label className="block text-gray-700">Password</label><input type="password" name="password" value={userFormData.password} onChange={handleUserChange} className="w-full p-2 border rounded-md" required={!editUser} /></div>
                      <div><label className="block text-gray-700">Role</label><select name="role" value={userFormData.role} onChange={handleUserChange} className="w-full p-2 border rounded-md" required><option value="">Select Role</option><option value="PATIENT">Patient</option><option value="DOCTOR">Doctor</option><option value="ADMIN">Admin</option></select></div>
                      <div className="flex justify-end gap-4">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
                        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={closeUserModal}>Cancel</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </div>
          )}

          {/* Diseases Section */}
          {activeSection === "Diseases" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-blue-900">Diseases</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2" onClick={() => openDiseaseModal()}>
                  <FaPlus /> Add Disease
                </button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search by Disease ID"
                  value={diseaseSearchId}
                  onChange={(e) => setDiseaseSearchId(e.target.value)}
                  className="p-2 border rounded-lg w-full max-w-xs"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2" onClick={generateSpecificDiseaseReport}>
                  <FaFileDownload /> Generate Report
                </button>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left text-base">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 font-semibold">ID</th>
                      <th className="p-4 font-semibold">Name</th>
                      <th className="p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diseases
                      .filter((d) => !diseaseSearchId || d.id.toString().includes(diseaseSearchId))
                      .map((disease) => (
                        <tr key={disease.id} className="border-b hover:bg-gray-50 transition-all">
                          <td className="p-4">{disease.id}</td>
                          <td className="p-4">{disease.name}</td>
                          <td className="p-4 space-x-3">
                            <button className="text-blue-600 hover:underline" onClick={() => openDiseaseModal(disease)}><FaEdit /></button>
                            <button className="text-red-600 hover:underline" onClick={() => handleDiseaseDelete(disease.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {isDiseaseModalOpen && (
                <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.div className="bg-white rounded-lg p-6 w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">{editDisease ? "Edit Disease" : "Add Disease"}</h3>
                    <form onSubmit={handleDiseaseSubmit} className="space-y-4">
                      <div><label className="block text-gray-700">Name</label><input type="text" name="name" value={diseaseFormData.name} onChange={handleDiseaseChange} className="w-full p-2 border rounded-md" required /></div>
                      <div className="flex justify-end gap-4">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
                        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={closeDiseaseModal}>Cancel</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </div>
          )}

          {activeSection === "Doctors" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-blue-900">Doctors</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2" onClick={() => openDoctorModal()}>
                  <FaPlus /> Add Doctor
                </button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search by Doctor ID"
                  value={doctorSearchId}
                  onChange={(e) => setDoctorSearchId(e.target.value)}
                  className="p-2 border rounded-lg w-full max-w-xs"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2" onClick={generateSpecificDoctorReport}>
                  <FaFileDownload /> Generate Report
                </button>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left text-base">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 font-semibold">ID</th>
                      <th className="p-4 font-semibold">First Name</th>
                      <th className="p-4 font-semibold">Last Name</th>
                      <th className="p-4 font-semibold hidden md:table-cell">Phone</th>
                      <th className="p-4 font-semibold hidden md:table-cell">Email</th>
                      <th className="p-4 font-semibold">Specialization</th>
                      <th className="p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {doctors
            .filter((d) => {
              if (!doctorSearchId) return true; // Show all if search is empty
              if (d.id === undefined || d.id === null) return false; // Skip if id is undefined/null
              return d.id.toString().includes(doctorSearchId); // Convert to string only for comparison
            })
            .map((doctor) => (
              <tr key={doctor.id} className="border-b hover:bg-gray-50 transition-all">
                <td className="p-4">{doctor.id}</td>
                <td className="p-4">{doctor.firstname}</td>
                <td className="p-4">{doctor.lastname}</td>
                <td className="p-4 hidden md:table-cell">{doctor.phonenumber || "N/A"}</td>
                <td className="p-4 hidden md:table-cell">{doctor.email || "N/A"}</td>
                <td className="p-4">{doctor.specilization}</td>
                <td className="p-4 space-x-3">
                  <button className="text-blue-600 hover:underline" onClick={() => openDoctorModal(doctor)}><FaEdit /></button>
                  <button className="text-red-600 hover:underline" onClick={() => handleDoctorDelete(doctor.id)}>Delete</button>
                </td>
              </tr>
            ))}
                  </tbody>
                </table>
              </div>
              {isDoctorModalOpen && (
                <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.div className="bg-white rounded-lg p-6 w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">{editDoctor ? "Edit Doctor" : "Add Doctor"}</h3>
                    <form onSubmit={handleDoctorSubmit} className="space-y-4">
                      <div><label className="block text-gray-700">First Name</label><input type="text" name="firstname" value={doctorFormData.firstname} onChange={handleDoctorChange} className="w-full p-2 border rounded-md" required /></div>
                      <div><label className="block text-gray-700">Last Name</label><input type="text" name="lastname" value={doctorFormData.lastname} onChange={handleDoctorChange} className="w-full p-2 border rounded-md" required /></div>
                      <div><label className="block text-gray-700">Phone</label><input type="text" name="phonenumber" value={doctorFormData.phonenumber} onChange={handleDoctorChange} className="w-full p-2 border rounded-md" /></div>
                      <div><label className="block text-gray-700">Email</label><input type="email" name="email" value={doctorFormData.email} onChange={handleDoctorChange} className="w-full p-2 border rounded-md" required /></div>
                      <div><label className="block text-gray-700">Specialization</label><input type="text" name="specilization" value={doctorFormData.specilization} onChange={handleDoctorChange} className="w-full p-2 border rounded-md" required /></div>
                      <div className="flex justify-end gap-4">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
                        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={closeDoctorModal}>Cancel</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </div>
          )}

          {activeSection === "Patients" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-blue-900">Patients</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2" onClick={() => openPatientModal()}>
                  <FaPlus /> Add Patient
                </button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search by Patient ID"
                  value={patientSearchId}
                  onChange={(e) => setPatientSearchId(e.target.value)}
                  className="p-2 border rounded-lg w-full max-w-xs"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2" onClick={generateSpecificPatientReport}>
                  <FaFileDownload /> Generate Report
                </button>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left text-base">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 font-semibold">Patient ID</th>
                      <th className="p-4 font-semibold">User ID</th>
                      <th className="p-4 font-semibold">First Name</th>
                      <th className="p-4 font-semibold">Last Name</th>
                      <th className="p-4 font-semibold hidden md:table-cell">Address</th>
                      <th className="p-4 font-semibold hidden md:table-cell">Phone</th>
                      <th className="p-4 font-semibold hidden md:table-cell">Email</th>
                      <th className="p-4 font-semibold hidden md:table-cell">Date of Birth</th>
                      <th className="p-4 font-semibold hidden md:table-cell">Gender</th>
                      <th className="p-4 font-semibold hidden md:table-cell">created Date </th>
                      <th className="p-4 font-semibold hidden md:table-cell">Last Modified Date </th>
                      <th className="p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.filter((p) => !patientSearchId || p.patientId.includes(patientSearchId)).map((patient) => (
                      <tr key={patient.patientId} className="border-b hover:bg-gray-50 transition-all">
                        <td className="p-4">{patient.patientId}</td>
                        <td className="p-4">{patient.userId}</td>
                        <td className="p-4">{patient.firstname}</td>
                        <td className="p-4">{patient.lastname}</td>
                        <td className="p-4">{patient.address}</td>
                        <td className="p-4 hidden md:table-cell">{patient.phone}</td>
                        <td className="p-4 hidden md:table-cell">{patient.email}</td>
                        <td className="p-4">{patient.dateOfBirth}</td>
                        <td className="p-4">{patient.gender}</td>
                        <td className="p-4">{patient.createdDate}</td>
                        <td className="p-4">{patient.lastModifiedDate}</td>
                        <td className="p-4 space-x-3">
                          <button className="text-blue-600 hover:underline" onClick={() => openPatientModal(patient)}><FaEdit /></button>
                          <button className="text-red-600 hover:underline" onClick={() => handlePatientDelete(patient.patientId)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {isPatientModalOpen && (
                <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.div className="bg-white rounded-lg p-6 w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">{editPatient ? "Edit Patient" : "Add Patient"}</h3>
                    <form onSubmit={handlePatientSubmit} className="space-y-4">
                      <div><label className="block text-gray-700">First Name</label><input type="text" name="firstname" value={patientFormData.firstname} onChange={handlePatientChange} className="w-full p-2 border rounded-md" required /></div>
                      <div><label className="block text-gray-700">Last Name</label><input type="text" name="lastname" value={patientFormData.lastname} onChange={handlePatientChange} className="w-full p-2 border rounded-md" required /></div>
                      <div><label className="block text-gray-700">Email</label><input type="email" name="email" value={patientFormData.email} onChange={handlePatientChange} className="w-full p-2 border rounded-md" required /></div>
                      <div><label className="block text-gray-700">Phone</label><input type="text" name="phone" value={patientFormData.phone} onChange={handlePatientChange} className="w-full p-2 border rounded-md" /></div>
                      <div><label className="block text-gray-700">Date of Birth</label><input type="date" name="dateOfBirth" value={patientFormData.dateOfBirth} onChange={handlePatientChange} className="w-full p-2 border rounded-md" required /></div>
                      <div className="flex justify-end gap-4">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
                        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={closePatientModal}>Cancel</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </div>
          )}

          {activeSection === "Appointments" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-blue-900">Appointments</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2" onClick={() => openAppointmentModal()}>
                  <FaPlus /> Add Appointment
                </button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search by Appointment ID"
                  value={appointmentSearchId}
                  onChange={(e) => setAppointmentSearchId(e.target.value)}
                  className="p-2 border rounded-lg w-full max-w-xs"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2" onClick={generateSpecificAppointmentReport}>
                  <FaFileDownload /> Generate Report
                </button>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left text-base">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 font-semibold">ID</th>
                      <th className="p-4 font-semibold">PatientID</th>
                      <th className="p-4 font-semibold">Doctor Name</th>
                      <th className="p-4 font-semibold hidden md:table-cell">Appoinment Date</th>
                      <th className="p-4 font-semibold">Appoinment Time</th>
                      <th className="p-4 font-semibold">Reason</th>
                    </tr>
                  </thead>
                  <tbody>          

                    {appointments.filter((a) => !appointmentSearchId || a.id.includes(appointmentSearchId)).map((appointment) => {
                      const patient = patients.find((p) => p.patientId === appointment.patientId);
                      const doctor = doctors.find((d) => d.id === appointment.doctorId);
                      return (
                        <tr key={appointment.id} className="border-b hover:bg-gray-50 transition-all">
                          <td className="p-4">{appointment.AppoinmentID}</td>
                          <td className="p-4">{appointment.patientId }</td>
                          <td className="p-4">{appointment.doctorId}</td>
                          <td className="p-4 hidden md:table-cell">{appointment.appoinment_Date}</td>
                          <td className="p-4">{appointment.appoinment_Time}</td>
                          <td className="p-4">{appointment.reason}</td>
                          <td className="p-4 space-x-3">
                            <button className="text-blue-600 hover:underline" onClick={() => openAppointmentModal(appointment)}><FaEdit /></button>
                            <button className="text-red-600 hover:underline" onClick={() => handleAppointmentDelete(appointment.id)}>Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {isAppointmentModalOpen && (
                <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.div className="bg-white rounded-lg p-6 w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">{editAppointment ? "Edit Appointment" : "Add Appointment"}</h3>
                    <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                      <div><label className="block text-gray-700">Patient</label><select name="patientId" value={appointmentFormData.patientId} onChange={handleAppointmentChange} className="w-full p-2 border rounded-md" required><option value="">Select Patient</option>{patients.map((p) => (<option key={p.patientId} value={p.patientId}>{`${p.firstname} ${p.lastname}`}</option>))}</select></div>
                      <div><label className="block text-gray-700">Doctor</label><select name="doctorId" value={appointmentFormData.doctorId} onChange={handleAppointmentChange} className="w-full p-2 border rounded-md" required><option value="">Select Doctor</option>{doctors.map((d) => (<option key={d.id} value={d.id}>{`${d.firstname} ${d.lastname}`}</option>))}</select></div>
                      <div><label className="block text-gray-700">Date</label><input type="datetime-local" name="date" value={appointmentFormData.date} onChange={handleAppointmentChange} className="w-full p-2 border rounded-md" required /></div>
                      <div><label className="block text-gray-700">Status</label><select name="status" value={appointmentFormData.status} onChange={handleAppointmentChange} className="w-full p-2 border rounded-md"><option value="Pending">Pending</option><option value="Confirmed">Confirmed</option><option value="Canceled">Canceled</option></select></div>
                      <div className="flex justify-end gap-4">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
                        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={closeAppointmentModal}>Cancel</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </div>
          )}

{activeSection === "Medical Records" && (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-blue-900">Medical Records</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2" onClick={() => openMedicalRecordModal()}>
        <FaPlus /> Add Record
      </button>
    </div>
    <div className="flex items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by Record ID"
        value={medicalRecordSearchId}
        onChange={(e) => setMedicalRecordSearchId(e.target.value)}
        className="p-2 border rounded-lg w-full max-w-xs"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2" onClick={generateSpecificMedicalRecordReport}>
        <FaFileDownload /> Generate Report
      </button>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
      <table className="w-full text-left text-base">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 font-semibold">ID</th>
            <th className="p-4 font-semibold">Patient</th>
            <th className="p-4 font-semibold">Doctor</th>
            <th className="p-4 font-semibold hidden md:table-cell">Diagnostic Data</th>
            <th className="p-4 font-semibold hidden md:table-cell">Treatments</th>
            <th className="p-4 font-semibold hidden md:table-cell">Disease Name</th>
            <th className="p-4 font-semibold hidden md:table-cell">Report</th>
            <th className="p-4 font-semibold hidden md:table-cell">Created Date</th>
            <th className="p-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords
            .filter((r) => {
              if (!medicalRecordSearchId) return true;
              if (r.recordid === undefined || r.recordid === null) return false;
              return r.recordid.toString().includes(medicalRecordSearchId);
            })
            .map((record) => {
              const patient = patients.find((p) => p.patientId === record.patientId);
              const doctor = doctors.find((d) => d.id === record.doctorId);
              return (
                <tr key={record.recordid} className="border-b hover:bg-gray-50 transition-all">
                  <td className="p-4">{record.recordid}</td>
                  <td className="p-4">{patient ? `${patient.firstname} ${patient.lastname}` : record.patientId}</td>
                  <td className="p-4">{doctor ? `${doctor.firstname} ${doctor.lastname}` : record.doctorId}</td>
                  <td className="p-4 hidden md:table-cell">{record.diagnosticdata || "N/A"}</td>
                  <td className="p-4 hidden md:table-cell">{record.treatments || "N/A"}</td>
                  <td className="p-4 hidden md:table-cell">{record.diseasename || "N/A"}</td>
                  <td className="p-4 hidden md:table-cell">
                    {record.reporturl ? (
                      <div className="flex space-x-2">
                        <a
                          href={record.reporturl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <FaEye /> View
                        </a>
                        <button
                          onClick={() => downloadReportUrl(record.reporturl, record.recordid)}
                          className="text-green-600 hover:underline flex items-center gap-1"
                        >
                          <FaFileDownload /> Download
                        </button>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-4 hidden md:table-cell">{record.createdAt || "N/A"}</td>
                  <td className="p-4 space-x-3">
                    <button className="text-blue-600 hover:underline" onClick={() => openMedicalRecordModal(record)}>
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:underline" onClick={() => handleMedicalRecordDelete(record.recordid)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
    {isMedicalRecordModalOpen && (
      <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="bg-white rounded-lg p-6 w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <h3 className="text-xl font-semibold text-blue-900 mb-4">{editMedicalRecord ? "Edit Medical Record" : "Add Medical Record"}</h3>
          <form onSubmit={handleMedicalRecordSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Patient</label>
              <select name="patientId" value={medicalRecordFormData.patientId} onChange={handleMedicalRecordChange} className="w-full p-2 border rounded-md" required>
                <option value="">Select Patient</option>
                {patients.map((p) => (
                  <option key={p.patientId} value={p.patientId}>{`${p.firstname} ${p.lastname}`}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Doctor</label>
              <select name="doctorId" value={medicalRecordFormData.doctorId} onChange={handleMedicalRecordChange} className="w-full p-2 border rounded-md" required>
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{`${d.firstname} ${d.lastname}`}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Disease Name</label>
              <input type="text" name="diseasename" value={medicalRecordFormData.diseasename} onChange={handleMedicalRecordChange} className="w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label className="block text-gray-700">Diagnostic Data</label>
              <input type="text" name="diagnosticdata" value={medicalRecordFormData.diagnosticdata} onChange={handleMedicalRecordChange} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Treatments</label>
              <textarea name="treatments" value={medicalRecordFormData.treatments} onChange={handleMedicalRecordChange} className="w-full p-2 border rounded-md" rows="3" />
            </div>
            <div>
              <label className="block text-gray-700">Report URL</label>
              <input type="text" name="reporturl" value={medicalRecordFormData.reporturl} onChange={handleMedicalRecordChange} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Created Date</label>
              <input type="datetime-local" name="createdAt" value={medicalRecordFormData.createdAt} onChange={handleMedicalRecordChange} className="w-full p-2 border rounded-md" required />
            </div>
            <div className="flex justify-end gap-4">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
              <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={closeMedicalRecordModal}>Cancel</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </div>
)}

          {activeSection === "Reports" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-blue-900">Reports</h2>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Generate All Reports</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 justify-center" onClick={generateAllUsersReport}>
                    <FaFileDownload /> All Users
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 justify-center" onClick={generateAllDoctorsReport}>
                    <FaFileDownload /> All Doctors
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 justify-center" onClick={generateAllPatientsReport}>
                    <FaFileDownload /> All Patients
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 justify-center" onClick={generateAllAppointmentsReport}>
                    <FaFileDownload /> All Appointments
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 justify-center" onClick={generateAllMedicalRecordsReport}>
                    <FaFileDownload /> All Medical Records
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 justify-center" onClick={generateAllDiseasesReport}>
                    <FaFileDownload /> All Diseases
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Logout" && <div className="text-center"><p className="text-xl text-gray-700" onClick={handleLogout}>Logging out...</p></div>}
        </motion.div>
      </motion.div>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaUsers, FaUserMd, FaCalendarCheck, FaFileDownload, FaPlus, FaEdit, FaEye } from "react-icons/fa";
// import { Bar, Pie } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
// import profileimg from "../../assets/profileimg.jpg";
// import { useNavigate } from "react-router-dom";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("Dashboard");
//   const adminUsername = "Bavindu";

//   // Data states
//   const [doctors, setDoctors] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [medicalRecords, setMedicalRecords] = useState([]);

//   // Search states
//   const [doctorSearchId, setDoctorSearchId] = useState("");
//   const [patientSearchId, setPatientSearchId] = useState("");
//   const [appointmentSearchId, setAppointmentSearchId] = useState("");
//   const [medicalRecordSearchId, setMedicalRecordSearchId] = useState("");

//   // Modal states
//   const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
//   const [editDoctor, setEditDoctor] = useState(null);
//   const [doctorFormData, setDoctorFormData] = useState({ id: "", firstname: "", lastname: "", phonenumber: "", email: "", specilization: "", userId: "", experience: "", education: "" });

//   const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
//   const [editPatient, setEditPatient] = useState(null);
//   const [patientFormData, setPatientFormData] = useState({ patientId: "", userId: "", firstname: "", lastname: "", email: "", phone: "", dateOfBirth: "", address: "", gender: "", createdDate: "", lastModifiedDate: "" });

//   const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
//   const [editAppointment, setEditAppointment] = useState(null);
//   const [appointmentFormData, setAppointmentFormData] = useState({ AppoinmentID: "", patientId: "", doctorId: "", appoinment_Date: "", appoinment_Time: "", reason: "" });

//   const [isMedicalRecordModalOpen, setIsMedicalRecordModalOpen] = useState(false);
//   const [editMedicalRecord, setEditMedicalRecord] = useState(null);
//   const [medicalRecordFormData, setMedicalRecordFormData] = useState({ recordid: "", patientId: "", doctorId: "", diseasename: "", diagnosticdata: "", treatments: "", reporturl: "", createdAt: "" });

//   // Animation variants
//   const containerVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.3 } } };
//   const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

//   // Fetch data on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchData = async (url, setState, mapFn) => {
//       try {
//         const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         const data = await res.json();
//         setState(data.map(mapFn));
//       } catch (error) {
//         console.error(`Error fetching data from ${url}:`, error);
//       }
//     };

//     fetchData("http://localhost:8082/doctors/getAll", setDoctors, (d) => ({
//       id: d.doctor_Id || "", firstname: d.firstname || "", lastname: d.lastname || "", phonenumber: d.phonenumber || "",
//       email: d.email || "", specilization: d.specilization || d.specialization || "", userId: d.userId || "",
//       experience: d.experience || "", education: d.education || "",
//     }));

//     fetchData("http://localhost:8083/pateints/patients/getAll", setPatients, (p) => ({
//       patientId: p.patientId || "", userId: p.userId || "", firstname: p.firstname || "", lastname: p.lastname || "",
//       email: p.email || "", phone: p.phone || "", dateOfBirth: p.dateOfBirth || "", address: p.address || "",
//       gender: p.gender || "", createdDate: p.createdDate || "", lastModifiedDate: p.lastModifiedDate || "",
//     }));

//     fetchData("http://localhost:8086/appoinments/getAll", setAppointments, (a) => ({
//       AppoinmentID: a.appoinmentId || "", patientId: a.patientID || "", doctorId: a.docname || "",
//       appoinment_Date: a.appoinment_Date || "", appoinment_Time: a.appoinment_Time || "", reason: a.reason || "",
//     }));

//     fetchData("http://localhost:8081/medical-records/getAll", setMedicalRecords, (r) => ({
//       recordid: r.id || "", patientId: r.patientID || "", doctorId: r.doctor_Id || "", diseasename: r.disease?.name || "",
//       diagnosticdata: r.diagnosticData || "", treatments: r.treatments || "", reporturl: r.reportUrl || "", createdAt: r.createdAt || "",
//     }));
//   }, []);

//   // Chart data
//   const userChartData = {
//     labels: ["Patients", "Doctors", "Appointments"],
//     datasets: [{ label: "Count", data: [patients.length, doctors.length, appointments.length], backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"], borderColor: ["#2563EB", "#059669", "#D97706"], borderWidth: 1 }],
//   };

//   const specializationChartData = {
//     labels: [...new Set(doctors.map((d) => d.specilization || "Unknown"))],
//     datasets: [{
//       data: [...new Set(doctors.map((d) => d.specilization || "Unknown"))].map((spec) => doctors.filter((d) => (d.specilization || "Unknown") === spec).length),
//       backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
//     }],
//   };

//   const chartOptions = { responsive: true, plugins: { legend: { position: "top" }, title: { display: true } } };

//   // Handlers
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     navigate("/");
//   };

//   const downloadReportUrl = (url, recordId) => {
//     fetch(url)
//       .then((res) => res.ok ? res.blob() : Promise.reject("Failed to download"))
//       .then((blob) => {
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = `Medical_Record_${recordId}_Report_${new Date().toISOString().split("T")[0]}.pdf`;
//         link.click();
//         URL.revokeObjectURL(link.href);
//       })
//       .catch((error) => alert(error));
//   };

//   const openModal = (setModalOpen, setEdit, setFormData, initialState, item = null) => {
//     setEdit(item);
//     setFormData(item || initialState);
//     setModalOpen(true);
//   };

//   const closeModal = (setModalOpen, setEdit, setFormData, initialState) => {
//     setModalOpen(false);
//     setEdit(null);
//     setFormData(initialState);
//   };

//   const handleDoctorSubmit = (e) => { e.preventDefault(); closeModal(setIsDoctorModalOpen, setEditDoctor, setDoctorFormData, { id: "", firstname: "", lastname: "", phonenumber: "", email: "", specilization: "", userId: "", experience: "", education: "" }); };
//   const handlePatientSubmit = (e) => { e.preventDefault(); closeModal(setIsPatientModalOpen, setEditPatient, setPatientFormData, { patientId: "", userId: "", firstname: "", lastname: "", email: "", phone: "", dateOfBirth: "", address: "", gender: "", createdDate: "", lastModifiedDate: "" }); };
//   const handleAppointmentSubmit = (e) => { e.preventDefault(); closeModal(setIsAppointmentModalOpen, setEditAppointment, setAppointmentFormData, { AppoinmentID: "", patientId: "", doctorId: "", appoinment_Date: "", appoinment_Time: "", reason: "" }); };
//   const handleMedicalRecordSubmit = (e) => { e.preventDefault(); closeModal(setIsMedicalRecordModalOpen, setEditMedicalRecord, setMedicalRecordFormData, { recordid: "", patientId: "", doctorId: "", diseasename: "", diagnosticdata: "", treatments: "", reporturl: "", createdAt: "" }); };

//   return (
//     <div className="min-h-screen bg-gray-100 font-sans">
//       <motion.div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-gray-100">
//         {/* Header */}
//         <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-8">
//           <img src={profileimg} alt="Profile" className="w-20 h-20 object-cover rounded-full border-2 border-blue-500" />
//           <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 font-extrabold tracking-tight">Hello, {adminUsername}</h1>
//         </motion.div>

//         {/* Menu Bar */}
//         <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl shadow-lg p-3 flex flex-wrap justify-center sm:justify-start gap-3 mb-8">
//           {["Dashboard", "Doctors", "Patients", "Appointments", "Medical Records", "Logout"].map((section) => (
//             <button
//               key={section}
//               className={`text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${activeSection === section ? "bg-white text-blue-600" : "hover:bg-white/20"}`}
//               onClick={() => setActiveSection(section)}
//             >
//               {section}
//             </button>
//           ))}
//         </motion.div>

//         {/* Content */}
//         <motion.div key={activeSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//           {activeSection === "Dashboard" && (
//             <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" variants={containerVariants}>
//               <motion.div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200" variants={itemVariants}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">User Statistics</h3>
//                 <Bar data={userChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: "User Statistics" } } }} />
//               </motion.div>
//               <motion.div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200" variants={itemVariants}>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Doctor Specializations</h3>
//                 <Pie data={specializationChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: "Doctor Specializations" } } }} />
//               </motion.div>
//             </motion.div>
//           )}

//           {activeSection === "Doctors" && (
//             <div className="space-y-6">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-semibold text-gray-800">Doctors</h2>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2" onClick={() => openModal(setIsDoctorModalOpen, setEditDoctor, setDoctorFormData, { id: "", firstname: "", lastname: "", phonenumber: "", email: "", specilization: "", userId: "", experience: "", education: "" })}>
//                   <FaPlus /> Add Doctor
//                 </button>
//               </div>
//               <div className="flex items-center gap-4 mb-4">
//                 <input type="text" placeholder="Search by Doctor ID" value={doctorSearchId} onChange={(e) => setDoctorSearchId(e.target.value)} className="p-2 border rounded-lg w-full max-w-xs text-gray-600" />
//                 <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all flex items-center gap-2"><FaFileDownload /> Generate Report</button>
//               </div>
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
//                 <table className="w-full text-left text-base">
//                   <thead className="bg-gray-100 text-gray-700">
//                     <tr>
//                       <th className="p-4 font-semibold">ID</th>
//                       <th className="p-4 font-semibold">First Name</th>
//                       <th className="p-4 font-semibold">Last Name</th>
//                       <th className="p-4 font-semibold hidden md:table-cell">Phone</th>
//                       <th className="p-4 font-semibold hidden md:table-cell">Email</th>
//                       <th className="p-4 font-semibold">Specialization</th>
//                       <th className="p-4 font-semibold">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {doctors.filter((d) => !doctorSearchId || d.id?.toString().includes(doctorSearchId)).map((doctor, index) => (
//                       <tr key={doctor.id} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-all`}>
//                         <td className="p-4 text-gray-600">{doctor.id}</td>
//                         <td className="p-4 text-gray-600">{doctor.firstname}</td>
//                         <td className="p-4 text-gray-600">{doctor.lastname}</td>
//                         <td className="p-4 hidden md:table-cell text-gray-600">{doctor.phonenumber || "N/A"}</td>
//                         <td className="p-4 hidden md:table-cell text-gray-600">{doctor.email || "N/A"}</td>
//                         <td className="p-4 text-gray-600">{doctor.specilization}</td>
//                         <td className="p-4 space-x-3">
//                           <button className="text-blue-500 hover:underline" onClick={() => openModal(setIsDoctorModalOpen, setEditDoctor, setDoctorFormData, { id: "", firstname: "", lastname: "", phonenumber: "", email: "", specilization: "", userId: "", experience: "", education: "" }, doctor)}><FaEdit /></button>
//                           <button className="text-red-500 hover:underline">Delete</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {isDoctorModalOpen && (
//                 <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                   <motion.div className="bg-white rounded-lg shadow-xl w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
//                     <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-4 rounded-t-lg">
//                       <h3 className="text-xl font-semibold text-white">{editDoctor ? "Edit Doctor" : "Add Doctor"}</h3>
//                     </div>
//                     <form onSubmit={handleDoctorSubmit} className="p-6 space-y-4">
//                       <div><label className="block text-gray-700">First Name</label><input type="text" name="firstname" value={doctorFormData.firstname} onChange={(e) => setDoctorFormData({ ...doctorFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required /></div>
//                       <div><label className="block text-gray-700">Last Name</label><input type="text" name="lastname" value={doctorFormData.lastname} onChange={(e) => setDoctorFormData({ ...doctorFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required /></div>
//                       <div><label className="block text-gray-700">Phone</label><input type="text" name="phonenumber" value={doctorFormData.phonenumber} onChange={(e) => setDoctorFormData({ ...doctorFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" /></div>
//                       <div><label className="block text-gray-700">Email</label><input type="email" name="email" value={doctorFormData.email} onChange={(e) => setDoctorFormData({ ...doctorFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required /></div>
//                       <div><label className="block text-gray-700">Specialization</label><input type="text" name="specilization" value={doctorFormData.specilization} onChange={(e) => setDoctorFormData({ ...doctorFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required /></div>
//                       <div className="flex justify-end gap-4">
//                         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
//                         <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={() => closeModal(setIsDoctorModalOpen, setEditDoctor, setDoctorFormData, { id: "", firstname: "", lastname: "", phonenumber: "", email: "", specilization: "", userId: "", experience: "", education: "" })}>Cancel</button>
//                       </div>
//                     </form>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           )}

//           {activeSection === "Patients" && (
//             <div className="space-y-6">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-semibold text-gray-800">Patients</h2>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2" onClick={() => openModal(setIsPatientModalOpen, setEditPatient, setPatientFormData, { patientId: "", userId: "", firstname: "", lastname: "", email: "", phone: "", dateOfBirth: "", address: "", gender: "", createdDate: "", lastModifiedDate: "" })}>
//                   <FaPlus /> Add Patient
//                 </button>
//               </div>
//               <div className="flex items-center gap-4 mb-4">
//                 <input type="text" placeholder="Search by Patient ID" value={patientSearchId} onChange={(e) => setPatientSearchId(e.target.value)} className="p-2 border rounded-lg w-full max-w-xs text-gray-600" />
//                 <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all flex items-center gap-2"><FaFileDownload /> Generate Report</button>
//               </div>
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
//                 <table className="w-full text-left text-base">
//                   <thead className="bg-gray-100 text-gray-700">
//                     <tr>
//                       <th className="p-4 font-semibold">Patient ID</th>
//                       <th className="p-4 font-semibold">First Name</th>
//                       <th className="p-4 font-semibold">Last Name</th>
//                       <th className="p-4 font-semibold hidden md:table-cell">Email</th>
//                       <th className="p-4 font-semibold hidden md:table-cell">Phone</th>
//                       <th className="p-4 font-semibold">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {patients.filter((p) => !patientSearchId || p.patientId.includes(patientSearchId)).map((patient, index) => (
//                       <tr key={patient.patientId} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-all`}>
//                         <td className="p-4 text-gray-600">{patient.patientId}</td>
//                         <td className="p-4 text-gray-600">{patient.firstname}</td>
//                         <td className="p-4 text-gray-600">{patient.lastname}</td>
//                         <td className="p-4 hidden md:table-cell text-gray-600">{patient.email}</td>
//                         <td className="p-4 hidden md:table-cell text-gray-600">{patient.phone}</td>
//                         <td className="p-4 space-x-3">
//                           <button className="text-blue-500 hover:underline" onClick={() => openModal(setIsPatientModalOpen, setEditPatient, setPatientFormData, { patientId: "", userId: "", firstname: "", lastname: "", email: "", phone: "", dateOfBirth: "", address: "", gender: "", createdDate: "", lastModifiedDate: "" }, patient)}><FaEdit /></button>
//                           <button className="text-red-500 hover:underline">Delete</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {isPatientModalOpen && (
//                 <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                   <motion.div className="bg-white rounded-lg shadow-xl w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
//                     <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-4 rounded-t-lg">
//                       <h3 className="text-xl font-semibold text-white">{editPatient ? "Edit Patient" : "Add Patient"}</h3>
//                     </div>
//                     <form onSubmit={handlePatientSubmit} className="p-6 space-y-4">
//                       <div><label className="block text-gray-700">First Name</label><input type="text" name="firstname" value={patientFormData.firstname} onChange={(e) => setPatientFormData({ ...patientFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required /></div>
//                       <div><label className="block text-gray-700">Last Name</label><input type="text" name="lastname" value={patientFormData.lastname} onChange={(e) => setPatientFormData({ ...patientFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required /></div>
//                       <div><label className="block text-gray-700">Email</label><input type="email" name="email" value={patientFormData.email} onChange={(e) => setPatientFormData({ ...patientFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required /></div>
//                       <div><label className="block text-gray-700">Phone</label><input type="text" name="phone" value={patientFormData.phone} onChange={(e) => setPatientFormData({ ...patientFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" /></div>
//                       <div className="flex justify-end gap-4">
//                         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
//                         <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={() => closeModal(setIsPatientModalOpen, setEditPatient, setPatientFormData, { patientId: "", userId: "", firstname: "", lastname: "", email: "", phone: "", dateOfBirth: "", address: "", gender: "", createdDate: "", lastModifiedDate: "" })}>Cancel</button>
//                       </div>
//                     </form>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           )}

//           {activeSection === "Appointments" && (
//             <div className="space-y-6">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2" onClick={() => openModal(setIsAppointmentModalOpen, setEditAppointment, setAppointmentFormData, { AppoinmentID: "", patientId: "", doctorId: "", appoinment_Date: "", appoinment_Time: "", reason: "" })}>
//                   <FaPlus /> Add Appointment
//                 </button>
//               </div>
//               <div className="flex items-center gap-4 mb-4">
//                 <input type="text" placeholder="Search by Appointment ID" value={appointmentSearchId} onChange={(e) => setAppointmentSearchId(e.target.value)} className="p-2 border rounded-lg w-full max-w-xs text-gray-600" />
//                 <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all flex items-center gap-2"><FaFileDownload /> Generate Report</button>
//               </div>
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
//                 <table className="w-full text-left text-base">
//                   <thead className="bg-gray-100 text-gray-700">
//                     <tr>
//                       <th className="p-4 font-semibold">ID</th>
//                       <th className="p-4 font-semibold">Patient</th>
//                       <th className="p-4 font-semibold">Doctor</th>
//                       <th className="p-4 font-semibold hidden md:table-cell">Date</th>
//                       <th className="p-4 font-semibold">Time</th>
//                       <th className="p-4 font-semibold">Reason</th>
//                       <th className="p-4 font-semibold">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {appointments.filter((a) => !appointmentSearchId || a.AppoinmentID.includes(appointmentSearchId)).map((appointment, index) => (
//                       <tr key={appointment.AppoinmentID} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-all`}>
//                         <td className="p-4 text-gray-600">{appointment.AppoinmentID}</td>
//                         <td className="p-4 text-gray-600">{patients.find((p) => p.patientId === appointment.patientId)?.firstname || appointment.patientId}</td>
//                         <td className="p-4 text-gray-600">{doctors.find((d) => d.id === appointment.doctorId)?.firstname || appointment.doctorId}</td>
//                         <td className="p-4 hidden md:table-cell text-gray-600">{appointment.appoinment_Date}</td>
//                         <td className="p-4 text-gray-600">{appointment.appoinment_Time}</td>
//                         <td className="p-4 text-gray-600">{appointment.reason}</td>
//                         <td className="p-4 space-x-3">
//                           <button className="text-blue-500 hover:underline" onClick={() => openModal(setIsAppointmentModalOpen, setEditAppointment, setAppointmentFormData, { AppoinmentID: "", patientId: "", doctorId: "", appoinment_Date: "", appoinment_Time: "", reason: "" }, appointment)}><FaEdit /></button>
//                           <button className="text-red-500 hover:underline">Delete</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {isAppointmentModalOpen && (
//                 <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                   <motion.div className="bg-white rounded-lg shadow-xl w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
//                     <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-4 rounded-t-lg">
//                       <h3 className="text-xl font-semibold text-white">{editAppointment ? "Edit Appointment" : "Add Appointment"}</h3>
//                     </div>
//                     <form onSubmit={handleAppointmentSubmit} className="p-6 space-y-4">
//                       <div><label className="block text-gray-700">Patient</label><select name="patientId" value={appointmentFormData.patientId} onChange={(e) => setAppointmentFormData({ ...appointmentFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required><option value="">Select Patient</option>{patients.map((p) => <option key={p.patientId} value={p.patientId}>{p.firstname} {p.lastname}</option>)}</select></div>
//                       <div><label className="block text-gray-700">Doctor</label><select name="doctorId" value={appointmentFormData.doctorId} onChange={(e) => setAppointmentFormData({ ...appointmentFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required><option value="">Select Doctor</option>{doctors.map((d) => <option key={d.id} value={d.id}>{d.firstname} {d.lastname}</option>)}</select></div>
//                       <div><label className="block text-gray-700">Date</label><input type="date" name="appoinment_Date" value={appointmentFormData.appoinment_Date} onChange={(e) => setAppointmentFormData({ ...appointmentFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required /></div>
//                       <div><label className="block text-gray-700">Time</label><input type="time" name="appoinment_Time" value={appointmentFormData.appoinment_Time} onChange={(e) => setAppointmentFormData({ ...appointmentFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required /></div>
//                       <div><label className="block text-gray-700">Reason</label><input type="text" name="reason" value={appointmentFormData.reason} onChange={(e) => setAppointmentFormData({ ...appointmentFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required /></div>
//                       <div className="flex justify-end gap-4">
//                         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
//                         <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={() => closeModal(setIsAppointmentModalOpen, setEditAppointment, setAppointmentFormData, { AppoinmentID: "", patientId: "", doctorId: "", appoinment_Date: "", appoinment_Time: "", reason: "" })}>Cancel</button>
//                       </div>
//                     </form>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           )}

//           {activeSection === "Medical Records" && (
//             <div className="space-y-6">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-semibold text-gray-800">Medical Records</h2>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2" onClick={() => openModal(setIsMedicalRecordModalOpen, setEditMedicalRecord, setMedicalRecordFormData, { recordid: "", patientId: "", doctorId: "", diseasename: "", diagnosticdata: "", treatments: "", reporturl: "", createdAt: "" })}>
//                   <FaPlus /> Add Record
//                 </button>
//               </div>
//               <div className="flex items-center gap-4 mb-4">
//                 <input type="text" placeholder="Search by Record ID" value={medicalRecordSearchId} onChange={(e) => setMedicalRecordSearchId(e.target.value)} className="p-2 border rounded-lg w-full max-w-xs text-gray-600" />
//                 <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all flex items-center gap-2"><FaFileDownload /> Generate Report</button>
//               </div>
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
//                 <table className="w-full text-left text-base">
//                   <thead className="bg-gray-100 text-gray-700">
//                     <tr>
//                       <th className="p-4 font-semibold">ID</th>
//                       <th className="p-4 font-semibold">Patient</th>
//                       <th className="p-4 font-semibold">Doctor</th>
//                       <th className="p-4 font-semibold hidden md:table-cell">Disease</th>
//                       <th className="p-4 font-semibold hidden md:table-cell">Report</th>
//                       <th className="p-4 font-semibold">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {medicalRecords.filter((r) => !medicalRecordSearchId || r.recordid?.toString().includes(medicalRecordSearchId)).map((record, index) => (
//                       <tr key={record.recordid} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-all`}>
//                         <td className="p-4 text-gray-600">{record.recordid}</td>
//                         <td className="p-4 text-gray-600">{patients.find((p) => p.patientId === record.patientId)?.firstname || record.patientId}</td>
//                         <td className="p-4 text-gray-600">{doctors.find((d) => d.id === record.doctorId)?.firstname || record.doctorId}</td>
//                         <td className="p-4 hidden md:table-cell text-gray-600">{record.diseasename || "N/A"}</td>
//                         <td className="p-4 hidden md:table-cell text-gray-600">{record.reporturl ? <button onClick={() => downloadReportUrl(record.reporturl, record.recordid)} className="text-emerald-500 hover:underline flex items-center gap-1"><FaFileDownload /> Download</button> : "N/A"}</td>
//                         <td className="p-4 space-x-3">
//                           <button className="text-blue-500 hover:underline" onClick={() => openModal(setIsMedicalRecordModalOpen, setEditMedicalRecord, setMedicalRecordFormData, { recordid: "", patientId: "", doctorId: "", diseasename: "", diagnosticdata: "", treatments: "", reporturl: "", createdAt: "" }, record)}><FaEdit /></button>
//                           <button className="text-red-500 hover:underline">Delete</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {isMedicalRecordModalOpen && (
//                 <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                   <motion.div className="bg-white rounded-lg shadow-xl w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
//                     <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-4 rounded-t-lg">
//                       <h3 className="text-xl font-semibold text-white">{editMedicalRecord ? "Edit Record" : "Add Record"}</h3>
//                     </div>
//                     <form onSubmit={handleMedicalRecordSubmit} className="p-6 space-y-4">
//                       <div><label className="block text-gray-700">Patient</label><select name="patientId" value={medicalRecordFormData.patientId} onChange={(e) => setMedicalRecordFormData({ ...medicalRecordFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required><option value="">Select Patient</option>{patients.map((p) => <option key={p.patientId} value={p.patientId}>{p.firstname} {p.lastname}</option>)}</select></div>
//                       <div><label className="block text-gray-700">Doctor</label><select name="doctorId" value={medicalRecordFormData.doctorId} onChange={(e) => setMedicalRecordFormData({ ...medicalRecordFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required><option value="">Select Doctor</option>{doctors.map((d) => <option key={d.id} value={d.id}>{d.firstname} {d.lastname}</option>)}</select></div>
//                       <div><label className="block text-gray-700">Disease Name</label><input type="text" name="diseasename" value={medicalRecordFormData.diseasename} onChange={(e) => setMedicalRecordFormData({ ...medicalRecordFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" required /></div>
//                       <div><label className="block text-gray-700">Report URL</label><input type="text" name="reporturl" value={medicalRecordFormData.reporturl} onChange={(e) => setMedicalRecordFormData({ ...medicalRecordFormData, [e.target.name]: e.target.value })} className="w-full p-2 border rounded-md" /></div>
//                       <div className="flex justify-end gap-4">
//                         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
//                         <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={() => closeModal(setIsMedicalRecordModalOpen, setEditMedicalRecord, setMedicalRecordFormData, { recordid: "", patientId: "", doctorId: "", diseasename: "", diagnosticdata: "", treatments: "", reporturl: "", createdAt: "" })}>Cancel</button>
//                       </div>
//                     </form>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           )}

//           {activeSection === "Logout" && <div className="text-center"><p className="text-xl text-gray-700" onClick={handleLogout}>Logging out...</p></div>}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }