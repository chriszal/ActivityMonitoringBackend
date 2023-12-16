
import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon'; // Import Chevron Down Icon
import AcademicCapIcon from '@heroicons/react/24/outline/AcademicCapIcon';
import { useStudy } from 'src/providers/study-provider';

import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Button,
  Stack,
  SvgIcon,
  Divider,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { NotificationsPopover } from './notifications-popover';
import { generateAvatar } from 'src/utils/avatar-generator'
import { useAuth } from 'src/hooks/use-auth';
import { Logo } from 'src/components/logo';
import { useContext } from 'react';
import { DialogContext } from 'src/contexts/dialog-context';

import StudySelectPopup from 'src/sections/study-selection';


const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 50;

export const TopNav = (props) => {
  const { user } = useAuth();
  const { onNavOpen, isWelcomeLayout } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const notificationsPopover = usePopover();
  const avatarUrl = generateAvatar(user.name);
  const { openDialog, closeDialog } = useContext(DialogContext);
  const { selectedStudy } = useStudy(); 
  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: isWelcomeLayout ? '100%' : { lg: `calc(100% - ${SIDE_NAV_WIDTH}px)` },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {isWelcomeLayout && (
              <Box sx={{ marginTop: '-4px', marginBottom: '-4px' }}>
                <Logo fillColor="black" width="70" height="32" />
              </Box>              
              )}

            {!lgUp && !isWelcomeLayout && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
           



          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >

{!isWelcomeLayout && (
              <Button
              variant="contained"
              startIcon={<SvgIcon><AcademicCapIcon /></SvgIcon>}
              endIcon={<SvgIcon><ChevronDownIcon /></SvgIcon>}
              sx={{
                height: '35px',
                textTransform: 'none',
                fontWeight: 'light',
                padding: '6px 12px',
                marginLeft: 3,
                borderRadius: 0.5,
                backgroundColor: 'common.white',
                color: 'neutral.800',
                border: '2px solid #dfdfdf', 
                '&:hover': {
                  backgroundColor: 'common.white',
                  borderColor: '#bfbfbf',
                },
              }}
              onClick={() => 
                openDialog(
                  '',
                  '',
                  <StudySelectPopup onClose={() => closeDialog()} />
                )
              }
            >
        {selectedStudy ? ` ${selectedStudy.study_id}` : "Select a Study"}
            </Button>
            

            )}
            <Tooltip title="Notifications">
              <IconButton
                onClick={notificationsPopover.handleOpen}
                ref={notificationsPopover.anchorRef}>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>

            <Button
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              variant="contained"
              sx={{ borderRadius: '50%', minWidth: 0, p: 0, bgcolor: 'common.white', border: '2px solid #dfdfdf' }}
            >
              <Avatar
                sx={{ height: 30, width: 30, margin: '2px' }}
                src={avatarUrl}
              />
            </Button>



          </Stack>
        </Stack>
        <Divider sx={{
          bgcolor: 'black'
        }} />
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
      <NotificationsPopover
        anchorEl={notificationsPopover.anchorRef.current}
        open={notificationsPopover.open}
        onClose={notificationsPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
