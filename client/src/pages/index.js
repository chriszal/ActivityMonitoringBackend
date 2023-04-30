import Head from 'next/head';
import { Box, Typography, Button, Container } from '@mui/material';
import { Layout as IndexLayout } from 'src/layouts/index/layout';
import { Logo } from 'src/components/logo';
import Link from 'next/link';
import Card from 'src/components/meal-card';
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
            {/* <Card
              creationDate="2020-20-01"
              participantId="HUA_01"
              portion="Small"
              type="Dinner"
              studyId="dbi32iyg3276"
              image={<img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt="Alt text" />}
            /> */}
            
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <IndexLayout>{page}</IndexLayout>;

export default Page;
