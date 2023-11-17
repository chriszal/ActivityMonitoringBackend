import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Link,
  Breadcrumbs,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreateUserForm } from 'src/sections/users/create-user-form';
import { CreateEmailRegistrationForm } from 'src/sections/users/create-email-registration-form';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Study User</title>
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
              <Typography variant="h4" sx={{mb:1}}>Create a new user</Typography>
              <Breadcrumbs separator="•" aria-label="breadcrumb">
                <Link
                  component={NextLink}
                  underline="hover"
                  color="inherit"
                  variant="subtitle2"
                  href="/"
                  onClick={() => router.back()}
                >
                  Users
                </Link>
                <Typography variant="subtitle2" color="text.primary">Create</Typography>
              </Breadcrumbs>
            </div>
            <div>
              <Grid container spacing={3}>
              <Grid item xs={12}>
                  <CreateEmailRegistrationForm />
                </Grid>
                <Grid item xs={12}>
                  <CreateUserForm />
                </Grid>
               
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
