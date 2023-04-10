import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Stack,
    Switch,
    Typography, Unstable_Grid2 as Grid
} from '@mui/material';
import { switchClasses } from "@mui/material/Switch";

import { styled } from '@mui/material/styles';
const MuiSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-disabled': {
      color: 'grey.500',
    },
    '& .MuiSwitch-track': {
      backgroundColor: theme.palette.mode === 'dark' ? '#BFBFBF' : '#BFBFBF',
      opacity: 1,
    },
  }));
export const AccountNotificationsSettings = () => (
    <Card>
        <CardContent sx={{ pt: 2 }}>
            <Box sx={{ m: -1.5 }}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid xs={12} md={4}>
                        <Typography variant="h6">Email</Typography>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <Stack spacing={2}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Stack spacing={1}  >

                                    <Typography variant="subtitle1">Updates</Typography>
                                    <Typography variant="body2">Blah Blah</Typography>
                                </Stack>
                                <MuiSwitch 
                                    inputProps={{ 'aria-label': 'checkbox with default state' }}
                                    sx={{ ml: 'auto' }} />
                            </Box>

                            <Divider />
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Stack spacing={1} >

                                    <Typography variant="subtitle1">Updates</Typography>
                                    <Typography variant="body2">Blah Blah</Typography>
                                </Stack>
                                <MuiSwitch sx={{ ml: "auto"}} />
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider />
                <Grid
                    container
                    spacing={3}
                    sx={{ pt: 3 }}
                >
                    <Grid xs={12} md={4}>
                        <Typography variant="h6">Push Notifications</Typography>
                    </Grid>
                    <Grid xs={12} md={8}>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Stack spacing={1} >

                                <Typography variant="subtitle1">Updates</Typography>
                                <Typography variant="body2">Blah Blah</Typography>
                            </Stack>
                            <MuiSwitch sx={{ ml: "auto"}} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </CardContent>
    </Card>
);
