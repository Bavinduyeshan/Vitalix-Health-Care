import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaFileDownload,
  FaPlus,
  FaEdit,
  FaSearch,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import profileimg from "../../assets/profileimg.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Dashboard");
  const adminUsername = "Bavindu";
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Added missing state
  const [isAdmin, setIsAdmin] = useState(true); // Added missing state
  const [profileOpen, setProfileOpen] = useState(false); // Added missing state
  const [menuOpen, setMenuOpen] = useState(false); // Added missing state

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  // State for data
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
  
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

  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [editAppointment, setEditAppointment] = useState(null);
  const initialAppointmentState = {
    AppoinmentID: "",
    patientId: "",
    doctorId: "",
    appoinment_Date: "",
    appoinment_Time: "",
    reason: "",
  };
  const [appointmentFormData, setAppointmentFormData] = useState(
    initialAppointmentState
  );

  const [isMedicalRecordModalOpen, setIsMedicalRecordModalOpen] = useState(false);
  const [editMedicalRecord, setEditMedicalRecord] = useState(null);
  const initialMedicalRecordState = {
    recordid: "",
    patientId: "",
    doctorId: "",
    diseasename: "",
    diagnosticdata: "",
    treatments: "",
    reporturl: "",
    createdAt: "",
  };
  const [medicalRecordFormData, setMedicalRecordFormData] = useState(
    initialMedicalRecordState
  );

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const initialUserState = {
    userId: "",
    username: "",
    email: "",
    password: "",
    role: "",
    createdDate: "",
  };
  const [userFormData, setUserFormData] = useState(initialUserState);

  const [isDiseaseModalOpen, setIsDiseaseModalOpen] = useState(false);
  const [editDisease, setEditDisease] = useState(null);
  const initialDiseaseState = { id: "", name: "" };
  const [diseaseFormData, setDiseaseFormData] = useState(initialDiseaseState);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };



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

  // Fetch data on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchUserData();
    fetch("http://localhost:8082/doctors/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const mappedDoctors = data.map((doctor) => ({
          id: doctor.doctor_Id || "",
          firstname: doctor.firstname || "",
          lastname: doctor.lastname || "",
          phonenumber: doctor.phonenumber || "",
          email: doctor.email || "",
          specilization: doctor.specilization || "",
          userId: doctor.userId || "",
          experience: doctor.experience || "",
          education: doctor.education || "",
        }));
        setDoctors(mappedDoctors);
      })
      .catch((error) => console.error("Error fetching doctors:", error));

    fetch("http://localhost:8083/pateints/patients/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const mappedPatients = data.map((patient) => ({
          patientId: patient.patientId || "",
          userId: patient.userId || "",
          firstname: patient.firstname || "",
          lastname: patient.lastname || "",
          email: patient.email || "",
          phone: patient.phone || "",
          dateOfBirth: patient.dateOfBirth || "",
          address: patient.address || "",
          gender: patient.gender || "",
          createdDate: patient.createdDate || "",
          lastModifiedDate: patient.lastModifiedDate || "",
        }));
        setPatients(mappedPatients);
      })
      .catch((error) => console.error("Error fetching patients:", error));

    fetch("http://localhost:8086/appoinments/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const mappedAppointments = data.map((appointment) => ({
          AppoinmentID: appointment.appoinmentId || "",
          patientId: appointment.patientID || "",
          doctorId: appointment.docname || "",
          appoinment_Date: appointment.appoinment_Date || "",
          appoinment_Time: appointment.appoinment_Time || "",
          reason: appointment.reason || "",
        }));
        setAppointments(mappedAppointments);
      })
      .catch((error) => console.error("Error fetching appointments:", error));

    fetch("http://localhost:8081/medical-records/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const mappedMedicalRecords = data.map((medicalRecord) => ({
          recordid: medicalRecord.id || "",
          patientId: medicalRecord.patientID || "",
          doctorId: medicalRecord.doctor_Id || "",
          diseasename: medicalRecord.disease?.name || "",
          diagnosticdata: medicalRecord.diagnosticData || "",
          treatments: medicalRecord.treatments || "",
          reporturl: medicalRecord.reportUrl || "",
          createdAt: medicalRecord.createdAt || "",
        }));
        setMedicalRecords(mappedMedicalRecords);
      })
      .catch((error) => console.error("Error fetching medical records:", error));

    fetch("http://localhost:8080/users/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const mappedUsers = data.map((user) => ({
          userId: user.userId || "",
          username: user.username || "",
          email: user.email || "",
          password: user.password || "",
          role: user.role || "",
          createdDate: user.createdDate || "",
        }));
        setUsers(mappedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));

    fetch("http://localhost:8081/diseases/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const mappedDiseases = data.map((disease) => ({
          id: disease.id || "",
          name: disease.name || "",
        }));
        setDiseases(mappedDiseases);
      })
      .catch((error) => console.error("Error fetching diseases:", error));
  }, []);

  const downloadReportUrl = (url, recordId) => {
    fetch(url, { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const urlObject = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = urlObject;
        link.download = `Medical_Record_${recordId}_Report_${new Date()
          .toISOString()
          .split("T")[0]}.pdf`;
        link.click();
        URL.revokeObjectURL(urlObject);
      })
      .catch((error) => {
        console.error("Error downloading report:", error);
        alert("Failed to download report. Please check the URL.");
      });
  };

  // CRUD Handlers
  const openUserModal = (user = null) => {
    setEditUser(user);
    setUserFormData(user || initialUserState);
    setIsUserModalOpen(true);
  };
  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setEditUser(null);
    setUserFormData(initialUserState);
  };
  const handleUserChange = (e) =>
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in again.",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password,
          role: userFormData.role,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const newUser = await response.json();
      setUsers([...users, newUser]);
      closeUserModal();
      Swal.fire({
        icon: "success",
        title: "Added successfully!",
        text: "User added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding user:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add user",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in again.",
        showConfirmButton: true,
      });
      return;
    }

    const payload = {
      userId: editUser.userId,
      username: userFormData.username,
      email: userFormData.email,
      role: userFormData.role,
    };
    console.log("PUT Payload:", JSON.stringify(payload));

    try {
      const response = await fetch(`http://localhost:8080/users/update/${editUser.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
      }

      const updatedUser = { ...payload, userId: editUser.userId };
      setUsers(
        users.map((u) =>
          u.userId === updatedUser.userId ? { ...u, ...updatedUser } : u
        )
      );
      closeUserModal();
      Swal.fire({
        icon: "success",
        title: "Updated successfully!",
        text: "User updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update user",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };
  const handleUserDelete = (userId) => {
    if (window.confirm("Are you sure?")) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8080/users/delete/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => setUsers(users.filter((u) => u.userId !== userId)))
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  const openDiseaseModal = (disease = null) => {
    setEditDisease(disease);
    setDiseaseFormData(disease || initialDiseaseState);
    setIsDiseaseModalOpen(true);
  };
  const closeDiseaseModal = () => {
    setIsDiseaseModalOpen(false);
    setEditDisease(null);
    setDiseaseFormData(initialDiseaseState);
  };
  const handleDiseaseChange = (e) =>
    setDiseaseFormData({ ...diseaseFormData, [e.target.name]: e.target.value });
  const handleUpdateDiseaseSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      id: editDisease.id,
      name: diseaseFormData.name,
    };
    console.log("PUT Payload:", JSON.stringify(payload));

    try {
      const response = await fetch(
        `http://localhost:8081/diseases/update/${editDisease.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${responseText}`
        );
      }

      const updatedDisease = { ...payload, id: editDisease.id };
      setDiseases(
        diseases.map((de) =>
          de.id === updatedDisease.id ? { ...de, ...updatedDisease } : de
        )
      );
      closeDiseaseModal();
       alert("Disease updated successfully!");
      // Swal.fire({
      //           icon: "success",
      //           title: "updated successfully!",
      //           text: "Disease updated successfully!.",
      //           showConfirmButton: false,
      //           timer: 1500,
      //         });
    } catch (error) {
      console.error("Error updating disease:", error);
      alert(`Failed to update disease: ${error.message}`);
    }
  };

  const handleAddDiseaseSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8081/diseases/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: diseaseFormData.id,
          name: diseaseFormData.name,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log("Raw response text:", responseText);
      const newDisease = {
        id: diseaseFormData.id,
        name: diseaseFormData.name,
      };
      setDiseases([...diseases, { ...newDisease, id: newDisease.id }]);
      closeDiseaseModal();
      // alert("New disease added successfully");
      Swal.fire({
                icon: "success",
                title: "Added successfully!",
                text: "Disease Added successfully!.",
                showConfirmButton: false,
                timer: 1500,
              });
    } catch (error) {
      console.error("Error adding disease:", error);
      alert("Failed to add disease. Please try again.");
    }
  };

  const openUpdateDoctorModal = (doctor = null) => {
    setEditDoctor(doctor);
    setDoctorFormData(doctor || initialDoctorState);
    setIsDoctorModalOpen(true);
  };

  const openAddDoctorModal = (doctor = null) => {
    setEditDoctor(doctor);
    setDoctorFormData(doctor || initialDoctorState);
    setIsDoctorModalOpen(true);
  };
  const closeDoctorModal = () => {
    setIsDoctorModalOpen(false);
    setEditDoctor(null);
    setDoctorFormData(initialDoctorState);
  };

  const handleDoctorChange = (e) =>
    setDoctorFormData({ ...doctorFormData, [e.target.name]: e.target.value });
  const handleAddDoctorSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8082/doctors/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: doctorFormData.firstname,
          lastname: doctorFormData.lastname,
          phonenumber: doctorFormData.phonenumber,
          email: doctorFormData.email,
          specilization: doctorFormData.specilization,
          userId: doctorFormData.userId || null,
          experience: doctorFormData.experience,
          education: doctorFormData.education,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newDoctor = await response.json();
      setDoctors([...doctors, { ...newDoctor, id: newDoctor.doctor_Id }]);
      closeDoctorModal();
      alert("New doctor added successfully");
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor. Please try again.");
    }
  };

  const handleUpdateDoctorSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      doctor_Id: editDoctor.id,
      firstname: doctorFormData.firstname,
      lastname: doctorFormData.lastname,
      phonenumber: doctorFormData.phonenumber,
      email: doctorFormData.email,
      specilization: doctorFormData.specilization,
      userId: doctorFormData.userId,
      experience: doctorFormData.experience,
      education: doctorFormData.education,
    };
    console.log("PUT Payload:", JSON.stringify(payload));

    try {
      const response = await fetch(
        `http://localhost:8082/doctors/update/${editDoctor.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${responseText}`
        );
      }

      const updatedDoctor = { ...payload, doctor_Id: editDoctor.id };
      setDoctors(
        doctors.map((d) =>
          d.id === updatedDoctor.doctor_Id ? { ...d, ...updatedDoctor } : d
        )
      );
      closeDoctorModal();
      // alert("Doctor updated successfully!");
      Swal.fire({
                icon: "success",
                title: "updated successfully!",
                text: "Doctor updated successfully!.",
                showConfirmButton: false,
                timer: 1500,
              });
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert(`Failed to update doctor: ${error.message}`);
    }
  };

  const handleDoctorDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8082/doctors/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setDoctors(doctors.filter((d) => d.id !== id));
        alert("Doctor deleted successfully!");
      } catch (error) {
        console.error("Error deleting doctor:", error);
        alert("Failed to delete doctor. Please try again.");
      }
    }
  };

  const openUpdatePatientModal = (patient = null) => {
    setEditPatient(patient);
    setPatientFormData(patient || initialPatientState);
    setIsPatientModalOpen(true);
  };
  const closePatientModal = () => {
    setIsPatientModalOpen(false);
    setEditPatient(null);
    setPatientFormData(initialPatientState);
  };
  const handlePatientChange = (e) =>
    setPatientFormData({ ...patientFormData, [e.target.name]: e.target.value });

  const handleUpdatePatientSubmit = async (e) => {
    e.preventDefault();
    console.log("handleUpdatePatientSubmit called");

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      alert("Authentication token missing. Please log in again.");
      return;
    }

    const payload = {
      patientId: editPatient.patientId,
      userId: patientFormData.userId,
      firstname: patientFormData.firstname,
      lastname: patientFormData.lastname,
      email: patientFormData.email,
      phone: patientFormData.phone,
      dateOfBirth: patientFormData.dateOfBirth,
      address: patientFormData.address,
      gender: patientFormData.gender,
      createdDate: patientFormData.createdDate || editPatient.createdDate,
      lastModifiedDate:
        patientFormData.lastModifiedDate || editPatient.lastModifiedDate,
    };
    console.log("PUT Payload:", JSON.stringify(payload));

    try {
      console.log("Sending fetch request...");
      const response = await fetch(
        `http://localhost:8083/pateints/update/${editPatient.patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("Response received, status:", response.status);
      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${responseText}`
        );
      }

      const updatedPatient = { ...payload, patientId: editPatient.patientId };
      console.log("Updating patient state with:", updatedPatient);
      setPatients(
        patients.map((p) =>
          p.patientId === updatedPatient.patientId
            ? { ...p, ...updatedPatient }
            : p
        )
      );
      closePatientModal();
      // alert("Patient updated successfully!");
      Swal.fire({
                icon: "success",
                title: "updated successfully!",
                text: "Patient updated successfully!.",
                showConfirmButton: false,
                timer: 1500,
              });
    } catch (error) {
      console.error("Error updating patient:", error);
      alert(`Failed to update patient: ${error.message}`);
    }
  };

  const handlePatientDelete = async (patientId) => {
    if (window.confirm("Are you sure?")) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8083/pateints/delete/${patientId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setPatients(patients.filter((p) => p.patientId !== patientId));
        alert("Patient deleted successfully!");
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("Failed to delete patient. Please try again.");
      }
    }
  };

  const openUpdateAppointmentModal = (appointment = null) => {
    setEditAppointment(appointment);
    setAppointmentFormData(appointment || initialAppointmentState);
    setIsAppointmentModalOpen(true);
  };
  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setEditAppointment(null);
    setAppointmentFormData(initialAppointmentState);
  };
  const handleAppointmentChange = (e) =>
    setAppointmentFormData({
      ...appointmentFormData,
      [e.target.name]: e.target.value,
    });

  const handleUpdateAppoinmentSubmit = async (e) => {
    e.preventDefault();
    console.log("handleUpdateAppoinmentSubmit called");

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      alert("Authentication token missing. Please log in again.");
      return;
    }

    const payload = {
      appoinmentId: editAppointment.AppoinmentID,
      patientID: appointmentFormData.patientId,
      docname: appointmentFormData.doctorId,
      appoinment_Date: appointmentFormData.appoinment_Date,
      appoinment_Time: appointmentFormData.appoinment_Time,
      reason: appointmentFormData.reason,
    };
    console.log("PUT Payload:", JSON.stringify(payload));

    try {
      console.log("Sending fetch request...");
      const response = await fetch(
        `http://localhost:8086/appoinments/update/${editAppointment.AppoinmentID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("Response received, status:", response.status);
      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${responseText}`
        );
      }

      const updatedAppoinment = {
        ...payload,
        AppoinmentID: editAppointment.AppoinmentID,
      };
      console.log("Updating Appointment state with:", updatedAppoinment);
      setAppointments(
        appointments.map((A) =>
          A.AppoinmentID === updatedAppoinment.AppoinmentID
            ? { ...A, ...updatedAppoinment }
            : A
        )
      );
      closeAppointmentModal();
      // alert("Appointment updated successfully!");
      Swal.fire({
                icon: "success",
                title: "updated successfully!",
                text: "Appoinment updated successfully!.",
                showConfirmButton: false,
                timer: 1500,
              });
    } catch (error) {
      console.error("Error updating Appointment:", error);
      alert(`Failed to update Appointment: ${error.message}`);
    }
  };

  const handleAppointmentDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8086/appoinments/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setAppointments(
          appointments.filter((a) => a.AppoinmentID !== id)
        );
        alert("Appointment deleted successfully!");
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("Failed to delete appointment. Please try again.");
      }
    }
  };

  const openMedicalRecordModal = (medicalRecords = null) => {
    setEditMedicalRecord(medicalRecords);
    setMedicalRecordFormData(medicalRecords || initialMedicalRecordState);
    setIsMedicalRecordModalOpen(true);
  };
  const closeMedicalRecordModal = () => {
    setIsMedicalRecordModalOpen(false);
    setEditMedicalRecord(null);
    setMedicalRecordFormData(initialMedicalRecordState);
  };
  const handleMedicalRecordChange = (e) =>
    setMedicalRecordFormData({
      ...medicalRecordFormData,
      [e.target.name]: e.target.value,
    });
  const handleMedicalRecordSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = editMedicalRecord ? "PUT" : "POST";
    const url = editMedicalRecord
      ? `http://localhost:8081/medical-records/${editMedicalRecord.recordid}`
      : "http://localhost:8081/medical-records";
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(medicalRecordFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editMedicalRecord)
          setMedicalRecords(
            medicalRecords.map((r) =>
              r.recordid === data.recordid ? data : r
            )
          );
        else setMedicalRecords([...medicalRecords, data]);
        closeMedicalRecordModal();
      })
      .catch((error) => console.error("Error saving medical record:", error));
  };
  const handleMedicalRecordDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8081/medical-records/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() =>
          setMedicalRecords(medicalRecords.filter((r) => r.recordid !== id))
        )
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
    const url = "http://localhost:8087/reports/report/all";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Failed to generate report");
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "All_Doctors_Report.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => {
        console.error("Error generating report:", error);
      });
  };
  const generateAllPatientsReport = () =>{
    const url = "http://localhost:8087/reportsP/report/all";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Failed to generate report");
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "All_Patient_Records_Report.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => {
        console.error("Error generating report:", error);
      });
  };
    // downloadReport(patients, "All_Patients_Report");
  const generateAllAppointmentsReport = () =>
    downloadReport(appointments, "All_Appointments_Report");
  const generateAllMedicalRecordsReport = () =>{
    const url = "http://localhost:8087/reportsM/report/all";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Failed to generate report");
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "All_medical_Records_Report.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => {
        console.error("Error generating report:", error);
      });
  };
    // downloadReport(medicalRecords, "All_Medical_Records_Report");
  const generateAllUsersReport = () => downloadReport(users, "All_Users_Report");
  const generateAllDiseasesReport = () =>
    downloadReport(diseases, "All_Diseases_Report");

  const generateSpecificDoctorReport = () => {
    if (!doctorSearchId) return alert("Please enter a Doctor ID");

    const token = localStorage.getItem("token");
    fetch(`http://localhost:8087/reports/report/${doctorSearchId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Doctor_${doctorSearchId}_Report_${new Date()
          .toISOString()
          .split("T")[0]}.pdf`;
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
    const patientRecords = medicalRecords.filter(
      (r) => r.patientId === patientSearchId
    );
    if (patientRecords.length)
      downloadReport(
        patientRecords,
        `Patient_${patientSearchId}_Medical_Records`
      );
    else alert("No records found for this patient");
  };

  const generateSpecificAppointmentReport = () => {
    if (!appointmentSearchId) return alert("Please enter an Appointment ID");
    const appointment = appointments.find(
      (a) => a.AppoinmentID === appointmentSearchId
    );
    if (appointment)
      downloadReport(appointment, `Appointment_${appointmentSearchId}_Report`);
    else alert("Appointment not found");
  };

  const generateSpecificMedicalRecordReport = () => {
    if (!medicalRecordSearchId) return alert("Please enter a Medical Record ID");
    const record = medicalRecords.find(
      (r) => r.recordid === medicalRecordSearchId
    );
    if (record)
      downloadReport(record, `Medical_Record_${medicalRecordSearchId}_Report`);
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
    <div className="min-h-screen bg-gray-50 font-sans">
      <motion.div
        className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-4 mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <img
            src={profileimg}
            alt="Profile"
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-blue-200 shadow-sm transition-transform hover:scale-105"
          />
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 tracking-tight">
              Welcome, {username}
            </h1>
            <p className="text-gray-500 text-sm mt-1 italic">
              Overseeing healthcare with care and precision
            </p>
          </div>
        </motion.div>

        {/* Menu Bar */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-3 flex flex-wrap gap-2 mb-8 border border-gray-100"
          variants={itemVariants}
        >
          {[
            "Dashboard",
            "Users",
            "Doctors",
            "Patients",
            "Appointments",
            "Medical Records",
            "Diseases",
            "Reports",
            "Logout",
          ].map((section) => (
            <button
              key={section}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === section
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              } flex items-center gap-2`}
              onClick={() =>
                section === "Logout"
                  ? handleLogout()
                  : setActiveSection(section)
              }
            >
              {section === "Dashboard" && <FaUsers className="text-base" />}
              {section === "Users" && <FaUsers className="text-base" />}
              {section === "Doctors" && <FaUserMd className="text-base" />}
              {section === "Patients" && <FaUsers className="text-base" />}
              {section === "Appointments" && (
                <FaCalendarCheck className="text-base" />
              )}
              {section === "Medical Records" && (
                <FaFileDownload className="text-base" />
              )}
              {section === "Diseases" && <FaFileDownload className="text-base" />}
              {section === "Reports" && <FaFileDownload className="text-base" />}
              {section === "Logout" && <FaFileDownload className="text-base" />}
              <span className="hidden sm:inline">{section}</span>
            </button>
          ))}
        </motion.div>

        {/* Content Sections */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeSection === "Dashboard" && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              variants={containerVariants}
            >
              {[
                {
                  icon: FaUsers,
                  title: "Patients",
                  count: patients.length,
                  color: "blue",
                },
                {
                  icon: FaUserMd,
                  title: "Doctors",
                  count: doctors.length,
                  color: "teal",
                },
                {
                  icon: FaCalendarCheck,
                  title: "Appointments",
                  count: appointments.length,
                  color: "indigo",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-center space-x-4 bg-gradient-to-br from-${item.color}-50 to-white`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon
                    className={`text-${item.color}-600 text-4xl p-2 rounded-full bg-${item.color}-100`}
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                      {item.title}
                    </h3>
                    <p
                      className={`text-xl sm:text-2xl font-bold text-${item.color}-600`}
                    >
                      {item.count}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Users Section */}
          {activeSection === "Users" && (
            <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
              <motion.div
      className="flex justify-between items-center"
      variants={itemVariants}
    >
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Users
                </h2>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 text-sm font-medium"
                  onClick={() => openUserModal()}
                >
                  <FaPlus /> Add User
                </button>
              </motion.div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="relative w-full max-w-xs">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by User ID"
                    value={userSearchId}
                    onChange={(e) => setUserSearchId(e.target.value)}
                    className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700 bg-white shadow-sm"
                  />
                </div>
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
                  onClick={generateSpecificUserReport}
                >
                  <FaFileDownload /> Generate Report
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">User ID</th>
                      <th className="p-4 font-semibold text-gray-600">
                        Username
                      </th>
                      <th className="p-4 font-semibold text-gray-600">Email</th>
                      <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
                        Role
                      </th>
                      <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
                        Created Date
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter(
                        (u) =>
                          !userSearchId || u.userId.toString().includes(userSearchId)
                      )
                      .map((user) => (
                        <tr
                          key={user.userId}
                          className="border-t hover:bg-blue-50 transition-all duration-200"
                        >
                          <td className="p-4 text-gray-700">{user.userId}</td>
                          <td className="p-4 text-gray-700">{user.username}</td>
                          <td className="p-4 text-gray-700">{user.email}</td>
                          <td className="p-4 hidden md:table-cell text-gray-700">
                            {user.role || "N/A"}
                          </td>
                          <td className="p-4 hidden md:table-cell text-gray-700">
                            {user.createdDate || "N/A"}
                          </td>
                          <td className="p-4 space-x-3">
                            <button
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              onClick={() => openUserModal(user)}
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 transition-colors"
                              onClick={() => handleUserDelete(user.userId)}
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {isUserModalOpen && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-2xl"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      {editUser ? "Edit User" : "Add User"}
                    </h3>
                    <form onSubmit={editUser ?handleUpdateUserSubmit : handleAddUserSubmit} className="space-y-5">
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={userFormData.username}
                          onChange={handleUserChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={userFormData.email}
                          onChange={handleUserChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      {/* <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={userFormData.password}
                          onChange={handleUserChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required={!editUser}
                        />
                      </div> */}
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Role
                        </label>
                        <select
                          name="role"
                          value={userFormData.role}
                          onChange={handleUserChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        >
                          <option value="">Select Role</option>
                          <option value="PATIENT">Patient</option>
                          <option value="DOCTOR">Doctor</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
                        >
                          {editUser ? "Update" :"Add"}
                        </button>
                        <button
                          type="button"
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
                          onClick={closeUserModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Diseases Section */}
          {activeSection === "Diseases" && (
            <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
              <motion.div
      className="flex justify-between items-center"
      variants={itemVariants}
    >
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Diseases
                </h2>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 text-sm font-medium"
                  onClick={() => openDiseaseModal()}
                >
                  <FaPlus /> Add Disease
                </button>
              </motion.div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="relative w-full max-w-xs">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by Disease ID"
                    value={diseaseSearchId}
                    onChange={(e) => setDiseaseSearchId(e.target.value)}
                    className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700 bg-white shadow-sm"
                  />
                </div>
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
                  onClick={generateSpecificDiseaseReport}
                >
                  <FaFileDownload /> Generate Report
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">ID</th>
                      <th className="p-4 font-semibold text-gray-600">Name</th>
                      <th className="p-4 font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {diseases
                      .filter(
                        (d) =>
                          !diseaseSearchId || d.id.toString().includes(diseaseSearchId)
                      )
                      .map((disease) => (
                        <tr
                          key={disease.id}
                          className="border-t hover:bg-blue-50 transition-all duration-200"
                        >
                          <td className="p-4 text-gray-700">{disease.id}</td>
                          <td className="p-4 text-gray-700">{disease.name}</td>
                          <td className="p-4 space-x-3">
                            <button
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              onClick={() => openDiseaseModal(disease)}
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 transition-colors"
                              onClick={() => handleDiseaseDelete(disease.id)}
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {isDiseaseModalOpen && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-2xl"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      {editDisease ? "Edit Disease" : "Add Disease"}
                    </h3>
                    <form
                      onSubmit={
                        editDisease
                          ? handleUpdateDiseaseSubmit
                          : handleAddDiseaseSubmit
                      }
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={diseaseFormData.name}
                          onChange={handleDiseaseChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
                        >
                          {editDisease ? "Update" : "Add"}
                        </button>
                        <button
                          type="button"
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
                          onClick={closeDiseaseModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Doctors Section */}
          {activeSection === "Doctors" && (
            <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
              <motion.div
      className="flex justify-between items-center"
      variants={itemVariants}
    >
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Doctors
                </h2>
                {/* <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 text-sm font-medium"
                  onClick={() => openAddDoctorModal()}
                >
                  <FaPlus /> Add Doctor
                </button> */}
              </motion.div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="relative w-full max-w-xs">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by Doctor ID"
                    value={doctorSearchId}
                    onChange={(e) => setDoctorSearchId(e.target.value)}
                    className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700 bg-white shadow-sm"
                  />
                </div>
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
                  onClick={generateSpecificDoctorReport}
                >
                  <FaFileDownload /> Generate Report
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">ID</th>
                      <th className="p-4 font-semibold text-gray-600">
                        User ID
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        First Name
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Last Name
                      </th>
                      <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
                        Phone
                      </th>
                      <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
                        Email
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Specialization
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Experience
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Education
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors
                      .filter((d) => {
                        if (!doctorSearchId) return true;
                        if (d.id === undefined || d.id === null) return false;
                        return d.id.toString().includes(doctorSearchId);
                      })
                      .map((doctor) => (
                        <tr
                          key={doctor.id}
                          className="border-t hover:bg-blue-50 transition-all duration-200"
                        >
                          <td className="p-4 text-gray-700">{doctor.id}</td>
                          <td className="p-4 text-gray-700">{doctor.userId}</td>
                          <td className="p-4 text-gray-700">
                            {doctor.firstname}
                          </td>
                          <td className="p-4 text-gray-700">
                            {doctor.lastname}
                          </td>
                          <td className="p-4 hidden md:table-cell text-gray-700">
                            {doctor.phonenumber || "N/A"}
                          </td>
                          <td className="p-4 hidden md:table-cell text-gray-700">
                            {doctor.email || "N/A"}
                          </td>
                          <td className="p-4 text-gray-700">
                            {doctor.specilization}
                          </td>
                          <td className="p-4 text-gray-700">
                            {doctor.experience}
                          </td>
                          <td className="p-4 text-gray-700">
                            {doctor.education}
                          </td>
                          <td className="p-4 space-x-3">
                            <button
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              onClick={() => openUpdateDoctorModal(doctor)}
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 transition-colors"
                              onClick={() => handleDoctorDelete(doctor.id)}
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {isDoctorModalOpen && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-60 flex h-[100vh] items-center justify-center z-50 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-2xl"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      {editDoctor ? "Update Doctor" : "Add New Doctor"}
                    </h3>
                    <form
                      onSubmit={
                        editDoctor
                          ? handleUpdateDoctorSubmit
                          : handleAddDoctorSubmit
                      }
                      className="space-y-0"
                    >
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          User ID
                        </label>
                        <input
                          type="text"
                          name="userId"
                          value={doctorFormData.userId}
                          onChange={handleDoctorChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          value={doctorFormData.firstname}
                          onChange={handleDoctorChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          value={doctorFormData.lastname}
                          onChange={handleDoctorChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phonenumber"
                          value={doctorFormData.phonenumber}
                          onChange={handleDoctorChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={doctorFormData.email}
                          onChange={handleDoctorChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Specialization
                        </label>
                        <input
                          type="text"
                          name="specilization"
                          value={doctorFormData.specilization}
                          onChange={handleDoctorChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Experience
                        </label>
                        <input
                          type="text"
                          name="experience"
                          value={doctorFormData.experience}
                          onChange={handleDoctorChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Education
                        </label>
                        <input
                          type="text"
                          name="education"
                          value={doctorFormData.education}
                          onChange={handleDoctorChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
                        >
                          {editDoctor ? "Update" : "Add"}
                        </button>
                        <button
                          type="button"
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
                          onClick={closeDoctorModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Patients Section */}
          {activeSection === "Patients" && (
            <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
              <motion.div
      className="flex justify-between items-center"
      variants={itemVariants}
    >
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Patients
                </h2>
                {/* <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 text-sm font-medium"
                  onClick={() => openUpdatePatientModal()}
                >
                  <FaPlus /> Add Patient
                </button> */}
              </motion.div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="relative w-full max-w-xs">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by Patient ID"
                    value={patientSearchId}
                    onChange={(e) => setPatientSearchId(e.target.value)}
                    className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700 bg-white shadow-sm"
                  />
                </div>
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
                  onClick={generateSpecificPatientReport}
                >
                  <FaFileDownload /> Generate Report
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">
                        Patient ID
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        User ID
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        First Name
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Last Name
                      </th>
                      <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
                        Address
                      </th>
                      <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
                        Phone
                      </th>
                      <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
                        Email
                      </th>
                      <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
                        Date of Birth
                      </th>
                      <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
                        Gender
                      </th>
                      <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
                        Created Date
                      </th>
                      <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
                        Last Modified
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody> 
                    {patients
                      .filter((p) =>{
                        if (!patientSearchId) return true;
                        if (p.patientId === undefined || p.patientId === null) return false;
                        return p.patientId.toString().includes(patientSearchId);
                      })
                        
                      
                      .map((patient) => (
                       
                        <tr
                          key={patient.patientId}
                          className="border-t hover:bg-blue-50 transition-all duration-200"
                        >
                          <td className="p-4 text-gray-700">
                            {patient.patientId}
                          </td>
                          <td className="p-4 text-gray-700">{patient.userId}</td>
                          <td className="p-4 text-gray-700">
                            {patient.firstname}
                          </td>
                          <td className="p-4 text-gray-700">
                            {patient.lastname}
                          </td>
                          <td className="p-4 hidden md:table-cell text-gray-700">
                            {patient.address}
                          </td>
                          <td className="p-4 hidden md:table-cell text-gray-700">
                            {patient.phone}
                          </td>
                          <td className="p-4 hidden md:table-cell text-gray-700">
                            {patient.email}
                          </td>
                          <td className="p-4 hidden md:table-cell text-gray-700">
                            {patient.dateOfBirth}
                          </td>
                          <td className="p-4 hidden md:table-cell text-gray-700">
                            {patient.gender}
                          </td>
                          <td className="p-4 hidden md:table-cell text-gray-700">
                            {patient.createdDate}
                          </td>
                          <td className="p-4 hidden md:table-cell text-gray-700">
                            {patient.lastModifiedDate}
                          </td>
                          <td className="p-4 space-x-3">
                            <button
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              onClick={() => openUpdatePatientModal(patient)}
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 transition-colors"
                              onClick={() => handlePatientDelete(patient.patientId)}
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {isPatientModalOpen && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white rounded-xl p-6 w-full h-[100vh] max-w-md sm:max-w-lg shadow-2xl"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      {editPatient ? "Edit Patient" : "Add Patient"}
                    </h3>
                    <form
                      onSubmit={handleUpdatePatientSubmit}
                      className="space-y-0"
                    >
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          User ID
                        </label>
                        <select
                            name="userId"
                            value={patientFormData.userId}
                            onChange={handlePatientChange}
                            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                            required
                          >
                            <option value="">Select User</option>
                            {users.map((user) => (
                              <option key={user.userId} value={user.userId}>
                                {`${user.username} (${user.userId})`}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          value={patientFormData.firstname}
                          onChange={handlePatientChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          value={patientFormData.lastname}
                          onChange={handlePatientChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={patientFormData.email}
                          onChange={handlePatientChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={patientFormData.phone}
                          onChange={handlePatientChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={patientFormData.dateOfBirth}
                          onChange={handlePatientChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={patientFormData.address}
                          onChange={handlePatientChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={patientFormData.gender}
                          onChange={handlePatientChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
                        >
                          {editPatient ? "Update" : "Add"}
                        </button>
                        <button
                          type="button"
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
                          onClick={closePatientModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}

{activeSection === "Appointments" && (
  <motion.div
    className="space-y-6"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.div
      className="flex justify-between items-center"
      variants={itemVariants}
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
        Appointments
      </h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
        onClick={() => openUpdateAppointmentModal()}
      >
        <FaPlus /> Add Appointment
      </button>
    </motion.div>
    <motion.div
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
      variants={itemVariants}
    >
      <div className="relative w-full max-w-xs">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Appointment ID"
          value={appointmentSearchId}
          onChange={(e) => setAppointmentSearchId(e.target.value)}
          className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700 bg-white shadow-sm"
        />
      </div>
      <button
        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
        onClick={generateSpecificAppointmentReport}
      >
        <FaFileDownload /> Generate Report
      </button>
    </motion.div>
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
      variants={itemVariants}
    >
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="p-4 font-semibold text-gray-600">ID</th>
            <th className="p-4 font-semibold text-gray-600">Patient</th>
            <th className="p-4 font-semibold text-gray-600">Doctor</th>
            <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
              Date
            </th>
            <th className="p-4 font-semibold text-gray-600">Time</th>
            <th className="p-4 font-semibold text-gray-600">Reason</th>
            <th className="p-4 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments
            .filter(
              (a) =>
                !appointmentSearchId ||
                a.AppoinmentID.toString().includes(appointmentSearchId)
            )
            .map((appointment) => {
              const patient = patients.find(
                (p) => p.patientId === appointment.patientId
              );
              const doctor = doctors.find(
                (d) => d.id === appointment.doctorId
              );
              return (
                <tr
                  key={appointment.AppoinmentID}
                  className="border-t hover:bg-blue-50 transition-all duration-200"
                >
                  <td className="p-4 text-gray-700">
                    {appointment.AppoinmentID}
                  </td>
                  <td className="p-4 text-gray-700">
                    {patient
                      ? `${patient.firstname} ${patient.lastname}`
                      : appointment.patientId || "N/A"}
                  </td>
                  <td className="p-4 text-gray-700">
                    {doctor
                      ? `${doctor.firstname} ${doctor.lastname}`
                      : appointment.doctorId || "N/A"}
                  </td>
                  <td className="p-4 hidden md:table-cell text-gray-700">
                    {appointment.appoinment_Date || "N/A"}
                  </td>
                  <td className="p-4 text-gray-700">
                    {appointment.appoinment_Time || "N/A"}
                  </td>
                  <td className="p-4 text-gray-700">
                    {appointment.reason || "N/A"}
                  </td>
                  <td className="p-4 space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={() => openUpdateAppointmentModal(appointment)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition-colors"
                      onClick={() =>
                        handleAppointmentDelete(appointment.AppoinmentID)
                      }
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </motion.div>
    {isAppointmentModalOpen && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-2xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
            {editAppointment ? "Edit Appointment" : "Add Appointment"}
          </h3>
          <form
            onSubmit={handleUpdateAppoinmentSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Patient
              </label>
              <select
                name="patientId"
                value={appointmentFormData.patientId}
                onChange={handleAppointmentChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                required
              >
                <option value="">Select Patient</option>
                {patients.map((p) => (
                  <option key={p.patientId} value={p.patientId}>
                    {`${p.firstname} ${p.lastname}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Doctor
              </label>
              <select
                name="doctorId"
                value={appointmentFormData.doctorId}
                onChange={handleAppointmentChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {`${d.firstname} ${d.lastname}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Date
              </label>
              <input
                type="date"
                name="appoinmentDate"
                value={appointmentFormData.appoinmentDate}
                onChange={handleAppointmentChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Time
              </label>
              <input
                type="time"
                name="appoinmentTime"
                value={appointmentFormData.appoinmentTime}
                onChange={handleAppointmentChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Reason
              </label>
              <input
                type="text"
                name="reason"
                value={appointmentFormData.reason}
                onChange={handleAppointmentChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
                onClick={closeAppointmentModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </motion.div>
)}

{activeSection === "Medical Records" && (
  <motion.div
    className="space-y-6"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.div
      className="flex justify-between items-center"
      variants={itemVariants}
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
        Medical Records
      </h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
        onClick={() => openMedicalRecordModal()}
      >
        <FaPlus /> Add Record
      </button>
    </motion.div>
    <motion.div
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
      variants={itemVariants}
    >
      <div className="relative w-full max-w-xs">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Record ID"
          value={medicalRecordSearchId}
          onChange={(e) => setMedicalRecordSearchId(e.target.value)}
          className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700 bg-white shadow-sm"
        />
      </div>
      <button
        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
        onClick={generateSpecificMedicalRecordReport}
      >
        <FaFileDownload /> Generate Report
      </button>
    </motion.div>
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
      variants={itemVariants}
    >
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="p-4 font-semibold text-gray-600">ID</th>
            <th className="p-4 font-semibold text-gray-600">Patient</th>
            <th className="p-4 font-semibold text-gray-600">Doctor</th>
            <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
              Diagnostic Data
            </th>
            <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
              Treatments
            </th>
            <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
              Disease Name
            </th>
            <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
              Report
            </th>
            <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">
              Created Date
            </th>
            <th className="p-4 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords
            .filter(
              (r) =>
                !medicalRecordSearchId ||
                (r.recordid &&
                  r.recordid.toString().includes(medicalRecordSearchId))
            )
            .map((record) => {
              const patient = patients.find(
                (p) => p.patientId === record.patientId
              );
              const doctor = doctors.find((d) => d.id === record.doctorId);
              return (
                <tr
                  key={record.recordid}
                  className="border-t hover:bg-blue-50 transition-all duration-200"
                >
                  <td className="p-4 text-gray-700">{record.recordid}</td>
                  <td className="p-4 text-gray-700">
                    {patient
                      ? `${patient.firstname} ${patient.lastname}`
                      : record.patientId || "N/A"}
                  </td>
                  <td className="p-4 text-gray-700">
                    {doctor
                      ? `${doctor.firstname} ${doctor.lastname}`
                      : record.doctorId || "N/A"}
                  </td>
                  <td className="p-4 hidden md:table-cell text-gray-700">
                    {record.diagnosticdata || "N/A"}
                  </td>
                  <td className="p-4 hidden md:table-cell text-gray-700">
                    {record.treatments || "N/A"}
                  </td>
                  <td className="p-4 hidden md:table-cell text-gray-700">
                    {record.diseasename || "N/A"}
                  </td>
                  <td className="p-4 hidden md:table-cell text-gray-700">
                    {record.reporturl ? (
                      <div className="flex space-x-3">
                        <a
                          href={record.reporturl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                        >
                          <FaEye /> View
                        </a>
                        <button
                          onClick={() =>
                            downloadReportUrl(record.reporturl, record.recordid)
                          }
                          className="text-teal-600 hover:text-teal-800 flex items-center gap-1 transition-colors"
                        >
                          <FaFileDownload /> Download
                        </button>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-4 hidden md:table-cell text-gray-700">
                    {record.createdAt || "N/A"}
                  </td>
                  <td className="p-4 space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={() => openMedicalRecordModal(record)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition-colors"
                      onClick={() => handleMedicalRecordDelete(record.recordid)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </motion.div>
    {isMedicalRecordModalOpen && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-2xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
            {editMedicalRecord ? "Edit Medical Record" : "Add Medical Record"}
          </h3>
          <form onSubmit={handleMedicalRecordSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Patient
              </label>
              <select
                name="patientId"
                value={medicalRecordFormData.patientId}
                onChange={handleMedicalRecordChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                required
              >
                <option value="">Select Patient</option>
                {patients.map((p) => (
                  <option key={p.patientId} value={p.patientId}>
                    {`${p.firstname} ${p.lastname}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Doctor
              </label>
              <select
                name="doctorId"
                value={medicalRecordFormData.doctorId}
                onChange={handleMedicalRecordChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {`${d.firstname} ${d.lastname}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Disease Name
              </label>
              <input
                type="text"
                name="diseasename"
                value={medicalRecordFormData.diseasename}
                onChange={handleMedicalRecordChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Diagnostic Data
              </label>
              <input
                type="text"
                name="diagnosticdata"
                value={medicalRecordFormData.diagnosticdata}
                onChange={handleMedicalRecordChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Treatments
              </label>
              <textarea
                name="treatments"
                value={medicalRecordFormData.treatments}
                onChange={handleMedicalRecordChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Report URL
              </label>
              <input
                type="text"
                name="reporturl"
                value={medicalRecordFormData.reporturl}
                onChange={handleMedicalRecordChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1.5">
                Created Date
              </label>
              <input
                type="datetime-local"
                name="createdAt"
                value={medicalRecordFormData.createdAt}
                onChange={handleMedicalRecordChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700"
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
                onClick={closeMedicalRecordModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </motion.div>
)}

{activeSection === "Reports" && (
  <motion.div
    className="space-y-6"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h2
      className="text-xl sm:text-2xl font-semibold text-gray-800"
      variants={itemVariants}
    >
      Reports
    </motion.h2>
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      variants={itemVariants}
    >
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Generate All Reports
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "All Users", action: generateAllUsersReport },
          { label: "All Doctors", action: generateAllDoctorsReport , hide:true},
          { label: "All Patients", action: generateAllPatientsReport },
          { label: "All Appointments", action: generateAllAppointmentsReport },
          {
            label: "All Medical Records",
            action: generateAllMedicalRecordsReport,
          },
          { label: "All Diseases", action: generateAllDiseasesReport },
        ].map((report, index) => (
          <motion.button
            key={index}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2 justify-center text-sm font-medium shadow-sm"
            onClick={report.action}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <FaFileDownload /> {report.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  </motion.div>
)}

          {activeSection === "Logout" && <div className="text-center"><p className="text-xl text-gray-700" onClick={handleLogout}>Logging out...</p></div>}
        </motion.div>  
      </motion.div>
    </div>
  );
}

//correct 



