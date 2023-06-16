import Head from 'next/head';
import { Box, Container, Stack,Link, Typography, Breadcrumbs, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreateStudyForm } from 'src/sections/studies/create-study-form';
import NextLink from 'next/link'
import { useRouter } from 'next/router'; 
import { useState, useEffect } from 'react';

const Page = () => {
    const router = useRouter(); 

    useEffect(() => {
      if (router.isReady) {
        const { study_id } = router.query;
        
      }
    }, [router.isReady, router.query]);

    return(
  <>
    <Head>
      <title>
        Study Overview
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 2,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4" sx={{mb:1}}>
              Overview
            </Typography>
            <Breadcrumbs separator="•" aria-label="breadcrumb">
              <Link component={NextLink}
                underline="hover"
                color="inherit"
                onClick={() => router.back()}
                href="/"
              >
                Studies
              </Link>
              <Typography color="text.primary">Overview</Typography>
            </Breadcrumbs>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
