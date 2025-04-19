

import React from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import hospital1 from '../../assets/hosimg.jpeg'; // Replace with your image paths
import hospital2 from '../../assets/hosimg.jpeg';
import hospital3 from '../../assets/hosimg.jpeg';
import Footer from '../footer/Footer';


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

const imageHover = {
  hover: { scale: 1.05, rotate: 2, boxShadow: '0px 10px 20px rgba(0, 123, 255, 0.3)' },
};

export default function About() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%)',
        minHeight: '100vh',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Section */}
        <Grid container spacing={4} sx={{ alignItems: 'center', py: 6 }}>
          {/* Left Side - Expanded Text */}
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
                  color: '#1e3a8a', // Deep blue for a professional look
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                  lineHeight: 1.2,
                }}
                component={motion.div}
                variants={fadeInLeft}
              >
                About <span style={{ color: '#3b82f6' }}>Unitry Health Care</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#4b5563',
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  mb: 3,
                  textAlign: 'justify',
                }}
                component={motion.div}
                variants={fadeInLeft}
              >
                At Unitry Health Care, we are dedicated to transforming lives through exceptional medical care. Since our founding in 2010, we’ve been on a mission to make healthcare accessible and compassionate. Our team of skilled professionals uses cutting-edge technology to provide patient-centered services across specialties like general medicine, pediatrics, and advanced diagnostics.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#4b5563',
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  mb: 3,
                  textAlign: 'justify',
                }}
                component={motion.div}
                variants={fadeInLeft}
              >
                Guided by our core values—integrity, innovation, and empathy—we offer state-of-the-art facilities and a holistic approach to health. From community outreach programs to 24/7 patient support, we’re committed to ensuring quality care and innovation for a healthier tomorrow.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#4b5563',
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  mb: 4,
                  textAlign: 'justify',
                }}
                component={motion.div}
                variants={fadeInLeft}
              >
                Unitry Health Care is your partner in wellness. Whether you need preventive care or complex treatments, we empower individuals and families with the resources to thrive.
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/register'}
              >
                Join Our Community
              </Button>
            </motion.div>
          </Grid>

          {/* Right Side - Images */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              {/* Large Image */}
              <Box
                component={motion.img}
                src={hospital1}
                alt="Hospital Facility"
                sx={{
                  width: '100%',
                  maxWidth: 400,
                  height: 240,
                  borderRadius: 3,
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                  objectFit: 'cover',
                  border: '2px solid #e3f2fd',
                }}
                variants={fadeInRight}
                whileHover={imageHover}
                transition={{ duration: 0.4 }}
              />
              {/* Medium Image */}
              <Box
                component={motion.img}
                src={hospital2}
                alt="Medical Team"
                sx={{
                  width: '85%',
                  maxWidth: 340,
                  height: 200,
                  borderRadius: 3,
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                  objectFit: 'cover',
                  ml: 'auto',
                  border: '2px solid #e3f2fd',
                }}
                variants={fadeInRight}
                whileHover={imageHover}
                transition={{ duration: 0.4 }}
              />
              {/* Small Image */}
              <Box
                component={motion.img}
                src={hospital3}
                alt="Patient Care"
                sx={{
                  width: '70%',
                  maxWidth: 280,
                  height: 160,
                  borderRadius: 3,
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                  objectFit: 'cover',
                  border: '2px solid #e3f2fd',
                }}
                variants={fadeInRight}
                whileHover={imageHover}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          </Grid>
        </Grid>

        {/* Additional Section: Our Mission */}
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
              Our Mission
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
              Our mission is to provide accessible, high-quality healthcare to all. We aim to innovate, inspire, and impact lives by fostering a community where health and well-being are prioritized. Through advanced technology and compassionate care, we’re building a healthier future, one patient at a time.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#3b82f6',
                color: '#3b82f6',
                fontWeight: 'bold',
                fontSize: '1rem',
                px: 4,
                py: 1.5,
                borderRadius: '25px',
                '&:hover': {
                  borderColor: '#2563eb',
                  color: '#2563eb',
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                },
                transition: 'all 0.3s ease',
              }}
              component={motion.div}
              variants={fadeInLeft}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </Button>
              
          </motion.div>
        </Box>
      </Container>
      
    </Box>
    
  );
}



//correct above




// import React from 'react';
// import { Container, Typography, Box, Grid, Button, useTheme } from '@mui/material';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import hospital1 from '../../assets/hosimg.jpeg';
// import hospital2 from '../../assets/hosimg.jpeg';
// import hospital3 from '../../assets/hosimg.jpeg';
// import { Timeline, Numbers, Team, Testimonials } from './components'; // Create these components

// // Reusable Animation Components
// const SectionTitle = ({ children }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true, margin: "-100px" }}
//     transition={{ duration: 0.8 }}
//   >
//     <Typography variant="h2" sx={{
//       fontWeight: 800,
//       background: 'linear-gradient(45deg, #1e3a8a 30%, #3b82f6 90%)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       mb: 4,
//       textAlign: 'center'
//     }}>
//       {children}
//     </Typography>
//   </motion.div>
// );

// const FadeInBox = ({ children, delay = 0 }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.6, delay }}
//   >
//     {children}
//   </motion.div>
// );

// export default function About() {
//   const theme = useTheme();

//   // Parallax Scroll Effect
//   const { scrollY } = useScroll();
//   const y1 = useTransform(scrollY, [0, 500], [0, 100]);
//   const y2 = useTransform(scrollY, [0, 500], [0, -80]);

//   return (
//     <Box sx={{
//       background: 'radial-gradient(circle at top, #f0f9ff 0%, #ffffff 100%)',
//       overflow: 'hidden'
//     }}>
//       <Container maxWidth="xl">
//         {/* Hero Section */}
//         <Grid container spacing={6} sx={{ py: 10, alignItems: 'center' }}>
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <Typography variant="h1" sx={{
//                 fontWeight: 900,
//                 fontSize: { xs: '2.5rem', md: '4rem' },
//                 lineHeight: 1.2,
//                 mb: 3,
//                 background: 'linear-gradient(45deg, #1e3a8a, #3b82f6)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent'
//               }}>
//                 Redefining Healthcare Excellence
//               </Typography>
              
//               <FadeInBox delay={0.2}>
//                 <Typography variant="body1" sx={{
//                   fontSize: '1.1rem',
//                   lineHeight: 1.8,
//                   mb: 4,
//                   color: '#4b5563'
//                 }}>
//                   For over a decade, Unitry Health Care has been at the forefront of medical 
//                   innovation. Our patient-first approach combines cutting-edge technology 
//                   with compassionate care to deliver exceptional health outcomes.
//                 </Typography>
//               </FadeInBox>

//               <FadeInBox delay={0.4}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   sx={{
//                     background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
//                     fontSize: '1.1rem',
//                     px: 6,
//                     py: 2,
//                     borderRadius: '50px',
//                     boxShadow: 3,
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                       boxShadow: 6
//                     },
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   Meet Our Team
//                 </Button>
//               </FadeInBox>
//             </motion.div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <motion.div 
//               style={{ y: y1 }}
//               sx={{ position: 'relative', height: 600 }}
//             >
//               <motion.img
//                 src={hospital1}
//                 alt="Hospital"
//                 style={{ y: y2 }}
//                 sx={{
//                   width: '100%',
//                   height: 400,
//                   borderRadius: 4,
//                   objectFit: 'cover',
//                   boxShadow: 3,
//                   position: 'absolute',
//                   top: 0,
//                   left: 0
//                 }}
//               />
//               <motion.img
//                 src={hospital2}
//                 alt="Care"
//                 sx={{
//                   width: '80%',
//                   height: 300,
//                   borderRadius: 4,
//                   objectFit: 'cover',
//                   boxShadow: 3,
//                   position: 'absolute',
//                   bottom: 0,
//                   right: 0,
//                   zIndex: 1
//                 }}
//                 whileHover={{ scale: 1.05 }}
//               />
//             </motion.div>
//           </Grid>
//         </Grid>

//         {/* Key Numbers */}
//         <SectionTitle>Our Impact</SectionTitle>
//         <Numbers />

//         {/* Timeline Section */}
//         <SectionTitle>Our Journey</SectionTitle>
//         <Timeline />

//         {/* Core Values */}
//         <SectionTitle>Our Values</SectionTitle>
//         <Grid container spacing={4} sx={{ mb: 10 }}>
//           {['Compassion', 'Innovation', 'Excellence'].map((value, index) => (
//             <Grid item xs={12} md={4} key={value}>
//               <motion.div
//                 whileHover={{ y: -10 }}
//                 style={{
//                   background: 'rgba(255, 255, 255, 0.7)',
//                   backdropFilter: 'blur(10px)',
//                   borderRadius: '20px',
//                   padding: theme.spacing(4),
//                   boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)'
//                 }}
//               >
//                 <Typography variant="h4" sx={{ 
//                   fontWeight: 700, 
//                   color: '#1e3a8a',
//                   mb: 2
//                 }}>
//                   0{index + 1}
//                 </Typography>
//                 <Typography variant="h5" sx={{ 
//                   fontWeight: 600,
//                   mb: 2,
//                   color: '#3b82f6'
//                 }}>
//                   {value}
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: '#64748b' }}>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
//                 </Typography>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Team Section */}
//         <SectionTitle>Leadership</SectionTitle>
//         <Team />

//         {/* Testimonials */}
//         <SectionTitle>Patient Stories</SectionTitle>
//         <Testimonials />
//       </Container>
//     </Box>
//   );
// }