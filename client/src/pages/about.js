import Head from 'next/head';
import { Box, Typography, Tab, Tabs, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as IndexLayout } from 'src/layouts/index/layout';
import { Logo } from 'src/components/logo';

const Page = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <Box sx={{ my: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 5 }}>About Us</Typography>
        <Typography variant="body1" sx={{ mb: 5 }}>
          RELEVIUM is a European project aimed at improving the quality of life of advanced pancreatic cancer patients through an AI-guided multimodal intervention, combining pain and cachexia management, nutrition, and physical activity.
        </Typography>
       
        <Typography variant="body1" sx={{ mb: 5 }}>
          Our mission is to use technology to improve healthcare outcomes and provide patients with better quality of life. We believe that by combining AI and multimodal interventions, we can create personalized care plans that address the specific needs of each patient and help them live their lives to the fullest.
        </Typography>
      </Box>
    </>
  );
}

Page.getLayout = (page) => (
  <IndexLayout>
    {page}
  </IndexLayout>
);

export default Page;
