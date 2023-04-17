import {useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Box, Divider, IconButton, Tooltip, SvgIcon, Popover, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { Scrollbar } from 'src/components/scrollbar';

export const NotificationsPopover = (props) => {
    const { anchorEl, onClose, open } = props;
    // const { anchorEl, onClose, open, notifications, handleNotificationRemove } = props;

    const router = useRouter();


    const notifications = [
        {
            id: 1,
            message: 'You have a new message',
            time: '10:30 AM'
        },
        {
            id: 2,
            message: 'Your order has shipped',
            time: '11:45 AM'
        },
        {
            id: 3,
            message: 'A new user has signed up',
            time: '1:15 PM'
        },
        {
            id: 4,
            message: 'A new user has signed up',
            time: '1:15 PM'
        },
        {
            id: 5,
            message: 'A new user has signed up',
            time: '1:15 PM'
        },
        {
            id: 6,
            message: 'A new user has signed up',
            time: '1:15 PM'
        },
        {
            id: 7,
            message: 'A new user has signed up',
            time: '1:15 PM'
        }
    ];


    const handleNotificationRemove = (id) => {
        // Remove the notification with the given ID
    };
    const [hoveredId, setHoveredId] = useState(null);

    const handleItemMouseEnter = (id) => {
        setHoveredId(id);
    };

    const handleItemMouseLeave = () => {
        setHoveredId(null);
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={onClose}
            open={open}
            PaperProps={{ sx: { width: 350, height: 388 } }}
        >
            <Box sx={{ py: 1.5, px: 2 }}>
                <Typography variant="h6">Notifications</Typography>
            </Box>
            <Scrollbar
                sx={{
                    maxHeight: '283px',
                    '& .simplebar-content': {
                        height: '100%'
                    },
                    '& .simplebar-scrollbar:before': {
                        background: 'neutral.400'
                    }
                }}
            >
                <List sx={{ overflowY: 'auto'}}>
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <React.Fragment key={notification.id}>
                                
                                <ListItem
                                    sx={{
                                        backgroundColor: hoveredId === notification.id ? '#F6F6F7' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: '#F6F6F7',
                                            cursor: 'pointer'
                                        }
                                    }}
                                    onMouseEnter={() => handleItemMouseEnter(notification.id)}
                                    onMouseLeave={handleItemMouseLeave}
                                >
                                    <ListItemText
                                        primaryTypographyProps={{ variant: 'subtitle2' }}
                                        secondaryTypographyProps={{ variant: 'caption' }}
                                    >
                                        <Typography variant="subtitle2" color="textPrimary">{notification.message}</Typography>
                                        <Typography variant="caption" color="textSecondary">{notification.time}</Typography>
                                    </ListItemText>
                                    <Tooltip title="Remove"><IconButton
                                        onClick={() => handleNotificationRemove(notification.id)}
                                        sx={{
                                            position: 'absolute',
                                            top: '0.5rem',
                                            right: '0.5rem',
                                            padding: '0.5rem'
                                        }}
                                    >
                                        <SvgIcon sx={{ fontSize: '1.2rem' }}>
                                            <XMarkIcon style={{ stroke: 'gray', strokeWidth: 1 }}  />
                                        </SvgIcon>
                                    </IconButton>
                                    </Tooltip>

                                </ListItem>
                                <Divider />
                            </React.Fragment>

                        ))
                    ) : (
                        <Box sx={{ px: 2, py: 1 }}>
                            <Typography variant="body2">No notifications</Typography>
                        </Box>
                    )}

                </List></Scrollbar>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <Button
                    sx={{ color: "black" }}
                    href="/"
                    endIcon={(
                        <SvgIcon fontSize="small">
                            <ArrowRightIcon />
                        </SvgIcon>
                    )}
                >
                    See all
                </Button>
            </Box>
        </Popover>
    );
};

NotificationsPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired
    // notifications: PropTypes.array.isRequired,
    // handleNotificationRemove: PropTypes.func.isRequired,
};
