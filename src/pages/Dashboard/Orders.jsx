import React, { useEffect, useState, useCallback } from 'react';
import DashBoardLayout from './DashBoardLayout';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../modules/AuthenticationFirebase';
import { Box, Typography, Grid, Container } from '@mui/material';

const Orders = () => {
  const [dataTT, setDataTT] = useState([]);

  // Fetch data from Firestore and set up real-time updates
  const fetchData = useCallback(() => {
    const q = query(collection(db, 'userData'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userData = querySnapshot.docs.map(doc => doc.data());
      setDataTT(userData);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DashBoardLayout>
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Orders
        </Typography>
        <Grid container spacing={2}>
          {dataTT.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="textSecondary">
                No orders available
              </Typography>
            </Grid>
          ) : (
            dataTT.map((data, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    p: 2,
                    mb: 2,
                    bgcolor: '#fff',
                    boxShadow: 1, // Add shadow for better separation
                    '& details': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  <details>
                    <summary>
                      <Typography variant="h6">
                        Order {index + 1}
                      </Typography>
                    </summary>
                    <Box p={2}>
                      {Object.entries(data).map(([key, value]) => (
                        <Box key={key} mb={1}>
                          <Typography variant="body1">
                            <strong>{key}:</strong> {value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </details>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </DashBoardLayout>
  );
};

export default React.memo(Orders); // Avoid unnecessary re-renders
