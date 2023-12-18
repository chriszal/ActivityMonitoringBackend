import Head from 'next/head';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useState } from 'react';

const Page = () => {
  const [events, setEvents] = useState([]);

  const handleDateClick = (arg) => {
    // Add new event on date click
    const newEvent = {
      title: 'New Event',
      start: arg.date,
      allDay: true
    };
    setEvents([...events, newEvent]);
  };

  return (
    <>
      <Head>
        <title>Schedule</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">
              Schedule
            </Typography>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              dateClick={handleDateClick}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
