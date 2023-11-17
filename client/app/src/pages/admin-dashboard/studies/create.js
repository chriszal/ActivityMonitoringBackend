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
    router.back(); 
  };
    return(
  <>
    <Head>
      <title>
        Create a Study
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
              Create a new study
            </Typography>
            <Breadcrumbs separator="•" aria-label="breadcrumb">
              <Link component={NextLink}
                underline="hover"
                variant="subtitle2"
                color="inherit"
                onClick={handleStudiesLinkClick}
                href="/"
              >
                Studies
              </Link>
              <Typography variant="subtitle2" color="text.primary">Create</Typography>
            </Breadcrumbs>
          </div>
          <div>
              <CreateStudyForm />
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
