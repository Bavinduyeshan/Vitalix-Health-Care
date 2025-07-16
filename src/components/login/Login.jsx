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
//         headers: { "Content-Type": "application/json" },
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

//         const token = data.token;
//         localStorage.setItem("token", token);

//         const fetchUserResponse = await fetch(
//           `http://localhost:8080/users/byUsername/${form.username}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (fetchUserResponse.ok) {
//           const userData = await fetchUserResponse.json();
//           const userId = userData.id;
//           const username = userData.username;
//           const userRole = userData.role || "USER";

//           localStorage.setItem("userId", userId);
//           localStorage.setItem("username", username);
//           localStorage.setItem("userRole", userRole);

//           if (userRole === "ADMIN") {
//             navigate("/admin");
//           } else {
//             navigate("/", { state: { userId } });
//           }
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "Failed to fetch user data. Redirecting to home.",
//             showConfirmButton: true,
//           });
//           navigate("/");
//         }
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: data.error || data.message || "Invalid credentials",
//           showConfirmButton: true,
//         });
//       }
//     } catch (error) {
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
//         headers: { "Content-Type": "application/json" },
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
//           title: "Reset Link Sent",
//           text: "A password reset link has been sent to your email.",
//           showConfirmButton: true,
//         });
//         setShowForgotPasswordModal(false);
//         setForgotPasswordEmail("");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: data.error || data.message || "Failed to send reset request.",
//           showConfirmButton: true,
//         });
//       }
//     } catch (error) {
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
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
//     },
//   };

//   const fieldVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-white flex items-center justify-center p-4 md:p-8">
//       <motion.div
//         className="max-w-5xl w-full bg-gradient-to-r from-white to-blue-50 rounded-3xl shadow-2xl grid md:grid-cols-2 gap-8 relative overflow-hidden"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Left Side: Illustration */}
//         <div className="hidden md:flex items-center justify-center p-8">
//           <motion.div className="bg-white rounded-full p-6 shadow-lg" variants={fieldVariants}>
//             <img
//               src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//               alt="Patient illustration"
//               className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full"
//             />
//           </motion.div>
//         </div>
//         {/* Right Side: Login Form */}
//         <div className="p-10 md:p-12 relative">
//           {/* Top Wave Shape 1 */}
//           <svg
//             className="absolute top-0 left-0 w-full h-40 md:h-56 text-blue-200"
//             viewBox="0 0 1440 320"
//             preserveAspectRatio="none"
//           >
//             <path
//               fill="currentColor"
//               d="M0,160 C360,80 720,240 1080,160 C1320,80 1440,160 1440,160 L1440,0 L0,0 Z"
//             />
//           </svg>
//           {/* Top Wave Shape 2 */}
//           <svg
//             className="absolute top-0 left-0 w-full h-40 md:h-56 text-teal-100 opacity-70"
//             viewBox="0 0 1440 320"
//             preserveAspectRatio="none"
//           >
//             <path
//               fill="currentColor"
//               d="M0,200 C400,100 800,300 1200,200 C1400,100 1440,200 1440,200 L1440,0 L0,0 Z"
//             />
//           </svg>
//           {/* Form Content */}
//           <div className="relative z-10">
//             <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">
//               Patient Login
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-600 mb-8 text-center font-medium">
//               Access your healthcare portal
//             </p>
//             <form onSubmit={handleSubmit} className="space-y-8">
//               <motion.div variants={fieldVariants}>
//                 <label htmlFor="username" className="block text-base font-semibold text-gray-700 mb-3">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={form.username}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter your username"
//                   className="w-full p-5 text-lg text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 shadow-sm hover:shadow-md"
//                   aria-label="Username"
//                 />
//               </motion.div>
//               <motion.div variants={fieldVariants}>
//                 <label htmlFor="password" className="block text-base font-semibold text-gray-700 mb-3">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter your password"
//                   className="w-full p-5 text-lg text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 shadow-sm hover:shadow-md"
//                   aria-label="Password"
//                 />
//               </motion.div>
//               <motion.div variants={fieldVariants} className="text-right">
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPasswordModal(true)}
//                   className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
//                 >
//                   Forgot Password?
//                 </button>
//               </motion.div>
//               <motion.button
//                 type="submit"
//                 className="w-full bg-blue-700 text-white font-bold text-xl py-5 px-8 rounded-xl hover:bg-blue-800 hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 variants={fieldVariants}
//                 aria-label="Login to patient portal"
//               >
//                 Login
//               </motion.button>
//             </form>
//             <p className="text-gray-600 text-center mt-6 text-base font-medium">
//               Don’t have an account?{" "}
//               <a
//                 href="/register"
//                 className="text-blue-600 font-semibold hover:underline hover:text-blue-800"
//               >
//                 Register
//               </a>
//             </p>
//           </div>
//           {/* Bottom Wave Shape 1 */}
//           <svg
//             className="absolute bottom-0 left-0 w-full h-40 md:h-56 text-blue-100"
//             viewBox="0 0 1440 320"
//             preserveAspectRatio="none"
//           >
//             <path
//               fill="currentColor"
//               d="M0,160 C320,300 720,100 1440,260 L1440,320 L0,320 Z"
//             />
//           </svg>
//           {/* Bottom Wave Shape 2 */}
//           <svg
//             className="absolute bottom-0 left-0 w-full h-40 md:h-56 text-teal-200 opacity-60"
//             viewBox="0 0 1440 320"
//             preserveAspectRatio="none"
//           >
//             <path
//               fill="currentColor"
//               d="M0,200 C400,250 800,100 1200,200 C1400,300 1440,200 1440,200 L1440,320 L0,320 Z"
//             />
//           </svg>
//         </div>
//       </motion.div>

//       {/* Forgot Password Modal */}
//       {showForgotPasswordModal && (
//         <motion.div
//           className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <motion.div
//             className="max-w-sm w-full bg-gradient-to-r from-white to-blue-50 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//           >
//             {/* Modal Wave Shape */}
//             <svg
//               className="absolute top-0 left-0 w-full h-24 text-blue-200"
//               viewBox="0 0 1440 320"
//               preserveAspectRatio="none"
//             >
//               <path
//                 fill="currentColor"
//                 d="M0,160 C360,80 720,240 1080,160 C1320,80 1440,160 1440,160 L1440,0 L0,0 Z"
//               />
//             </svg>
//             <h3 className="text-3xl font-bold text-center text-gray-900 mb-6 relative z-10">
//               Forgot Password
//             </h3>
//             <form onSubmit={handleForgotPasswordSubmit} className="space-y-6 relative z-10">
//               <div>
//                 <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-3">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={forgotPasswordEmail}
//                   onChange={(e) => setForgotPasswordEmail(e.target.value)}
//                   required
//                   placeholder="Enter your email"
//                   className="w-full p-5 text-lg text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 shadow-sm hover:shadow-md"
//                   aria-label="Email for password reset"
//                 />
//               </div>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPasswordModal(false)}
//                   className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition duration-200 shadow-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition duration-200 shadow-sm hover:shadow-md"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//             {/* Modal Bottom Wave */}
//             <svg
//               className="absolute bottom-0 left-0 w-full h-24 text-teal-200 opacity-60"
//               viewBox="0 0 1440 320"
//               preserveAspectRatio="none"
//             >
//               <path
//                 fill="currentColor"
//                 d="M0,200 C400,300 800,100 1200,200 C1400,300 1440,200 1440,200 L1440,320 L0,320 Z"
//               />
//             </svg>
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
        await Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You have been logged in successfully.",
          showConfirmButton: false,
          timer: 1500,
        });

        const token = data.token;
        localStorage.setItem("token", token);

        const fetchUserResponse = await fetch(
          `http://localhost:8080/users/byUsername/${form.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (fetchUserResponse.ok) {
          const userData = await fetchUserResponse.json();
          const userId = userData.id;
          const username = userData.username;
          const userRole = userData.role || "USER";

          localStorage.setItem("userId", userId);
          localStorage.setItem("username", username);
          localStorage.setItem("userRole", userRole);

          if (userRole === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/", { state: { userId } });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch user data. Redirecting to home.",
            showConfirmButton: true,
          });
          navigate("/");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error || data.message || "Invalid credentials",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
        showConfirmButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        await Swal.fire({
          icon: "success",
          title: "Reset Link Sent",
          text: "A password reset link has been sent to your email.",
          showConfirmButton: true,
        });
        setShowForgotPasswordModal(false);
        setForgotPasswordEmail("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || data.message || "Failed to send reset request.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
        showConfirmButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
// ✅ Animation variants (Fixed easing issue)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99], // ✅ fixed here
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99] // ✅ fixed here
    }
  }
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
  tap: { scale: 0.98 }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Side - Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-600 to-teal-500 p-8 relative overflow-hidden">
          {/* Floating circles */}
          <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-white/10 blur-xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-white/15 blur-xl animate-float-medium" />
          
          <motion.div 
            className="relative z-10 text-center"
            variants={itemVariants}
          >
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Healthcare illustration"
              className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg mx-auto mb-8"
            />
            <h2 className="text-3xl font-bold text-white mb-4">Welcome Back!</h2>
            <p className="text-blue-100 text-lg max-w-md mx-auto">
              Access your personalized healthcare portal to manage appointments, records, and more.
            </p>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 md:p-12 relative">
          {/* Close button for mobile */}
          <button 
            className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/")}
          >
            <MdClose className="text-2xl" />
          </button>

          <motion.div 
            className="max-w-md mx-auto"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUser className="text-blue-600 text-2xl" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Patient Login</h1>
              <p className="text-gray-500 text-center mb-8">
                Sign in to access your healthcare dashboard
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    placeholder="Username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                  Forgot password?
                </button>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <span className="mr-2">Signing in...</span>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                  Register here
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPasswordModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForgotPasswordModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowForgotPasswordModal(false)}
              >
                <MdClose className="text-2xl" />
              </button>

              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <FaEnvelope className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Reset Password</h3>
                <p className="text-gray-500 mt-2">
                  Enter your email to receive a password reset link
                </p>
              </div>

              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                    placeholder="Email address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition duration-300"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Link"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}