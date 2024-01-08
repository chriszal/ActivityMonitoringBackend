// edit.js
import React, { useState } from 'react';
import Head from 'next/head';
import { IconButton,Box, Container, TextField,Stack, Typography, Tabs, Tab, Paper, Divider, SvgIcon } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import SurveyComponent from 'src/sections/questionnaires/survey-component';
// Placeholder components for tab content
const QuestionsTab = () => (
  <Box>
    <SurveyComponent />
  </Box>
);const AnswersTab = () => <Box>Answers Content</Box>;
const SettingsTab = () => <Box>Settings Content</Box>;

const Page = () => {
  const [selectedTab, setSelectedTab] = useState('questions');
  const [title, setTitle] = useState('Enter title'); // Initial title
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const getTabContent = () => {
    switch (selectedTab) {
      case 'questions':
        return <QuestionsTab />;
      case 'answers':
        return <AnswersTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <QuestionsTab />;
    }
  };

  return (
    <>
      <Head>
        <title>{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isEditing ? (
                <TextField
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={toggleEdit}
                  autoFocus
                  size="small"
                />
              ) : (
                <Typography variant="h4">{title}</Typography>
              )}
              <IconButton onClick={toggleEdit} size="small">
                <SvgIcon>                <PencilIcon style={{ height: 20, width: 20 }} />
</SvgIcon>
              </IconButton>
            </Box>              <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Edit Form Tabs">
                <Tab label="Questions" value="questions" />
                <Tab label="Answers" value="answers" />
                <Tab label="Settings" value="settings" />
              </Tabs>
              <Divider/>
              {getTabContent()}
            
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
