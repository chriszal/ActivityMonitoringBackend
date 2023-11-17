import PropTypes from 'prop-types';
import { 
  Box,
  Card,
  CardContent,
  CardHeader,
  useTheme
} from '@mui/material';
import { Chart } from 'src/components/chart';

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      type: 'radar'
    },
    colors: [theme.palette.primary.main],
    dataLabels: {
      enabled: false
    },
    labels,
    legend: {
      show: false
    },
    stroke: {
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fillSeriesColor: false
    },
    markers: {
      size: 4
    },
    fill: {
      opacity: 0.1
    }
  };
};

export const OverviewAgeRadar = (props) => {
  const { chartSeries, labels, sx } = props;
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Average Daily Steps by Age Group" />
      <CardContent>
        <Chart
          height={300}
          options={chartOptions}
          series={[{
            name: 'Average Steps',
            data: chartSeries
          }]}
          type="radar"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

OverviewAgeRadar.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object
};
