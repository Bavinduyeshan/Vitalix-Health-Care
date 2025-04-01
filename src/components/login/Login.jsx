



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";


// export default function Login() {
  
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//   });

//   const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const loginData = {
//       username: form.username,
//       password: form.password,
//     };

//     try {
//       const response = await fetch("http://localhost:8080/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginData),
//       });

//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         data = { message: text };
//       }

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Login Successful!",
//           text: "You have been logged in successfully.",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         console.log("Login Success:", data);

//         const token = data.token;
//         localStorage.setItem("token", token);

//         const fetchUserResponse = await fetch(`http://localhost:8080/users/byUsername/${form.username}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         if (fetchUserResponse.ok) {
//           const userData = await fetchUserResponse.json();
//           const userId = userData.id;
//           const userRole = userData.role; // Assuming 'role' is returned (e.g., "admin", "user")
//           console.log("Fetched User Data:", userData);

//           // Store user role in localStorage
//           localStorage.setItem("userRole", userRole);

//           // Redirect based on role
//           if (userRole === "ADMIN") {
//             navigate("/admin"); // Redirect to admin panel if admin
//           } else {
//             navigate("/", { state: { userId } }); // Regular user to profile
//           }
//         } else {
//           console.error("Error fetching user:", fetchUserResponse.statusText);
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "Failed to fetch user data. Redirecting to home.",
//             showConfirmButton: true,
//           });
//           navigate("/");
//         }
//       } else {
//         console.error("Login Error:", data);
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: data.error || data.message || "Invalid credentials",
//           showConfirmButton: true,
//         });
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "An error occurred. Please try again later.",
//         showConfirmButton: true,
//       });
//     }
//   };

//   const handleForgotPasswordSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/users/forgot-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: forgotPasswordEmail }),
//       });

//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         data = { message: text };
//       }

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Password Reset Request Sent!",
//           text: "A password reset link has been sent to your email.",
//           showConfirmButton: true,
//         });
//         setShowForgotPasswordModal(false);
//         setForgotPasswordEmail("");
//       } else {
//         console.error("Forgot Password Error:", data);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: data.error || data.message || "Failed to send password reset request.",
//           showConfirmButton: true,
//         });
//       }
//     } catch (error) {
//       console.error("Error during forgot password request:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "An error occurred. Please try again later.",
//         showConfirmButton: true,
//       });
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
//   };

//   const fieldVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
//   };

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen"
//       style={{
//         backgroundImage: `url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       <div className="absolute inset-0 bg-blue-900 opacity-50"></div>

//       <motion.div
//         className="relative bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-md w-full z-10"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
//           Login
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <motion.div variants={fieldVariants}>
//             <label className="block text-gray-700 font-medium">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               required
//               className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
//               placeholder="Enter your username"
//             />
//           </motion.div>

//           <motion.div variants={fieldVariants}>
//             <label className="block text-gray-700 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
//               placeholder="Enter your password"
//             />
//           </motion.div>

//           <motion.div variants={fieldVariants}>
//             <p className="text-right">
//               <button
//                 type="button"
//                 onClick={() => setShowForgotPasswordModal(true)}
//                 className="text-blue-600 font-medium hover:underline"
//               >
//                 Forgot Password?
//               </button>
//             </p>
//           </motion.div>

//           <motion.button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             variants={fieldVariants}
//           >
//             Login
//           </motion.button>
//         </form>

//         <p className="text-gray-600 text-center mt-6">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-blue-600 font-medium hover:underline">
//             Register
//           </a>
//         </p>
//       </motion.div>

//       {showForgotPasswordModal && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
//           <motion.div
//             className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h3 className="text-2xl font-bold text-center text-blue-800 mb-4">
//               Forgot Password
//             </h3>
//             <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-medium">Email</label>
//                 <input
//                   type="email"
//                   value={forgotPasswordEmail}
//                   onChange={(e) => setForgotPasswordEmail(e.target.value)}
//                   required
//                   className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
//                   placeholder="Enter your email"
//                 />
//               </div>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPasswordModal(false)}
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }

//correct above 2





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";


export default function Login() {
  
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const loginData = {
      username: form.username,
      password: form.password,
    };
  
    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
  
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
  
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You have been logged in successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Login Success:", data);
  
        const token = data.token;
        localStorage.setItem("token", token);
  
        const fetchUserResponse = await fetch(`http://localhost:8080/users/byUsername/${form.username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (fetchUserResponse.ok) {
          const userData = await fetchUserResponse.json();
          console.log("Fetched User Data:", userData); // Debug log
          const userId = userData.id;
          const userRole = userData.role || "USER"; // Default to "USER" if role is missing
          const username = `${userData.username } `; // Fallback values
          localStorage.setItem("userId", userId);
          localStorage.setItem("username", username);
          localStorage.setItem("userRole", userRole);
          console.log("Stored in localStorage:", { userId, username, userRole }); // Confirm storage
          

          // Redirect based on role
          if (userRole === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/", { state: { userId } });
          }
         
        } else {
          console.error("Error fetching user:", fetchUserResponse.statusText);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch user data. Redirecting to home.",
            showConfirmButton: true,
          });
          navigate("/");
        }
      } else {
        console.error("Login Error:", data);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error || data.message || "Invalid credentials",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
        showConfirmButton: true,
      });
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Password Reset Request Sent!",
          text: "A password reset link has been sent to your email.",
          showConfirmButton: true,
        });
        setShowForgotPasswordModal(false);
        setForgotPasswordEmail("");
      } else {
        console.error("Forgot Password Error:", data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || data.message || "Failed to send password reset request.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error during forgot password request:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
        showConfirmButton: true,
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
      <div className="absolute inset-0 bg-blue-900 opacity-50"></div>

      <motion.div
        className="relative bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-md w-full z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          Login
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
            <p className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(true)}
                className="text-blue-600 font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </p>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={fieldVariants}
          >
            Login
          </motion.button>
        </form>

        <p className="text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </a>
        </p>
      </motion.div>

      {showForgotPasswordModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-center text-blue-800 mb-4">
              Forgot Password
            </h3>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  required
                  className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

//correct above 2

