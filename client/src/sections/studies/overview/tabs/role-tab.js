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

const RoleTabContent = ({ roleData }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>{roleData.roleName}s</Typography> 

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField fullWidth placeholder={`Search ${roleData.roleName.toLowerCase()} by email...`} variant="outlined" />
                <Button color="primary" variant="contained" size="small" style={{ marginLeft: '10px' }}>Add</Button>
            </Box>

            <Grid container spacing={2}>
                {roleData.data.map((person, index) => (
                    <Grid item xs={12} sm={6} key={index}> {/* Grid sizing */}
                        <Box 
                            display="flex" 
                            alignItems="center" 
                            p={1} 
                            border={1} 
                            borderRadius="12px" 
                            borderColor="divider"
                        >
                            <Avatar style={{ width: '30px', height: '30px', fontSize: '1rem' }}> 
                                <SvgIcon fontSize="small"><UserIcon /></SvgIcon>
                            </Avatar>
                            <Box ml={2} style={{ overflow: 'hidden' }}>
                                <Typography variant="subtitle2" sx ={{fontSize:'0.8rem'}} noWrap>{person.fullName}</Typography> {/* Reduced font size */}
                                <Typography variant="body2"  sx ={{fontSize:'0.7rem'}} noWrap>{person.email}</Typography> {/* Reduced font size */}
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default RoleTabContent;
