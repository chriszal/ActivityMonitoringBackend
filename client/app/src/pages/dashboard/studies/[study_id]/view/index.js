import Head from 'next/head';
import { Box, Button, SvgIcon, Container, Stack, Link, Typography, Breadcrumbs, Unstable_Grid2 as Grid } from '@mui/material';
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
import axiosInstance from 'src/utils/axios-instance';
import { ParticipantsSummaryCard } from 'src/sections/studies/overview/participant-summary'
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { useContext } from 'react';
import { DialogContext } from 'src/contexts/dialog-context';
import { REDCapInfo } from 'src/sections/studies/overview/redcap-popup-info'
import ExportDataDialog from 'src/sections/studies/overview/export-data-dialog';

const now = new Date();


const Page = () => {
  const router = useRouter();
  const { openDialog, closeDialog } = useContext(DialogContext);


  const [study, setStudy] = useState(null);
  const [participants, setParticipants] = useState([]);


  useEffect(() => {
    if (router.isReady) {
      const { study_id } = router.query;

      axiosInstance.get(`/study/${study_id}`)
        .then(response => {
          setStudy(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the study", error);
        });

      axiosInstance.get(`/registered/participants/study/${study_id}`)
        .then(response => {
          if (response.status === 200 && response.data.length > 0) {
            // Assuming response.data is an array of participants
            setParticipants(response.data.slice(0, 5)); // Get first 5 participants
          }
        })
        .catch(error => {
          console.error("There was an error fetching the participants", error);
        });
    }
  }, [router.isReady, router.query]);


  const handleSyncREDCapClick = () => {
    openDialog(
      '',
      '',
      <REDCapInfo
        onSync={() => {
          // Sync logic
        }}
        onGoToREDCap={() => {
          // Logic to go to REDCap
        }}
        onExportData={() => {
          // Logic to export REDCap data
        }}
        onClose={() => {
          closeDialog()
        }}
      />
    );
  };

  const handleExportClick = () => {
    openDialog(
      '',
      '',
      <ExportDataDialog

        onClose={() => {
          closeDialog()
        }}
      />
    );
  };

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
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
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
            </Box>
            <Box display="flex">
              <Button
                variant="outlined"
                color="error"
                sx={{ borderColor: 'red', display: 'flex', alignItems: 'center', mr: 2 }}
                endIcon={<img src="/assets/redcap.png" alt="REDCap" style={{ width: '26px', height: '26px' }} />}
                onClick={handleSyncREDCapClick}

              >
                Sync with REDCap
              </Button>
              <Button
                variant="outlined"
                color="info"
                sx={{ borderColor: 'info', display: 'flex', alignItems: 'center' }}
                endIcon={
                  <SvgIcon fontSize="small">
                    <ArrowDownOnSquareIcon />
                  </SvgIcon>
                }
                onClick={handleExportClick}
              >
                Export Study Data
              </Button>
            </Box>
          </Box>


          <Grid
            container
            spacing={3}
            mt={2}
          >
            <Grid xs={12} md={6} lg={4.2}>
              {study && <StudyDetails study={study} sx={{ height: '100%' }} />}
            </Grid>


            <Grid xs={12} md={6} lg={7.8} container >
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
                  value={35}
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

                  study={study}
                  participants={participants}
                  sx={{ height: '100%' }}

                />
              </Grid>


            </Grid>




            <Grid container spacing={3} mt={2} xs={12}>
              <Grid item xs={12} md={6} lg={8}>
                <OverviewWeeklySteps
                  chartSeries={[
                    { name: 'Male', data: [200, 160, 50, 108, 313, 14, 140] },
                    { name: 'Female', data: [102, 210, 40, 60, 240, 20, 90] }
                  ]}
                  sx={{ height: '100%' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <OverviewAgeRadar
                  chartSeries={[1700, 4500, 5200, 2900, 1800]}
                  labels={['20-29', '30-39', '40-49', '50-59', '60-69']}
                  sx={{ height: '100%' }}
                />
              </Grid>
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
