import React from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon, Button } from '@mui/material';

export const ParticipantsSearch = ({ onSearch, onExport }) => (
  <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <OutlinedInput
      defaultValue=""
      placeholder="Search participant"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
      onChange={(e) => onSearch(e.target.value)}
    />
    <Button
      color="inherit"
      startIcon={
        <SvgIcon fontSize="small">
          <ArrowDownOnSquareIcon />
        </SvgIcon>
      }
      onClick={onExport}
    >
      Export participants
    </Button>
  </Card>
);
