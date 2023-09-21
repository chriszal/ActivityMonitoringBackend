import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import CalendarIcon from '@heroicons/react/24/solid/CalendarIcon';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useState } from 'react';

import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent, TextField,
  CardHeader, Select, MenuItem,
  Typography, Popover,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';
import { getWeekNumber } from 'src/utils/get-week-number';
import { startOfWeek } from 'date-fns';


const useChartOptions = (filterType) => {
  const theme = useTheme();

  let categories;
  if (filterType === 'day') {
    categories = [
      '00:00-01:00', '01:00-02:00', '02:00-03:00', '03:00-04:00', '04:00-05:00', '05:00-06:00',
      '06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
      '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00',
      '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00'
    ];

  } else if (filterType === 'year') {
    categories = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  } else {
    categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: true,
      position: 'right',
      floating: false,
      fontSize: '14px',
      fontWeight: 400,
      labels: {
        colors: theme.palette.text.secondary
      },
      markers: {
        width: 14,
        height: 14,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: categories,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value === 'NaN' ? 'N/A' : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const ParticipantStepsChart = (props) => {
  const { chartSeries, sx, filterType, setFilterType, setFilterValue } = props;
  const chartOptions = useChartOptions(filterType);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate);
  const [tempFilterType, setTempFilterType] = useState(filterType);

  const handleTempDateChange = (date) => {
    if (tempFilterType === 'day') {
      setTempSelectedDate(date);
    } else if (tempFilterType === 'week') {
      const startOfTheWeek = startOfWeek(date, { weekStartsOn: 1 });
      setTempSelectedDate(startOfTheWeek);

    } else {
      setTempSelectedDate(date);
    }
  };


  const handleSyncClick = () => {
    setSelectedDate(tempSelectedDate);
    setFilterType(tempFilterType);

    if (tempFilterType === 'day') {
      setFilterValue(tempSelectedDate.toISOString().slice(0, 10));
    } else if (tempFilterType === 'week') {
      const weekNumber = getWeekNumber(tempSelectedDate);
      setFilterValue(`${tempSelectedDate.getFullYear()}-${weekNumber}`);
    } else {
      setFilterValue(tempSelectedDate.getFullYear().toString());
    }

    handleClose();
  };

  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <>
            <Button onClick={handleClick}
              color="inherit"
              endIcon={(
                <SvgIcon fontSize="small">
                  <CalendarIcon />
                </SvgIcon>
              )}
              size="medium"
              variant="text"
            >
              Choose a time window
            </Button>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <div style={{ padding: '16px' }}>
                <Select
                  value={tempFilterType}
                  onChange={(event) => setTempFilterType(event.target.value)}
                >
                  <MenuItem value="day">Day</MenuItem>
                  <MenuItem value="week">Week</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                </Select>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  {(tempFilterType === 'day' || tempFilterType === 'week') && (
                    <DatePicker
                      value={tempSelectedDate}
                      onChange={handleTempDateChange}
                      renderInput={(params) => <TextField {...params} variant="standard" helperText="" />}
                    />
                  )}
                  {tempFilterType === 'year' && (
                    <DatePicker
                      views={['year']}
                      value={tempSelectedDate}
                      onChange={handleTempDateChange}
                      renderInput={(params) => <TextField {...params} variant="standard" helperText="" />}
                    />
                  )}
                </LocalizationProvider>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSyncClick}
                >
                  Sync
                </Button>
              </div>
            </Popover>
          </>
        }
        title="Steps"
      />

      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>

    </Card>


  );
};
ParticipantStepsChart.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object,
  filterType: PropTypes.string.isRequired,
  setFilterType: PropTypes.func.isRequired,
  setFilterValue: PropTypes.func.isRequired
};
