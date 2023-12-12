import { format, isValid } from 'date-fns';
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
  Tooltip,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useRouter } from 'next/router';

import { useContext } from 'react';
import { DialogContext } from 'src/contexts/dialog-context';
import axiosInstance from 'src/utils/axios-instance';
import { SendRegistrationEmailDialog } from 'src/sections/studies/participants/participant-invitation'


const statusMap = {
  PENDING: 'info',
  UNREGISTERED: 'error',
  REGISTERED: 'success',
  NONE: 'warning'
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
  const router = useRouter();
  const { participants = [], study, sx } = props;
  const { openDialog, closeDialog } = useContext(DialogContext);


  const baseRoute = router.pathname.includes('/admin-dashboard/')
    ? '/admin-dashboard/studies/'
    : '/dashboard/studies/';

  const handleRedirect = () => {
    router.push(`${baseRoute}${study.study_id}/participants`);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedParticipant(null);
};

  const sendEmail = async (values, selectedParticipant) => {
    try {
        const postData = {
            email: values.email,
            reg_code: selectedParticipant.reg_code,
            participant_id: selectedParticipant.participant_id,
            study: selectedParticipant.study,
        };
        console.log(postData);
        const response = await axiosInstance.post('/participant/invitation', postData);

        if (response.status === 201) {
            showAlert("Email sent successfully!", "success");
        } else {
            showAlert(response.data.message || "Error sending email.", "error");
        }
    } catch (error) {
        if (error.response) {
            showAlert(error.response.data.message || "Error sending email.", "error");
        } else if (error.request) {
            showAlert("No response from the server. Please try again.", "error");
        } else {
            showAlert("Request error. Please try again.", "error");
        }
    } finally {
        handleClose();
        closeDialog();
    }
};
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
                <TableCell>
                  Actions
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
                      {participant.dateOfBirth}
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
                    <TableCell>
                      <Tooltip title="Send Registration Email">
                        <IconButton onClick={() => {
                          openDialog(
                            "Send Registration Email",
                            `Enter an email to send the registration code to ${participant.participant_id}`,
                            <SendRegistrationEmailDialog
                              onClose={handleClose}
                              onSend={sendEmail}
                              selectedParticipant={participant}
                            />
                          );
                        }}>
                          <SvgIcon fontSize="small">
                            <AtSymbolIcon />
                          </SvgIcon>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Participant Analytics">
                        <IconButton onClick={() => {
                          // View Participant Analytics Logic
                          router.push(`${baseRoute}HUA/participants/${participant.participant_id}`);
                        }}>
                          <SvgIcon fontSize="small">
                            <ArrowRightIcon />
                          </SvgIcon>
                        </IconButton>
                      </Tooltip>
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
          onClick={handleRedirect}
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
