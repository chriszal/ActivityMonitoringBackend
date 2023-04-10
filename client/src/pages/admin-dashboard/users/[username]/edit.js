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

const Page = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { username } = router.query;
  useEffect(() => {
    axios.get(`https://api-generator.retool.com/bBorK0/users?username=${username}`)
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
          User Edit
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
          <Button sx={{ color: 'black', marginLeft: -2, marginBottom: 3 }}
            component={NextLink}
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
              <Stack >
                <Skeleton variant="text" sx={{ fontSize: '2.1rem', marginBottom: "-10px" }} width="37%" />
                <Skeleton variant="text" sx={{ fontSize: '1.1rem', marginBottom: "10px" }} width="15%" />
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
                      <Grid
                        xs={12}
                        md={6}
                        sx={{marginBottom:'15px'}}
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
                <Typography variant="h4">
                  {data[0].email}
                </Typography>
                <Typography fontWeight={500} fontSize={"0.825rem"} lineHeight={1.57}>
                  username: <Box sx={{ bgcolor: '#D3D3D3', borderRadius: 8, p: 0.1, display: 'inline-block' }}> &nbsp;  &nbsp;{username} &nbsp; &nbsp;</Box>
                </Typography>
              </div>
              <div>
                <Grid
                  container
                  spacing={3}
                >
                  <EditUserForm
                    username={data[0].username}
                    first_name={data[0].first_name}
                    sur_name={data[0].sur_name}
                    email={data[0].email}
                    roles={[data[0].roles, "coordinator"]}
                  />
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
