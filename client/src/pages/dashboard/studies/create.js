import Head from 'next/head';
import { Box, Container, Stack,Link, Typography, Breadcrumbs, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreateStudyForm } from 'src/sections/studies/create-study-form';
import NextLink from 'next/link'
import { useRouter } from 'next/router'; 

const Page = () => {
    const router = useRouter(); 
    

  const handleStudiesLinkClick = (e) => {
    e.preventDefault();
    router.back(); // Use the `back` method to redirect the user to the previous page
  };
    return(
  <>
    <Head>
      <title>
        Study Create
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
            <Typography variant="h4">
              Create a new study
            </Typography>
          </div>
          <div>
            <Breadcrumbs separator="•" aria-label="breadcrumb">
              <Link component={NextLink}
                underline="hover"
                color="inherit"
                onClick={handleStudiesLinkClick}
                href="/"
              >
                Studies
              </Link>
              <Typography color="text.primary">Create</Typography>
            </Breadcrumbs>
          </div>

          <div>
            <Grid
              container
              spacing={3}
            >
              <CreateStudyForm />
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
