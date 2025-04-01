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
import { FaUsers, FaUserMd, FaCalendarCheck } from "react-icons/fa";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const adminUsername = "Bavindu"; // Placeholder (replace with auth logic)

  // State for data
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Modal states for Doctors
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);
  const initialDoctorState = { 
    id: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    specilization: "",
    userId: "",
    experience: "",
    education: "",
   };
  const [doctorFormData, setDoctorFormData] = useState(initialDoctorState);

  // Modal states for Patients
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const initialPatientState = { 
    patientId: "",
        userId: "",
        firstname: "",
        lastname: "",
      email: "",
        phone: "",
        dateOfBirth: "",
        address: "",
        gender: "",
        createdDate: "",
        lastModifiedDate: "",
  };
  const [patientFormData, setPatientFormData] = useState(initialPatientState);

  // Modal states for Appointments
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [editAppointment, setEditAppointment] = useState(null);
  const initialAppointmentState = { id: "", patientId: "", doctorId: "", date: "", status: "Pending" };
  const [appointmentFormData, setAppointmentFormData] = useState(initialAppointmentState);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Fetch data on mount (placeholder for API calls)
  useEffect(() => {
    // Simulate API fetch with static data
    // setDoctors([
    //   { id: 1, name: "Dr. John Smith", specialty: "Cardiologist", contact: "john.smith@healthcarehub.com" },
    //   { id: 2, name: "Dr. Emily Johnson", specialty: "Neurologist", contact: "emily.johnson@healthcarehub.com" },
    // ]);
    // setPatients([
    //   { id: 1, name: "Jane Doe", email: "jane.doe@example.com", phone: "123-456-7890" },
    //   { id: 2, name: "Tom Wilson", email: "tom.wilson@example.com", phone: "234-567-8901" },
    // ]);
    // setAppointments([
    //   { id: 1, patientId: 1, doctorId: 1, date: "2025-03-25T10:00", status: "Pending" },
    //   { id: 2, patientId: 2, doctorId: 2, date: "2025-03-26T14:00", status: "Confirmed" },
    // ]);
    // Replace with actual API calls:
    // fetch("http://localhost:8080/doctors", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
    //   .then(res => res.json()).then(data => setDoctors(data));
    // fetch("http://localhost:8080/patients", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
    //   .then(res => res.json()).then(data => setPatients(data));
    // fetch("http://localhost:8080/appointments", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
    //   .then(res => res.json()).then(data => setAppointments(data));

    const token = localStorage.getItem("token");
  // Fetch Doctors
  fetch("http://localhost:8082/doctors/getAll", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log("Doctors Data:", data); // Log raw data for debugging
      const mappedDoctors = data.map((doctor) => ({
        id: doctor.doctor_Id || "",
        firstname: doctor.firstname || "",
        lastname: doctor.lastname || "",
        phonenumber: doctor.phonenumber || "",
        email: doctor.email || doctor.emial || "",
        specilization: doctor.specilization || doctor.specialization || "",
        userId: doctor.userId || "",
        experience: doctor.experience || "",
        education: doctor.education || "",
      }));
      setDoctors(mappedDoctors);
      console.log("Mapped Doctors:", mappedDoctors); // Log mapped data
    })
    .catch((error) => console.error("Error fetching doctors:", error));
  fetch("http://localhost:8083/pateints/patients/getAll", { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.json())
    .then((data) => {
      console.log("Doctors Data:", data); // Log raw data for debugging
      const mappedPatients = data.map((patients) => ({
        patientId:patients.patientId|| "",
        userId:patients.userId || "",
        firstname:patients.firstname || "",
        lastname:patients.lastname || "",
      email: patients.email || "",
        phone: patients.phone || "",
        dateOfBirth: patients.dateOfBirth ||"",
        address: patients.address |"",
        gender: patients.gender ||"",
        createdDate: patients.createdDate ||"",
        lastModifiedDate: patients.lastModifiedDate ||"",
      }));
      setPatients(mappedPatients)
  });
  fetch("http://localhost:8080/appointments", { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.json())
    .then((data) => setAppointments(data));
  }, []);

  // Doctors CRUD Handlers
  const openDoctorModal = (doctor = null) => {
    setEditDoctor(doctor);
    setDoctorFormData(doctor || initialDoctorState);
    setIsDoctorModalOpen(true);
  };
  const closeDoctorModal = () => {
    setIsDoctorModalOpen(false);
    setEditDoctor(null);
    setDoctorFormData(initialDoctorState);
  };
  const handleDoctorChange = (e) => setDoctorFormData({ ...doctorFormData, [e.target.name]: e.target.value });
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    if (editDoctor) {
      setDoctors(doctors.map((d) => (d.id === editDoctor.id ? { ...doctorFormData, id: d.id } : d)));
    } else {
      setDoctors([...doctors, { ...doctorFormData, id: Date.now() }]);
    }
    closeDoctorModal();
  };
  const handleDoctorDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter((d) => d.id !== id));
    }
  };

  // Patients CRUD Handlers
  const openPatientModal = (patient = null) => {
    setEditPatient(patient);
    setPatientFormData(patient || initialPatientState);
    setIsPatientModalOpen(true);
  };
  const closePatientModal = () => {
    setIsPatientModalOpen(false);
    setEditPatient(null);
    setPatientFormData(initialPatientState);
  };
  const handlePatientChange = (e) => setPatientFormData({ ...patientFormData, [e.target.name]: e.target.value });
  const handlePatientSubmit = (e) => {
    e.preventDefault();
    if (editPatient) {
      setPatients(patients.map((p) => (p.id === editPatient.id ? { ...patientFormData, id: p.id } : p)));
    } else {
      setPatients([...patients, { ...patientFormData, id: Date.now() }]);
    }
    closePatientModal();
  };
  const handlePatientDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  // Appointments CRUD Handlers
  const openAppointmentModal = (appointment = null) => {
    setEditAppointment(appointment);
    setAppointmentFormData(appointment || initialAppointmentState);
    setIsAppointmentModalOpen(true);
  };
  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setEditAppointment(null);
    setAppointmentFormData(initialAppointmentState);
  };
  const handleAppointmentChange = (e) => setAppointmentFormData({ ...appointmentFormData, [e.target.name]: e.target.value });
  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    if (editAppointment) {
      setAppointments(appointments.map((a) => (a.id === editAppointment.id ? { ...appointmentFormData, id: a.id } : a)));
    } else {
      setAppointments([...appointments, { ...appointmentFormData, id: Date.now() }]);
    }
    closeAppointmentModal();
  };
  const handleAppointmentDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <motion.div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-9" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-blue-500 font-bold mb-4">
            Hello, {adminUsername}
          </h1>
        </motion.div>

        {/* Menu Bar */}
        <motion.div
          className="bg-white rounded-full shadow-md p-2 sm:p-3 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8"
          variants={itemVariants}
        >
          {["Dashboard", "Doctors", "Patients", "Appointments", "Logout"].map((section) => (
            <button
              key={section}
              className={`text-blue-600 hover:bg-blue-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeSection === section ? "bg-blue-100" : ""
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
            <>
              {/* Stats Boxes */}
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8" variants={containerVariants}>
                <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-all duration-300" variants={itemVariants} whileHover={{ scale: 1.03 }}>
                  <FaUsers className="text-blue-500 text-3xl sm:text-4xl" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Number of Patients</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">{patients.length}</p>
                  </div>
                </motion.div>
                <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-all duration-300" variants={itemVariants} whileHover={{ scale: 1.03 }}>
                  <FaUserMd className="text-blue-500 text-3xl sm:text-4xl" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Number of Doctors</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">{doctors.length}</p>
                  </div>
                </motion.div>
                <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-all duration-300" variants={itemVariants} whileHover={{ scale: 1.03 }}>
                  <FaCalendarCheck className="text-blue-500 text-3xl sm:text-4xl" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Number of Appointments</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">{appointments.length}</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-md" variants={itemVariants}>
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-4">Recent Activity</h2>
                <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Added Dr. John Smith - 3/24/2025, 10:30 AM</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Patient "Jane Doe" booked an appointment - 3/24/2025, 9:15 AM</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Updated "Book Appointment" service - 3/23/2025, 2:45 PM</span>
                  </li>
                </ul>
              </motion.div>
            </>
          )}

          {activeSection === "Doctors" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-900">Doctors</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => openDoctorModal()}>Add Doctor</button>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-left text-sm sm:text-base">
                  <thead className="bg-gray-100">
                  <tr>
                          <th className="p-4 font-semibold">ID</th>
                          <th className="p-4 font-semibold">First Name</th>
                          <th className="p-4 font-semibold">Last Name</th>
                          <th className="p-4 font-semibold hidden md:table-cell">Phone</th>
                          <th className="p-4 font-semibold hidden md:table-cell">Email</th>
                          <th className="p-4 font-semibold">Specialization</th>
                          <th className="p-4 font-semibold hidden lg:table-cell">User ID</th>
                          <th className="p-4 font-semibold hidden lg:table-cell">Experience</th>
                          <th className="p-4 font-semibold hidden lg:table-cell">Education</th>
                          <th className="p-4 font-semibold">Actions</th>
                        </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.id} className="border-b">
                       <td className="p-4">{doctor.id}</td>
                              <td className="p-4">{doctor.firstname}</td>
                              <td className="p-4">{doctor.lastname}</td>
                              <td className="p-4 hidden md:table-cell">{doctor.phonenumber || "N/A"}</td>
                              <td className="p-4 hidden md:table-cell">{doctor.email || "N/A"}</td>
                              <td className="p-4">{doctor.specilization}</td>
                              <td className="p-4 hidden lg:table-cell">{doctor.userId || "N/A"}</td>
                              <td className="p-4 hidden lg:table-cell">{doctor.experience || "N/A"}</td>
                              <td className="p-4 hidden lg:table-cell">{doctor.education || "N/A"}</td>
                              <td className="p-4 space-x-3">
                          <button className="text-blue-500 hover:underline" onClick={() => openDoctorModal(doctor)}>Edit</button>
                          <button className="text-red-500 hover:underline" onClick={() => handleDoctorDelete(doctor.id)}>Delete</button>
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
                      <div>
                        <label className="block text-gray-700">Name</label>
                        <input type="text" name="name" value={doctorFormData.name} onChange={handleDoctorChange} className="w-full p-2 border rounded-md" required />
                      </div>
                      <div>
                        <label className="block text-gray-700">Specialty</label>
                        <input type="text" name="specialty" value={doctorFormData.specialty} onChange={handleDoctorChange} className="w-full p-2 border rounded-md" required />
                      </div>
                      <div>
                        <label className="block text-gray-700">Contact</label>
                        <input type="email" name="contact" value={doctorFormData.contact} onChange={handleDoctorChange} className="w-full p-2 border rounded-md" />
                      </div>
                      <div className="flex justify-end gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
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
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-900">Patients</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => openPatientModal()}>Add Patient</button>
              </div>
              <div className="bg-white p-4 sm:p-` rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-left text-sm sm:text-base">
                  <thead className="bg-gray-100">
                    <tr>
                    <th className="p-4 font-semibold">Patient Id</th>
                          <th className="p-4 font-semibold">First Name</th>
                          <th className="p-4 font-semibold">Last Name</th>
                          <th className="p-4 font-semibold hidden md:table-cell">Phone</th>
                          <th className="p-4 font-semibold hidden md:table-cell">Email</th>
                          <th className="p-4 font-semibold">Date Of Birth</th>
                          <th className="p-4 font-semibold ">address</th>
                          <th className="p-4 font-semibold hidden lg:table-cell">Gender</th>
                          <th className="p-4 font-semibold hidden lg:table-cell">Created Date </th>
                          <th className="p-4 font-semibold">Last modified Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id} className="border-b">
                        <td className="p-2 sm:p-3">{patient.patientId}</td>
                        <td className="p-2 sm:p-3">{patient.firstname}</td>
                        <td className="p-2 sm:p-3">{patient.lastname}</td>
                        <td className="p-2 sm:p-3 hidden md:table-cell">{patient.phone}</td>
                        <td className="p-2 sm:p-3">{patient.email}</td>
                        <td className="p-2 sm:p-3">{patient.dateOfBirth}</td>
                        <td className="p-2 sm:p-3">{patient.address}</td>
                        <td className="p-2 sm:p-3">{patient.gender}</td>
                        <td className="p-2 sm:p-3">{patient.address}</td>
                        <td className="p-2 sm:p-3">{patient.gender}</td>
                        <td className="p-2 sm:p-3 space-x-2">
                          <button className="text-blue-500 hover:underline" onClick={() => openPatientModal(patient)}>Edit</button>
                          <button className="text-red-500 hover:underline" onClick={() => handlePatientDelete(patient.id)}>Delete</button>
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
                      <div>
                        <label className="block text-gray-700">Firstname</label>
                        <input type="text" name="firstname" value={patientFormData.firstname} onChange={handlePatientChange} className="w-full p-2 border rounded-md" required />
                      </div>
                      <div>
                        <label className="block text-gray-700">Lastname</label>
                        <input type="text" name="lastname" value={patientFormData.lastname} onChange={handlePatientChange} className="w-full p-2 border rounded-md" required />
                      </div>
                      <div>
                        <label className="block text-gray-700">email</label>
                        <input type="email" name="email" value={patientFormData.email} onChange={handlePatientChange} className="w-full p-2 border rounded-md" required />
                      </div>
                      <div>
                        <label className="block text-gray-700">phone</label>
                        <input type="text" name="phone" value={patientFormData.phone} onChange={handlePatientChange} className="w-full p-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-gray-700">Date of Birth</label>
                        <input type="d" name="name" value={patientFormData.dateOfBirth} onChange={handlePatientChange} className="w-full p-2 border rounded-md" required />
                      </div>
                      <div>
                        <label className="block text-gray-700">Address</label>
                        <input type="text" name="address" value={patientFormData.address} onChange={handlePatientChange} className="w-full p-2 border rounded-md" required />
                      </div>
                      <div className="flex justify-end gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
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
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-900">Appointments</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => openAppointmentModal()}>Add Appointment</button>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-left text-sm sm:text-base">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 sm:p-3">Patient</th>
                      <th className="p-2 sm:p-3">Doctor</th>
                      <th className="p-2 sm:p-3 hidden md:table-cell">Date</th>
                      <th className="p-2 sm:p-3">Status</th>
                      <th className="p-2 sm:p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => {
                      const patient = patients.find((p) => p.id === appointment.patientId);
                      const doctor = doctors.find((d) => d.id === appointment.doctorId);
                      return (
                        <tr key={appointment.id} className="border-b">
                          <td className="p-2 sm:p-3">{patient ? patient.name : "Unknown"}</td>
                          <td className="p-2 sm:p-3">{doctor ? doctor.name : "Unknown"}</td>
                          <td className="p-2 sm:p-3 hidden md:table-cell">{appointment.date}</td>
                          <td className="p-2 sm:p-3">{appointment.status}</td>
                          <td className="p-2 sm:p-3 space-x-2">
                            <button className="text-blue-500 hover:underline" onClick={() => openAppointmentModal(appointment)}>Edit</button>
                            <button className="text-red-500 hover:underline" onClick={() => handleAppointmentDelete(appointment.id)}>Delete</button>
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
                      <div>
                        <label className="block text-gray-700">Patient</label>
                        <select name="patientId" value={appointmentFormData.patientId} onChange={handleAppointmentChange} className="w-full p-2 border rounded-md" required>
                          <option value="">Select Patient</option>
                          {patients.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700">Doctor</label>
                        <select name="doctorId" value={appointmentFormData.doctorId} onChange={handleAppointmentChange} className="w-full p-2 border rounded-md" required>
                          <option value="">Select Doctor</option>
                          {doctors.map((d) => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700">Date</label>
                        <input type="datetime-local" name="date" value={appointmentFormData.date} onChange={handleAppointmentChange} className="w-full p-2 border rounded-md" required />
                      </div>
                      <div>
                        <label className="block text-gray-700">Status</label>
                        <select name="status" value={appointmentFormData.status} onChange={handleAppointmentChange} className="w-full p-2 border rounded-md">
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
                        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={closeAppointmentModal}>Cancel</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </div>
          )}

          {activeSection === "Logout" && (
            <div className="text-center">
              <p className="text-xl text-gray-700">Logging out...</p>
              {/* Add logout logic here, e.g., clear localStorage and redirect */}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}