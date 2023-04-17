import Head from 'next/head';
import { Box, Typography, Button, Container } from '@mui/material';
import { Layout as IndexLayout } from 'src/layouts/index/layout';
import { Logo } from 'src/components/logo';
import Link from 'next/link';

const Page = () => {
  return (
    <>
      <Head>
        <title>Welcome to RELEVIUM</title>
      </Head>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            
            <Typography variant="h3" sx={{ mt: 3 }}>
              Welcome to RELEVIUM
            </Typography>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Improving quality of life for advanced pancreatic cancer patients through an AI-guided multimodal intervention
            </Typography>
            <Button component={Link} href="/auth/login" variant="contained" sx={{ mt: 5 }}>
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <IndexLayout>{page}</IndexLayout>;

export default Page;
