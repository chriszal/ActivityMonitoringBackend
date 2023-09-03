import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

const Home = () => {
    return (
        <Box id="home" sx={{ display: 'flex', alignItems: 'center',height: '840px',justifyContent: 'center', flexGrow: 1 }}>
            <Container>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ mt: 3 }}>
                        BEAM - Your Research Companion
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 3 }}>
                        Behavior Evaluation and Activity Monitoring made seamless. Unearth insights from real-world data with Beam.
                    </Typography>
                    <Button component={Link} href="/auth/login" variant="contained" sx={{ mt: 5 }}>
                        Begin Your Research Journey
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
