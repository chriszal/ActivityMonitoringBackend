import Head from 'next/head';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs, Tab, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfileDeletion } from 'src/sections/account/account-profile-deletion';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import {AccountNotificationsSettings } from 'src/sections/account/account-notifications-settings'
import { AccountPasswordChange } from 'src/sections/account/account-password-change';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Page = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    document.body.style.overflowY = 'scroll';
    return () => {
      document.body.style.overflowY = 'auto'; // reset to default when component unmounts
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          Account
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Account
              </Typography>
            </div>
            <div>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="General" {...a11yProps(0)} />
                  <Tab label="Notifications" {...a11yProps(1)} />
                  <Tab label="Settings" {...a11yProps(2)} />
                </Tabs>
              </Box>
            </div>
            <div>
              <TabPanel value={value} index={0}>
                <Grid
                  container
                  spacing={3}
                >
                  {/* <AccountProfileDetails /> */}
                  <Grid
                    xs={12}
                    md={12}
                  >
                    <AccountProfileDetails />
                  </Grid>
                  <Grid
                    xs={12}
                    md={12}
                  >
                     <AccountPasswordChange />
                  </Grid>
                  <Grid
                    xs={12}
                    md={12}
                  >
                     <AccountProfileDeletion />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
              <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={12}
                  ><AccountNotificationsSettings/></Grid>
                  
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                Coming Soon
              </TabPanel>

            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
