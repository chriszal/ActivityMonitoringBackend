
import PropTypes from 'prop-types';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect, forwardRef } from 'react';
const ScrollLink = dynamic(() => import('react-scroll').then(mod => mod.Link), {
  ssr: false
});

import { Logo } from 'src/components/logo';

import {
  Button, IconButton, SvgIcon,
  Box,
  Stack,
  useMediaQuery, Tabs, Tab, Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;
const checkWhichInView = () => {
  const sections = ['home', 'about', 'contact'];
  let currentInView = 0;
  let maxAreaInView = 0;

  sections.forEach((sectionId, index) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {  // <- This is the check you need
      const rect = sectionElement.getBoundingClientRect();
      const areaInView = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      if (areaInView > maxAreaInView) {
        maxAreaInView = areaInView;
        currentInView = index;
      }
    }
  });


  return currentInView;
};



export const TopNav = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { value, handleChange, onNavOpen } = props;
  const [scrollNav, setScrollNav] = useState(false);
  const CustomScrollLink = forwardRef((props, ref) => (
    <ScrollLink {...props} forwardRef={ref} onClick={(e) => e.preventDefault()} />
  ));
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
    const inView = checkWhichInView();
    props.handleChange(null, inView);
  };


  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    return () => {
      window.removeEventListener('scroll', changeNav);
    };
  }, []);
  


  const toggleHome = () => {
    ScrollLink.scrollToTop();
  };

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
        position: 'sticky',
        top: 0,
        // backgroundColor: 'neutral.800',
        zIndex: theme => theme.zIndex.appBar,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2,
          margin: '0 auto',
          width: '100%',
          maxWidth: 1200,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
            }}
          >
            <Logo onClick={toggleHome} />
          </Box>
        </Box>

        {!smDown && (
          <Tabs
            value={value}
            centered
            onChange={handleChange}
            sx={{ flexGrow: 1 }}
          >
            <Tab label="Home" component={CustomScrollLink} to="home" smooth={true} sx={{ fontWeight: 'bold', fontSize: '1rem' }} />
            <Tab label="About" component={CustomScrollLink} to="about" smooth={true} sx={{ fontWeight: 'bold', fontSize: '1rem' }} />
            <Tab label="Contact" component={CustomScrollLink} to="contact" smooth={true} sx={{ fontWeight: 'bold', fontSize: '1rem' }} />
          </Tabs>
        )}
        <Box sx={{ flexGrow: 1 }}></Box>
        {!smDown && (
          <Link href="/auth/login" passHref>
            <Button variant="contained" color="primary" sx={{ fontSize: '1rem', padding: '6px 18px' }}>Sign In</Button>
          </Link>
        )}

        {smDown && (
          <IconButton onClick={onNavOpen}>
            <SvgIcon fontSize="small">
              <Bars3Icon />
            </SvgIcon>
          </IconButton>
        )}
      </Stack>
    </Box>
  );
};


TopNav.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func,
  onNavOpen: PropTypes.func
};