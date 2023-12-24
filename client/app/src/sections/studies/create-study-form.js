import { useState, useRef } from 'react';
import { useContext } from 'react';
import { DialogContext } from 'src/contexts/dialog-context';
import { AlertContext } from 'src/contexts/alert-context';
import { UserSearch } from 'src/components/study-roles/user-search';
import { handleSearch } from 'src/components/study-roles/handle-search';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { UsersList } from './study-users-list';
import {
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  CardActions,
  CardContent, Select, MenuItem,
  Chip,
  SvgIcon, Slider,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid, Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText, useTheme,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import axiosInstance from 'src/utils/axios-instance';
import { generateAvatar } from 'src/utils/avatar-generator';
import NewtonsCradle from 'src/components/newtons-cradle-component';


const validationSchema = Yup.object({
  study_id: Yup.string().required('Study ID is required').max(20, 'Study ID must be less than 20 characters long').matches(/^[a-zA-Z0-9]+$/, 'Study ID can only contain alphanumerics and no spaces'),
  title: Yup.string().required('Title is required').max(500, 'Title must be less than 500 characters long'),
  description: Yup.string().required('Description is required').max(4000, 'Description must be less than 4000 characters long'),
  no_participants: Yup.number().required('Number of participants is required').min(1, 'Number of participants must be between 1 and 100').max(100, 'Number of participants must be between 1 and 100'),

});


export const CreateStudyForm = () => {
  const theme = useTheme();

  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchedEmails, setSearchedEmails] = useState([]);
  const [roleToAdd, setRoleToAdd] = useState('owner');
  const searchBarRef = useRef(null);

  const [usersWithRoles, setUsersWithRoles] = useState([]);


  const { openDialog, closeDialog } = useContext(DialogContext);
  const { showAlert } = useContext(AlertContext);
  const router = useRouter();
  const [userSearchResult, setUserSearchResult] = useState(null);

  const handleUnifiedSearch = async (inputValue, target) => {
    setAnchorEl(target);

    if (!inputValue.trim()) {
      setLoading(false);
      setUserSearchResult(null);
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/user/id/${inputValue.trim()}`);
      if (response.data && Object.keys(response.data).length > 0) {
        setUserSearchResult({
          email: inputValue.trim(),
          id: response.data.id
        });
      } else {
        setUserSearchResult({
          error: "No user found"
        });
      }
    } catch (error) {
      setUserSearchResult({
        error: "An error occurred while searching."
      });
    } finally {
      setLoading(false);
    }
  };

  const addUserWithRole = (user, role, id) => {
    console.log("Before adding: ", usersWithRoles);

    const newUser = {
      email: user,
      role: role,
      id: id
    };
    setUsersWithRoles(prevUsers => [...prevUsers, newUser]);

    console.log("After adding: ", [...usersWithRoles, newUser]);
  };


  const closePopover = () => {
    setAnchorEl(null);
  };
  const onSubmit = async (values) => {
  const ownerExists = usersWithRoles.some(user => user.role === 'owner');

  if (!ownerExists) {
    showAlert('At least one Owner is required!', 'error');
    return;
  }

    const dialogText = 'Are you sure you want to create this study?';
    const dialogActions = (
      <>
        <Button autoFocus onClick={closeDialog}>
          Back
        </Button>
        <Button onClick={async () => {
          const { ...postData } = values;
          let study_coordinators = [];
          let study_assistants = [];
          let study_owners = [];
          usersWithRoles.forEach(userWithRole => {
            switch (userWithRole.role) {
              case 'coordinator':
                study_coordinators.push(userWithRole.id);
                break;
              case 'assistant':
                study_assistants.push(userWithRole.id);
                break;
              case 'owner':
                study_owners.push(userWithRole.id);
                break;
              default:
                break;
            }
          });

          postData.study_coordinators = study_coordinators;
          postData.study_assistants = study_assistants;
          postData.study_owners = study_owners;
          closeDialog();
          console.log('Submitted', postData);
          try {
            const response = await axiosInstance.post('/studies', postData);
            console.log(response.data);
            showAlert('Study created successfully!', 'success');
            router.push(`/admin-dashboard/studies/${encodeURIComponent(postData.study_id)}/view`);
          } catch (error) {
            console.error("There was an error creating the study.", error);

            // Check if error response exists
            if (error.response) {
              // Application-level error returned by the server
              showAlert(error.response.data.message || 'An error occurred while trying to create your study.', 'error');
            } else {
              // Network error or issue reaching the server
              showAlert('Unable to reach the server. Please check your connection or contact an Admin.', 'error');
            }
          }
        }} autoFocus>
          Create
        </Button>
      </>
    );
    openDialog('Confirmation', dialogText, dialogActions);
  };


  const formik = useFormik({
    initialValues: {
      study_id: '',
      title: '',
      description: '',
      no_participants: '',
      study_owners: [],
      study_coordinators: [],
      study_assistants: [],
    },
    validationSchema,
    onSubmit
  });



  const handleDelete = (index) => {
    const updatedEmails = [...searchedEmails];
    updatedEmails.splice(index, 1);
    setSearchedEmails(updatedEmails);
};


  return (
    <div>
      <form
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Stack spacing={3}>
          {/* Basic Details Card */}
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6">Basic Details</Typography>

                </Grid>
                <Grid
                  xs={12}
                  md={8}

                >
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Specify a Unique Study ID"
                      name="study_id"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      required
                      value={formik.values.study_id}
                      error={formik.touched.study_id && Boolean(formik.errors.study_id)}
                      helperText={formik.touched.study_id && formik.errors.study_id}
                    />
                    <Box position="relative" paddingBottom={2}>
                      <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            formik.handleChange(e);
                          }
                        }}
                        required
                        value={formik.values.title}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                      />
                      <Typography
                        variant="caption"
                        style={{
                          position: 'absolute',
                          bottom: 5,
                          right: 10,
                          color: formik.values.title.length >= 500 ? 'red' : undefined,
                          backgroundColor: 'rgba(255, 255, 255, 0.7)', // this ensures legibility
                          padding: '0 2px', // little padding for aesthetics
                        }}
                      >
                        {`${formik.values.title.length}/500`}
                      </Typography>
                    </Box>

                    <Box position="relative" paddingBottom={2}>
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        multiline
                        rows={3}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          if (e.target.value.length <= 4000) {
                            formik.handleChange(e);
                          }
                        }}
                        required
                        value={formik.values.description}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                      />
                      <Typography
                        variant="caption"
                        style={{
                          position: 'absolute',
                          bottom: 5,
                          right: 10,
                          color: formik.values.description.length >= 4000 ? 'red' : undefined,
                          backgroundColor: 'rgba(255, 255, 255, 0.7)', // this ensures legibility
                          padding: '0 2px', // little padding for aesthetics
                        }}
                      >
                        {`${formik.values.description.length}/4000`}
                      </Typography>
                    </Box>

                    

                  </Stack>

                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6">
                    Generate Participants
                  </Typography>
                  <Typography sx={{ mt: 2 }} variant="body2">
                    Define the number of participants for your study. Upon creating the study, unique registration codes will be automatically generated for each participant. Distribute these codes to individuals, enabling them to join the research via their mobile devices. If needed, you can later increase the number of participants, but note that removal is not possible after study creation.
                  </Typography>
                </Grid>
                <Grid xs={12} md={8}>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Number of Participants to be Generated"
                      name="no_participants"
                      type="number"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      required
                      value={formik.values.no_participants}
                      error={formik.touched.no_participants && Boolean(formik.errors.no_participants)}
                      helperText={formik.touched.no_participants && formik.errors.no_participants}
                      InputProps={{
                        inputProps: {
                          max: 100, min: 1
                        }
                      }}
                    />
                  </Box>
                  <Slider
                    value={formik.values.no_participants}
                    min={1}
                    max={100}
                    onChange={(e, newValue) => formik.setFieldValue("no_participants", newValue)}
                  />

                </Grid>
              </Grid>
            </CardContent>
          </Card>


          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6">Users & Roles</Typography>
                  <Typography sx={{ mt: 2 }} variant="body2">Add users to your study and assign them roles.</Typography>
                </Grid>
                <Grid xs={12} md={8} >
                  <div style={{ display: 'flex', alignItems: 'center' }}>

                    <div style={{ flex: '1', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

                      <TextField
                        value={searchValue}
                        ref={searchBarRef}
                        fullWidth
                        type='email'
                        placeholder="Search Users by Email"
                        style={{ flexGrow: 1 }}
                        onChange={(e) => {
                          setLoading(true);
                          setSearchValue(e.target.value);

                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === " ") {
                            e.preventDefault();
                            handleUnifiedSearch(e.target.value, e.currentTarget);
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <>
                              <SvgIcon sx={{ color: 'grey.500' }}><MagnifyingGlassIcon /></SvgIcon>

                              {searchedEmails.map((user, index) => (
                                <Chip
                                  key={index}
                                  size="small"
                                  label={user.email}
                                  onDelete={() => handleDelete(index)}
                                  sx={{ m: 0.5, marginTop: "20px" }}
                                />
                              ))}


                            </>

                          )
                        }}
                      />
                    </div>
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={closePopover}
                      PaperProps={{
                        style: {
                          width: searchBarRef.current ? searchBarRef.current.offsetWidth : undefined
                        }
                      }}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      {loading ? (
                        <List component="nav">
                          <ListItem style={{ justifyContent: 'center' }}>
                            <NewtonsCradle />
                          </ListItem>
                        </List>
                      ) : userSearchResult && (
                        userSearchResult.error ? (
                          <Typography padding={2}>{userSearchResult.error}</Typography>
                        ) : (
                          <List component="nav">
                            <ListItem onClick={() => {
                              if (!usersWithRoles.some(u => u.email === userSearchResult.email) &&
                                !searchedEmails.some(u => u.email === userSearchResult.email)) {
                                setSearchedEmails(prevEmails => [...prevEmails, { email: userSearchResult.email, id: userSearchResult.id }]);
                                setUserSearchResult(null);
                                closePopover();
                                setSearchValue("");
                              } else {
                                showAlert('Email already added!', 'warning');
                              }
                            }} style={{ cursor: 'pointer' }}>

                              <ListItemAvatar>
                                <Avatar style={{ width: '30px', height: '30px', fontSize: '1rem' }}
                                  src={generateAvatar(userSearchResult.email)}>
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={userSearchResult.email} />
                            </ListItem>
                          </List>
                        )
                      )}
                    </Popover>
                    {searchedEmails.length > 0 && (
                      <>
                        <Box mx={2} >
                          <Select
                            value={roleToAdd}
                            onChange={(e) => setRoleToAdd(e.target.value)}
                          >

                            <MenuItem value={"owner"}>Owner</MenuItem>
                            <MenuItem value={"coordinator"}>Coordinator</MenuItem>
                            <MenuItem value={"assistant"}>Assistant</MenuItem>
                          </Select>
                        </Box>
                        <Button variant="contained" size="large" onClick={() => {
                          const newUsers = searchedEmails.filter(email => !usersWithRoles.some(u => u.email === email));
                          if (newUsers.length === 0) {
                            showAlert('All emails are already added!', 'warning');
                          } else {
                            newUsers.forEach(user => {
                              addUserWithRole(user.email, roleToAdd, user.id);
                            });
                            
                            setSearchedEmails([]);
                            setSearchValue("");
                          }
                          console.log("Searched Emails: ", searchedEmails);
                          console.log("New Users to Add: ", newUsers);

                        }}>Add</Button>

                      </>
                    )}
                  </div>
                  <Typography variant="subtitle1" style={{ margin: '10px 0', paddingLeft: '16px' }}>Study Members</Typography>
                  {/* <Divider /> */}
                  <Box
                    sx={{
                      height: '200px',
                      overflowY: 'auto',
                      borderRadius: '4px',
                      border: (theme) => `1px solid ${theme.palette.success.main}`,
                      marginTop: '16px',
                      backgroundColor: theme.palette.grey[100],
                    }}
                  >
                    {usersWithRoles.length > 0 ? (
                      <UsersList users={usersWithRoles} setUsers={setUsersWithRoles} />
                    ) : (
                      <div style={{ marginTop: '78px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <SvgIcon><UsersIcon /></SvgIcon>

                        <Typography variant="subtitle2" style={{ marginTop: '8px' }}>No users added.</Typography>
                      </div>
                    )}
                  </Box>



                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Stack>
        <CardActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >
            <Button type='submit' variant="contained" >
              Create
            </Button>
          </Stack>

        </CardActions>
      </form>

    </div >
  );
};
