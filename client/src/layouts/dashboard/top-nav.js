
import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';


import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Button,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { NotificationsPopover } from './notifications-popover';
import { generateAvatar } from 'src/utils/avatar-generator'
import { useAuth } from 'src/hooks/use-auth';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { user } = useAuth();
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const notificationsPopover = usePopover();
  const avatarUrl = generateAvatar(user.name);

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
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
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
            {!lgUp && (
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
