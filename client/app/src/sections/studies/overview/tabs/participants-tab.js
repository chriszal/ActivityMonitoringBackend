import { Box, Button,Card,CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { ParticipantsSummaryCard } from '../participant-summary';

const ParticipantsTab = ({ study }) => {
    const router = useRouter();
    const baseRoute = router.pathname.includes('/admin-dashboard/')
    ? '/admin-dashboard/studies/'
    : '/dashboard/studies/';

    const handleRedirect = () => {
        router.push(`${baseRoute}${study.study_id}/participants`);
    };

    return (
        <Box>
            <Typography variant="h6" mb={2}>Participants Overview</Typography>
            <ParticipantsSummaryCard
                totalParticipants={study.no_participants}
                registered={1}
                notRegistered={study.no_participants-1}
                optOut={0}
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
