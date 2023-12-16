import Head from 'next/head';
import { useCallback, useMemo, useState, useEffect } from 'react';

import { Box, Button, SvgIcon, Container, Stack, Link, Typography, Breadcrumbs, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import axiosInstance from 'src/utils/axios-instance';
import { useContext } from 'react';
import { AlertContext } from 'src/contexts/alert-context';
import { ParticipantStepsChart } from 'src/sections/studies/participants/participant-steps-chart';
import { getWeekNumber } from 'src/utils/get-week-number';

async function fetchStepsData(filterType, filterValue, participantId) {
  try {
    const response = await axiosInstance.get("/participant/steps", {
      params: {
        [filterType]: filterValue,
        participant_id: participantId
      }
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching steps data:", error);
    throw error;
  }
}



function getLastWeek() {
  let now = new Date();
  now.setDate(now.getDate() - 7);  // subtract 7 days to get the previous week
  const week = getWeekNumber(now);
  const year = now.getFullYear();
  return `${year}-${week < 10 ? '0' + week : week}`;  // Ensure week has two digits
}
function getDateRangeOfWeek(year, week) {
  const firstDayOfYear = new Date(year, 0, 1);  // January 1st of the given year
  const days = 2 + (week - 1) * 7 - firstDayOfYear.getDay();  // Add 1 for the 1st of January
  const mondayOfWeek = new Date(year, 0, days);

  const start = new Date(mondayOfWeek);
  start.setHours(0, 0, 0, 0);  // Set start time to beginning of day

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);  // Set end time to end of day

  return {
    start: start,
    end: end
  };
}



function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short', // "Mon", "Tue", etc.
    year: 'numeric',
    month: 'short', // "Jan", "Feb", etc.
    day: 'numeric'
  });
}


const Page = () => {
  const router = useRouter();
  const { showAlert } = useContext(AlertContext);
  const [chartData, setChartData] = useState([]);
  const [filterType, setFilterType] = useState('year');
  const [filterValue, setFilterValue] = useState(new Date().getFullYear());

  const baseRoute = router.pathname.includes('/admin-dashboard/')
    ? '/admin-dashboard/studies/'
    : '/dashboard/studies/';

  useEffect(() => {
    if (router.isReady) {
      const { participant_id } = router.query;

      async function loadData() {
        try {
          const data = await fetchStepsData(filterType, filterValue, participant_id);

          const transformedData = Object.keys(data).map(key => {
            return isNaN(data[key]) || data[key] === 'NaN' ? 0 : data[key];
          });


          setChartData([{
            name: 'Steps',
            data: transformedData
          }]);
        } catch (error) {
          showAlert("Error loading steps data", "error");
          console.error("Error loading steps data:", error);
        }
      }

      loadData();
    }
  }, [router.isReady, filterType, filterValue]);


  const [dateRangeLabel, setDateRangeLabel] = useState('');

  useEffect(() => {
    // Assuming filterValue is in the format "YYYY-WW" for weeks
    if (filterType === 'week') {
      const [year, week] = filterValue.split('-');
      // You'll need a utility function to get the date range for a given year and week number
      const range = getDateRangeOfWeek(parseInt(year), parseInt(week));
      setDateRangeLabel(`${formatDate(range.start)} - ${formatDate(range.end)}`);
    } else if (filterType === 'day') {
      setDateRangeLabel(formatDate(new Date(filterValue))); // format the date for a single day
    } else if (filterType === 'year') {
      setDateRangeLabel(filterValue); // just show the year
    }
  }, [filterType, filterValue]);

  return (
    <>
      <Head>
        <title>
          Study Participants
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">
                    Participant Analytics
                  </Typography>
                </Stack>
              </Stack>
              <Breadcrumbs separator="•" aria-label="breadcrumb">
                
                <Link component={NextLink}
                  underline="hover"
                  color="inherit"
                  variant="subtitle2"
                  href={`${baseRoute}${router.query.study_id}/participants`}

                >
                  Participants
                </Link>
                <Typography variant="subtitle2" color="text.primary">Analytics</Typography>
              </Breadcrumbs>
            </div>
            <Typography variant="h6">
              Date Range: {dateRangeLabel}
            </Typography>
            <ParticipantStepsChart
              chartSeries={chartData}
              sx={{ height: '100%' }}
              filterType={filterType}
              setFilterType={setFilterType}
              setFilterValue={setFilterValue}
            />

          </Stack>
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
