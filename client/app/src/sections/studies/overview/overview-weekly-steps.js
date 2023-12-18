import PropTypes from 'prop-types';
import CalendarIcon from '@heroicons/react/24/solid/CalendarIcon';
import {
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  SvgIcon
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      },
      type: 'line'
    },
    colors: [theme.palette.info.main, theme.palette.error.main, 0.25],
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      curve: 'smooth',
      dashArray: [0, 5]  // First line solid, second line dotted
    },
    tooltip: {
      enabled: true,
      x: {
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: (val) => `${val}`,
      }
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
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const OverviewWeeklySteps = (props) => {
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions();

  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <IconButton
            color="inherit"
            size="medium"
          >
             <SvgIcon fontSize="medium">
                <CalendarIcon />
              </SvgIcon>
          </IconButton>
        )}
        title="Last Week - Steps"
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="line"  // Changed to line chart
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

OverviewWeeklySteps.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
