import { format , isValid} from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  'not registered': 'warning',
  registered: 'success',
  unregistered: 'error'
};
const formatDate = (value) => {
  // First, check if the value is numeric
  const timestamp = parseInt(value, 10);

  // If the parsed value is a valid number and not NaN, then format it
  if (!isNaN(timestamp) && isValid(new Date(timestamp))) {
    return format(new Date(timestamp), 'dd/MM/yyyy');
  }

  return 'None'; 
};
export const OverviewParticipants = (props) => {
  const { participants = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Study Participants" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Gender
                </TableCell>
                <TableCell sortDirection="desc">
                  Date of Birth
                </TableCell>
                <TableCell>
                  Height (cm)
                </TableCell>
                <TableCell>
                  Weight (kg)
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant) => {
                const createdAt = formatDate(participant.createdAt);

                return (
                  <TableRow
                    hover
                    key={participant.id}
                  >
                    <TableCell>
                      {participant.id}
                    </TableCell>
                    <TableCell>
                      {participant.gender}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      {participant.height}
                    </TableCell>
                    <TableCell>
                      {participant.weight}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[participant.status]}>
                        {participant.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewParticipants.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
