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
    Button,
    IconButton,
    Chip
} from '@mui/material';
import { useRouter } from 'next/router';

import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
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

    const handleSelectClick = () => {
        selectStudy(study)
        router.push(`/dashboard/studies/${study.study_id}/view`);
      };
    return (
        <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '250px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{study.study_id}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                        sx={{
                            fontSize: '11px',
                            height: '25px',
                            bgcolor: backgroundColor,
                            background: fadedBackgroundColor,
                            fontWeight: 'bold',
                            color: 'white',
                            textTransform: 'uppercase',
                            '& .MuiChip-label': {
                                color: backgroundColor // set the color of the text inside the chip
                            }
                        }}
                        label={type}
                    />
                </Box>
            </Box>
            <Typography variant="h6" sx={{ mb: -4, mt: -3 }}>{study.title}</Typography>
            <Typography variant="body2" sx={{ mb: 10 }}>{trimmedDescription}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SvgIcon sx={{ mr: 0.5 }}><UsersIcon /></SvgIcon>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{study.no_participants}</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <IconButton onClick={handleSelectClick} size="small" sx={{ ml: 1 }}>
          <SvgIcon>
            <ArrowRightIcon />
          </SvgIcon>
        </IconButton>
      </Box>
        </Card>
    );
};

StudyCard.propTypes = {
    study: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
  };