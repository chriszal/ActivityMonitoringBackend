import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';
import { GradientCanvas } from 'src/components/gradient-canvas';

export const Layout = (props) => {
  const { children } = props;

  return (
    <>
      <canvas id="gradient-canvas" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}></canvas>
      <GradientCanvas />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          component="header"
          sx={{
            left: 0,
            p: 3,
            position: 'fixed',
            top: 0,
            width: '100%'
          }}
        >
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            <Logo />
          </Box>
        </Box>
        <Box sx={{ height: '100hv' }}>{children}</Box>
      </Box>
    </>
  );
};


Layout.propTypes = {
  children: PropTypes.node
};
