// src/components/Footer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaInfoCircle, FaEnvelope, FaPhone, FaHospital, FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter!");
    // Add actual newsletter signup logic here (e.g., API call)
  };

  return (
    <motion.footer
      className="bg-gradient-to-b from-blue-600 to-blue-600 text-white py-12 px-6 mt-auto shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Hospital Branding/Logo */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <FaHospital className="text-4xl text-teal-200 mr-3" />
              <h3 className="text-2xl font-bold tracking-tight">HealthID Hospital</h3>
            </motion.div>
            <p className="text-sm text-teal-100 text-center md:text-left">
              Your trusted partner in healthcare, providing secure and seamless patient care solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-200">Explore</h4>
            <ul className="space-y-3">
              {[
                { path: "/", label: "Home", icon: FaHome },
                { path: "/about", label: "About", icon: FaInfoCircle },
                { path: "/contact", label: "Contact", icon: FaEnvelope },
              ].map((item) => (
                <motion.li
                  key={item.path}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => navigate(item.path)}
                    className="flex items-center text-teal-100 hover:text-white transition-colors duration-200"
                  >
                    <item.icon className="mr-2 text-teal-300" />
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-200">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-teal-100">
                <FaEnvelope className="mr-2 text-teal-300" />
                <a
                  href="mailto:support@healthid.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  support@healthid.com
                </a>
              </li>
              <li className="flex items-center text-teal-100">
                <FaPhone className="mr-2 text-teal-300" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors duration-200"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-200">Stay Updated</h4>
            <p className="text-sm text-teal-100 mb-3">
              Subscribe to our newsletter for health tips and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-teal-800 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <motion.button
                type="submit"
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-10 border-t border-teal-600 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {[FaTwitter, FaFacebookF, FaLinkedinIn].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-teal-200 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="text-xl" />
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-teal-100">
            © {new Date().getFullYear()} HealthID Hospital. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;