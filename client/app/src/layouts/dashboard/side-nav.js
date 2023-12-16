import NextLink from 'next/link';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items as adminItems } from './admin-config';
import { getMemberItems ,supportItem} from './member-config';
import { SideNavItem } from './side-nav-item';
import { usePopover } from 'src/hooks/use-popover';
import { OptionsPopover } from './options-popover';


export const SideNav = (props) => {
  const { open, onClose, role,selectedStudy } = props;

  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const optionsPopover = usePopover();
  
  
  const items = pathname.startsWith('/admin-dashboard') && role === 'admin'
  ? adminItems
  : getMemberItems(selectedStudy?.study_id); 
  const dashboardName = pathname.startsWith('/admin-dashboard') ? "Admin" : "Member"; 
  const handleClick = () => {
    onClose();
  };
  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
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
            <Image src="/favicon-32x32.png" alt="Favicon" width={32} height={32} />

          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              ml: 1
            }}
          >
            <Typography
              color="inherit"
              variant="h6"
              sx={{ textAlign: 'center' }}
            >
              Harokopio University
            </Typography>
          </Box>
        </Box>
        <Box
        onClick={role === 'member' ? null :optionsPopover.handleOpen}
        ref={optionsPopover.anchorRef}
          sx={{
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 1,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            m: '20px',
            mt: 1,
            p: '12px'
          }}
        >
          <div>
            <Typography
              color="inherit"
              variant="subtitle1"
            >
              Dashboard
            </Typography>
            <Typography
              color="neutral.400"
              variant="body2"
            >
              {dashboardName}
            </Typography>
          </div>
          <SvgIcon
            fontSize="small"
            sx={{ color: 'neutral.500' }}
          >
            <ChevronUpDownIcon />
          </SvgIcon>
        </Box>
        <OptionsPopover
          anchorEl={optionsPopover.anchorRef.current}
          open={optionsPopover.open}
          onClose={optionsPopover.handleClose} />
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                  onClick={handleClick}
                />
              );
            })}
          </Stack>
        </Box>
        <Box flexGrow={1} />  {/* This spacer pushes the next Box to the bottom */}
<Box
  component="nav"
  sx={{
    px: 2,
    py: 3
  }}
>
  <Stack
    component="ul"
    spacing={0.5}
    sx={{
      listStyle: 'none',
      p: 0,
      m: 0
    }}
  >
    { role === 'member' && (
      <SideNavItem
        active={pathname === supportItem.path}
        icon={supportItem.icon}
        path={supportItem.path}
        title={supportItem.title}
        onClick={handleClick}
      />
    )}
  </Stack>
</Box>

      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
