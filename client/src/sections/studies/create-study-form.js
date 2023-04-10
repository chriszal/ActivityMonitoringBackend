import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  CardActions,
  CardContent,
  Chip,
  SvgIcon,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import NextLink from 'next/link';
import ResponsiveDialog from 'src/components/responsive-dialog';
import Alert from '@mui/material/Alert';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';

export const CreateStudyForm = () => {
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [actions, setActions] = useState();
  const [coordinator_loading, setCoordinatorLoading] = useState(false);
  const [assistant_loading, setAssistantLoading] = useState(false);

  const handleClickOpen = (type) => {
    let dialogText = '';
    if (type === 'create') {
      dialogText = 'Are you sure you want to create this study?';
      setActions(
        <>
          <Button autoFocus onClick={handleDisagree}>
            Back
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Create
          </Button>
        </>
      );
    } else if (type === 'cancel') {
      dialogText = 'Are you sure you want to cancel?';
      setActions(
        <>
          <Button autoFocus onClick={handleDisagree}>
            Disagree
          </Button>
          <Button component={NextLink} href="/admin-dashboard/studies" autoFocus>
            Agree
          </Button>
        </>
      );
    }
    setOpen(true);
    setDialogText(dialogText);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    console.log('User agreed.');
    setOpen(false);
  };

  const handleDisagree = () => {
    console.log('User disagreed.');
    setOpen(false);
  };


  const [values, setValues] = useState({
    study_id: '',
    title: '',
    description: '',
    authors: '',
    no_participants: '',
    study_coordinators: [],
    study_coordinatorsInput: "",
    study_assistants: [],
    study_assistantsInput: ""
  });

  const [errors, setErrors] = useState({
    study_id: '',
    title: '',
    description: '',
    authors: '',
    study_coordinatorsInput: '',
    study_assistantsInput: ''
  });

  const handleChange = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;

      let newErrors = { ...errors };
      let errorMessage = '';

      switch (name) {
        case 'study_id':
          if (value.length > 10 || !value.match(/^[a-zA-Z0-9]+$/)) {
            errorMessage = 'Study ID must be less than 10 characters long and can only contain alphanumerics.';
          }
          break;
        case 'title':
          if (value.length > 100) {
            errorMessage = 'Title must be less than 100 characters long.';
          }
          break;
        case 'description':
          if (value.length > 1000) {
            errorMessage = 'Description must be less than 1000 characters long.';
          }
          break;
        case 'no_participants':
          if (value < 1 || value > 100) {
            errorMessage = 'Number of participants must be between 1 and 100.';
          }
          break;
        case 'study_coordinatorsInput':
          if (value.length < 1) {
            errorMessage = '';
          }
          break;
        case 'study_assistantssInput':
          if (value.length < 1) {
            errorMessage = '';
          }
          break;
        default:
          break;
      }

      newErrors[name] = errorMessage;

      setValues((prevState) => ({
        ...prevState,
        [name]: value
      }));

      setErrors(newErrors);
    },
    [errors]
  );
  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setOpen(false);
      console.log('Submitted', values);
      handleShowAlert();
    },
    [values, handleShowAlert]
  );


  const handleCoordinatorSearch = async () => {
    const coordinatorEmail = values.study_coordinatorsInput.trim();
    if (!coordinatorEmail) {

      return;
    }

    try {
      setCoordinatorLoading(true);
      const response = await axios.get(`https://api-generator.retool.com/L8N5dY/studies?study_coordinators=${coordinatorEmail}`);
      const coordinatorExists = response.data.length > 0;
      if (coordinatorExists) {
        // Check if coordinator already exists in the array
        if (!values.study_coordinators.includes(coordinatorEmail)) {
          setValues(prevValues => ({ ...prevValues, study_coordinators: [...prevValues.study_coordinators, coordinatorEmail] }));
          setErrors({ study_coordinatorsInput: "" });
          document.getElementsByName('study_coordinatorsInput')[0].value = '';
        } else {
          setErrors({ study_coordinatorsInput: "Coordinator already exists." });
        }
      } else {
        setErrors({ study_coordinatorsInput: "Coordinator not found." });
      }
    } catch (error) {
      console.error(error);
      setErrors({ study_coordinatorsInput: error });
    } finally {
      setCoordinatorLoading(false);
    }
  };

  const handleDeleteCoordinator = (index) => {
    setValues((prevValues) => ({
      ...prevValues,
      study_coordinators: prevValues.study_coordinators.filter(
        (value, i) => i !== index
      )
    }));
  };

  const handleAssistantSearch = async () => {
    const assistantEmail = values.study_assistantsInput.trim();
    if (!assistantEmail) {
      return;
    }


    try {
      setAssistantLoading(true)
      const response = await axios.get(`https://api-generator.retool.com/L8N5dY/studies?study_assistants=${assistantEmail}`);
      const assistantExists = response.data.length > 0;
      if (assistantExists) {
        // Check if assistant already exists in the array
        if (!values.study_assistants.includes(assistantEmail)) {
          setValues(prevValues => ({ ...prevValues, study_assistants: [...prevValues.study_assistants, assistantEmail] }));
          setErrors({ study_assistantsInput: "" });
          document.getElementsByName('study_assistantsInput')[0].value = '';
        } else {
          setErrors({ study_assistantsInput: "Assistant already exists." });
        }
      } else {
        setErrors({ study_assistantsInput: "Assistant not found." });
      }
    } catch (error) {
      console.error(error);
      setErrors({ study_assistantsInput: error });
    } finally {
      setAssistantLoading(false);
    }
  };

  const handleDeleteAssistant = (index) => {
    setValues((prevValues) => ({
      ...prevValues,
      study_assistants: prevValues.study_assistants.filter(
        (value, i) => i !== index
      )
    }));
  };


  return (
    <div>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Card>
          <CardHeader
            subheader="Please fill out all the information"
            title="Study"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Specify a Unique Study ID"
                    name="study_id"
                    onBlur={handleChange}
                    required
                    error={Boolean(errors.study_id)}
                    helperText={errors.study_id}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Title"
                    onBlur={handleChange}
                    required
                    name="title"
                    error={Boolean(errors.title)}
                    helperText={errors.title}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Description"
                    onBlur={handleChange}
                    name="description"
                    required
                    multiline
                    rows={3}
                    inputProps={{ maxLength: 12 }}
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Authors"
                    name="authors"
                    helperText="Please seperate with comma if more than one"
                    onBlur={handleChange}
                    required
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Number of Participants"
                    name="no_participants"
                    onChange={handleChange}
                    required
                    type="number"
                    error={Boolean(errors.no_participants)}
                    helperText={errors.no_participants}
                    InputProps={{
                      inputProps: {
                        max: 100, min: 1
                      }
                    }}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Type the email of a Coordinator"
                    name="study_coordinatorsInput"
                    required
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === " ") {
                        // alert(e.target.value);
                        handleCoordinatorSearch();
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <LoadingButton
                          loading={coordinator_loading}
                          onClick={handleCoordinatorSearch}
                          sx={{ color: 'grey.500', marginRight: "-12px", }}
                        // sx={{
                        //   height: '53px',
                        //   width: '47px',
                        //   marginRight: "-12px",
                        //   borderRadius: "0 4px 4px 0",
                        //   borderTopLeftRadius: 0,
                        //   borderBottomLeftRadius: 0,
                        //   backgroundColor: "grey.200",
                        //   border: "1px gray",
                        //   display: 'flex',
                        //   alignItems: 'center',
                        //   justifyContent: 'center',
                        //   "&:hover": {
                        //     backgroundColor: "grey.300",
                        //     borderColor: "grey.500"
                        //   }
                        // }}
                        >
                          <SvgIcon><MagnifyingGlassIcon /></SvgIcon>
                        </LoadingButton>

                      ),
                      startAdornment: (
                        Array.isArray(values.study_coordinators) && values.study_coordinators.map((coordinator, index) => (
                          <Chip
                            key={index}
                            size="small"
                            label={coordinator}
                            onDelete={() => handleDeleteCoordinator(index)}
                            sx={{ m: 0.5, marginTop: "20px" }}
                          />
                        ))
                      )
                    }}
                    error={Boolean(errors.study_coordinatorsInput)}
                    helperText={errors.study_coordinatorsInput}
                  />
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Type the email of a Assistant"
                    name="study_assistantsInput"
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === " ") {
                        handleAssistantSearch();
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <LoadingButton
                          loading={assistant_loading}
                          onClick={handleAssistantSearch}
                          sx={{ color: 'grey.500', marginRight: "-12px", }}
                        >
                          <SvgIcon><MagnifyingGlassIcon /></SvgIcon>

                        </LoadingButton>
                      ),
                      startAdornment: (
                        Array.isArray(values.study_assistants) && values.study_assistants.map((assistant, index) => (
                          <Chip
                            key={index}
                            size="small"
                            label={assistant}
                            onDelete={() => handleDeleteAssistant(index)}
                            sx={{ m: 0.5, marginTop: "20px" }}
                          />
                        ))
                      )
                    }}
                    error={Boolean(errors.study_assistantsInput)}
                    helperText={errors.study_assistantsInput}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
              <Button onClick={() => handleClickOpen('cancel')} variant="text" sx={{ color: 'gray' }}>
                Cancel
              </Button>
              <Button onClick={() => handleClickOpen('create')} variant="contained" >
                Create
              </Button>
            </Stack>

          </CardActions>
        </Card>
      </form>
      <ResponsiveDialog
        open={open}
        onClose={handleClose}
        title={"Confirmation"}
        message={dialogText}
        actions={actions}
      />
      {showAlert && (
        <div
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 9999
          }}
        >
          <Alert onClose={() => setShowAlert(false)}>Study created successfully!</Alert>
        </div>
      )}

    </div>
  );
};
