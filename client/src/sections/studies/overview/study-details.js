import PropTypes from 'prop-types';
import {
  Avatar,
  SvgIcon,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tabs,
  Tab,
  CardContent
} from '@mui/material';
import React, { useState } from 'react';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import AcademicCapIcon from '@heroicons/react/24/solid/AcademicCapIcon';
import DetailsTab from './tabs/details-tab';
import RoleTabContent from './tabs/role-tab';
import ParticipantsTab from './tabs/participants-tab';

export const StudyDetails = (props) => {
  const { study, sx } = props;
  const [tabValue, setTabValue] = useState(0); // for managing active tab



  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Card sx={sx}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 36,
              width: 36,
              borderRadius: '8px', // rounded square
            }}>
            <SvgIcon>
              <AcademicCapIcon />
            </SvgIcon>
          </Avatar>
        }
        title={study.id}
      />
      <Divider />
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ marginLeft: 3 }}>
        <Tab label="Details" />
        <Tab label="Participants" />
        <Tab label="Owners" />
        <Tab label="Cordinators" />
        <Tab label="Assistants" />
      </Tabs>
      <Divider />
      <CardContent>
        {tabValue === 0 && (
          <DetailsTab study={study} onUpdate={(updatedData) => {
            // Handle the update here e.g. API call or local state update
            console.log("Updated Data:", updatedData);
          }} />
        )}
        {tabValue === 1 && (
           <ParticipantsTab study={study} />

        )}

        {tabValue === 2 && (
            <RoleTabContent roleData={{ roleName: 'Owner', data: study.owners }} />

        )}
        {tabValue === 3 && (
            <RoleTabContent roleData={{ roleName: 'Coordinator', data: study.coordinators }} />

        )}
        {tabValue === 4 && (
           <RoleTabContent roleData={{ roleName: 'Assistant', data: study.assistants }} />

        )}
      </CardContent>
    </Card>
  );
};

StudyDetails.propTypes = {
  study: PropTypes.object.isRequired,
  sx: PropTypes.object,
};
