import {
    Avatar,
    Box,
    Button,
    Grid,
    SvgIcon,
    TextField,
    Typography,
} from '@mui/material';
import UserIcon from '@heroicons/react/24/solid/UserIcon';

import { generateAvatar } from 'src/utils/avatar-generator';
import { Scrollbar } from 'src/components/scrollbar';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';



const RoleTabContent = ({ roleData }) => {
    return (
        <Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField fullWidth placeholder={`Search ${roleData.roleName.toLowerCase()} by email...`} variant="outlined" />
                <Button color="primary" variant="contained" size="small" style={{ marginLeft: '10px' }}>Add</Button>
            </Box>

            <Typography variant="h6" gutterBottom>{roleData.roleName}s</Typography>


            <Scrollbar
                sx={{
                    maxHeight: '285px',
                    '& .simplebar-content': {
                        height: '100%'
                    },
                    '& .simplebar-scrollbar:before': {
                        background: 'neutral.400'
                    }
                }}
            >
                <Grid container spacing={2}>
                    {roleData.data && roleData.data.length > 0 ? (
                        roleData.data.map((person, index) => (
                            <Grid item xs={12} sm={6} key={index}> {/* Grid sizing */}
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    p={1}
                                    border={1}
                                    borderRadius="12px"
                                    borderColor="divider"
                                >
                                    <Avatar style={{ width: '30px', height: '30px', fontSize: '1rem' }}
                                        src={generateAvatar(person.full_name)}>
                                    </Avatar>
                                    <Box ml={2} style={{ overflow: 'hidden' }}>
                                        <Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }} noWrap>{person.full_name}</Typography> {/* Reduced font size */}
                                        <Typography variant="body2" sx={{ fontSize: '0.7rem' }} noWrap>{person.email}</Typography> {/* Reduced font size */}
                                    </Box>

                                </Box>
                            </Grid>
                        ))
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="100%"
                            width="100%"
                            mt="100px"
                        >
                            <Typography variant="subtitle1" color="textSecondary">
                            <SvgIcon><UsersIcon /></SvgIcon>
                                No users
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Scrollbar>

        </Box>
    );
}

export default RoleTabContent;
