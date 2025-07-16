import React from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon, HeartIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import heroBanner from '../../assets/healthcareContact.jpg'; // Replace with a vibrant healthcare SVG

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' },
  tap: { scale: 0.95 },
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 font-sans py-8 md:py-12 relative overflow-hidden ">
      {/* Hero Section */}
      <motion.section
        className="w-[95%] sm:w-[90%] max-w-6xl mx-auto mb-12 mt-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border-t-4 border-gradient-to-r from-teal-500 to-blue-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div className="text-center md:text-left" variants={cardVariants}>
              <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 mb-4 tracking-tight">
                About <span className="text-blue-600">Unity Health Care</span>
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                At Unity Health Care, we transform lives through exceptional medical care, ensuring accessibility and compassion for all.
              </p>
              <motion.button
                onClick={() => window.location.href = '/register'}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                data-tooltip-id="join-community"
                data-tooltip-content="Join our healthcare community"
              >
                Join Our Community
              </motion.button>
            </motion.div>
            <motion.img
              src={heroBanner}
              alt="Unity Health Care"
              className="w-48 md:w-64 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              variants={cardVariants}
            />
          </div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section
        className="w-[95%] sm:w-[90%] max-w-6xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border-t-4 border-teal-500">
          <motion.h2
            className="text-3xl font-extrabold text-teal-800 mb-6 text-center"
            variants={cardVariants}
          >
            Our Story
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 mb-4 max-w-3xl mx-auto text-justify"
            variants={cardVariants}
          >
            Founded in 2010, Unity Health Care is dedicated to transforming lives through exceptional medical care. Our team of skilled professionals uses cutting-edge technology to provide patient-centered services across specialties like general medicine, pediatrics, and advanced diagnostics.
          </motion.p>
          <motion.p
            className="text-lg text-gray-700 mb-4 max-w-3xl mx-auto text-justify"
            variants={cardVariants}
          >
            Guided by our core values—integrity, innovation, and empathy—we offer state-of-the-art facilities and a holistic approach to health. From community outreach programs to 24/7 patient support, we’re committed to ensuring quality care and innovation for a healthier tomorrow.
          </motion.p>
          <motion.p
            className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto text-justify"
            variants={cardVariants}
          >
            Unity Health Care is your partner in wellness. Whether you need preventive care or complex treatments, we empower individuals and families with the resources to thrive.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="w-[95%] sm:w-[90%] max-w-6xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border-t-4 border-teal-500">
          <motion.h2
            className="text-3xl font-extrabold text-teal-800 mb-6 text-center"
            variants={cardVariants}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto text-center"
            variants={cardVariants}
          >
            Our mission is to provide accessible, high-quality healthcare to all. We aim to innovate, inspire, and impact lives by fostering a community where health and well-being are prioritized. Through advanced technology and compassionate care, we’re building a healthier future, one patient at a time.
          </motion.p>
          <motion.div className="text-center" variants={cardVariants}>
            <button
              onClick={() => window.location.href = '/contact'}
              className="inline-flex items-center bg-transparent border-2 border-teal-600 text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              data-tooltip-id="contact-us"
              data-tooltip-content="Contact us for more information"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Highlights Section */}
      <motion.section
        className="w-[95%] sm:w-[90%] max-w-6xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-extrabold text-teal-800 mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: UserGroupIcon,
              title: "Expert Physicians",
              description: "Our board-certified doctors bring years of experience across multiple specialties.",
            },
            {
              icon: HeartIcon,
              title: "Compassionate Care",
              description: "Our staff is dedicated to providing empathetic and patient-centered support.",
            },
            {
              icon: BuildingOfficeIcon,
              title: "Modern Facilities",
              description: "Equipped with state-of-the-art technology for advanced diagnostics and treatment.",
            },
          ].map((highlight, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-teal-500"
              variants={cardVariants}
              data-tooltip-id={`highlight-${index}`}
              data-tooltip-content={highlight.title}
            >
              <div className="flex items-center mb-4">
                <highlight.icon className="w-8 h-8 text-teal-600 mr-3" />
                <h3 className="text-xl font-bold text-teal-800">{highlight.title}</h3>
              </div>
              <p className="text-gray-700">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-96 h-96 bg-teal-100/20 rounded-full absolute -top-40 -left-40 blur-3xl" />
        <div className="w-96 h-96 bg-blue-100/20 rounded-full absolute -bottom-40 -right-40 blur-3xl" />
      </div>

      {/* Tooltips */}
      <Tooltip id="join-community" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="contact-us" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="highlight-0" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="highlight-1" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="highlight-2" place="top" className="bg-teal-800 text-white rounded-lg" />
    </div>
  );
}