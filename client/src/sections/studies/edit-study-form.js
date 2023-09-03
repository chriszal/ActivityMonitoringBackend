import { useCallback, useState, useContext } from 'react';
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
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useRouter } from 'next/router';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { DialogContext } from 'src/contexts/dialog-context';
import { AlertContext } from 'src/contexts/alert-context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from 'src/utils/axios-instance';

export const EditStudyForm = (props) => {
  const router = useRouter();
  const { study_id } = props;
  const { title } = props;
  const { description } = props;
  const { authors } = props;
  const { no_participants } = props;
  const { study_owners } =props;
  const { study_coordinators } = props;
  const { study_assistants } = props;

  const [coordinator_loading, setCoordinatorLoading] = useState(false);
  const [assistant_loading, setAssistantLoading] = useState(false);
  const [owner_loading, setOwnerLoading] = useState(false);
  const [coordinatorEmails, setCoordinatorEmails] = useState(study_coordinators.map(coordinator => coordinator.email));
  const [assistantEmails, setAssistantEmails] = useState(study_assistants.map(assistant => assistant.email));
  const [ownerEmails, setOwnerEmails] = useState(study_owners.map(owner => owner.email));

  const { openDialog, closeDialog } = useContext(DialogContext);
  const { showAlert } = useContext(AlertContext);


  const validationSchema = Yup.object({
    study_id: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, 'Study ID must only contain alphanumerics.')
      .max(10, 'Study ID must be less than 10 characters long.')
      .required('Study ID is required.'),
    title: Yup.string()
      .max(100, 'Title must be less than 100 characters long.')
      .required('Title is required.'),
    description: Yup.string()
      .max(1000, 'Description must be less than 1000 characters long.')
      .required('Description is required.'),
    authors: Yup.string().required('Authors are required'),
    no_participants: Yup.number()
      .min(1, 'Number of participants must be between 1 and 100.')
      .max(100, 'Number of participants must be between 1 and 100.')
      .required('Number of participants is required.')
      .integer('Number of participants must be an integer.')
  });

  const onSubmit = async (values) => {
    const dialogText = 'Are you sure you want to update this study?';
    const dialogActions = (
      <>
        <Button autoFocus onClick={closeDialog}>
          Back
        </Button>
        <Button variant="contained" autoFocus
          onClick={async () => {
            const { study_coordinatorsInput, study_assistantsInput, study_ownersInput, ...postData } = values;
            postData.study_coordinators = values.study_coordinators.map(coordinator => coordinator.id);
            postData.study_assistants = values.study_assistants.map(assistant => assistant.id);
            postData.study_owners = values.study_owners.map(owner => owner.id);
            postData.authors = values.authors.split(',').map(author => author.trim());

            closeDialog();
            console.log('Submitted', postData);
            try {
              const response = await axiosInstance.put(`/study/${study_id}`, postData);
              console.log(response.data);
              showAlert('Study updated successfully!', 'success');
              router.back();
            } catch (error) {
              console.error("There was an error editing the study.", error);
              
              // Check if error response exists
              if (error.response) {
                // Application-level error returned by the server
                showAlert(error.response.data.message || 'An error occurred while trying to edit the study.', 'error');
              } else {
                // Network error or issue reaching the server
                showAlert('Unable to reach the server. Please check your connection or contact an Admin.', 'error');
              }
            }
          }} >
          Update
        </Button>
      </>
    );
    openDialog('Confirmation', dialogText, dialogActions);
  };
  const formik = useFormik({
    initialValues: {
      study_id: study_id,
      title: title,
      description: description,
      authors: authors,
      no_participants: no_participants,
      study_owners: study_owners,
      study_ownersInput: "",
      study_coordinators: study_coordinators,
      study_coordinatorsInput: "",
      study_assistants: study_assistants,
      study_assistantsInput: ""
    },
    validationSchema,
    onSubmit
  });

  const handleClickOpen = () => {
    const dialogText = 'Are you sure you want to delete this study?';
    const dialogActions = (
      <>
        <Button autoFocus onClick={closeDialog}>
          Back
        </Button>
        <Button variant="contained" color="error" autoFocus
          onClick={async () => {
            closeDialog();
            try {
              const response = await axiosInstance.delete(`/study/${study_id}`);
              console.log(response.data);
              showAlert('Study deleted successfully!', 'success');
              router.back();
            } catch (error) {
              console.error("There was an error deleting the study.", error);
              
              // Check if error response exists
              if (error.response) {
                // Application-level error returned by the server
                showAlert(error.response.data.message || 'An error occurred while trying to delete the study.', 'error');
              } else {
                // Network error or issue reaching the server
                showAlert('Unable to reach the server. Please check your connection or contact an Admin.', 'error');
              }
            }
          }} >
          Delete
        </Button>
      </>
    );
    openDialog('Confirmation', dialogText, dialogActions);
  };

  const handleCoordinatorSearch = async () => {
    const coordinatorEmail = formik.values.study_coordinatorsInput.trim();
    if (!coordinatorEmail) {
      return;
    }

    if (ownerEmails.includes(coordinatorEmail) || assistantEmails.includes(coordinatorEmail)) {
      formik.setFieldError('study_coordinatorsInput', "Email already exists as an owner or assistant.");
      return;
    }

    try {
      setCoordinatorLoading(true);
      const response = await axiosInstance.get(`/user/id/${coordinatorEmail}`);
      const coordinatorExists = Object.keys(response.data).length > 0;
      if (coordinatorExists) {
        if (!formik.values.study_coordinators.find(coordinator => coordinator.email === coordinatorEmail)) {
          formik.setValues(prevValues => ({
            ...prevValues,
            study_coordinators: [
              ...prevValues.study_coordinators,
              { id: response.data.id, email: coordinatorEmail }
            ]
          }));
          setCoordinatorEmails([...coordinatorEmails, coordinatorEmail]);
          formik.setErrors({ study_coordinatorsInput: "" });
          formik.setFieldValue('study_coordinatorsInput', '');
        } else {
          formik.setErrors({ study_coordinatorsInput: "Coordinator already exists." });
        }
      } else {
        formik.setErrors({ study_coordinatorsInput: "Coordinator not found." });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while searching for the coordinator.";
      formik.setErrors({ study_coordinatorsInput: errorMessage });
    } finally {
      setCoordinatorLoading(false);
    }
  };


  const handleDeleteCoordinator = (index) => {
    formik.setFieldValue('study_coordinators', formik.values.study_coordinators.filter(
      (value, i) => i !== index
    ));
    setCoordinatorEmails(coordinatorEmails.filter((email, i) => i !== index));
  };


  const handleAssistantSearch = async () => {
    const assistantEmail = formik.values.study_assistantsInput.trim();
    if (!assistantEmail) {
      return;
    }

    if (coordinatorEmails.includes(assistantEmail) || ownerEmails.includes(assistantEmail)) {
      formik.setFieldError('study_assistantsInput', "Email already exists as a coordinator or owner.");
      return;
    }

    try {
      setAssistantLoading(true);
      const response = await axiosInstance.get(`/user/id/${assistantEmail}`);
      const assistantExists = Object.keys(response.data).length > 0;
      if (assistantExists) {
        if (!formik.values.study_assistants.find(assistant => assistant.email === assistantEmail)) {
          formik.setValues(prevValues => ({
            ...prevValues,
            study_assistants: [
              ...prevValues.study_assistants,
              { id: response.data.id, email: assistantEmail }
            ]
          }));
          setAssistantEmails([...assistantEmails, assistantEmail]);
          formik.setErrors({ study_assistantsInput: "" });
          formik.setFieldValue('study_assistantsInput', '');
        } else {
          formik.setErrors('study_assistantsInput', "Assistant already exists.");
        }
      } else {
        formik.setErrors('study_assistantsInput', "Assistant not found.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while searching for the assistant.";
      formik.setErrors({ study_assistantsInput: errorMessage });
    } finally {
      setAssistantLoading(false);
    }
  };
  

  const handleDeleteAssistant = (index) => {
    formik.setFieldValue('study_assistants', formik.values.study_assistants.filter(
      (value, i) => i !== index
    ));
    setAssistantEmails(assistantEmails.filter((email, i) => i !== index));
  };

  const handleOwnerSearch = async () => {
    const ownerEmail = formik.values.study_ownersInput.trim();
    if (!ownerEmail) {
      return;
    }

    if (coordinatorEmails.includes(ownerEmail) || assistantEmails.includes(ownerEmail)) {
      formik.setFieldError('study_ownersInput', "Email already exists as an assistant or coordinator.");
      return;
    }
    try {
      setOwnerLoading(true);
      const response = await axiosInstance.get(`/user/id/${ownerEmail}`);
      const ownerExists = Object.keys(response.data).length > 0;
      if (ownerExists) {
        if (!formik.values.study_owners.find(owner => owner.email === ownerEmail)) {
          formik.setValues(prevValues => ({
            ...prevValues,
            study_owners: [
              ...prevValues.study_owners,
              { id: response.data.id, email: ownerEmail }
            ]
          }));
          setOwnerEmails([...ownerEmails, ownerEmail]);
          formik.setErrors({ study_ownersInput: "" });
          formik.setFieldValue('study_ownersInput', "");
        } else {
          formik.setErrors('study_ownersInput', "Owner already exists.");
        }
      } else {
        formik.setErrors('study_ownersInput', "Owner not found.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while searching for the owner.";
      formik.setErrors({ study_ownersInput: errorMessage });
    } finally {
      setOwnerLoading(false);
    }
  };

  const handleDeleteOwner = (index) => {
    formik.setFieldValue('study_owners', formik.values.study_owners.filter(
      (value, i) => i !== index
    ));
    setOwnerEmails(ownerEmails.filter((email, i) => i !== index));
  };

  return (
    <div>
      <form
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.study_id}
                    error={formik.touched.study_id && Boolean(formik.errors.study_id)}
                    helperText={formik.touched.study_id && formik.errors.study_id}

                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.title}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={3}
                    inputProps={{ maxLength: 12 }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.description}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.authors}
                    error={formik.touched.authors && Boolean(formik.errors.authors)}
                    helperText={formik.touched.authors && formik.errors.authors}
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
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                   <TextField
                    fullWidth
                    label="Type the email of a Coordinator"
                    name="study_coordinatorsInput"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === " ") {
                        e.preventDefault();
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
                        coordinatorEmails.map((email, index) => (
                          <Chip
                            key={index}
                            size="small"
                            label={email}
                            onDelete={() => handleDeleteCoordinator(index)}
                            sx={{ m: 0.5, marginTop: "20px" }}
                          />
                        ))
                      )
                    }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.study_coordinatorsInput}
                    error={formik.touched.study_coordinatorsInput && Boolean(formik.errors.study_coordinatorsInput)}
                    helperText={formik.touched.study_coordinatorsInput && formik.errors.study_coordinatorsInput}

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
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === " ") {
                        e.preventDefault();
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
                        assistantEmails.map((email, index) => (
                          <Chip
                            key={index}
                            size="small"
                            label={email}
                            onDelete={() => handleDeleteAssistant(index)}
                            sx={{ m: 0.5, marginTop: "20px" }}
                          />
                        ))
                      )
                    }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.study_assistantsInput}
                    error={formik.touched.study_assistantsInput && Boolean(formik.errors.study_assistantsInput)}
                    helperText={formik.touched.study_assistantsInput && formik.errors.study_assistantsInput}

                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Type the email of the user you want for owner"
                    name="study_ownersInput"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === " ") {
                        e.preventDefault();
                        handleOwnerSearch();
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <LoadingButton
                          loading={owner_loading}
                          onClick={handleOwnerSearch}
                          sx={{ color: 'grey.500', marginRight: "-12px", }}
                        >
                          <SvgIcon><MagnifyingGlassIcon /></SvgIcon>
                        </LoadingButton>
                      ),
                      startAdornment: (
                        ownerEmails.map((email, index) => (
                          <Chip
                            key={index}
                            size="small"
                            label={email}
                            onDelete={() => handleDeleteOwner(index)}
                            sx={{ m: 0.5, marginTop: "20px" }}
                          />
                        ))
                      )
                    }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.study_ownersInput}
                    error={formik.touched.study_ownersInput && Boolean(formik.errors.study_ownersInput)}
                    helperText={formik.touched.study_ownersInput && formik.errors.study_ownersInput}

                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions >
            <Button variant="contained" color="error" onClick={() => handleClickOpen()}>
              Delete Study
            </Button>
            <Stack sx={{ ml: 'auto', justifyContent: 'flex-end' }}
              alignItems="center"
              direction="row"
              spacing={1}
            >

              <Button variant="contained" type="submit" disabled={!formik.dirty} >
                Update
              </Button>

            </Stack>

          </CardActions>
        </Card>
      </form>

    </div>
  );
};
