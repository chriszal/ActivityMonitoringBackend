import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import {  MenuItem, MenuList, Popover } from '@mui/material';
import NextLink from 'next/link'

export const OptionsPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      
      PaperProps={{ sx: {  width: 120 } }}
    >
      <MenuList
        disablePadding
        dense
        sx={{
            p: 0,
            bgcolor: 'rgba(255, 255, 255, 0.04)',
            '& > *': {
              borderRadius: 1
            }
          }}
      >
        {/* <MenuItem sx={{color:"neutral.400"}}> */}
        <MenuItem component={NextLink} href="/admin-dashboard/studies" onClick={onClose}>
          Admin
        </MenuItem>
        <MenuItem component={NextLink} href="/dashboard" onClick={onClose}>
          Member
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

OptionsPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
