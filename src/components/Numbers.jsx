import { motion, useInView } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const metrics = [
  { value: 150, label: 'Expert Doctors', suffix: '+' },
  { value: 500, label: 'Happy Patients', suffix: 'k+' },
  { value: 98, label: 'Success Rate', suffix: '%' },
  { value: 25, label: 'Years Experience', suffix: '+' }
];

export const Numbers = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [counters, setCounters] = useState(metrics.map(() => 0));

  useEffect(() => {
    if (isInView) {
      metrics.forEach((metric, index) => {
        const updateCounter = () => {
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.min(
              newCounters[index] + Math.ceil(metric.value / 50),
              metric.value
            );
            return newCounters;
          });
          
          if (counters[index] < metric.value) {
            requestAnimationFrame(updateCounter);
          }
        };
        updateCounter();
      });
    }
  }, [isInView]);

  return (
    <Box ref={ref} sx={{ py: 8, background: 'radial-gradient(circle, #f0f9ff 0%, #ffffff 100%)' }}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={4} justifyContent="center">
          {metrics.map((metric, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.2
                }}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)'
                }}
              >
                <Typography variant="h3" sx={{ 
                  fontWeight: 900,
                  background: 'linear-gradient(45deg, #1e3a8a, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}>
                  {counters[index]}{metric.suffix}
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: '#64748b',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  {metric.label}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};