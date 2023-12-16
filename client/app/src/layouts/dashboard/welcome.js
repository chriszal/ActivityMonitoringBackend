import { useState } from 'react';
import { styled as style,Typography} from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { TopNav } from './top-nav';
import { usePathname } from 'next/navigation';
import { useAuth } from 'src/hooks/use-auth';
import styled from '@emotion/styled';


const LayoutRoot = style('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    padding: '0 20px', 
    [theme.breakpoints.up('lg')]: {
      padding: '0 40px', 
    }
  }));
  
  const LayoutContainer = style('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1200px', 
    margin: '0 auto', 
  });

const FooterText = styled('div')({
  textAlign: 'center',
  marginTop: 'auto',
  padding: '16px 0',
  fontSize: '0.8em',
});
export const Layout = withAuthGuard((props) => {
  const { children } = props;

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} isWelcomeLayout={true}/>
      
      <LayoutRoot>
        <LayoutContainer>
          {children}
          <FooterText> Beam © {new Date().getFullYear()} All rights reserved.</FooterText>

        </LayoutContainer>
      </LayoutRoot>
      
    </>
    
  );
});
