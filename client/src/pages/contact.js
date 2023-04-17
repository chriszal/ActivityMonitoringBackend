import Head from 'next/head';
import { Box, Typography, Container, TextField, Button } from '@mui/material';
import { Layout as IndexLayout } from 'src/layouts/index/layout';
import { Logo } from 'src/components/logo';

const Page = () => {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1  }}>
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
    </>
  );
};

Page.getLayout = (page) => <IndexLayout>{page}</IndexLayout>;

export default Page;
