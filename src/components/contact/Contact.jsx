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
import { Phone, Mail, MapPin } from 'lucide-react';

// Animation variants
const fadeInLeft = {
  hidden: { opacity: 0, x: -70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const buttonHover = {
  initial: { scale: 1 },
  hover: { scale: 1.05, boxShadow: '0px 6px 15px rgba(59, 130, 246, 0.3)' },
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
    // Replace with your Web3Forms Access Key (e.g., 'your_access_key_here')
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
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
          {/* Left Side - Contact Form */}
          <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-blue-900 mb-3"
              variants={fadeInLeft}
            >
              Contact <span className="text-green-800">Us</span>
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg mb-6"
              variants={fadeInLeft}
            >
              We’re here to assist you. Fill out the form below, and our team will respond promptly.
            </motion.p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="hidden"
                name="access_key"
                value="d341bf3d-d8fa-4822-953d-ac9ae66592a1"
              />
              <motion.div variants={fadeInLeft}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full px-4 py-3 bg-white border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>
              <motion.div variants={fadeInLeft}>
                <input
                  type="email"
                  name="ornateEmail"
                  value={form.ornateEmail}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 bg-white border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>
              <motion.div variants={fadeInLeft}>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </motion.div>
              <motion.button
                type="submit"
                initial="initial"
                whileHover="hover"
                variants={buttonHover}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
                onClick={() => console.log('Submit button clicked')}
              >
                Send Message
              </motion.button>
            </form>
            <p
              className={`mt-4 text-center text-base font-medium ${status.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}
            >
              {console.log('Rendering status:', status)}
              {status}
            </p>
          </motion.div>

          {/* Right Side - Contact Info and Map */}
          <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-blue-900 mb-3"
              variants={fadeInRight}
            >
              Get in Touch
            </motion.h3>
            <div className="space-y-4 mb-6">
              <motion.div className="flex items-center" variants={fadeInRight}>
                <Phone className="text-blue-500 mr-3 h-7 w-7" />
                <p className="text-gray-600 text-lg">+1 (555) 123-4567</p>
              </motion.div>
              <motion.div className="flex items-center" variants={fadeInRight}>
                <Mail className="text-blue-500 mr-3 h-7 w-7" />
                <p className="text-gray-600 text-lg">info@unitryhealthcare.com</p>
              </motion.div>
              <motion.div className="flex items-center" variants={fadeInRight}>
                <MapPin className="text-blue-500 mr-3 h-7 w-7" />
                <p className="text-gray-600 text-lg">123 Health St, Wellness City, HC 45678</p>
              </motion.div>
            </div>
            <hr className="border-blue-100 mb-6" />
            <motion.iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.8910441557905!2d80.51499857480144!3d6.009696143975596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae140eba2de2217%3A0xfe72e591d6dc9e7b!2sMalimbada%20Junction!5e0!3m2!1sen!2slk!4v1745777875972!5m2!1sen!2slk"
              title="Hospital Location"
              className="w-full max-w-md h-72 rounded-lg border-0"
              variants={fadeInRight}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>

        {/* Additional Section: Call to Action */}
        <div className="mt-12 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-blue-900 mb-3"
              variants={fadeInLeft}
            >
              Need Immediate Assistance?
            </motion.h3>
            <motion.p
              className="text-gray-600 text-lg max-w-2xl mx-auto mb-6"
              variants={fadeInLeft}
            >
              Our team is available 24/7 to help with emergencies or urgent inquiries. Call us now or visit our hospital for immediate care.
            </motion.p>
            <motion.button
              initial="initial"
              whileHover="hover"
              variants={buttonHover}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
              onClick={() => window.location.href = 'tel:+15551234567'}
            >
              Call Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}