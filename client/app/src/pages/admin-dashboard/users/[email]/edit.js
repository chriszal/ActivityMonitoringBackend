import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Divider, CardActions, Box, Button, SvgIcon, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { EditUserForm } from 'src/sections/users/edit-user-form';
import ArrowLeft from '@heroicons/react/24/solid/ArrowLeftIcon';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import axiosInstance from 'src/utils/axios-instance';

const Page = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const { email } = router.query;
      console.log(email)
      
      axiosInstance.get(`/users/${email}`)
        .then(response => {
          if (response.status == 200) {
            setData(response.data);
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [router.isReady, router.query]);
  

  useEffect(() => {
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
          User Edit
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
          <Button sx={{ color: 'black', marginLeft: -2, marginBottom: 3 }}
            component={NextLink}
            variant="subtitle2"
            href="/admin-dashboard/users"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowLeft />
              </SvgIcon>
            )}
          >Users
          </Button>
          {isLoading ? (
            <>
              <Stack  >
                <Skeleton variant="text" sx={{ fontSize: '1.8rem'}} width="30%" />
                <Skeleton variant="text" sx={{ fontSize: '1.3rem', marginBottom: "10px" }} width="20%" />
              </Stack>
              <Card>
                <CardHeader sx={{ marginBottom: "13px" }}
                  title="Edit user"
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
                      
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions >
                  <Button variant="contained" color="error" sx={{ marginLeft: 2 }} >
                    Delete User
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
                <Typography variant="h4" sx={{mb:2}}>
                  {data.email}
                </Typography>
                <Typography fontWeight={500} fontSize={"0.825rem"} lineHeight={1.57}>
                  id: <Box sx={{ bgcolor: '#D3D3D3', borderRadius: 8, p: 0.1, display: 'inline-block' }}> &nbsp;  &nbsp;{data.id} &nbsp; &nbsp;</Box>
                </Typography>
              </div>
              <div>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid item xs={12}>
                  <EditUserForm 
                    first_name={data.first_name}
                    last_name={data.last_name}
                    email={data.email}
                    roles={data.roles}
                  />
                  </Grid>
                 
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
