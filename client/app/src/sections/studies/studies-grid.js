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
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';

import NextLink from 'next/link';
import { CircularProgress } from '@mui/material';
import NewtonsCradleComponent from 'src/components/newtons-cradle-component';

import { StudyCard } from 'src/sections/studies/study-card'

export const StudiesGrid = ({ studies, isLoading, error, userId }) => {

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
                    <NewtonsCradleComponent />
                </Box>
            )
                : (error !== "" ? (
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '180px',
                                height: '100%',
                                width: '100%',
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
                    </Grid>

                )
                    : (studies.length > 0 ? (
                        studies.map((study) => (
                            <Grid item xs={12} sm={6} md={4} key={study.study_id}>
                                <StudyCard study={study} userId={userId} />
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
                            <Typography variant="body1">It looks like you haven&apos;t created any studies yet.</Typography>
                            <Button component={NextLink} sx={{ mt: 2 }}
                                href="/dashboard/create" variant="contained" color="primary" size="large">Create a new study</Button>
                        </Box>
                    )))}
            {studies.length > 0 && (
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Add New Study</Typography>
                        <Button component={NextLink}
                            href="/dashboard/create" variant="outlined" color="primary" sx={{ borderRadius: '50%', width: '40px', height: '60px', padding: 0 }}>
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


