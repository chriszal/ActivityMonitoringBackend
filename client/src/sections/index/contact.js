import { Box, Typography, Container, TextField, Button } from '@mui/material';

const Contact = () => {
  return (
    <Box id="contact" sx={{ display: 'flex', alignItems: 'center',height: '800px', justifyContent: 'center', flexGrow: 1 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mt: 3 }}>
            Contact Us
          </Typography>
          <Box component="form" sx={{ mt: 5 }}>
            <TextField label="Name" fullWidth sx={{ mb: 3 }} />
            <TextField label="Email" fullWidth sx={{ mb: 3 }} />
            <TextField label="Message" multiline rows={4} fullWidth sx={{ mb: 3 }} />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
