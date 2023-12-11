import { Button, Box, Typography, SvgIcon, Grid } from '@mui/material';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';

export const REDCapInfo = ({ onSync, onGoToREDCap, onExportData, onClose }) => {
  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button startIcon={<SvgIcon><ArrowLeftIcon /></SvgIcon>} onClick={onClose} />
        <Typography variant="h6" gutterBottom>
          REDCap Integration
        </Typography>
        <Box flexGrow={1} /> 
      </Box>
      <Box mt={4}>
        <Typography paragraph>
          REDCap is a secure web application for building and managing online surveys and databases. It is specifically designed to support data capture for research studies. Using REDCap's streamlined process for rapidly developing projects, you can create and design projects using an online method that allows for data entry and import, export data, and advanced features for data collection.
        </Typography>
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="contained" color="error" onClick={onSync}>
          Sync Now
        </Button>
      </Box>
      <Typography paragraph textAlign="center" mt={2}>
        When syncing, an email will be sent to you to set up a REDCap account. A new project will also be created in REDCap for you to explore and use.
      </Typography>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="outlined" color="error" onClick={onGoToREDCap} sx={{ mr: 1 }}>
          Go to REDCap
        </Button>
        <Button variant="outlined" color="info" onClick={onExportData}>
          Export REDCap Data
        </Button>
      </Box>
    </Box>
  );
};
