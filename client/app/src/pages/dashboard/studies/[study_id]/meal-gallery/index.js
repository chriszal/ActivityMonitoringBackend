import Head from 'next/head';
import { Box,Grid, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axiosInstance from 'src/utils/axios-instance';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


const Page = () => {
  const [meals, setMeals] = useState([]);
  const router = useRouter();
  const { study_id } = router.query;
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axiosInstance.get(`/meals/study/${study_id}`);
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  return (
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ my: 4 }}>
          Meal Gallery
        </Typography>
        <Grid container spacing={2}>
          {meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={meal.photo_url} // Adjust according to how you handle images
                  alt={meal.meal_type}
                />
                <CardContent>
                  <Typography variant="h6">{meal.meal_type}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Portion: {meal.portion}
                    <br />
                    Created At: {meal.created_at}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
  )};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
