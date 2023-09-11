import Head from 'next/head';
import { Box, Container, Stack, Link, Typography, Breadcrumbs, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreateStudyForm } from 'src/sections/studies/create-study-form';
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { subDays, subHours } from 'date-fns';
// import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewAverageDailySteps } from 'src/sections/studies/overview/overview-average-daily-steps';
import { OverviewParticipants } from 'src/sections/studies/overview/overview-participants';
import { StudyDetails } from 'src/sections/studies/overview/study-details';
import { OverviewWeeklySteps } from 'src/sections/studies/overview/overview-weekly-steps';
import { OverviewStudyProgress } from 'src/sections/studies/overview/overview-study-progress';
import { OverviewRegisteredParticipants } from 'src/sections/studies/overview/overview-registered-participants';
import { OverviewAgeRadar } from 'src/sections/studies/overview/overview-age-radar';

import { ParticipantsSummaryCard } from 'src/sections/studies/overview/participant-summary'

const now = new Date();


const Page = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { study_id } = router.query;

    }
  }, [router.isReady, router.query]);

  return (
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
              <Typography variant="h4" sx={{ mb: 1 }}>
                Study Overview
              </Typography>
              <Breadcrumbs separator="•" aria-label="breadcrumb">
                <Link component={NextLink}
                  underline="hover"
                  color="inherit"
                  variant="subtitle2"
                  onClick={() => router.back()}
                  href="/"
                >
                  Studies
                </Link>
                <Typography variant="subtitle2" color="text.primary">Overview</Typography>
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
            <Grid xs={12} md={6} lg={4}>
              <StudyDetails
                study={{
                  id: 'HUA',
                  title: 'Software system for recording signals',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id dolor placerat, placerat lorem a, molestie eros. Aenean volutpat, est id congue dignissim, urna leo tincidunt tortor, quis tristique massa nisi nec leo. In iaculis pharetra quam. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut suscipit magna eu neque facilisis, at gravida nulla feugiat. Cras dignissim sollicitudin diam id iaculis. Suspendisse ac turpis placerat, porta ex eget, consequat risus. Donec vitae rutrum erat.',
                  authors: ['Christos Zalachoris', 'Peter Smeichel'],
                  owners: [
                    {
                      fullName: 'Owner Name',
                      email: 'owner@example.com'
                    }
                  ],
                  coordinators: [
                    {
                      fullName: 'Coordinator One',
                      email: 'coordinator1@example.com'
                    },
                    {
                      fullName: 'Coordinator Two',
                      email: 'coordinator2@example.com'
                    }
                  ],
                  assistants: [
                    {
                      fullName: 'Assistant One',
                      email: 'assistant1@example.com'
                    },
                    {
                      fullName: 'Assistant Two',
                      email: 'assistant2@example.com'
                    }, {
                      fullName: 'Assistant Two',
                      email: 'assistant2@example.com'
                    }, {
                      fullName: 'Assistant Two',
                      email: 'assistant2@example.com'
                    } ,{
                      fullName: 'Assistant Two',
                      email: 'assistant2@example.com'
                    }
                  ]
                }}
                sx={{ height: '100%' }}
              />
            </Grid>

            <Grid xs={12} md={6} lg={8} container >
              <Grid
                xs={12}
                sm={4}
                lg={4}
              >
                <OverviewAverageDailySteps
                  difference={3}
                  positive
                  sx={{ height: '100%' }}
                  value="520"
                />
              </Grid>

              <Grid
                xs={12}
                sm={4}
                lg={4}
              >
                <OverviewStudyProgress
                  sx={{ height: '100%' }}
                  value={35.5}
                />
              </Grid>
              <Grid
                xs={12}
                sm={4}
                lg={4}
              >
                <OverviewRegisteredParticipants
                  difference={5}
                  positive={false}
                  sx={{ height: '100%' }}
                  value="23"
                />
              </Grid>
              <Grid
                xs={12}
              >
                <OverviewParticipants
                  participants={[
                    {
                      id: 'HUA_01',
                      gender: 'Female',
                      height: 170,
                      weight: 60,
                      createdAt: 1015016400000,
                      status: 'registered'
                    },
                    {
                      id: 'HUA_02',
                      gender: 'Male',
                      height: 185,
                      weight: 90,
                      createdAt: 1055016400000,
                      status: 'registered'
                    },
                    {
                      id: 'HUA_03',
                      gender: 'Female',
                      height: 180,
                      weight: 65,
                      createdAt: 1151930000000,
                      status: 'registered'
                    },
                    {
                      id: 'HUA_04',
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





            <Grid
              xs={12}
              lg={8}
            >
              <OverviewWeeklySteps
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
              <OverviewAgeRadar
                chartSeries={[1700, 4500, 5200, 2900, 1800]}  // Just a sample. Replace with the average steps of your age groups.
                labels={['20-29', '30-39', '40-49', '50-59', '60-69']}  // Replace with your age groups.
                sx={{ height: '100%' }}
              />

            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <ParticipantsSummaryCard
                totalParticipants={54}
                registered={23}
                notRegistered={26}
                optOut={5}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
