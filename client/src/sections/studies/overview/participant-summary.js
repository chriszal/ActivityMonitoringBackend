import PropTypes from 'prop-types';
import {
  Box, Button, Typography, useTheme, Divider, Grid
} from '@mui/material';
import { Chart } from 'src/components/chart';
import { useRouter } from 'next/router';

export const ParticipantsSummaryCard = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { totalParticipants, registered, notRegistered, optOut } = props;


  // Convert the numbers into percentages
  const registeredPercentage = (registered / totalParticipants) * 100;
  const notRegisteredPercentage = (notRegistered / totalParticipants) * 100;
  const optOutPercentage = (optOut / totalParticipants) * 100;

  const chartOptions = {
    chart: {
      background: 'transparent',
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: false
          },
          total: {
            show: false
          },
          value: {
            formatter: function(val) {
              if (typeof val === 'number') {
                  return val.toFixed(2) + "%";
              }
              return val;
          }
          
          }
        }
      }
    },
    labels: ['Registered', 'Not Registered', 'Opt Out'],
    colors: [theme.palette.primary.main, theme.palette.warning.main, theme.palette.error.main]
  };

  const chartSeries = [registeredPercentage, notRegisteredPercentage, optOutPercentage];

  return (
    <Box border={1} borderRadius={1} borderColor={theme.palette.divider} p={2}>
      <Grid container>
        <Grid item xs={6}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="radialBar"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Total</Typography>
          <Typography variant="h5">{totalParticipants}</Typography>
          <Box mt={2}>
            <Typography variant="body2" component="div">
              <Box display="flex" justifyContent="space-between" mb={1}>
                <span style={{ color: theme.palette.primary.main }}>Registered</span>
                <span>{registered}</span>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <span style={{ color: theme.palette.warning.main }}>Not Registered</span>
                <span>{notRegistered}</span>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <span style={{ color: theme.palette.error.main }}>Opt Out</span>
                <span>{optOut}</span>
              </Box>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

ParticipantsSummaryCard.propTypes = {
  totalParticipants: PropTypes.number.isRequired,
  registered: PropTypes.number.isRequired,
  notRegistered: PropTypes.number.isRequired,
  optOut: PropTypes.number.isRequired,
};
