import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,Input,
    Stack,TextField,
    Typography, Unstable_Grid2 as Grid
} from '@mui/material';

import { useCallback, useState } from 'react';
export const AccountPasswordChange = () => {
    const [values, setValues] = useState({
        password: '',
        confirm: ''
    });

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardContent sx={{ pt: 2 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid xs={12} md={4}>
                                <Typography variant="h6">Change Password</Typography>
                            </Grid>
                            <Grid xs={12} md={8}>
                                
                                <Stack
                                    spacing={2}
                                    sx={{ maxWidth: 350 ,pl:1.5}}
                                >
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        onBlur={handleChange}
                                        type="password"
                                        value={values.password}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Password (Confirm)"
                                        name="confirm"
                                        onBlur={handleChange}
                                        type="password"
                                        value={values.confirm}
                                    />
                                </Stack>

                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained">
                        Update
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}
