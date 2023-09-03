import { useState } from 'react';
import { styled as style,Typography} from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { usePathname } from 'next/navigation';
import { useAuth } from 'src/hooks/use-auth';
import styled from '@emotion/styled';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = style('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = style('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

const FooterText = styled('div')({
  textAlign: 'center',
  marginTop: 'auto',
  padding: '16px 0',
  fontSize: '0.8em',
});
export const Layout = withAuthGuard((props) => {
  const { user } = useAuth();
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(true);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav role={user.role}
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <LayoutRoot>
        <LayoutContainer>
          {children}
          <FooterText> Beam © {new Date().getFullYear()} All rights reserved.</FooterText>

        </LayoutContainer>
      </LayoutRoot>
      
    </>
    
  );
});
