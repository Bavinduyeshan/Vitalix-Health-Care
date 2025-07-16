import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserMd,
  FaProcedures,
  FaCalendarCheck,
  FaFileMedical,
  FaVirus,
  FaChartBar,
  FaSignOutAlt,
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaSearch,
  FaEye,
  FaTrash,
  FaFileDownload,
} from "react-icons/fa";
import profileimg from "../../assets/profileimg.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import debounce from "lodash/debounce";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [username, setUsername] = useState(localStorage.getItem("username") || "Bavindu");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fetchStatus, setFetchStatus] = useState({ loading: false, error: null });

  // State for data
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
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
  const [appointmentFormData, setAppointmentFormData] = useState(initialAppointmentState);

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
  const [medicalRecordFormData, setMedicalRecordFormData] = useState(initialMedicalRecordState);

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

  // Debounced search handlers
  const debouncedSetDoctorSearchId = useMemo(() => debounce(setDoctorSearchId, 300), []);
  const debouncedSetPatientSearchId = useMemo(() => debounce(setPatientSearchId, 300), []);
  const debouncedSetAppointmentSearchId = useMemo(() => debounce(setAppointmentSearchId, 300), []);
  const debouncedSetMedicalRecordSearchId = useMemo(() => debounce(setMedicalRecordSearchId, 300), []);
  const debouncedSetUserSearchId = useMemo(() => debounce(setUserSearchId, 300), []);
  const debouncedSetDiseaseSearchId = useMemo(() => debounce(setDiseaseSearchId, 300), []);

  // Fetch user data
  const fetchUserData = async () => {
    setFetchStatus({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
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
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in again.",
        showConfirmButton: true,
      });
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
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch doctors.",
          showConfirmButton: true,
        });
      });

    fetch("http://localhost:8083/pateints/patients/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
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
      .catch((error) => {
        console.error("Error fetching patients:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch patients.",
          showConfirmButton: true,
        });
      });

    fetch("http://localhost:8086/appoinments/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const mappedAppointments = data.map((appointment) => ({
          AppoinmentID: appointment.appoinmentId || "",
          patientId: appointment.patientID || "",
          doctorId: appointment.docname || "",
          appoinment_Date: appointment.appoinment_Date || "",
          appoinment_Time: appointment.appoinment_Time || "",
          reason: appointment.reason || "",
          status: appointment.status || "pending",
        }));
        setAppointments(mappedAppointments);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch appointments.",
          showConfirmButton: true,
        });
      });

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
      .catch((error) => {
        console.error("Error fetching medical records:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch medical records.",
          showConfirmButton: true,
        });
      });

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
      .catch((error) => {
        console.error("Error fetching users:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch users.",
          showConfirmButton: true,
        });
      });

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
      .catch((error) => {
        console.error("Error fetching diseases:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch diseases.",
          showConfirmButton: true,
        });
      });
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
    Swal.fire({
      icon: "success",
      title: "Logged out",
      text: "You have been logged out successfully.",
      showConfirmButton: false,
      timer: 1500,
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
  const handleUserChange = (e) => setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
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

    try {
      const response = await fetch(`http://localhost:8080/users/update/${editUser.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const updatedUser = { ...payload, userId: editUser.userId };
      setUsers(users.map((u) => (u.userId === updatedUser.userId ? { ...u, ...updatedUser } : u)));
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

  const handleUserDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(`http://localhost:8080/users/delete/${userId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          setUsers(users.filter((u) => u.userId !== userId));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "User has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to delete user",
            text: error.message,
            showConfirmButton: true,
          });
        }
      }
    });
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
  const handleDiseaseChange = (e) => setDiseaseFormData({ ...diseaseFormData, [e.target.name]: e.target.value });
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

  const handleDiseaseDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(`http://localhost:8081/diseases/delete/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          setDiseases(diseases.filter((d) => d.id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Disease has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error deleting disease:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to delete disease",
            text: error.message,
            showConfirmButton: true,
          });
        }
      }
    });
  };

  const openAddDoctorModal = () => {
    setEditDoctor(null);
    setDoctorFormData(initialDoctorState);
    setIsDoctorModalOpen(true);
  };
  const openUpdateDoctorModal = (doctor) => {
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
      Swal.fire({
        icon: "success",
        title: "Added successfully!",
        text: "Doctor added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding doctor:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add doctor",
        text: error.message,
        showConfirmButton: true,
      });
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

    try {
      const response = await fetch(`http://localhost:8082/doctors/update/${editDoctor.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const updatedDoctor = { ...payload, id: editDoctor.id };
      setDoctors(doctors.map((d) => (d.id === updatedDoctor.id ? { ...d, ...updatedDoctor } : d)));
      closeDoctorModal();
      Swal.fire({
        icon: "success",
        title: "Updated successfully!",
        text: "Doctor updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating doctor:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update doctor",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const handleDoctorDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(`http://localhost:8082/doctors/delete/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          setDoctors(doctors.filter((d) => d.id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Doctor has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error deleting doctor:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to delete doctor",
            text: error.message,
            showConfirmButton: true,
          });
        }
      }
    });
  };

  const openAddPatientModal = () => {
    setEditPatient(null);
    setPatientFormData(initialPatientState);
    setIsPatientModalOpen(true);
  };
  const openUpdatePatientModal = (patient) => {
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
  const handleAddPatientSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in again.",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8083/patients/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: patientFormData.userId,
          firstname: patientFormData.firstname,
          lastname: patientFormData.lastname,
          email: patientFormData.email,
          phone: patientFormData.phone,
          dateOfBirth: patientFormData.dateOfBirth,
          address: patientFormData.address,
          gender: patientFormData.gender,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const newPatient = await response.json();
      setPatients([...patients, newPatient]);
      closePatientModal();
      Swal.fire({
        icon: "success",
        title: "Added successfully!",
        text: "Patient added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding patient:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add patient",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(`http://localhost:8083/patients/delete/${patientId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          setPatients(patients.filter((p) => p.patientId !== patientId));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Patient has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error deleting patient:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to delete patient",
            text: error.message,
            showConfirmButton: true,
          });
        }
      }
    });
  };

  const openAddAppointmentModal = () => {
    setEditAppointment(null);
    setAppointmentFormData(initialAppointmentState);
    setIsAppointmentModalOpen(true);
  };
  const openUpdateAppointmentModal = (appointment) => {
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
  const handleAddAppointmentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in again.",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8086/appoinments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientID: appointmentFormData.patientId,
          docname: appointmentFormData.doctorId,
          appoinment_Date: appointmentFormData.appoinment_Date,
          appoinment_Time: appointmentFormData.appoinment_Time,
          reason: appointmentFormData.reason,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const newAppointment = await response.json();
      setAppointments([...appointments, { ...newAppointment, AppoinmentID: newAppointment.appoinmentId }]);
      closeAppointmentModal();
      Swal.fire({
        icon: "success",
        title: "Added successfully!",
        text: "Appointment added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add appointment",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const handleUpdateAppointmentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in again.",
        showConfirmButton: true,
      });
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

    try {
      const response = await fetch(`http://localhost:8086/appoinments/update/${editAppointment.AppoinmentID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const updatedAppointment = { ...payload, AppoinmentID: editAppointment.AppoinmentID };
      setAppointments(appointments.map((a) => (a.AppoinmentID === updatedAppointment.AppoinmentID ? { ...a, ...updatedAppointment } : a)));
      closeAppointmentModal();
      Swal.fire({
        icon: "success",
        title: "Updated successfully!",
        text: "Appointment updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update appointment",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const handleAppointmentDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(`http://localhost:8086/appoinments/delete/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          setAppointments(appointments.filter((a) => a.AppoinmentID !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Appointment has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error deleting appointment:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to delete appointment",
            text: error.message,
            showConfirmButton: true,
          });
        }
      }
    });
  };

  const openMedicalRecordModal = (medicalRecord = null) => {
    setEditMedicalRecord(medicalRecord);
    setMedicalRecordFormData(medicalRecord || initialMedicalRecordState);
    setIsMedicalRecordModalOpen(true);
  };
  const closeMedicalRecordModal = () => {
    setIsMedicalRecordModalOpen(false);
    setEditMedicalRecord(null);
    setMedicalRecordFormData(initialMedicalRecordState);
  };
  const handleMedicalRecordChange = (e) => setMedicalRecordFormData({ ...medicalRecordFormData, [e.target.name]: e.target.value });
  const handleMedicalRecordSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = editMedicalRecord ? "PUT" : "POST";
    const url = editMedicalRecord
      ? `http://localhost:8081/medical-records/update/${editMedicalRecord.recordid}`
      : "http://localhost:8081/medical-records/add";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientID: medicalRecordFormData.patientId,
          doctor_Id: medicalRecordFormData.doctorId,
          disease: { name: medicalRecordFormData.diseasename },
          diagnosticData: medicalRecordFormData.diagnosticdata,
          treatments: medicalRecordFormData.treatments,
          reportUrl: medicalRecordFormData.reporturl,
          createdAt: medicalRecordFormData.createdAt,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      if (editMedicalRecord) {
        setMedicalRecords(medicalRecords.map((r) => (r.recordid === data.id ? { ...data, recordid: data.id } : r)));
      } else {
        setMedicalRecords([...medicalRecords, { ...data, recordid: data.id }]);
      }
      closeMedicalRecordModal();
      Swal.fire({
        icon: "success",
        title: `${editMedicalRecord ? "Updated" : "Added"} successfully!`,
        text: `Medical record ${editMedicalRecord ? "updated" : "added"} successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error saving medical record:", error);
      Swal.fire({
        icon: "error",
        title: `Failed to ${editMedicalRecord ? "update" : "add"} medical record`,
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const handleMedicalRecordDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(`http://localhost:8081/medical-records/delete/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          setMedicalRecords(medicalRecords.filter((r) => r.recordid !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Medical record has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error deleting medical record:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to delete medical record",
            text: error.message,
            showConfirmButton: true,
          });
        }
      }
    });
  };

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
        link.download = `Medical_Record_${recordId}_Report_${new Date().toISOString().split("T")[0]}.pdf`;
        link.click();
        URL.revokeObjectURL(urlObject);
      })
      .catch((error) => {
        console.error("Error downloading report:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to download report",
          text: "Please check the URL.",
          showConfirmButton: true,
        });
      });
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.blob();
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
        Swal.fire({
          icon: "success",
          title: "Report Generated",
          text: "All doctors report downloaded successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error generating report:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to generate report",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  const generateAllPatientsReport = () => {
    const url = "http://localhost:8087/reportsP/report/all";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.blob();
        throw new Error("Failed to generate report");
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "All_Patients_Report.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        Swal.fire({
          icon: "success",
          title: "Report Generated",
          text: "All patients report downloaded successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error generating report:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to generate report",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  const generateAllAppointmentsReport = () => {
    downloadReport(appointments, "All_Appointments_Report");
    Swal.fire({
      icon: "success",
      title: "Report Generated",
      text: "All appointments report downloaded successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const generateAllMedicalRecordsReport = () => {
    const url = "http://localhost:8087/reportsM/report/all";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.blob();
        throw new Error("Failed to generate report");
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "All_Medical_Records_Report.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        Swal.fire({
          icon: "success",
          title: "Report Generated",
          text: "All medical records report downloaded successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error generating report:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to generate report",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  const generateAllUsersReport = () => {
    downloadReport(users, "All_Users_Report");
    Swal.fire({
      icon: "success",
      title: "Report Generated",
      text: "All users report downloaded successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const generateAllDiseasesReport = () => {
    downloadReport(diseases, "All_Diseases_Report");
    Swal.fire({
      icon: "success",
      title: "Report Generated",
      text: "All diseases report downloaded successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const generateSpecificDoctorReport = () => {
    if (!doctorSearchId) {
      Swal.fire({
        icon: "warning",
        title: "Missing Input",
        text: "Please enter a Doctor ID",
        showConfirmButton: true,
      });
      return;
    }

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
        link.download = `Doctor_${doctorSearchId}_Report_${new Date().toISOString().split("T")[0]}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
        Swal.fire({
          icon: "success",
          title: "Report Generated",
          text: `Doctor ${doctorSearchId} report downloaded successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error fetching doctor report:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to generate report",
          text: "Doctor not found or server error.",
          showConfirmButton: true,
        });
      });
  };

  const generateSpecificPatientReport = () => {
    if (!patientSearchId) {
      Swal.fire({
        icon: "warning",
        title: "Missing Input",
        text: "Please enter a Patient ID",
        showConfirmButton: true,
      });
      return;
    }
    const patientRecords = medicalRecords.filter((r) => r.patientId === patientSearchId);
    if (patientRecords.length) {
      downloadReport(patientRecords, `Patient_${patientSearchId}_Medical_Records`);
      Swal.fire({
        icon: "success",
        title: "Report Generated",
        text: `Patient ${patientSearchId} report downloaded successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "No Records Found",
        text: "No records found for this patient",
        showConfirmButton: true,
      });
    }
  };

  const generateSpecificAppointmentReport = () => {
    if (!appointmentSearchId) {
      Swal.fire({
        icon: "warning",
        title: "Missing Input",
        text: "Please enter an Appointment ID",
        showConfirmButton: true,
      });
      return;
    }
    const appointment = appointments.find((a) => a.AppoinmentID === appointmentSearchId);
    if (appointment) {
      downloadReport(appointment, `Appointment_${appointmentSearchId}_Report`);
      Swal.fire({
        icon: "success",
        title: "Report Generated",
        text: `Appointment ${appointmentSearchId} report downloaded successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Not Found",
        text: "Appointment not found",
        showConfirmButton: true,
      });
    }
  };

  const generateSpecificMedicalRecordReport = () => {
    if (!medicalRecordSearchId) {
      Swal.fire({
        icon: "warning",
        title: "Missing Input",
        text: "Please enter a Medical Record ID",
        showConfirmButton: true,
      });
      return;
    }
    const record = medicalRecords.find((r) => r.recordid === medicalRecordSearchId);
    if (record) {
      downloadReport(record, `Medical_Record_${medicalRecordSearchId}_Report`);
      Swal.fire({
        icon: "success",
        title: "Report Generated",
        text: `Medical record ${medicalRecordSearchId} report downloaded successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Not Found",
        text: "Medical record not found",
        showConfirmButton: true,
      });
    }
  };

  const generateSpecificUserReport = () => {
    if (!userSearchId) {
      Swal.fire({
        icon: "warning",
        title: "Missing Input",
        text: "Please enter a User ID",
        showConfirmButton: true,
      });
      return;
    }
    const user = users.find((u) => u.userId.toString() === userSearchId);
    if (user) {
      downloadReport(user, `User_${userSearchId}_Report`);
      Swal.fire({
        icon: "success",
        title: "Report Generated",
        text: `User ${userSearchId} report downloaded successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Not Found",
        text: "User not found",
        showConfirmButton: true,
      });
    }
  };

  const generateSpecificDiseaseReport = () => {
    if (!diseaseSearchId) {
      Swal.fire({
        icon: "warning",
        title: "Missing Input",
        text: "Please enter a Disease ID",
        showConfirmButton: true,
      });
      return;
    }
    const disease = diseases.find((d) => d.id.toString() === diseaseSearchId);
    if (disease) {
      downloadReport(disease, `Disease_${diseaseSearchId}_Report`);
      Swal.fire({
        icon: "success",
        title: "Report Generated",
        text: `Disease ${diseaseSearchId} report downloaded successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Not Found",
        text: "Disease not found",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 font-sans">
      <motion.div
        className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 backdrop-blur-sm bg-opacity-80"
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={profileimg}
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-blue-200 shadow-sm transition-transform hover:scale-105"
                aria-label="User profile image"
              />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 tracking-tight">
                Welcome, {username}
              </h1>
              <p className="text-gray-500 text-sm mt-1 italic">
                Overseeing healthcare with care and precision
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-gray-500">Last login:</span>
            <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
          </div>
        </motion.div>

        {/* Menu Bar */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-3 flex flex-wrap gap-2 mb-8 border border-gray-100 backdrop-blur-sm bg-opacity-80"
          variants={itemVariants}
        >
          {[
            { name: "Dashboard", icon: FaTachometerAlt },
            { name: "Users", icon: FaUsers },
            { name: "Doctors", icon: FaUserMd },
            { name: "Patients", icon: FaProcedures },
            { name: "Appointments", icon: FaCalendarCheck },
            { name: "Medical Records", icon: FaFileMedical },
            { name: "Diseases", icon: FaVirus },
            { name: "Reports", icon: FaChartBar },
            { name: "Logout", icon: FaSignOutAlt },
          ].map((section) => (
            <motion.button
              key={section.name}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === section.name
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              } flex items-center gap-2`}
              onClick={() => (section.name === "Logout" ? handleLogout() : setActiveSection(section.name))}
              aria-label={`Navigate to ${section.name}`}
            >
              <section.icon className="text-base" />
              <span className="hidden sm:inline">{section.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content Sections */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 backdrop-blur-sm bg-opacity-80"
        >
          {activeSection === "Dashboard" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Overview</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Today:</span>
                  <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: FaProcedures,
                    title: "Patients",
                    count: patients.length,
                    color: "blue",
                    trend: "up",
                  },
                  {
                    icon: FaUserMd,
                    title: "Doctors",
                    count: doctors.length,
                    color: "teal",
                    trend: "up",
                  },
                  {
                    icon: FaCalendarCheck,
                    title: "Appointments",
                    count: appointments.length,
                    color: "indigo",
                    trend: "down",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-center justify-between bg-gradient-to-br from-${item.color}-50 to-white`}
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full bg-${item.color}-100 text-${item.color}-600`}>
                        <item.icon className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-700">{item.title}</h3>
                        <p className={`text-2xl font-bold text-${item.color}-600`}>{item.count}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-medium ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {item.trend === "up" ? "↑ 12%" : "↓ 5%"}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">vs last week</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Appointments</h3>
                  <div className="space-y-4">
                    {appointments.slice(0, 3).map((appt, index) => {
                      const patient = patients.find((p) => p.patientId === appt.patientId);
                      const doctor = doctors.find((d) => d.id === appt.doctorId);
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <FaCalendarAlt className="text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {patient ? `${patient.firstname} ${patient.lastname}` : appt.patientId || "N/A"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {doctor ? `${doctor.firstname} ${doctor.lastname}` : appt.doctorId || "N/A"} • {appt.appoinment_Time}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              appt.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : appt.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {appt.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">System Health</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Storage", value: 65, color: "blue" },
                      { label: "Memory", value: 42, color: "teal" },
                      { label: "Active Users", value: 60, color: "indigo" },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                          <span className="text-sm font-medium text-gray-500">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-${item.color}-600 h-2 rounded-full`}
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

         {activeSection === "Users" && (
  <motion.div
    className="space-y-6 bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 backdrop-blur-sm bg-opacity-80"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.div className="flex justify-between items-center" variants={itemVariants}>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight">
        Users
      </h2>
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
        onClick={() => openUserModal()}
        aria-label="Add new user"
      >
        <FaPlus /> Add User
      </motion.button>
    </motion.div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full max-w-xs">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by User ID"
          value={userSearchId}
          onChange={(e) => debouncedSetUserSearchId(e.target.value)}
          className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700 bg-white shadow-sm"
          aria-label="Search users by ID"
        />
      </div>
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
        onClick={generateSpecificUserReport}
        aria-label="Generate user report"
      >
        <FaFileDownload /> Generate Report
      </motion.button>
    </div>
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto border border-gray-100 backdrop-blur-sm bg-opacity-80">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="p-4 font-semibold text-gray-600">User ID</th>
            <th className="p-4 font-semibold text-gray-600">Username</th>
            <th className="p-4 font-semibold text-gray-600">Email</th>
            <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">Role</th>
            <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">Created Date</th>
            <th className="p-4 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((u) => !userSearchId || u.userId.toString().includes(userSearchId))
            .map((user) => (
              <tr
                key={user.userId}
                className="border-t hover:bg-blue-50 transition-all duration-200"
              >
                <td className="p-4 text-gray-700">{user.userId}</td>
                <td className="p-4 text-gray-700">{user.username}</td>
                <td className="p-4 text-gray-700">{user.email}</td>
                <td className="p-4 hidden md:table-cell text-gray-700">{user.role || "N/A"}</td>
                <td className="p-4 hidden md:table-cell text-gray-700">{user.createdDate || "N/A"}</td>
                <td className="p-4 space-x-3">
                  <button
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    onClick={() => openUserModal(user)}
                    title="Edit user"
                    aria-label={`Edit user ${user.username}`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 transition-colors"
                    onClick={() => handleUserDelete(user.userId)}
                    title="Delete user"
                    aria-label={`Delete user ${user.username}`}
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
                className="fixed inset-0 bg-white/20 flex items-center justify-center z-50 p-4" // Reduced blur, softer overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-xl border border-gray-200"
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                >

                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                      {editUser ? "Edit User" : "Add User"}
                    </h3>
                    <form onSubmit={editUser ? handleUpdateUserSubmit : handleAddUserSubmit} className="space-y-5">
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={userFormData.username}
                          onChange={handleUserChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700 bg-white shadow-sm"
                          required
                          aria-label="Username"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={userFormData.email}
                          onChange={handleUserChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700 bg-white shadow-sm"
                          required
                          aria-label="Email"
                        />
                      </div>
                      {!editUser && (
                        <div>
                          <label className="block text-gray-600 text-sm font-medium mb-1.5">Password</label>
                          <input
                            type="password"
                            name="password"
                            value={userFormData.password}
                            onChange={handleUserChange}
                            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700 bg-white shadow-sm"
                            required
                            aria-label="Password"
                          />
                        </div>
                      )}
                      <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1.5">Role</label>
                        <select
                          name="role"
                          value={userFormData.role}
                          onChange={handleUserChange}
                          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-700 bg-white shadow-sm"
                          required
                          aria-label="Role"
                        >
                          <option value="">Select Role</option>
                          <option value="PATIENT">Patient</option>
                          <option value="DOCTOR">Doctor</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-3 pt-4 border-t">
                        <motion.button
                          type="submit"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-sm"
                          aria-label={editUser ? "Update user" : "Add user"}
                        >
                          {editUser ? "Update" : "Add"}
                        </motion.button>
                        <motion.button
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all text-sm font-medium shadow-sm"
                          onClick={closeUserModal}
                          aria-label="Cancel"
                        >
                          Cancel
                        </motion.button>
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
                className="fixed inset-0 bg-white/20 flex items-center justify-center z-50 p-4" // Reduced blur, softer overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-xl border border-gray-200"
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
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
                className="fixed inset-0 bg-white/20 flex items-center justify-center z-50 p-4" // Reduced blur, softer overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-xl border border-gray-200"
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
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
                className="fixed inset-0 bg-white/20 flex items-center justify-center z-50 p-4" // Reduced blur, softer overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-xl border border-gray-200"
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
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
        className="fixed inset-0 bg-white/20 flex items-center justify-center z-50 p-4" // Reduced blur, softer overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-xl border border-gray-200"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
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
      className="fixed inset-0 bg-white/20 flex items-center justify-center z-50 p-4" // Reduced blur, softer overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-xl border border-gray-200"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
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



