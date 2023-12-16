import { useEffect, useState } from 'react';
import { Box, Grid,Link,Typography, Button, Tab, Tabs, OutlinedInput, InputAdornment, SvgIcon, List, ListItem, ListItemText, Divider } from '@mui/material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import ExclamationCircleIcon from '@heroicons/react/24/solid/ExclamationCircleIcon';

import NextLink from 'next/link';
import { useAuth } from 'src/hooks/use-auth';
import axiosInstance from 'src/utils/axios-instance';
import { Scrollbar } from 'src/components/scrollbar';
import { useRouter } from 'next/router';
import { useStudy } from 'src/providers/study-provider';

const StudySelectPopup = ({onClose}) => {
  const [tabValue, setTabValue] = useState(0);
  const [studies, setStudies] = useState([]); 
  const { user } = useAuth();
  const router = useRouter();
  const { selectStudy } = useStudy();

  const NoStudiesRow = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.100', p: 1 }}>
      <SvgIcon size="small" sx={{  mr: 1 }}><ExclamationCircleIcon /></SvgIcon>
      <Typography sx={{fontSize: '0.75rem'}} variant="body2">There's no studies here.</Typography>
    </Box>
  );

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axiosInstance.get(`/studies/user/${user.id}`);
        setStudies(response.data);
      } catch (error) {
        console.error("Error fetching studies:", error);
      }
    };

    fetchStudies();
  }, []);

  const filteredStudies = () => {
    switch (tabValue) {
      case 0:
        return studies.filter(study => study.owners.includes(user.id));
      case 1:
        return studies.filter(study => study.study_coordinators.includes(user.id));
      case 2:
        return studies.filter(study => study.study_assistants.includes(user.id));
      default:
        return studies;
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStudyClick = (study) => {
    selectStudy(study)
    onClose()
    router.push(`/dashboard/studies/${study.study_id}/view`);
  };

  return (
    <Box p={4} sx={{ width: '100%', maxWidth: '600px', minWidth: '600px',minHeight: '450px',maxHeight: '450px' }}> {/* Explicitly setting maxWidth and minWidth */}
       <Box flexGrow={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Select a Study</Typography>
        <Button component={NextLink} href="/dashboard/create" variant="contained" color="primary" onClick={onClose}>New Study</Button>
      </Box>
      <OutlinedInput
        fullWidth
        placeholder="Search study"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ mb: 2 }}
      />
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="study tabs">
        <Tab label="OWNED" sx={{ fontSize: '0.7rem' }}/>
        <Tab label="COORDINATING" sx={{ fontSize: '0.7rem' }}/>
        <Tab label="ASSISTING" sx={{ fontSize: '0.7rem' }}/>
        <Tab label="ALL" sx={{ fontSize: '0.7rem' }}/>
      </Tabs>
      <Divider  /> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1 }}>
        <Typography sx={{ width: '10%', fontWeight: 'bold', fontSize: '0.7rem'  }}>ID</Typography>
        <Typography sx={{ width: '30%', fontWeight: 'bold', fontSize: '0.7rem'  }}>Title</Typography>
        <Typography sx={{ width: '40%', fontWeight: 'bold', fontSize: '0.7rem'  }}>Description</Typography>
        <Typography sx={{ width: '20%', fontWeight: 'bold', fontSize: '0.7rem'  }}>Participants</Typography>
      </Box>
      <Divider  /> 

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
          {filteredStudies().length > 0 ? (
            filteredStudies().map(study => (
          <Box key={study.study_id} sx={{ mb: 1 }}>
            <Grid container alignItems="center">
              <Grid item xs={1.2}>
                <Link component="button" onClick={() => handleStudyClick(study)} sx={{ fontSize: '0.7rem', color: 'primary.main', textDecoration: 'none' }}>
                  {study.study_id}
                </Link>
              </Grid>
              <Grid item xs={3.6}>
                <Typography  sx={{ width:'90%',fontSize: '0.7rem', display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                  {study.title}
                </Typography>
              </Grid>
              <Grid item xs={4.8}>
                <Typography  sx={{ width:'90%', fontSize: '0.7rem', display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                  {study.description}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography sx={{ fontSize: '0.7rem' }}>
                  {study.no_participants}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </Box>
        ))
        ) : (
          <NoStudiesRow />
        )}
      </Scrollbar>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={onClose} variant="text" sx={{ color: 'gray', '&:hover': { backgroundColor: 'lightgray', color: 'black' } }}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default StudySelectPopup;
