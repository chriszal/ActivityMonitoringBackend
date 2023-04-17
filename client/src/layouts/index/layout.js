import { Box, Typography, Tab, Tabs, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Layout = (props) => {
  const { children } = props;
  const router = useRouter();
  const [value, setValue] = useState(() => {
    switch (router.pathname) {
      case '/':
        return 0;
      case '/about':
        return 1;
      case '/contact':
        return 2;
      default:
        return 0;
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: '100vh',
          py: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            px: 6,
            mb: 6,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            <Logo />
          </Box>
          <Typography variant="h6" component="div" sx={{ ml: 2 }}>
            BehaveAI
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tabs
            value={value}
            aria-label="basic tabs example"
            centered
            onChange={handleChange}
            sx={{ mx: "auto" }}
          >
            <Tab label="Home" component={Link} href="/" />
            <Tab label="About" component={Link} href="/about" />
            <Tab label="Contact" component={Link} href="/contact" />
          </Tabs>
          <Box />
        </Box>

        <Container maxWidth="xl">
          <Box sx={{ p: 3 }}>
            {value === 0 && (
              <Grid container >
                {children}
              </Grid>
            )}
            {value === 1 && (
              <Grid container >
                {children}

              </Grid>
            )}
            {value === 2 && (
              <Grid container>
                {children}

              </Grid>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};
