import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
  Grid
} from '@mui/material';
import { Chart } from 'src/components/chart';

export const ParticipantsSummaryCard = (props) => {
  const theme = useTheme();
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
              return val.toFixed(2) + "%";
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
    <Card>
      <CardHeader title="Participants Summary" />
      <CardContent>
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
