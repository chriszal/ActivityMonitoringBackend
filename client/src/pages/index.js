import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as IndexLayout } from 'src/layouts/index/layout';


const Page = () => (
  <>
    <Head>
      <title>
        BehaveAI
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <IndexLayout>
    {page}
  </IndexLayout>
);

export default Page;
