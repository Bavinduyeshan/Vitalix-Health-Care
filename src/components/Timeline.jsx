import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

const timelineData = [
  { year: '2010', title: 'Foundation', description: 'Established with a vision for better healthcare' },
  { year: '2014', title: 'Expansion', description: 'Opened 3 new specialized centers' },
  { year: '2018', title: 'Innovation Award', description: 'Recognized for medical technology adoption' },
  { year: '2023', title: 'Global Reach', description: 'Serving patients from 20+ countries' }
];

export const Timeline = () => (
  <Box sx={{ position: 'relative', py: 8 }}>
    {timelineData.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        sx={{
          position: 'relative',
          pl: 4,
          ml: '16px',
          mb: 6,
          '&:before': {
            content: '""',
            position: 'absolute',
            left: '-28px',
            top: '6px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#3b82f6',
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)'
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            left: '-20px',
            top: '24px',
            bottom: '-40px',
            width: '2px',
            background: '#3b82f6'
          }
        }}
      >
        <Typography variant="h5" sx={{ 
          color: '#3b82f6',
          fontWeight: 700,
          mb: 1
        }}>
          {item.year}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {item.title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          {item.description}
        </Typography>
      </motion.div>
    ))}
  </Box>
);