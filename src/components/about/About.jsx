

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
                About <span style={{ color: '#3b82f6' }}>Vitalix Health Care</span>
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
                At Vitalix Health Care, we are dedicated to transforming lives through exceptional medical care. Since our founding in 2010, we’ve been on a mission to make healthcare accessible and compassionate. Our team of skilled professionals uses cutting-edge technology to provide patient-centered services across specialties like general medicine, pediatrics, and advanced diagnostics.
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
                Vitalix Health Care is your partner in wellness. Whether you need preventive care or complex treatments, we empower individuals and families with the resources to thrive.
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

