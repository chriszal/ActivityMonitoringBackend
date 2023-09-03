import React from 'react';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { Button,IconButton,Container,SvgIcon,Stack, Typography,Menu, Tab,useTheme , Tabs, Unstable_Grid2 as Grid } from '@mui/material';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Link as ScrollLink } from 'react-scroll';



const StyledLink = styled(Typography)`
  cursor: pointer;
  color: #FFFFFF;
  font-size: 2rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #888;
  }
`;
const SideNav = ({ isOpen, toggle }) => {

  const theme = useTheme();

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= theme.breakpoints.values.lg) {
        // Check if the side nav is open before toggling
        if (isOpen) {
          toggle();
        }
      }
    }

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Cleanup - remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, toggle, theme.breakpoints.values.lg]);

  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000',  // 100% opacity
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
      transition: 'transform 0.3s ease-in-out',
      zIndex: 1000,
      color: '#FFFFFF',
    },
    closeIcon: {
      position: 'absolute',
      top: '10px',
      right: '10px',
    },
    menu: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    }
  };

  return (
    <div style={styles.container}>
      {/* <IconButton style={styles.closeIcon} onClick={toggle} color="inherit">
        <SvgIcon fontSize="small">
          <XMarkIcon />
        </SvgIcon>
      </IconButton> */}
      <div style={styles.menu}>
      <ScrollLink 
          to="home" 
          smooth={true} 
          duration={500} 
          offset={-80} 
          style={{textDecoration: 'none'}} 
          onClick={toggle}
        >
          <StyledLink variant="h6">Home</StyledLink>
        </ScrollLink>
        
        <ScrollLink 
          to="about" 
          smooth={true} 
          duration={500} 
          offset={-80} 
          style={{textDecoration: 'none'}} 
          onClick={toggle}
        >
          <StyledLink variant="h6">About</StyledLink>
        </ScrollLink>

        <ScrollLink 
          to="contact" 
          smooth={true} 
          duration={500} 
          offset={-80} 
          style={{textDecoration: 'none'}} 
          onClick={toggle}
        >
          <StyledLink variant="h6">Contact Us</StyledLink>
        </ScrollLink>
        <Link href="/auth/login"  passHref>
          <Button variant="contained" color="primary" style={{ marginTop: '2rem' }} onClick={toggle}>Sign In</Button>
        </Link>
      </div>
    </div>
  );
}


export default SideNav;
