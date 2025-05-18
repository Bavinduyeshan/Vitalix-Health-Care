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
import { Container, Typography, Box, Grid, TextField, Button, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
  hover: { scale: 1.05, boxShadow: '0px 6px 15px rgba(59, 130, 246, 0.3)' },
};

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    alert('Thank you for your message! We’ll get back to you soon.');
    setForm({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <Box

      sx={{
        background: 'linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%)',
        minHeight: '100vh',
        py: 8,
      }}
    >
      {/* Hidden access key */}
  <input type="hidden" name="access_key" value="d341bf3d-d8fa-4822-953d-ac9ae66592a1" />
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ alignItems: 'center', py: 6 }}>
          {/* Left Side - Contact Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  color: '#1e3a8a',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                  lineHeight: 1.2,
                }}
                component={motion.div}
                variants={fadeInLeft}
              >
                Contact <span style={{ color: '#373e29' }}>Us</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#4b5563',
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  mb: 4,
                }}
                component={motion.div}
                variants={fadeInLeft}
              >
                We’re here to assist you. Fill out the form below, and our team will respond promptly.
              </Typography>
              <Box
                // component="form"
                // action="https://api.web3forms.com/submit"
                // method="POST"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
              >
                <TextField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#e3f2fd' },
                      '&:hover fieldset': { borderColor: '#3b82f6' },
                      '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                    },
                  }}
                  component={motion.div}
                  variants={fadeInLeft}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#e3f2fd' },
                      '&:hover fieldset': { borderColor: '#3b82f6' },
                      '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                    },
                  }}
                  component={motion.div}
                  variants={fadeInLeft}
                />
                <TextField
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={5}
                  variant="outlined"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#e3f2fd' },
                      '&:hover fieldset': { borderColor: '#3b82f6' },
                      '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                    },
                  }}
                  component={motion.div}
                  variants={fadeInLeft}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    px: 4,
                    py: 1.5,
                    borderRadius: '25px',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                    '&:hover': {
                      backgroundColor: '#2563eb',
                      boxShadow: '0 6px 20px rgba(59, 130, 246, 0.5)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  component={motion.div}
                  variants={fadeInLeft}
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </Button>
              </Box>
            </motion.div>
          </Grid>

          {/* Right Side - Contact Info and Map */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#1e3a8a',
                  mb: 3,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                }}
                component={motion.div}
                variants={fadeInRight}
              >
                Get in Touch
              </Typography>
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                  component={motion.div}
                  variants={fadeInRight}
                >
                  <PhoneIcon sx={{ color: '#3b82f6', mr: 1.5, fontSize: 28 }} />
                  <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem' }}>
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                  component={motion.div}
                  variants={fadeInRight}
                >
                  <EmailIcon sx={{ color: '#3b82f6', mr: 1.5, fontSize: 28 }} />
                  <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem' }}>
                    info@unitryhealthcare.com
                  </Typography>
                </Box>
                <Box
                  sx={{ display: 'flex', alignItems: 'center' }}
                  component={motion.div}
                  variants={fadeInRight}
                >
                  <LocationOnIcon sx={{ color: '#3b82f6', mr: 1.5, fontSize: 28 }} />
                  <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem' }}>
                    123 Health St, Wellness City, HC 45678
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 4, borderColor: '#e3f2fd' }} />
              <Box
                component={motion.iframe}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.8910441557905!2d80.51499857480144!3d6.009696143975596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae140eba2de2217%3A0xfe72e591d6dc9e7b!2sMalimbada%20Junction!5e0!3m2!1sen!2slk!4v1745777875972!5m2!1sen!2slk"
                title="Hospital Location"
                sx={{
                  width: '100%',
                  maxWidth: 450,
                  height: 300,
                  borderRadius: 3,
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                }}
                variants={fadeInRight}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)' }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          </Grid>
        </Grid>

        {/* Additional Section: Call to Action */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#1e3a8a',
                mb: 3,
                fontSize: { xs: '1.8rem', md: '2.5rem' },
              }}
              component={motion.div}
              variants={fadeInLeft}
            >
              Need Immediate Assistance?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#4b5563',
                lineHeight: 1.8,
                fontSize: '1.1rem',
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
              }}
              component={motion.div}
              variants={fadeInLeft}
            >
              Our team is available 24/7 to help with emergencies or urgent inquiries. Call us now or visit our hospital for immediate care.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#3b82f6',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                px: 4,
                py: 1.5,
                borderRadius: '25px',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  backgroundColor: '#2563eb',
                  boxShadow: '0 6px 20px rgba(59, 130, 246, 0.5)',
                },
                transition: 'all 0.3s ease',
              }}
              component={motion.div}
              variants={fadeInLeft}
              whileHover={buttonHover}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = 'tel:+15551234567'}
            >
              Call Now
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}