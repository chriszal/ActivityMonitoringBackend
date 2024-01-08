import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Card,
    Unstable_Grid2 as Grid,
    Typography,
    SvgIcon,
    Alert,
    Button,Divider,
    IconButton,
    Chip
} from '@mui/material';
import { useRouter } from 'next/router';

import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';

import NextLink from 'next/link';
import { CircularProgress } from '@mui/material';
import NewtonsCradleComponent from 'src/components/newtons-cradle-component';
import { useStudy } from 'src/providers/study-provider';



export const StudyCard = ({ study, userId  }) => {
    let type;
    const router = useRouter();

    const { selectStudy } = useStudy();

    if (study.owners.includes(userId)) {
        type = 'owned';
    } else if (study.study_coordinators.includes(userId)) {
        type = 'coordinating';
    } else if (study.study_assistants.includes(userId)) {
        type = 'assisting';
    }
    const backgroundColor = type === 'owned' ? '#03c9a9' : type === 'coordinating' ? '#f64747' : '#4871f7'; // determine the background color based on the studyType
    const fadedBackgroundColor = `${backgroundColor}23`;// determine the faded background color based on the studyType
    const trimmedDescription = study.description.length > 200 ? study.description.slice(0, 200) + "..." : study.description;
    const randomDate = new Date().toLocaleDateString();

    const handleSelectClick = () => {
        selectStudy(study)
        router.push(`/dashboard/studies/${study.study_id}/view`);
      };
      return (
        <Card
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '250px',
                border: '0.5px solid #e0e0e0',
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: 'white',
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                }
            }}
            onClick={handleSelectClick}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Chip
                    label={type}
                    sx={{
                        fontSize: '11px',
                        height: '25px',
                        bgcolor: backgroundColor,
                        fontWeight: 'bold',
                        color: 'white',
                        textTransform: 'uppercase',
                    }}
                />
                <IconButton>
                    <SvgIcon fontSize="small">
                        <EllipsisVerticalIcon />
                    </SvgIcon>
                </IconButton>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{study.study_id}</Typography>
            <Typography variant="h6">{study.title}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">Participants: {study.no_participants}</Typography>
            <Typography variant="body2">Created at: {randomDate}</Typography>
        </Card>
    );
};

StudyCard.propTypes = {
    study: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
};