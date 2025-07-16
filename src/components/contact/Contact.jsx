// import React, { useState } from 'react';
// import { Container, Typography, Box, Grid, TextField, Button, Divider } from '@mui/material';
// import { motion } from 'framer-motion';
// import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

// // Animation variants
// const fadeInLeft = {
//   hidden: { opacity: 0, x: -50 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
// };

// const fadeInRight = {
//   hidden: { opacity: 0, x: 50 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
// };

// const staggerChildren = {
//   visible: { transition: { staggerChildren: 0.2 } },
// };

// export default function Contact() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', form);
//     alert('Thank you for your message! We’ll get back to you soon.');
//     setForm({ name: '', email: '', message: '' }); // Reset form
//   };

//   return (
//     <Box sx={{ backgroundColor: '#f5f6f5', pt: 2, pb: 4 }}>
//       <Container maxWidth="lg">
//         <Grid container spacing={2} sx={{ alignItems: 'center', py: 4 }}>
//           {/* Left Side - Contact Form */}
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={staggerChildren}
//             >
//               <Typography
//                 variant="h4"
//                 sx={{ fontWeight: 'bold', color: '#0073b1', mb: 2 }}
//                 component={motion.div}
//                 variants={fadeInLeft}
//               >
//                 Contact Us
//               </Typography>
//               <Typography
//                 variant="body1"
//                 sx={{ color: '#555', lineHeight: 1.6, fontSize: '1.1rem', mb: 2 }}
//                 component={motion.div}
//                 variants={fadeInLeft}
//               >
//                 We’re here to assist you. Fill out the form below, and our team will respond promptly.
//               </Typography>
//               <Box
//                 component="form"
//                 onSubmit={handleSubmit}
//                 sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//               >
//                 <TextField
//                   label="Name"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   sx={{ backgroundColor: 'white' }}
//                   component={motion.div}
//                   variants={fadeInLeft}
//                 />
//                 <TextField
//                   label="Email"
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   sx={{ backgroundColor: 'white' }}
//                   component={motion.div}
//                   variants={fadeInLeft}
//                 />
//                 <TextField
//                   label="Message"
//                   name="message"
//                   value={form.message}
//                   onChange={handleChange}
//                   required
//                   multiline
//                   rows={4}
//                   variant="outlined"
//                   sx={{ backgroundColor: 'white' }}
//                   component={motion.div}
//                   variants={fadeInLeft}
//                 />
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{
//                     backgroundColor: '#0073b1',
//                     color: 'white',
//                     '&:hover': { backgroundColor: '#005f8d' },
//                   }}
//                   component={motion.div}
//                   variants={fadeInLeft}
//                 >
//                   Send Message
//                 </Button>
//               </Box>
//             </motion.div>
//           </Grid>

//           {/* Right Side - Contact Info and Map */}
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={staggerChildren}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{ fontWeight: 'bold', color: '#0073b1', mb: 2 }}
//                 component={motion.div}
//                 variants={fadeInRight}
//               >
//                 Get in Touch
//               </Typography>
//               <Box sx={{ mb: 3 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }} component={motion.div} variants={fadeInRight}>
//                   <PhoneIcon sx={{ color: '#0073b1', mr: 1 }} />
//                   <Typography variant="body1" sx={{ color: '#555' }}>
//                     +1 (555) 123-4567
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }} component={motion.div} variants={fadeInRight}>
//                   <EmailIcon sx={{ color: '#0073b1', mr: 1 }} />
//                   <Typography variant="body1" sx={{ color: '#555' }}>
//                     info@unitryhealthcare.com
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }} component={motion.div} variants={fadeInRight}>
//                   <LocationOnIcon sx={{ color: '#0073b1', mr: 1 }} />
//                   <Typography variant="body1" sx={{ color: '#555' }}>
//                     123 Health St, Wellness City, HC 45678
//                   </Typography>
//                 </Box>
//               </Box>
//               <Divider sx={{ mb: 3 }} />
//               <Box
//                 component={motion.img}
//                 src="https://via.placeholder.com/350x200?text=Hospital+Map"
//                 alt="Hospital Location"
//                 sx={{
//                   width: '100%',
//                   maxWidth: 350,
//                   height: 200,
//                   borderRadius: 2,
//                   boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//                   objectFit: 'cover',
//                 }}
//                 variants={fadeInRight}
//               />
//             </motion.div>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon, MapPinIcon ,UserIcon,DocumentTextIcon} from '@heroicons/react/24/outline';
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

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    ornateEmail: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log('Form input updated:', { ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission triggered');

    // Client-side validation
    if (!form.name || !form.ornateEmail || !form.message) {
      setStatus('Please fill out all fields.');
      console.log('Validation failed: All fields are required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.ornateEmail)) {
      setStatus('Please enter a valid email address.');
      console.log('Validation failed: Invalid email format');
      return;
    }

    const formData = new FormData();
    formData.append('access_key', 'd341bf3d-d8fa-4822-953d-ac9ae66592a1');
    formData.append('name', form.name);
    formData.append('email', form.ornateEmail);
    formData.append('message', form.message);

    console.log('Form data to be sent:', Object.fromEntries(formData));

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      console.log('Fetch response status:', response.status, response.statusText);

      const result = await response.json();
      console.log('Web3Forms API response:', result);

      if (result.success) {
        setStatus('Thank you! Your message has been sent successfully.');
        setForm({ name: '', ornateEmail: '', message: '' });
        console.log('Form submitted successfully');
      } else {
        setStatus(`Error: ${result.message || 'Submission failed. Please try again.'}`);
        console.log('Form submission failed:', result.message);
      }
    } catch (error) {
      setStatus('An error occurred. Please check your connection and try again.');
      console.error('Submission error:', error.message, error.stack);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 font-sans py-8 md:py-12 relative overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="w-[95%] sm:w-[90%] max-w-6xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border-t-4 border-gradient-to-r from-teal-500 to-blue-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div className="text-center md:text-left" variants={cardVariants}>
              <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 mb-4 tracking-tight">
                Get in Touch
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                We're here to assist you with any questions or concerns. Contact Unity Health Care today.
              </p>
              <motion.button
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                data-tooltip-id="start-contact"
                data-tooltip-content="Start contacting us"
              >
                Contact Now
              </motion.button>
            </motion.div>
            <motion.img
              src={heroBanner}
              alt="Healthcare Contact"
              className="w-48 md:w-64 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              variants={cardVariants}
            />
          </div>
        </div>
      </motion.section>

      {/* Contact Form and Info Section */}
      <motion.section
        className="w-[95%] sm:w-[90%] max-w-6xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            id="contact-form"
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-t-4 border-teal-500"
            variants={cardVariants}
          >
            <h2 className="text-3xl font-extrabold text-teal-800 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="hidden"
                name="access_key"
                value="d341bf3d-d8fa-4822-953d-ac9ae66592a1"
              />
              <motion.div variants={cardVariants}>
                <label className="block text-teal-800 font-semibold text-lg mb-2" htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="absolute w-6 h-6 text-teal-600 top-1/2 transform -translate-y-1/2 left-3" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                    aria-label="Name"
                    data-tooltip-id="name-input"
                    data-tooltip-content="Enter your full name"
                  />
                </div>
              </motion.div>
              <motion.div variants={cardVariants}>
                <label className="block text-teal-800 font-semibold text-lg mb-2" htmlFor="ornateEmail">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute w-6 h-6 text-teal-600 top-1/2 transform -translate-y-1/2 left-3" />
                  <input
                    type="email"
                    id="ornateEmail"
                    name="ornateEmail"
                    value={form.ornateEmail}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                    aria-label="Email"
                    data-tooltip-id="email-input"
                    data-tooltip-content="Enter your email address"
                  />
                </div>
              </motion.div>
              <motion.div variants={cardVariants}>
                <label className="block text-teal-800 font-semibold text-lg mb-2" htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DocumentTextIcon className="absolute w-6 h-6 text-teal-600 top-4 left-3" />
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    rows="5"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 resize-none"
                    aria-label="Message"
                    data-tooltip-id="message-input"
                    data-tooltip-content="Enter your message or inquiry"
                  />
                </div>
              </motion.div>
              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300"
                onClick={() => console.log('Submit button clicked')}
                data-tooltip-id="submit-button"
                data-tooltip-content="Send your message"
              >
                Send Message
              </motion.button>
              {status && (
                <motion.p
                  className={`mt-4 text-center text-base font-semibold ${status.includes('Thank you') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} p-4 rounded-lg`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {console.log('Rendering status:', status)}
                  {status}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info and Map */}
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-t-4 border-teal-500"
            variants={cardVariants}
          >
            <h3 className="text-3xl font-extrabold text-teal-800 mb-6">Contact Information</h3>
            <div className="space-y-6">
              <motion.div className="flex items-center" variants={cardVariants}>
                <PhoneIcon className="text-teal-600 mr-3 h-7 w-7" />
                <p className="text-gray-700 text-lg">+1 (555) 123-4567</p>
              </motion.div>
              <motion.div className="flex items-center" variants={cardVariants}>
                <EnvelopeIcon className="text-teal-600 mr-3 h-7 w-7" />
                <p className="text-gray-700 text-lg">info@unityhealthcare.com</p>
              </motion.div>
              <motion.div className="flex items-center" variants={cardVariants}>
                <MapPinIcon className="text-teal-600 mr-3 h-7 w-7" />
                <p className="text-gray-700 text-lg">123 Health St, Wellness City, HC 45678</p>
              </motion.div>
            </div>
            <hr className="border-gray-200 my-6" />
            <motion.iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63492.95583422904!2d80.50954810278847!3d5.951990672256694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae138d151937cd9%3A0x1d711f45897009a3!2sMatara!5e0!3m2!1sen!2slk!4v1748362595320!5m2!1sen!2slk"
              title="Hospital Location"
              className="w-full h-72 rounded-lg border-0"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              data-tooltip-id="map"
              data-tooltip-content="View our location on the map"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="w-[95%] sm:w-[90%] max-w-6xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 text-center border-t-4 border-teal-500">
          <motion.h3
            className="text-3xl font-extrabold text-teal-800 mb-4"
            variants={cardVariants}
          >
            Need Immediate Assistance?
          </motion.h3>
          <motion.p
            className="text-gray-700 text-lg max-w-2xl mx-auto mb-6"
            variants={cardVariants}
          >
            Our team is available 24/7 to help with emergencies or urgent inquiries. Call us now or visit our hospital for immediate care.
          </motion.p>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300"
            onClick={() => window.location.href = 'tel:+15551234567'}
            data-tooltip-id="call-button"
            data-tooltip-content="Call our support team"
          >
            <PhoneIcon className="w-5 h-5 mr-2" />
            Call Now
          </motion.button>
        </div>
      </motion.section>

      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-96 h-96 bg-teal-100/20 rounded-full absolute -top-40 -left-40 blur-3xl" />
        <div className="w-96 h-96 bg-blue-100/20 rounded-full absolute -bottom-40 -right-40 blur-3xl" />
      </div>

      {/* Tooltips */}
      <Tooltip id="start-contact" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="name-input" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="email-input" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="message-input" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="submit-button" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="map" place="top" className="bg-teal-800 text-white rounded-lg" />
      <Tooltip id="call-button" place="top" className="bg-teal-800 text-white rounded-lg" />
    </div>
  );
}