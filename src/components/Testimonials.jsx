import { motion } from 'framer-motion';
import { Box, Typography, Avatar } from '@mui/material';

const testimonialsData = [
  { 
    text: 'Life-changing care from truly compassionate professionals.',
    author: 'John D.',
    role: 'Patient'
  },
  { 
    text: 'The most advanced medical facility Ive ever experienced.',
    author: 'Maria S.',
    role: 'Patient Family'
  }
];

export const Testimonials = () => (
  <Box sx={{ py: 8, background: 'linear-gradient(160deg, #f8fafc 0%, #f0f9ff 100%)' }}>
    <Grid container spacing={6} justifyContent="center">
      {testimonialsData.map((testimonial, index) => (
        <Grid item xs={12} md={6} key={index}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              '&:before': {
                content: '"“"',
                position: 'absolute',
                top: -20,
                left: 20,
                fontSize: '5rem',
                color: '#3b82f6',
                opacity: 0.2
              }
            }}
          >
            <Typography variant="body1" sx={{ 
              fontSize: '1.2rem',
              lineHeight: 1.6,
              mb: 3,
              color: '#475569'
            }}>
              {testimonial.text}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#3b82f6', mr: 2 }}>
                {testimonial.author[0]}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {testimonial.author}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  {testimonial.role}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Box>
);