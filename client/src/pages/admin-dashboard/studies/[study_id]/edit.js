import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Divider, CardActions, Box, Button, SvgIcon, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { EditStudyForm } from 'src/sections/studies/edit-study-form';
import NextLink from 'next/link'
import ArrowLeft from '@heroicons/react/24/solid/ArrowLeftIcon';
import { useRouter } from 'next/router';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';

const Page = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { study_id } = router.query;
  useEffect(() => {
    axios.get(`https://api-generator.retool.com/L8N5dY/studies?study_id=${study_id}`)
      .then(response => {
        if (response.status == 200) {
          setData(response.data);
          setIsLoading(false);
        } else {
        }

      })
      .catch(error => {
      });

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <>
      <Head>
        <title>
          Study Edit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Button sx={{ color: 'black', marginLeft: -2, marginBottom: 2.1 }}
            component={NextLink}
            href="/admin-dashboard/studies"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowLeft />
              </SvgIcon>
            )}
          >Studies
          </Button>
          {isLoading ? (
            <>
              <Stack >
                <Skeleton variant="text" sx={{ fontSize: '2.2rem', marginBottom: "5px" }} width="15%" />
              </Stack>
              <Card>
                <CardHeader sx={{ marginBottom: "10px" }}
                  title="Edit study"
                />
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ m: -0.5 }}>
                    <Grid container spacing={3}>
                      <Grid
                        xs={12}
                        md={6}
                      >
                        <Skeleton variant="rounded" height={53} />
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                      >
                        <Skeleton variant="rounded" height={53} />
                      </Grid>
                      <Grid
                        xs={12}
                        md={12}
                      >
                        <Skeleton variant="rounded" height={105} />
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                        sx={{marginBottom:'25px'}}
                      >
                        <Skeleton variant="rounded" height={53} />
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                        sx={{marginBottom:'25px'}}
                      >
                        <Skeleton variant="rounded" height={53} />
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                        sx={{marginBottom:'10px'}}
                      >
                        <Skeleton variant="rounded" height={53} />
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                        sx={{marginBottom:'10px'}}
                      >
                        <Skeleton variant="rounded" height={53} />
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions >
                  <Button variant="contained" color="error" sx={{ marginLeft: 2 }} >
                    Delete Study
                  </Button>
                  <Stack sx={{ ml: 'auto', justifyContent: 'flex-end' }}
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >

                    <Button variant="text" sx={{ color: 'gray' }}>
                      Cancel
                    </Button>
                    <Button variant="contained" >
                      Update
                    </Button>

                  </Stack>
                </CardActions>
              </Card>

            </>) : (
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                {study_id}
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                <EditStudyForm 
                 study_id={data[0].study_id}
                 title={data[0].title}
                 description={data[0].description}
                 authors={[data[0].authors]}
                 no_participants={data[0].no_participants}
                 study_coordinators={[data[0].study_coordinators]}
                 study_assistants={[data[0].study_assistants]}/>
              </Grid>
            </div>
          </Stack>
          )}
        </Container>
      </Box>
    </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
