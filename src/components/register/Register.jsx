// import React, { useState } from "react";

// export default function Register() {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//     role: "PATIENT",
//   });

//   const [passwordMatch, setPasswordMatch] = useState(true);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });

//     if (name === "confirmPassword") {
//       setPasswordMatch(value === form.password);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!passwordMatch) return alert("Passwords do not match!");
  
//     const userData = {
//       username: form.username,
//       password: form.password,
//       role: form.role,
//     };
  
//     try {
//       const response = await fetch("http://localhost:8080/users/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });
  
//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         data = { message: text };
//       }
  
//       if (response.ok) {
//         alert("Registration Successful!");
//         console.log("Success:", data);
//       } else {
//         console.error("Error response:", data);
//         alert(`Registration failed: ${data.error || data.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };
  
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-3xl font-bold text-center text-primary mb-6">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               required
//               className={`w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm ${
//                 !passwordMatch ? "border-red-500" : ""
//               }`}
//             />
//             {!passwordMatch && (
//               <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium">Role</label>
//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm"
//             >
//               <option value="PATIENT">Patient</option>
//               <option value="DOCTOR">Doctor</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition duration-200 font-semibold"
//           >
//             Register
//           </button>
//         </form>
//         <p className="text-gray-600 text-center mt-4">
//           Already have an account?{" "}
//           <a href="#" className="text-primary font-medium hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// export default function Register() {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//     role: "PATIENT",
//   });

//   const [passwordMatch, setPasswordMatch] = useState(true);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });

//     if (name === "confirmPassword") {
//       setPasswordMatch(value === form.password);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!passwordMatch) return alert("Passwords do not match!");
  
//     const userData = {
//       username: form.username,
//       password: form.password,
//       role: form.role,
//     };
  
//     try {
//       // Step 1: Register the user
//       const registerResponse = await fetch("http://localhost:8080/users/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });
  
//       const registerText = await registerResponse.text();
//       let registerData;
//       try {
//         registerData = JSON.parse(registerText);
//       } catch {
//         registerData = { message: registerText };
//       }
  
//       if (registerResponse.ok) {
//         alert("User Registration Successful!");
//         console.log("Register Success:", registerData);

//         // Step 2: Fetch user ID by username using your existing endpoint
//         const fetchUserResponse = await fetch(`http://localhost:8080/users/byUsername/${form.username}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (fetchUserResponse.ok) {
//           const fetchUserData = await fetchUserResponse.json(); // Directly parse JSON since endpoint returns JSON
//           const userId = fetchUserData.userId; // Matches your UserDTO structure
//           console.log("Fetched User Data:", fetchUserData);

//           if (userId && form.role === "PATIENT") {
//             navigate('/patient-register', { state: { userId } });
//           } else {
//             navigate('/'); // Redirect to home if not a patient or no userId
//           }
//         } else {
//           console.error("Error fetching user:", fetchUserResponse.statusText);
//           alert("Failed to fetch user ID. Redirecting to home.");
//           navigate('/'); // Fallback to home
//         }
//       } else {
//         console.error("Register Error:", registerData);
//         alert(`Registration failed: ${registerData.error || registerData.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Error during registration process:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };
  
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-3xl font-bold text-center text-primary mb-6">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               required
//               className={`w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm ${
//                 !passwordMatch ? "border-red-500" : ""
//               }`}
//             />
//             {!passwordMatch && (
//               <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium">Role</label>
//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm"
//             >
//               <option value="PATIENT">Patient</option>
//               <option value="DOCTOR">Doctor</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition duration-200 font-semibold"
//           >
//             Register
//           </button>
//         </form>
//         <p className="text-gray-600 text-center mt-4">
//           Already have an account?{" "}
//           <a href="#" className="text-primary font-medium hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }



//correct code 

// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// export default function Register() {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//     role: "PATIENT",
//   });

//   const [passwordMatch, setPasswordMatch] = useState(true);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });

//     if (name === "confirmPassword") {
//       setPasswordMatch(value === form.password);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!passwordMatch) return alert("Passwords do not match!");
  
//     const userData = {
//       username: form.username,
//       password: form.password,
//       role: form.role,
//     };
  
//     try {
//       // Step 1: Register the user
//       const registerResponse = await fetch("http://localhost:8080/users/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });
  
//       const registerText = await registerResponse.text();
//       let registerData;
//       try {
//         registerData = JSON.parse(registerText);
//       } catch {
//         registerData = { message: registerText };
//       }
  
//       if (registerResponse.ok) {
//         alert("User Registration Successful!");
//         console.log("Register Success:", registerData);

//         // Step 2: Fetch user ID by username
//         const fetchUserResponse = await fetch(`http://localhost:8080/users/byUsername/${form.username}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (fetchUserResponse.ok) {
//           const fetchUserData = await fetchUserResponse.json();
//           const userId = fetchUserData.id;
//           console.log("Fetched User Data:", fetchUserData);
//           console.log("userId:", userId);
//           console.log("form.role:", form.role);

//           if (userId && form.role === "PATIENT") {
//             console.log("Navigating to /patient-register with userId:", userId);
//             navigate('/patient-register', { state: { userId } });
//           } else {
//             console.log("Condition failed: Redirecting to /");
//             console.log("userId exists:", !!userId, "role is PATIENT:", form.role === "PATIENT");
//             navigate('/');
//           }
//         } else {
//           console.error("Error fetching user:", fetchUserResponse.statusText);
//           alert("Failed to fetch user ID. Redirecting to home.");
//           navigate('/');
//         }
//       } else {
//         console.error("Register Error:", registerData);
//         alert(`Registration failed: ${registerData.error || registerData.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Error during registration process:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };
  
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-3xl font-bold text-center text-primary mb-6">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               required
//               className={`w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm ${
//                 !passwordMatch ? "border-red-500" : ""
//               }`}
//             />
//             {!passwordMatch && (
//               <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium">Role</label>
//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary shadow-sm"
//             >
//               <option value="PATIENT">Patient</option>
//               <option value="DOCTOR">Doctor</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition duration-200 font-semibold"
//           >
//             Register
//           </button>
//         </form>
//         <p className="text-gray-600 text-center mt-4">
//           Already have an account?{" "}
//           <a href="#" className="text-primary font-medium hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Added for animations
import Swal from "sweetalert2";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "PATIENT",
    email:"",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "confirmPassword") {
      setPasswordMatch(value === form.password);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch) return alert("Passwords do not match!");

    const userData = {
      username: form.username,
      password: form.password,
      role: form.role,
      email: form.email,
    };

    try {
      const registerResponse = await fetch("http://localhost:8080/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const registerText = await registerResponse.text();
      let registerData;
      try {
        registerData = JSON.parse(registerText);
      } catch {
        registerData = { message: registerText };
      }

      if (registerResponse.ok) {
       Swal.fire({
                 icon: "success",
                 title: "Patient Registration Successful!",
                 text: "You have been successfully registered.",
                 showConfirmButton: false,
                 timer: 1500,
                 background: "#f0f9ff", // Light blue background
                 iconColor: "#2563eb", // Blue icon
               });
        console.log("Register Success:", registerData);

        const fetchUserResponse = await fetch(`http://localhost:8080/users/byUsername/${form.username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (fetchUserResponse.ok) {
          const fetchUserData = await fetchUserResponse.json();
          const userId = fetchUserData.id;
          console.log("Fetched User Data:", fetchUserData);
          console.log("userId:", userId);
          console.log("form.role:", form.role);
          console.log("form.email:",form.email);

          if (userId && form.role === "PATIENT") {
            console.log("Navigating to /patient-register with userId:", userId);
            navigate("/patient-register", { state: { userId } });
          } else {
            console.log("Condition failed: Redirecting to /");
            console.log("userId exists:", !!userId, "role is PATIENT:", form.role === "PATIENT");
            navigate("/");
          }
        } else {
          console.error("Error fetching user:", fetchUserResponse.statusText);
          Swal.fire({
                    icon: "error",
                    title: "Registration Failed Failed to fetch user id",
                    text: data.error || data.message,
                    showConfirmButton: true,
                    confirmButtonColor: "#2563eb",
                    background: "#f0f9ff",
                    iconColor: "#dc2626",
                  });
          navigate("/");
        }
      } else {
        console.error("Register Error:", registerData);
        Swal.fire({
          icon: "error",
          title: "Registration Failed Failed to fetch user id",
          text: data.error || data.message,
          showConfirmButton: true,
          confirmButtonColor: "#2563eb",
          background: "#f0f9ff",
          iconColor: "#dc2626",
        });
      }
    } catch (error) {
      console.error("Error during registration process:", error);
      Swal.fire({
              icon: "error",
              title: "Error",
              text: "An error occurred. Please try again later.",
              showConfirmButton: true,
              confirmButtonColor: "#2563eb",
              background: "#f0f9ff",
              iconColor: "#dc2626",
            });
    }
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for form fields
  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-blue-900 opacity-50 h-[103vh]"></div>

      <motion.div
        className="relative bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-md w-full z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
              placeholder="Enter your username"
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
              placeholder="Enter your password"
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ${
                !passwordMatch ? "border-red-500" : ""
              }`}
              placeholder="Confirm your password"
            />
            {!passwordMatch && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
            >
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
            </select>
          </motion.div>


          <motion.div variants={fieldVariants}>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
              placeholder="Enter your Email"
            />
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={fieldVariants}
          >
            Register
          </motion.button>
        </form>

        <p className="text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}