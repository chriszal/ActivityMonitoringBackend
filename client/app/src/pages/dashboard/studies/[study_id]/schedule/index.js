import Head from 'next/head';
import { Select, InputBase, Box, FormControl, Chip, MenuItem, Container, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useState } from 'react';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import interactionPlugin from '@fullcalendar/interaction';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'; // Import Plus icon
 
const Page = () => {
  const [events, setEvents] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [openDialog, setOpenDialog] = useState(false); // New state for dialog
  const [openGenericDialog, setOpenGenericDialog] = useState(false); // New state for dialog

  const [newEventTitle, setNewEventTitle] = useState(''); // State to hold new event title
  const [selectedDate, setSelectedDate] = useState(null); // State to hold selected date
  const [newEventDescription, setNewEventDescription] = useState(''); // State for new event description

  const participants = ['everyone', 'Participant 1', 'Participant 2', 'Participant 3'];

  const handleDateClick = (arg) => {
    console.log("Date clicked: ", arg.dateStr); // Add a console log for debugging
    setSelectedDate(arg.date);
    setOpenDialog(true);
  };

  const handleParticipantChange = (event) => {
    setSelectedParticipant(event.target.value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewEventTitle(''); // Reset title for next use
    setNewEventDescription('')
  };

  const handleAddEvent = () => {
    if (newEventTitle) {
      const newEvent = {
        title: newEventTitle,
        start: selectedDate,
        allDay: true
      };
      setEvents([...events, newEvent]);
    }
    handleCloseDialog();
  };
  const handleGenericEventClick = () => {
    setOpenGenericDialog(true);

  };
  return (
    <>
      <Head>
        <title>Schedule</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4">Schedule</Typography>
              <FormControl variant="outlined" size="small">
                <Select
                  value={selectedParticipant}
                  onChange={handleParticipantChange}
                  displayEmpty
                  input={<InputBase />} // This will make the select look like a chip
                  IconComponent={() => null} // Removes default dropdown icon
                  renderValue={
                    selected => (
                      <Chip
                        icon={<EyeIcon style={{ height: 20, width: 20 }} />}
                        label={`Viewing for ${selected || 'everyone'}`}
                        clickable
                        onClick={(event) => event.stopPropagation()} // Prevents the select from closing when clicking the chip
                      />
                    )
                  }
                  sx={{ minWidth: 200 }}
                >
                  {participants.map((participant, index) => (
                    <MenuItem key={index} value={participant}>
                      {participant}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              dateClick={handleDateClick}
            />
          </Stack>
        </Container>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            fullWidth
            variant="outlined"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Event Description"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
          />
          <Typography sx={{ mt: 2 }}>Choose a Form</Typography>
          <Typography variant="body2" color="text.secondary">
            Select a form for participants to complete on their mobile.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed grey',
              borderRadius: 1,
              mt: 2,
              minHeight: 100,
              width:160,
              cursor: 'pointer',
              ':hover': {
                backgroundColor: 'whitesmoke',
              },
            }}
            onClick={() => console.log("Add form clicked")}
          >
            <PlusIcon style={{ height: 40, width: 40 }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </DialogActions>
      </Dialog>
      
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
