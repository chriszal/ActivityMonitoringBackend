import { useCallback, useState } from 'react';
import { useContext } from 'react';
import { DialogContext } from 'src/contexts/dialog-context';
import { AlertContext } from 'src/contexts/alert-context';
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
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router'; 


const validationSchema = Yup.object({
  study_id: Yup.string().required('Study ID is required').max(10, 'Study ID must be less than 10 characters long').matches(/^[a-zA-Z0-9]+$/, 'Study ID can only contain alphanumerics'),
  title: Yup.string().required('Title is required').max(100, 'Title must be less than 100 characters long'),
  description: Yup.string().required('Description is required').max(1000, 'Description must be less than 1000 characters long'),
  authors: Yup.string().required('Authors is required'),
  no_participants: Yup.number().required('Number of participants is required').min(1, 'Number of participants must be between 1 and 100').max(100, 'Number of participants must be between 1 and 100'),
  study_ownersInput: Yup.string().required('Owner input is required')
});


export const CreateStudyForm = () => {
  const [coordinator_loading, setCoordinatorLoading] = useState(false);
  const [assistant_loading, setAssistantLoading] = useState(false);
  const [owner_loading, setOwnerLoading] = useState(false);

  const { openDialog, closeDialog } = useContext(DialogContext);
  const { showAlert } = useContext(AlertContext);
  const router = useRouter();
  

  const onSubmit = async (values) => {
    const dialogText = 'Are you sure you want to create this study?';
    const dialogActions = (
      <>
        <Button autoFocus onClick={closeDialog}>
          Back
        </Button>
        <Button onClick={async () => {
            const { study_coordinatorInput, study_assistantsInput,study_ownersInput, ...postData } = values;
          closeDialog();
          console.log('Submitted',postData);
          try {
            const response = await axios.post('http://0.0.0.0:8081/api/v1/studies', postData);         
            console.log(response.data);
            showAlert('Study created successfully!', 'success');
            router.back()
          } catch (error) {
            console.error("There was an error creating the study", error.response.data.message);
            showAlert(error.response.data.message, 'error');
            // handle errors
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
      authors: '',
      no_participants: '',
      study_owners: [],
      study_ownersInput:"",
      study_coordinators: [],
      study_coordinatorsInput: "",
      study_assistants: [],
      study_assistantsInput: ""
    },
    validationSchema,
    onSubmit
  });
  



  const handleCoordinatorSearch = async () => {
    const coordinatorEmail = formik.values.study_coordinatorsInput.trim();
    if (!coordinatorEmail) {
      return;
    }
    console.log(formik.values.study_assistants+" "+formik.values.study_ownersInput);
    //Check if email already exists as a chip in any of the fields
    if (formik.values.study_ownersInput.includes(coordinatorEmail) || formik.values.study_assistantsInput.includes(coordinatorEmail)) {
      formik.setFieldError('study_coordinatorsInput', "Email already exists as a owner or assistant.");
      return;
    }
  
    try {
      setCoordinatorLoading(true);
      const response = await axios.get(`http://0.0.0.0:8081/api/v1/user/id/${coordinatorEmail}`);
      const coordinatorExists = Object.keys(response.data).length > 0;
      console.log(response.data.id)
      if (coordinatorExists) {
        if (!formik.values.study_coordinators.includes(coordinatorEmail)) {
          formik.setValues(prevValues => ({ ...prevValues, study_coordinators: [...prevValues.study_coordinators, response.data.id] }));
          formik.setErrors({ study_coordinatorsInput: "" });
          document.getElementsByName('study_coordinatorsInput')[0].value = '';
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
  };

  const handleAssistantSearch = async () => {
    const assistantEmail = formik.values.study_assistantsInput.trim();
    if (!assistantEmail) {
      return;
    }
  
    try {
      setAssistantLoading(true);
      const response = await axios.get(`http://0.0.0.0:8081/api/v1/user/id/${assistantEmail}`);
      const assistantExists = Object.keys(response.data).length > 0;
      if (assistantExists) {
        // Check if assistant already exists in the array
        if (!formik.values.study_assistants.includes(assistantEmail)) {
          formik.setFieldValue('study_assistants', [...formik.values.study_assistants, assistantEmail]);
          formik.setFieldValue('study_assistantsInput', "");
        } else {
          formik.setFieldError('study_assistantsInput', "Assistant already exists.");
        }
      } else {
        formik.setFieldError('study_assistantsInput', "Assistant not found.");
      }
    } catch (error) {
      console.error(error);
      formik.setFieldError('study_assistantsInput', error.toString());
    } finally {
      setAssistantLoading(false);
    }
  };

  const handleDeleteAssistant = (index) => {
    formik.setFieldValue('study_assistants', formik.values.study_assistants.filter(
      (value, i) => i !== index
    ));
  };

  const handleOwnerSearch = async () => {
    const ownerEmail = formik.values.study_ownersInput.trim();
    if (!ownerEmail) {
      return;
    }
  
    try {
      setOwnerLoading(true);
      const response = await axios.get(`http://0.0.0.0:8081/api/v1/user/id/${ownerEmail}`);
      const ownerExists = Object.keys(response.data).length > 0;
      if (ownerExists) {
        // Check if assistant already exists in the array
        if (!formik.values.study_owners.includes(ownerEmail)) {
          formik.setFieldValue('study_owners', [...formik.values.study_owners, ownerEmail]);
          formik.setFieldValue('study_ownersInput', "");
        } else {
          formik.setFieldError('study_ownersInput', "Owner already exists.");
        }
      } else {
        formik.setFieldError('study_ownersInput', "Owner not found.");
      }
    } catch (error) {
      console.error(error);
      formik.setFieldError('study_ownersInput', error.toString());
    } finally {
      setOwnerLoading(false);
    }
  };

  const handleDeleteOwner = (index) => {
    formik.setFieldValue('study_owners', formik.values.study_owners.filter(
      (value, i) => i !== index
    ));
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
                    label="Number of Participants to Generate"
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
                        Array.isArray(formik.values.study_coordinators) && formik.values.study_coordinators.map((coordinator, index) => (
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
                        Array.isArray(formik.values.study_assistants) && formik.values.study_assistants.map((assistant, index) => (
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
                        Array.isArray(formik.values.study_owners) && formik.values.study_owners.map((owner, index) => (
                          <Chip
                            key={index}
                            size="small"
                            label={owner}
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
          <CardActions sx={{ justifyContent: 'flex-end' }}>
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
        </Card>
      </form>

    </div>
  );
};
