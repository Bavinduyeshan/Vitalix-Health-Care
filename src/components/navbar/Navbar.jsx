
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavbarMenu } from "../mockdata/data";
import { Menu, X } from "lucide-react";
import profileimg from "../../assets/profileimg.jpg";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Track admin role
  const navigate = useNavigate();

  // Check login status and role on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    setIsLoggedIn(!!token);
    setIsAdmin(userRole === "admin"); // Set to true if role is "admin"
  }, []);

  const handleRegisterClick = () => navigate("/register");
  const handleLoginClick = () => navigate("/login");
  const handleProfileClick = () => navigate("/profile");
  const handleAdminPanelClick = () => navigate("/admin");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole"); // Clear role
    setIsLoggedIn(false);
    setIsAdmin(false); // Reset admin status
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setProfileOpen(!profileOpen);

  const navbarVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  const profileVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <motion.nav
      className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg rounded-3xl m-1"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container2 flex items-center justify-between py-4 px-6">
        {/* Logo Section */}
        <motion.div
          className="text-2xl flex items-center gap-2 font-bold"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white">Vitalix</span>
          <span className="text-blue-200">Health Care</span>
        </motion.div>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <ul className="flex items-center gap-24 text-white font-medium text-xl">
            {NavbarMenu.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ y: -2, color: "#93c5fd" }}
                transition={{ duration: 0.2 }}
              >
                <a href={item.link} className="hover:text-blue-200 transition duration-300">
                  {item.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Buttons & Profile */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <motion.button
                className="hover:bg-blue-600 text-white font-semibold rounded-md border-2 border-white px-4 py-2 transition duration-200"
                onClick={handleLoginClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button
                className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200"
                onClick={handleRegisterClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </>
          ) : (
            <motion.div
              className="relative"
              onHoverStart={() => {
                clearTimeout(window.profileMenuTimeout);
                setProfileOpen(true);
              }}
              onHoverEnd={() => {
                window.profileMenuTimeout = setTimeout(() => {
                  setProfileOpen(false);
                }, 300);
              }}
            >
              <motion.img
                src={profileimg}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              {profileOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg py-2 z-10"
                  variants={profileVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onHoverStart={() => {
                    clearTimeout(window.profileMenuTimeout);
                    setProfileOpen(true);
                  }}
                  onHoverEnd={() => {
                    window.profileMenuTimeout = setTimeout(() => {
                      setProfileOpen(false);
                    }, 300);
                  }}
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProfileClick();
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Settings
                  </a>
                  {isAdmin && (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdminPanelClick();
                      }}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Admin Panel
                    </a>
                  )}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    className="block px-4 py-2 text-red-500 hover:bg-gray-200"
                  >
                    Logout
                  </a>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button onClick={toggleMenu} whileHover={{ scale: 1.1 }}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden bg-white text-gray-800"
        initial="hidden"
        animate={menuOpen ? "visible" : "hidden"}
        exit="exit"
        variants={mobileMenuVariants}
      >
        <div className="p-4">
          <ul className="flex flex-col gap-4 font-medium">
            {NavbarMenu.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ x: 5, color: "#1e40af" }}
                transition={{ duration: 0.2 }}
              >
                <a href={item.link} className="hover:text-blue-700 transition duration-300">
                  {item.title}
                </a>
              </motion.li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {!isLoggedIn ? (
              <>
                <motion.button
                  className="hover:bg-blue-600 text-blue-600 font-semibold hover:text-white rounded-md border-2 border-blue-600 px-4 py-2 transition duration-200"
                  onClick={handleLoginClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
                <motion.button
                  className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200"
                  onClick={handleRegisterClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200"
                  onClick={handleProfileClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Profile
                </motion.button>
                {isAdmin && (
                  <motion.button
                    className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200"
                    onClick={handleAdminPanelClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Admin Panel
                  </motion.button>
                )}
                <motion.button
                  className="bg-red-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-red-600 transition duration-200"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}