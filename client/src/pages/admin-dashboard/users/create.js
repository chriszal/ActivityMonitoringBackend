import Head from 'next/head';
import { Box, Container, Stack,Link,Breadcrumbs, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreateUserForm } from 'src/sections/users/create-user-form';
import NextLink from 'next/link';

const Page = () => (
  <>
    <Head>
      <title>
        Study User 
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
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
             Create a new user
            </Typography>
          </div>
          <div>
            <Breadcrumbs separator="•" aria-label="breadcrumb">
              <Link component={NextLink}
                underline="hover"
                color="inherit"
                href="/admin-dashboard/users"
              >
                Users
              </Link>
              <Typography color="text.primary">Create</Typography>
            </Breadcrumbs>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
                <CreateUserForm />
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
