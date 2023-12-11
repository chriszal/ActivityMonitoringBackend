import PropTypes from 'prop-types';
import {
  Box, Button,Card,CardContent, Typography, useTheme, Divider, Grid
} from '@mui/material';
import { Chart } from 'src/components/chart';
import { useRouter } from 'next/router';


export const ParticipantsSummaryCard = (props) => {
  const theme = useTheme();
  const { sx, totalParticipants, registered, notRegistered, optOut } = props;

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
              return typeof val === 'number' ? val.toFixed(2) + "%" : val;
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
    <Card sx={sx}>
      <CardContent>      
        <Grid container spacing={2}>
          {/* Text Section */}
          <Grid item xs={12} md={6}>
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

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="radialBar"
              height="100%"
              width="100%"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ParticipantsSummaryCard.propTypes = {
  totalParticipants: PropTypes.number.isRequired,
  registered: PropTypes.number.isRequired,
  notRegistered: PropTypes.number.isRequired,
  optOut: PropTypes.number.isRequired,
};
