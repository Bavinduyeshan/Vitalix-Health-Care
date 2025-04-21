

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaFileMedical,
  FaHome,
  FaQuestionCircle,
  FaSignOutAlt,
  FaEdit,
  FaQrcode,
  FaDownload,
  FaShareAlt,
  FaCalendarPlus,
} from "react-icons/fa";
import profileImg from "../../assets/profile2.jpg";
import hospitalIllustration from "../../assets/hosimg.jpeg";

// Profile component for managing patient data and interactions
export default function Profile() {
  const navigate = useNavigate();

  // State management
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [patientData, setPatientData] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({ loading: false, error: null });
  const [medicalFetchStatus, setMedicalFetchStatus] = useState({ loading: false, error: null });
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

  // // Fetch medical records for the patient
  const fetchMedicalRecords = async () => {
    // if (!patientData) await fetchPatientData();
    // if (!patientData) return;

    setMedicalFetchStatus({ loading: true, error: null });
    
    try {
          // Fetch patient data if userId is available
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
        setMedicalFetchStatus({ loading: false, error:null});
      } else {
        throw new Error("Failed to fetch medical records.");
      }
    } catch (err) {
      setMedicalFetchStatus({ loading: false, error: err.message });
    }
  };

  // const fetchMedicalRecords = async () => {
  //   setMedicalFetchStatus({ loading: true, error: null });
  //   try {
  //     // Fetch patient data if userId is available
  //     let patientId = patientData?.patientId;
  //     if (!patientId && userId) {
  //       const patient = await fetchPatientData();
  //       patientId = patient?.patientId;
  //     }
  
  //     if (!patientId) {
  //       throw new Error("Patient data not available.");
  //     }
  
  //     const response = await fetch(`http://localhost:8081/medical-records/medical-records/${patientId}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       const recordsWithDoctorNames = await Promise.all(
  //         data.map(async (record) => ({
  //           ...record,
  //           doctorName: await fetchDoctorName(record.doctor_Id),
  //         }))
  //       );
  //       setMedicalRecords(recordsWithDoctorNames);
  //       setMedicalFetchStatus({ loading: false, error: null });
  //     } else if (response.status === 204) {
  //       setMedicalRecords([]);
  //       setMedicalFetchStatus({ loading: false, error: null });
  //     } else {
  //       throw new Error("Failed to fetch medical records.");
  //     }
  //   } catch (err) {
  //     setMedicalFetchStatus({ loading: false, error: err.message });
  //   }
  // };

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
          console.log("Upcoming appointments response:", data); // Debug log
  
          let nextAppointment = null;
  
          // Check if data is an array or a single object
          if (Array.isArray(data)) {
            // If it's an array, find the next future appointment
            nextAppointment = data.find(appointment => new Date(appointment.appoinment_Date) > new Date());
          } else if (data && typeof data === 'object') {
            // If it's a single object, check if it's a future appointment
            if (new Date(data.appoinment_Date) > new Date()) {
              nextAppointment = data;
            }
          }
  
          // If we found an appointment, fetch the doctor's name
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
  // Check authentication and fetch user data on mount
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }
  //   if (!userId) {
  //     fetchUserData();
  //   }
  //   if (patientData?.patientId) {
  //     fetchUpcomingAppointments();
  //     fetchMedicalRecords(); // Ensure medical records are fetched
  //   } else {
  //     fetchPatientData().then(() => {
  //       if (patientData?.patientId) {
  //         fetchUpcomingAppointments();
  //         fetchMedicalRecords();
  //       }
  //     });
  //   }
  // }, [userId, token, navigate]);
  useEffect(() => {
    const fetchAllData = async () => {
      // Step 1: Check for token and userId
      if (!token) {
        navigate("/login");
        return;
      }
  
      if (!userId) {
        await fetchUserData();
      }
  
      // Step 2: Fetch patient data if not already available
      if (!patientData) {
        const patient = await fetchPatientData();
        if (!patient?.patientId) {
          console.error("No patientId found after fetching patient data");
          return;
        }
      }
  
      // Step 3: Fetch upcoming appointments and medical records
      if (patientData?.patientId) {
        await Promise.all([
          fetchUpcomingAppointments(),
          fetchMedicalRecords(),
        ]);
      }
    };
  
    fetchAllData();
  }, [userId, token, navigate, patientData?.patientId]);

  // Handler to book an appointment
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

  // Handler to view patient data
  const handleViewPatientData = () => {
    setCurrentView("patientData");
    if (!patientData) fetchPatientData();
  };

  // Handler to update patient data
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

  // Handler for form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler to submit updated patient data
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

  // Handler to view medical records
  const handleViewMedicalData = () => {
    setCurrentView("medicalData");
    setSelectedRecord(null);
    // if (medicalRecords.length === 0 && !medicalFetchStatus.error) fetchMedicalRecords();
    fetchMedicalRecords();
  };

  // Handler to generate QR code
  const handleGenerateQR = async () => {
    // if (!patientData) {
    //   try {
    //     await fetchPatientData();
    //   } catch (err) {
    //     setQrCodeStatus({ loading: false, error: "Failed to fetch patient data. Please try again." });
    //     setCurrentView("qrCode");
    //     return;
    //   }
    // }

    // if (!patientData || !patientData.patientId) {
    //   setQrCodeStatus({ loading: false, error: "Patient data not available. Please try again." });
    //   setCurrentView("qrCode");
    //   return;
    // }

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

  // Handler to return to homepage
  const handleBackToHome = () => {
    navigate("/");
  };

  // Handler to show help section
  const handleHelp = () => {
    setCurrentView("help");
  };

  // Handler to log out
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };

  // Handler to view a specific medical record
  const handleViewRecord = (record) => {
    setSelectedRecord(record);
  };

  // Handler to close a medical record view
  const handleCloseRecord = () => {
    setSelectedRecord(null);
  };

  // Handler to save QR code to device
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

  // Handler to share QR code
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
      return <p className="text-center text-gray-500">Loading profile...</p>;
    }

    if (fetchStatus.error) {
      return <p className="text-center text-red-500">{fetchStatus.error}</p>;
    }

    switch (currentView) {
      case "dashboard":
        return (
          <motion.div
            className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 md:p-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Hero Section */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 mb-6 border-t-4 border-teal-400 flex flex-col md:flex-row items-center justify-between"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-3xl text-teal-600 font-semibold mb-2 tracking-tight">
                  Welcome, {username ? `Mr/Mrs. ${username}` : "Patient"}!
                </h2>
                <p className="text-gray-600">
                  Your healthcare hub. Check your upcoming appointments, recent records, or manage your profile.
                </p>
              </div>
              <motion.img
                src={hospitalIllustration}
                alt="Hospital Illustration"
                className="w-48 md:w-64 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </motion.div>
      
          {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Appointment Card */}
        <motion.div
          className="bg-white p-4 w- rounded-xl shadow-md border-l-4 border-teal-400 hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center mb-3">
            <FaCalendarPlus className="text-teal-500 mr-2" size={20} />
            <h3 className="text-lg font-semibold text-teal-600">Upcoming Appointment</h3>
          </div>
          <p className="text-gray-600 mb-2">
            {patientData?.upcomingAppointment ? (
              <>
                Next: {new Date(patientData.upcomingAppointment.appoinment_Date).toLocaleDateString()}
                {patientData.upcomingAppointment.appoinment_Time && ` at ${patientData.upcomingAppointment.appoinment_Time}`}
                {patientData.upcomingAppointment.doctorName && ` with Dr. ${patientData.upcomingAppointment.doctorName}`}
              </>
            ) : (
              <>
                No upcoming appointments.{" "}
                <button
                  onClick={handleBookAppointment}
                  className="text-teal-500 hover:underline"
                >
                  Book one now!
                </button>
              </>
            )}
          </p>
        </motion.div>
      
              {/* Recent Medical Record Card */}
              <motion.div
                className="bg-white p-4 rounded-xl shadow-md border-l-4 border-teal-400 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center mb-3">
                  <FaFileMedical className="text-teal-500 mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-teal-600">Recent Medical Record</h3>
                </div>
                <p className="text-gray-600 mb-2">
                  {medicalRecords.length > 0 ? (
                    <>
                      Last: {new Date(medicalRecords[0].createdAt).toLocaleDateString()}
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
                className="bg-white p-4 rounded-xl shadow-md border-l-4 border-teal-400 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center mb-3">
                  <FaUser className="text-teal-500 mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-teal-600">Profile Status</h3>
                </div>
                <p className="text-gray-600 mb-2">
                  {patientData && patientData.firstname && patientData.email
                    ? "Profile complete"
                    : "Complete your profile to get started."}
                </p>
              </motion.div>
            </div>
      
            {/* Decorative Background Element */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="w-96 h-96 bg-teal-100 rounded-full opacity-20 absolute -top-20 -left-40 blur-3xl" />
              <div className="w-96 h-96 bg-blue-100 rounded-full opacity-20 absolute -bottom-20 -right-40 blur-3xl" />
            </div>
          </motion.div>
        );

      case "patientData":
        if (fetchStatus.loading) {
          return <p className="text-center text-gray-500">Loading...</p>;
        }
        if (fetchStatus.error && showPatientDataError) {
          return <p className="text-center text-red-500">{fetchStatus.error}</p>;
        }
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
                <p>
                  <strong>First Name:</strong> {patientData.firstname}
                </p>
                <p>
                  <strong>Last Name:</strong> {patientData.lastname}
                </p>
                <p>
                  <strong>Email:</strong> {patientData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {patientData.phone}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {patientData.dateOfBirth}
                </p>
                <p>
                  <strong>Address:</strong> {patientData.address}
                </p>
                <p>
                  <strong>Gender:</strong> {patientData.gender}
                </p>
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
        if (medicalFetchStatus.loading) {
          return <p className="text-center text-gray-500">Loading medical records...</p>;
        }
        if (medicalFetchStatus.error) {
          return <p className="text-center text-red-500">{medicalFetchStatus.error}</p>;
        }
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
                      <p className="text-gray-600">
                        <strong>Record ID:</strong> {record.id}
                      </p>
                      <p className="text-gray-600">
                        <strong>Date:</strong> {new Date(record.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        <strong>Doctor:</strong> {record.doctorName}
                      </p>
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
                  <p>
                    <strong>Disease:</strong> {selectedRecord.disease?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Diagnosis:</strong> {selectedRecord.diagnosticData || "N/A"}
                  </p>
                  <p>
                    <strong>Treatment:</strong> {selectedRecord.treatments || "N/A"}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(selectedRecord.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {selectedRecord.doctorName || "N/A"}
                  </p>
                  <p>
                    <strong>Report:</strong>{" "}
                    {selectedRecord.reportUrl ? (
                      <a
                        href={`http://localhost:8081${selectedRecord.reportUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-500 hover:underline"
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
                <img
                  src={qrCodeData}
                  alt="Patient QR Code"
                  className="w-64 h-64 mx-auto rounded-lg shadow-sm"
                />
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
              !qrCodeStatus.loading &&
              !qrCodeStatus.error && (
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
            <p className="text-gray-500">
              Need assistance? Contact us at{" "}
              <a href="mailto:support@hospital.com" className="text-teal-500 hover:underline">
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
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans md:flex-row">
      {/* Sidebar */}
      <motion.div
        className="flex flex-col bg-white shadow-xl rounded-b-3xl md:rounded-r-3xl md:w-1/4 p-6 border-r border-gray-100"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.img
          src={profileImg}
          alt="Profile Picture"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-teal-200 mx-auto mb-4 shadow-sm"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h2 className="text-xl font-semibold text-teal-600 text-center mb-6">
          Mr/Mrs.{username || "Patient"}
        </h2>
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

      {/* Main Content */}
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