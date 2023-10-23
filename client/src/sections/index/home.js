import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import { GradientCanvas } from 'src/components/gradient-canvas';

const Home = () => {
    return (
        <>
        <GradientCanvas/>
        <Box id="home"  sx={{ 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: ['100vh', '865px'],  
    }}>
            <Container>
                <Box  sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'center'
            }}>
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
        </>
    );
};

export default Home;
