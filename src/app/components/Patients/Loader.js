import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box textAlign="center">
        <CircularProgress size={80} />
        <Typography variant="h5" mt={2}>
          Loading data...
        </Typography>
      </Box>
    </Box>
  );
};

export default Loader;