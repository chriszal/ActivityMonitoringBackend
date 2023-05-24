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
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

import NextLink from 'next/link';
import { CircularProgress } from '@mui/material';
import LoadingWaveComponent from 'src/components/loading-component';
const studyTypes = ['owned', 'coordinating', 'assisting'];


const StudyCard = ({ study }) => {
    const type = studyTypes[Math.floor(Math.random() * studyTypes.length)]; // randomly select a studyType
    const backgroundColor = type === 'owned' ? '#03c9a9' : type === 'coordinating' ? '#f64747' : '#4871f7'; // determine the background color based on the studyType
    const fadedBackgroundColor = `${backgroundColor}23`;// determine the faded background color based on the studyType
    const trimmedDescription = study.description.length > 200 ? study.description.slice(0, 200) + "..." : study.description;

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
            <Typography variant="h6" sx={{ mb: 1, mt: -3 }}>{study.title}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{trimmedDescription}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{`Authors: ${study.authors}`}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SvgIcon sx={{ mr: 0.5 }}><UsersIcon /></SvgIcon>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{study.no_participants}</Typography>
                </Box>
            </Box>
        </Card>
    );
};

StudyCard.propTypes = {
    study: PropTypes.object.isRequired
};

const StudiesGrid = ({ studies, isLoading, error }) => {
    const test = [];
    return (
        <Grid container spacing={2}>
            {isLoading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'calc(100vh - 424px)',
                        flexGrow: 1
                    }}
                >
                    <LoadingWaveComponent />
                </Box>
            )
                : (error !== "" ? (
                    <Alert
                        severity="error" style={{ textAlign: "center" }}>{error}
                    </Alert>)
                    : (studies.length > 0 ? (
                        studies.map((study) => (
                            <Grid item xs={12} sm={6} md={4} key={study.study_id}>
                                <StudyCard study={study} />
                            </Grid>
                        ))
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 'calc(100vh - 424px)',
                                textAlign: 'center',
                                "& > *": {
                                    maxWidth: '80%',
                                    marginBottom: '1rem'
                                },
                                flexGrow: 1
                            }}
                        >
                            <Typography variant="h4" sx={{ fontSize: '1.5rem' }}>No studies found</Typography>
                            <Typography variant="body1">It looks like you haven't created any studies yet.</Typography>
                            <Button component={NextLink}
                                href="/dashboard/studies/create" variant="contained" color="primary" size="large">Create a new study</Button>
                        </Box>
                    )))}
            {studies.length > 0 && (
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Add New Study</Typography>
                        <Button component={NextLink}
                            href="/dashboard/studies/create" variant="outlined" color="primary" sx={{ borderRadius: '50%', width: '40px', height: '60px', padding: 0 }}>
                            <SvgIcon><PlusIcon /></SvgIcon>
                        </Button>
                    </Card>
                </Grid>


            )}
        </Grid>
    );
};



StudiesGrid.propTypes = {
    studies: PropTypes.array.isRequired
};

export { StudiesGrid };
