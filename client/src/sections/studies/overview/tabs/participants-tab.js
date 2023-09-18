import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { ParticipantsSummaryCard } from '../participant-summary';

const ParticipantsTab = ({ study }) => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push(`/admin-dashboard/studies/${study.id}/participants`);
    };

    return (
        <Box>
            <Typography variant="h6" mb={2}>Participants Overview</Typography>
            <ParticipantsSummaryCard
                totalParticipants={34}
                registered={12}
                notRegistered={19}
                optOut={2}
            />

            <Box mt={2} display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" onClick={handleRedirect}>
                    View All Participants
                </Button>
            </Box>
        </Box>
    );
};

ParticipantsTab.propTypes = {
    study: PropTypes.object.isRequired
};

export default ParticipantsTab;
