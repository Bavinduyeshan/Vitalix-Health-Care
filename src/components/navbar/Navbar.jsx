import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarMenu } from "../mockdata/data";
import { Menu, X, ChevronDown, User, Settings, LogOut, Shield } from "lucide-react";
import profileimg from "../../assets/profileimg.jpg";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Include both /about and /contact for white background pages
  const isWhitePage = ["/about", "/contact"].includes(location.pathname);
  const shouldShowSolidNavbar = scrolled || isWhitePage;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    setIsLoggedIn(!!token);
    setIsAdmin(userRole === "admin");

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRegisterClick = () => navigate("/register");
  const handleLoginClick = () => navigate("/login");
  const handleProfileClick = () => {
    navigate("/profile");
    setProfileOpen(false);
    setMenuOpen(false);
  };
  const handleAdminPanelClick = () => {
    navigate("/admin");
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setProfileOpen(!profileOpen);

  const navbarVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.1 } },
  };

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const profileVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 ${
        shouldShowSolidNavbar ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      } transition-all duration-300`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`flex items-center cursor-pointer ${
                shouldShowSolidNavbar ? "text-blue-600" : "text-white"
              }`}
              onClick={() => navigate("/")}
            >
              <motion.span
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Vitalix
              </motion.span>
              <motion.span
                className={`text-3xl font-light ml-1 ${
                  shouldShowSolidNavbar ? "text-blue-400" : "text-blue-200"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Care
              </motion.span>
              <motion.div
                className={`w-2 h-2 rounded-full ml-2 ${
                  shouldShowSolidNavbar ? "bg-blue-500" : "bg-blue-300"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              />
            </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {NavbarMenu.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 100 }}
                >
                  <a
                    href={item.link}
                    className={`relative px-1 py-2 text-lg font-semibold transition-colors ${
                      shouldShowSolidNavbar ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"
                    }`}
                  >
                    {item.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <motion.div
                className="flex space-x-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  className={`px-6 py-2 rounded-full font-semibold text-base transition-all ${
                    shouldShowSolidNavbar
                      ? "text-blue-600 hover:bg-blue-50 border border-blue-600"
                      : "text-white hover:bg-white/10 border border-white"
                  }`}
                  onClick={handleLoginClick}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
                <motion.button
                  className={`px-6 py-2 rounded-full font-semibold text-base transition-all ${
                    shouldShowSolidNavbar
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-blue-600 hover:bg-white/90"
                  }`}
                  onClick={handleRegisterClick}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={toggleProfileMenu}
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={profileimg}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/80"
                  />
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${profileOpen ? "rotate-180" : ""} ${
                      shouldShowSolidNavbar ? "text-gray-700" : "text-white"
                    }`}
                  />
                </motion.div>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      className={`absolute right-0 mt-2 w-56 origin-top-right rounded-xl shadow-lg py-1 z-50 ${
                        shouldShowSolidNavbar ? "bg-white" : "bg-white/90 backdrop-blur-md"
                      }`}
                      variants={profileVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className="px-1 py-1">
                        <motion.button
                          onClick={handleProfileClick}
                          className="group flex w-full items-center rounded-lg px-3 py-2 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          whileHover={{ x: 3 }}
                        >
                          <User size={20} className="mr-2 text-blue-500" /> Profile
                        </motion.button>
                        <motion.button
                          className="group flex w-full items-center rounded-lg px-3 py-2 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          whileHover={{ x: 3 }}
                        >
                          <Settings size={20} className="mr-2 text-blue-500" /> Settings
                        </motion.button>
                        {isAdmin && (
                          <motion.button
                            onClick={handleAdminPanelClick}
                            className="group flex w-full items-center rounded-lg px-3 py-2 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            whileHover={{ x: 3 }}
                          >
                            <Shield size={20} className="mr-2 text-blue-500" /> Admin Panel
                          </motion.button>
                        )}
                        <div className="border-t border-gray-100 my-1"></div>
                        <motion.button
                          onClick={handleLogout}
                          className="group flex w-full items-center rounded-lg px-3 py-2 text-base text-red-500 hover:bg-red-50 hover:text-red-600"
                          whileHover={{ x: 3 }}
                        >
                          <LogOut size={20} className="mr-2" /> Logout
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          <div className="md:hidden -mr-2 flex items-center">
            <motion.button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                shouldShowSolidNavbar ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <div
              className={`px-2 pt-2 pb-4 space-y-1 sm:px-3 ${
                shouldShowSolidNavbar ? "bg-white" : "bg-white/95 backdrop-blur-md"
              }`}
            >
              {NavbarMenu.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  className="block px-3 py-3 rounded-md text-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  variants={menuItemVariants}
                >
                  {item.title}
                </motion.a>
              ))}
              <div className="pt-4 border-t border-gray-200">
                {!isLoggedIn ? (
                  <div className="flex flex-col space-y-3 px-2">
                    <motion.button
                      onClick={handleLoginClick}
                      className="w-full px-4 py-2 text-center rounded-full border border-blue-600 text-blue-600 text-base font-semibold hover:bg-blue-50"
                      variants={menuItemVariants}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </motion.button>
                    <motion.button
                      onClick={handleRegisterClick}
                      className="w-full px-4 py-2 text-center rounded-full bg-blue-600 text-white text-base font-semibold hover:bg-blue-700"
                      variants={menuItemVariants}
                      whileTap={{ scale: 0.95 }}
                    >
                      Register
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 px-2">
                    <motion.button
                      onClick={handleProfileClick}
                      className="w-full px-4 py-2 text-center rounded-full bg-blue-600 text-white text-base font-semibold hover:bg-blue-700"
                      variants={menuItemVariants}
                      whileTap={{ scale: 0.95 }}
                    >
                      Profile
                    </motion.button>
                    {isAdmin && (
                      <motion.button
                        onClick={handleAdminPanelClick}
                        className="w-full px-4 py-2 text-center rounded-full bg-blue-600 text-white text-base font-semibold hover:bg-blue-700"
                        variants={menuItemVariants}
                        whileTap={{ scale: 0.95 }}
                      >
                        Admin Panel
                      </motion.button>
                    )}
                    <motion.button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-center rounded-full bg-red-500 text-white text-base font-semibold hover:bg-red-600"
                      variants={menuItemVariants}
                      whileTap={{ scale: 0.95 }}
                    >
                      Logout
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}