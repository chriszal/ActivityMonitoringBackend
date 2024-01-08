import React from 'react';
import { Box, Grid, Card, CardMedia, Typography, IconButton, SvgIcon, CardActions, Divider } from '@mui/material';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';

const dummyData = [
  { id: 1, title: 'What was your last meal', createdAt: '2024-01-08', imageUrl: '/assets/products/meal-form.jpeg' },
  { id: 2, title: 'Physical Activity Survey', createdAt: '2024-01-09', imageUrl: '/assets/products/physical.png' },
  { id: 3, title: 'Form 3', createdAt: '2024-01-10', imageUrl: '/assets/products/default.png' }
];

const RecentForms = () => {
  return (
    <Grid container spacing={1}>
      {dummyData.map((form) => (
        <Grid item key={form.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', width: 180 }}>
            <CardMedia
              component="img"
              height="120"
              image={form.imageUrl}
              alt={form.title}
            />
            <Divider/>
            <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'column', padding: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

              <Typography noWrap variant="subtitle1" gutterBottom sx={{ fontSize: '0.8rem' }}>
                {form.title}
              </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: '0.7rem' }}>
                  Created At: {form.createdAt}
                </Typography>
                <IconButton size="small">
                  <SvgIcon fontSize="small"><EllipsisVerticalIcon /></SvgIcon>
                </IconButton>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecentForms;
