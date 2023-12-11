import React ,{useState} from 'react';
import {
  Box,
  Typography,
  Switch,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel
} from '@mui/material';

export const SettingsTab = ({ study, onUpdate }) => {
    const [progress, setProgress] = useState(study.progress || 0);

    const handleProgressChange = (event) => {
      const newProgress = event.target.value;
      setProgress(newProgress);
      onUpdate({ ...study, progress: newProgress });
    };
  return (
    <Box sx={{ padding: 1 }}>
      {/* Study Progress Section */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Study Progress
        </Typography>
        <FormControl fullWidth>
          <Select
            id="progress-select"
            value={progress}
            onChange={handleProgressChange}
          >
            {[...Array(21).keys()].map(value => (
              <MenuItem key={value} value={value * 5}>{value * 5}%</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Notifications Section */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <FormControlLabel
          control={<Switch checked={study.notificationsEnabled} onChange={() => { /* Handle change */ }} />}
          label="Enable Notifications"
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Delete Study Section */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Delete Study
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Deleting a study is irreversible. Please be certain.
        </Typography>
        <Button color="error" variant="contained" onClick={() => { /* Handle delete */ }}>
          Delete Study
        </Button>
      </Box>
    </Box>
  );
};

