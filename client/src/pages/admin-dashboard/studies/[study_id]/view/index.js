import Head from 'next/head';
import { Box, Container, Stack,Link, Typography, Breadcrumbs, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreateStudyForm } from 'src/sections/studies/create-study-form';
import NextLink from 'next/link'
import { useRouter } from 'next/router'; 
import { useState, useEffect } from 'react';
import { subDays, subHours } from 'date-fns';
// import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/studies/overview/overview-budget';
import { OverviewParticipants } from 'src/sections/studies/overview/overview-participants';
import { OverviewLatestProducts } from 'src/sections/studies/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/studies/overview/overview-weekly-steps';
import { OverviewTasksProgress } from 'src/sections/studies/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/studies/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/studies/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/studies/overview/overview-traffic';



const now = new Date();


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
              Study Overview
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'Male',
                  data: [200, 160, 50, 108, 313, 14, 140]
                },
                {
                  name: 'Female',
                  data: [102, 210, 40, 60, 240, 20, 90]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Healthcare Erbology',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Makeup Lancome Rouge',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Skincare Soja CO',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Makeup Lipstick',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Healthcare Ritual',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewParticipants
              participants={[
                {
                  id: 'f69f88012978187a6c12897f',
                  gender: 'Female',
                  height: 170,
                  weight: 60,
                  createdAt: 1555016400000,
                  status: 'registered'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  gender: 'Male',
                  height: 185,
                  weight: 90,
                  createdAt: 1555016400000,
                  status: 'registered'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  gender: 'Female',
                  height: 180,
                  weight: 65,
                  createdAt: 1554930000000,
                  status: 'registered'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  gender: 'None',
                  height: 'None',
                  weight: 'None',
                  createdAt: 'None',
                  status: 'not registered'
                },
                
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
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
