import { Scrollbar } from 'src/components/scrollbar';
import { useState } from 'react';
import { generateAvatar } from 'src/utils/avatar-generator';

import { Avatar, Menu, Button, ListItemText, ListItem, ListItemAvatar, MenuItem, SvgIcon, Typography, Divider } from '@mui/material';

export const UsersList = ({ users, setUsers }) => {
    const [anchorMenu, setAnchorMenu] = useState(null);
    const [currentUserIndex, setCurrentUserIndex] = useState(-1);

    const handleMenuClick = (event, index) => {
        setAnchorMenu(event.currentTarget);
        setCurrentUserIndex(index);
    };

    const handleCloseMenu = () => {
        setAnchorMenu(null);
        setCurrentUserIndex(-1);
    };

    const changeUserRole = (newRole) => {
        const updatedUsers = [...users];
        updatedUsers[currentUserIndex].role = newRole;
        setUsers(updatedUsers);
        handleCloseMenu();
    };

    return (
        <Scrollbar  sx={{
            maxHeight: '350px',
            '& .simplebar-content': {
                height: '100%'
            },
            '& .simplebar-scrollbar:before': {
                background: 'neutral.400'
            }
        }}>
            {users.map((user, index) => (
                <ListItem
                    key={index}
                    button
                    style={{ cursor: 'pointer', marginBottom: '5px' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9e9e9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                    <ListItemAvatar>
                        <Avatar src={generateAvatar(user.email)} />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="body1">{user.email}</Typography>} />
                    <Button
                        endIcon={<SvgIcon><path d="M5 7l5 5 5-5H5z" /></SvgIcon>}
                        onClick={(event) => handleMenuClick(event, index)}
                    >
                        <Typography variant="body2">{user.role}</Typography>
                    </Button>
                    
                </ListItem>
                
            ))}
            
            <Menu
                anchorEl={anchorMenu}
                keepMounted
                open={Boolean(anchorMenu)}
                onClose={handleCloseMenu}
                PaperProps={{
                    style: {
                        minWidth: anchorMenu?.offsetWidth || undefined,
                    },
                }}
            >
                <MenuItem onClick={() => changeUserRole('owner')}>
                    <Typography variant="body2" >Owner</Typography>
                </MenuItem>
                <MenuItem onClick={() => changeUserRole('coordinator')}>
                    <Typography variant="body2" >Coordinator</Typography>
                </MenuItem>
                <MenuItem onClick={() => changeUserRole('assistant')}>
                    <Typography variant="body2" >Assistant</Typography>
                </MenuItem>
            </Menu>
        </Scrollbar>
    );
};
