import Head from 'next/head';
import { Box, Container, Stack, Typography, Paper, Grid, SvgIcon, useTheme, useMediaQuery } from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import RecentForms  from 'src/sections/questionnaires/recent-forms'
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import { useRouter } from 'next/router';

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  p: 3,
  height: 150, 
  width: 180, 
  border: '2px solid', 
  borderColor: 'grey.400',
  borderRadius: '4px',
  margin: 'auto' ,
};

const Page = () => {
  const router = useRouter();
  const { study_id } = router.query;
  const handleEmptyFormClick = () => {
    const questionnaireId = uuidv4(); // Generate a random ID
    router.push(`/dashboard/studies/${study_id}/questionnaires/${questionnaireId}/edit`);
  };
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));

  // Calculate the number of boxes to render based on screen size
  const boxCount = isXs ? 2 : isSm ? 3 : isMd ? 4 : isLg ? 5 : 6; // Adjust as needed

  // Render boxes
  const renderBoxes = () => {
    const boxes = [];
    // First two boxes are special
    boxes.push(
      <Grid item  key="box1" onClick={handleEmptyFormClick} style={{ cursor: 'pointer' }}>
        <Box sx={{ ...boxStyle, backgroundColor: 'white' }} >
        
            <PlusIcon color='primary'/>
          </Box>
        <Typography>Empty form</Typography>
      </Grid>
    )
    const boxStyleWithImage = {
      ...boxStyle,
      backgroundImage: 'url(/assets/products/pain-form.jpeg)', // Update with the correct path to your image
      backgroundSize: 'cover', // Ensure the image covers the box
      backgroundPosition: 'center' // Center the image in the box
    };

    boxes.push(
      <Grid item key="box2">
        <Box sx={boxStyleWithImage}></Box>
        <Typography>Pain Level Template</Typography>
      </Grid>
    );
    // Add empty boxes
    for (let i = 2; i < boxCount; i++) {
      boxes.push(
        <Grid item   key={`box${i + 1}`}>
          <Box sx={boxStyle}></Box>
        </Grid>
      );
    }
    return boxes;
  };

  return (
    <>
      <Head>
        <title>Questionnaires</title>
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
            <Typography variant="h4">Questionnaires</Typography>

            {/* Top row for creating new forms */}
            <Paper sx={{ p: 3, backgroundColor: 'neutral.100' }}>
              <Typography variant="body1" sx={{ mb: 2 }}>Start a new form</Typography>
              <Grid container spacing={2} justifyContent="center" wrap="wrap"> {/* Adjust spacing and add wrap */}
                {renderBoxes()}
              </Grid>
            </Paper>

            {/* Section for recent forms */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Recent forms</Typography>
              <RecentForms />

            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
