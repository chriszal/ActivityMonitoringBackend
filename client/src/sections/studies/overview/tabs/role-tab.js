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
                            <Avatar style={{ width: '30px', height: '30px', fontSize: '1rem' }}
                             src={generateAvatar(person.fullName)}> 
                            </Avatar>
                            <Box ml={2} style={{ overflow: 'hidden' }}>
                                <Typography variant="subtitle2" sx ={{fontSize:'0.8rem'}} noWrap>{person.fullName}</Typography> {/* Reduced font size */}
                                <Typography variant="body2"  sx ={{fontSize:'0.7rem'}} noWrap>{person.email}</Typography> {/* Reduced font size */}
                            </Box>
                            
                        </Box>
                    </Grid>
                ))}
            </Grid>
            </Scrollbar>
        </Box>
    );
}

export default RoleTabContent;
