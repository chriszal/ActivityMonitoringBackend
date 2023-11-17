import { Box, Typography, Container, Grid } from '@mui/material';

const About = () => {
  return (
    <Box
      id="about"
      sx={{
        minHeight: ['auto', '800px'],
        backgroundColor: 'neutral.800',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container>
        <Grid container spacing={3} alignItems="center">
          {/* Text part */}
          <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2,mt:5 }}>
              About Us
            </Typography>
            <Typography variant="h4" sx={{ mb: 5, color: 'white' }}>
              What is Beam?
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, color: 'white' }}>
              In the digital era, the potential of mobile devices for research is vast. Beam taps into this potential by providing researchers with a sophisticated platform to create and coordinate studies. Participants can easily collect vital sensor data through their mobile devices. From accelerometer data that translates into steps to intricate behavior analyses, Beam processes and presents the data in an understandable format. Beam aims to bridge the gap between data collection and meaningful research conclusions. Revolutionize your research methods with Beam.
            </Typography>
          </Grid>
          {/* Illustration part */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              {/* <a href="https://www.freepik.com/free-vector/visual-data-concept-illustration_9233858.htm#query=monitoring%20illustration&position=0&from_view=search&track=ais">Image by storyset</a> on Freepik */}
              <img
                alt="Server Issue"
                src="/assets/analysis-illustration.svg"
                style={{
                  display: 'block',
                  maxWidth: '100%',
                  width: 'auto', 
                  height: 'auto', 
                  maxHeight: '500px'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
