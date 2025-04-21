// import React from 'react';
// import './index.css';
// import Navbar from './components/navbar/Navbar';
// import Register from './components/register/Register';
// import Home from './components/home/Home';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { main } from 'framer-motion/client';
// import PatientRegister from './components/patient_reg/PatientRegister';
// import About from './components/about/About';
// import Contact from './components/contact/Contact';
// import Login from './components/login/Login';
// import Profile from './components/profile/Profile';
// import BookAppointment from './components/bookappoinment/BookAppointment';
// import AdminPanel from './components/admin/AdminPanel';
// import { AuthProvider } from './context/AuthContext';


// export default function App() {
//   return (
//     // <BrowserRouter>
//     //   <main>
//     //     <Routes>
//     //       <Route
//     //         path="/"
//     //         element={
//     //           <>
//     //             <Navbar />
//     //             <Home />
//     //           </>
//     //         }
//     //       />
//     //       <Route path="/register" element={<Register />} />
//     //     </Routes>
        
//     //   </main>
//     // </BrowserRouter>
//     // <main>
//     //   {/* <Register/> */}
//     //   <PatientRegister/>
//     // </main>
//     <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen"> {/* Set global background color */}
    
// <BrowserRouter>
//       <main>
//         <Routes>
//           <Route path="/" element={<><Navbar /><Home /></>} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/patient-register" element={<PatientRegister />} />
//           <Route path="/about" element={<><Navbar /><About /></>} />
//           <Route path="/contact" element={<><Navbar /><Contact /></>} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/book-appointment" element={<BookAppointment />} />
//           <Route path="/admin" element={<AdminPanel />} />
//         </Routes>
//       </main>
//     </BrowserRouter>
    
//     </div>
//   );
// }




// import React from "react";
// import "./index.css";
// import Navbar from "./components/navbar/Navbar";
// import Register from "./components/register/Register";
// import Home from "./components/home/Home";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PatientRegister from "./components/patient_reg/PatientRegister";
// import About from "./components/about/About";
// import Contact from "./components/contact/Contact";
// import Login from "./components/login/Login";
// import Profile from "./components/profile/Profile";
// import BookAppointment from "./components/bookappoinment/BookAppointment";
// import AdminPanel from "./components/admin/AdminPanel";
// import { AuthProvider } from "./context/AuthContext";
// import ResetPassword from "./components/ResetPassowrd/ResetPassword";
// import 'aos/dist/aos.css';

// export default function App() {
//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
//       <AuthProvider>
//         <BrowserRouter>
//           <main>
//             <Routes>
//               <Route path="/" element={<><Navbar /><Home /></>} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/patient-register" element={<PatientRegister />} />
//               <Route path="/about" element={<><Navbar /><About /></>} />
//               <Route path="/contact" element={<><Navbar /><Contact /></>} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/book-appointment" element={<BookAppointment />} />
//               <Route path="/admin" element={<AdminPanel />} />
//               <Route path="/reset-password" element={<ResetPassword/>} />
//             </Routes>
//           </main>
//         </BrowserRouter>
//       </AuthProvider>
//     </div>
//   );
// }

import React from "react";
import "./index.css";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PatientRegister from "./components/patient_reg/PatientRegister";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import BookAppointment from "./components/bookappoinment/BookAppointment";
import AdminPanel from "./components/admin/AdminPanel";
import { AuthProvider } from "./context/AuthContext";
import ResetPassword from "./components/ResetPassowrd/ResetPassword";
import 'aos/dist/aos.css';
import ChatbotComponent from "./components/chatbot/ChatbotComponent";

// A wrapper component to conditionally render the Chatbot based on the current route
const ChatbotWrapper = () => {
  const location = useLocation();
  // Define routes where the chatbot should NOT appear
  const excludeChatbotRoutes = ["/login", "/register", "/patient-register", "/admin", "/reset-password"];

  return !excludeChatbotRoutes.includes(location.pathname) ? <ChatbotComponent /> : null;
};

export default function App() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <AuthProvider>
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<><Navbar /><Home /></>} />
              <Route path="/register" element={<Register />} />
              <Route path="/patient-register" element={<PatientRegister />} />
              <Route path="/about" element={<><Navbar /><About /></>} />
              <Route path="/contact" element={<><Navbar /><Contact /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
            {/* Add the ChatbotWrapper to conditionally render the chatbot */}
            <ChatbotWrapper />
          </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}