import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Chip,
    Avatar,
    Box,
    Card,
    Checkbox, TextField,
    Button,
    Stack,
    Link,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    SvgIcon,
    IconButton, Menu, MenuItem
} from '@mui/material';
import { SeverityPill } from 'src/components/severity-pill';
import { useContext } from 'react';
import { DialogContext } from 'src/contexts/dialog-context';
import { AlertContext } from 'src/contexts/alert-context';
import { Scrollbar } from 'src/components/scrollbar';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import axiosInstance from 'src/utils/axios-instance';
import { SendRegistrationEmailDialog } from './participant-invitation';

import ArrowSmallRightIcon from '@heroicons/react/24/solid/ArrowSmallRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import AtSymbolIcon from '@heroicons/react/24/solid/AtSymbolIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';

import NextLink from 'next/link';
import NewtonsCradle from 'src/components/newtons-cradle-component';
import { useState } from 'react';
import { Fragment } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';


const statusMap = {
    PENDING: 'info',
    UNREGISTERED: 'error',
    REGISTERED: 'success',
    NONE: 'warning'
};

export const ParticipantsTable = (props) => {
    const router = useRouter();
  
    const baseRoute = router.pathname.includes('/admin-dashboard/')
      ? '/admin-dashboard/studies/'
      : '/dashboard/studies/';

    const {
        error = "",
        isLoading = true,
        count = 0,
        items = [],
        onPageChange,
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0
    } = props;

    const { openDialog, closeDialog } = useContext(DialogContext);
    const { showAlert } = useContext(AlertContext);
    const [showRegCode, setShowRegCode] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    const handleClick = (event, participant) => {
        setAnchorEl(event.currentTarget);
        setSelectedParticipant(participant);
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
        <Card>
            <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    ID
                                </TableCell>
                                <TableCell>
                                    Registration Code
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
                            {isLoading ? (
                                <TableRow>
                                    <TableCell align="center" colSpan={8} height={420}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <NewtonsCradle />
                                        </div>
                                    </TableCell>
                                </TableRow>)
                                : (error !== "" ? (
                                    <TableRow>
                                        <TableCell align="center" colSpan={8} >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mb: 3,
                                                }}
                                            >
                                                <img
                                                    alt="Server Issue"
                                                    src="/assets/errors/error-500.png"
                                                    style={{
                                                        display: 'block',
                                                        maxWidth: '100%',
                                                        width: 300,
                                                    }}
                                                />
                                                <Alert
                                                    severity="error"
                                                    style={{ textAlign: "center", backgroundColor: "white", fontWeight: "bold" }}
                                                >
                                                    {error}
                                                </Alert>
                                            </Box>
                                        </TableCell>

                                    </TableRow>)
                                    : (items.length > 0 ? (
                                        items.map((participant) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    key={participant.participant_id}
                                                >
                                                    <TableCell>
                                                        {participant.participant_id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {showRegCode[participant.participant_id] ? participant.reg_code : '•••••••••••'}
                                                        <IconButton onClick={() => setShowRegCode(prevState => ({
                                                            ...prevState,
                                                            [participant.participant_id]: !showRegCode[participant.participant_id]
                                                        }))}>
                                                            <SvgIcon fontSize="small">
                                                                {showRegCode[participant.participant_id] ? <EyeSlashIcon /> : <EyeIcon />}
                                                            </SvgIcon>
                                                        </IconButton>
                                                    </TableCell>

                                                    <TableCell>
                                                        {participant.gender || "None"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {participant.date_of_birth || "None"}
                                                    </TableCell>

                                                    <TableCell>
                                                        {participant.height || "None"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {participant.weight || "None"}
                                                    </TableCell>
                                                    <TableCell>
                                                        <SeverityPill color={statusMap[participant.register_status]}>
                                                            {participant.register_status}
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
                                                            <Tooltip title="Regenerate Code">
                                                                <IconButton onClick={() => { /* Regenerate Code Logic */ }}>
                                                                    <SvgIcon fontSize="small">
                                                                        <ArrowPathIcon />
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
                                        })) : (
                                        <TableRow>
                                            <TableCell colSpan={8} align="center">
                                                <Typography>No participants found.</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )))}
                        </TableBody>

                    </Table>
                </Box>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />

        </Card>
    );
};

ParticipantsTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number
};
