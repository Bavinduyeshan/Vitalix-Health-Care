import { motion } from 'framer-motion';
import { Box, Typography, Avatar, Grid } from '@mui/material';

const teamMembers = [
  { name: 'Dr. Sarah Johnson', role: 'CEO & Founder', image: 'url_to_image' },
  { name: 'Dr. Michael Chen', role: 'Medical Director', image: 'url_to_image' },
  { name: 'Emma Wilson', role: 'Patient Care Director', image: 'url_to_image' }
];

export const Team = () => (
  <Box sx={{ py: 8 }}>
    <Grid container spacing={6} justifyContent="center">
      {teamMembers.map((member, index) => (
        <Grid item xs={12} md={4} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            sx={{
              textAlign: 'center',
              p: 4,
              borderRadius: 4,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-5px)'
              }
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              sx={{ 
                display: 'inline-block',
                mb: 3,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #3b82f6'
              }}
            >
              <Avatar 
                src={member.image} 
                sx={{ width: 200, height: 200 }} 
              />
            </motion.div>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {member.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', mb: 2 }}>
              {member.role}
            </Typography>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Box>
);