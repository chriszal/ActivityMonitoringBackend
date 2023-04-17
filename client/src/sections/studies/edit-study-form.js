import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Stack,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  SvgIcon,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import NextLink from 'next/link';
import ResponsiveDialog from 'src/components/responsive-dialog';
import Alert from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useRouter } from 'next/router';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';



export const EditStudyForm = (props) => {
  const router = useRouter();
  const { study_id } = props;
  const { title } = props;
  const { description } = props;
  const { authors } = props;
  const { no_participants } = props;
  const { study_coordinators } = props;
  const { study_assistants } = props;

  const [coordinator_loading, setCoordinatorLoading] = useState(false);
  const [assistant_loading, setAssistantLoading] = useState(false);


  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false);
  const [showUpdateFailAlert, setShowUpdateFailAlert] = useState(false);
  const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
  const [showDeleteFailAlert, setShowDeleteFailAlert] = useState(false);

  const [values, setValues] = useState({
    study_id: study_id,
    title: title,
    description: description,
    authors: authors,
    no_participants: no_participants,
    study_coordinators: study_coordinators,
    study_coordinatorsInput: "",
    study_assistants: study_assistants,
    study_assistantsInput: ""
  });


  const [errors, setErrors] = useState({
    study_id: '',
    title: '',
    description: '',
    authors: '',
    study_coordinatorsInput: '',
    no_participants: '',
    study_assistantsInput: ""
  });
  const [open, setOpen] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [actions, setActions] = useState();

  const handleClickOpen = (type) => {
    let dialogText = '';
    if (type === 'update') {
      dialogText = 'Are you sure you want to update the study?';
      setActions(
        <>
          <Button autoFocus onClick={handleDisagree}>
            Back
          </Button>
          <Button onClick={handleUpdate} autoFocus >
            Update
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
          <Button  onClick={() => router.back()} autoFocus>
            Agree
          </Button>
        </>
      );
    } else if (type === 'delete') {
      dialogText = 'Are you sure you want to permanently delete this study? This action is irreversible!';
      setActions(
        <>
          <Button autoFocus onClick={handleDisagree}>
            Back
          </Button>
          <Button color="error" variant="contained" onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </>
      );
    }
    setOpen(true);
    setDialogText(dialogText);
  };


  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick")
      return;
    setOpen(false);
  }

  const handleDelete = async () => {
    try {
      setActions(
        <>
          <Button autoFocus disabled>
            Back
          </Button>
          <LoadingButton color="error" variant="contained" loading={true} autoFocus disabled>
            Delete
          </LoadingButton>
        </>
      );

      await axios.delete(`https://api-generator.retool.com/L8N5dY/studies/${study_id}`);
      setOpen(false);
      handleShowAlert("delete-success");
    } catch (error) {
      console.log(error);
      setOpen(false);
      handleShowAlert("delete-fail");

    }

  };

  const handleDisagree = () => {
    console.log('User disagreed.');
    setOpen(false);
  };


  const handleChange = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;

      let newErrors = { ...errors };
      let errorMessage = '';

      switch (name) {
        case 'study_id':
          if (!value.match(/^[a-zA-Z0-9]+$/)) {
            errorMessage = 'Study ID must only contain alphanumerics.';
          } else if (value.length > 10) {
            errorMessage = 'Study ID must be less than 10 characters long.';
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

  const handleShowAlert = (type) => {
    if (type === 'update-success') {
      setShowUpdateSuccessAlert(true);
      setTimeout(() => router.back(), 3000);
    } else if (type === 'update-fail') {
      setShowUpdateFailAlert(true);
      setTimeout(() => setShowUpdateFailAlert(false), 5000);
    } else if (type === 'delete-success') {
      setShowDeleteSuccessAlert(true);
      setTimeout(() => router.back(), 3000);
    } else if (type === 'delete-fail') {
      setShowDeleteFailAlert(true);
    }
  };

  const handleUpdate = async () => {
    try {
      setActions(
        <>
          <Button autoFocus disabled>
            Back
          </Button>
          <LoadingButton variant="contained" loading={true} autoFocus disabled>
            Update
          </LoadingButton>
        </>
      );

      console.log(values);
      await axios.put(`https://api-generator.retool.com/L8N5dY/studies/${study_id}`, values);
      setOpen(false);
      handleShowAlert("update-success");
    } catch (error) {
      console.log(error);
      setOpen(false);
      handleShowAlert("update-fail");
    }
  };
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
      >
        <Card>
          <CardHeader
            title="Edit study"
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
                    defaultValue={study_id}
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
                    defaultValue={title}
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
                    defaultValue={description}
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
                    defaultValue={authors}
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
                    defaultValue={no_participants}
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
          <CardActions >
            <Button variant="contained" color="error" sx={{ marginLeft: 2 }} onClick={() => handleClickOpen('delete')}>
              Delete Study
            </Button>
            <Stack sx={{ ml: 'auto', justifyContent: 'flex-end' }}
              alignItems="center"
              direction="row"
              spacing={1}
            >

              <Button onClick={() => handleClickOpen('cancel')} variant="text" sx={{ color: 'gray' }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={() => handleClickOpen('update')}>
                Update
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
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9999
        }}
      >{showUpdateSuccessAlert && (
        <Alert severity="success" onClose={() => setShowUpdateSuccessAlert(false)}>Study updated successfully!</Alert>)}
        {showUpdateFailAlert && (
          <Alert severity="error" onClose={() => setShowUpdateFailAlert(false)}>Study update failed!</Alert>)}
        {showDeleteSuccessAlert && (
          <Alert severity="success" onClose={() => setShowDeleteSuccessAlert(false)}>Study deleted successfully!</Alert>)}
        {showDeleteFailAlert && (
          <Alert severity="error" onClose={() => setShowDeleteFailAlert(false)}>Error occurred!</Alert>)}
      </div>

    </div>
  );
};
