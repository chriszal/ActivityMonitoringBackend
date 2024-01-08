import React, { useState } from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export const StudiesSearch = ({ onSearch }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    // Additional filter logic here if needed
  };

  return (
    <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <OutlinedInput
        defaultValue=""
        placeholder="Search study"
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500, flexGrow: 1 }}
        onChange={(e) => onSearch(e.target.value)}
      />
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel id="filter-select-label">Filter by</InputLabel>
        <Select
          labelId="filter-select-label"
          id="filter-select"
          value={filter}
          onChange={handleFilterChange}
          label="Filter by"
        >
          <MenuItem value="owned">Owned</MenuItem>
          <MenuItem value="coordinating">Coordinating</MenuItem>
          <MenuItem value="assisting">Assisting</MenuItem>
        </Select>
      </FormControl>
    </Card>
  );
};
