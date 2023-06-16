import PropTypes from 'prop-types';
import { Typography, Popover } from '@mui/material';

export const DescriptionPopover = (props) => {
  const { anchorEl, onClose, open, description } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ 
        sx: {  
          maxWidth: 600, 
          p: 2 
        } 
      }} 
    >
      <Typography variant="caption">
        {description}
      </Typography>
    </Popover>
  );
};

DescriptionPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  description: PropTypes.string
};
