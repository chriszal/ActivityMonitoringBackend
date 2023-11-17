import { useContext } from 'react';
import { DialogContext } from 'src/contexts/dialog-context';
import { AlertContext } from 'src/contexts/alert-context';
import { generatePassword } from 'src/utils/generate-password';
import KeyIcon from '@heroicons/react/24/solid/KeyIcon';


import {
  Box,
  Button,
  Card,
  Stack,
  CardActions,
  CardContent,IconButton ,SvgIcon ,
  FormControl, InputLabel, MenuItem, Select,FormHelperText,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import axiosInstance from 'src/utils/axios-instance';
const rolesOptions = [
  {
    value: 'admin',
    label: 'Admin'
  },
  {
    value: 'member',
    label: 'Member'
  }
];

const validationSchema = Yup.object({
  first_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'First name must only contain alphabetical characters.')
    .max(50, 'First name must be less than 50 characters long.')
    .required('First Name is required.'),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Last name must only contain alphabetical characters.')
    .max(50, 'Last name must be less than 50 characters long.')
    .required('Last name is required.'),
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
    password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the symbols ! @#$%^&*().'
    )
    .min(8, 'Passwords must be more than 8 characters long.')
    .required('Password is required.'),

  roles: Yup.array()
    .min(1, 'At least one role is required.')
});


export const CreateUserForm = () => {
  const { openDialog, closeDialog } = useContext(DialogContext);
  const { showAlert } = useContext(AlertContext);
  const router = useRouter();


  const onSubmit = async (values) => {
    const dialogText = 'Are you sure you want to create this user?';
    const dialogActions = (
      <>
        <Button autoFocus onClick={closeDialog}>
          Back
        </Button>
        <Button onClick={async () => {
          closeDialog();
          console.log('Submitted', values);
          try {
            const response = await axiosInstance.post('/users', values);
            console.log(response.data);
            showAlert('User created successfully!', 'success');
            router.back()
          } catch (error) {
            console.error("There was an error creating the user.", error);
            
            // Check if error response exists
            if (error.response) {
              // Application-level error returned by the server
              showAlert(error.response.data.message || 'An error occurred while trying to create your user.', 'error');
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
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      roles: ""
    },
    validationSchema,
    onSubmit
  });




  return (
    <div>
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Card sx={{ maxWidth: 1300 }}>
          <CardHeader subheader="Please fill out all the information" title="Generate a User" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.first_name}
                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                    helperText={formik.touched.first_name && formik.errors.first_name}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField

                    fullWidth
                    label="Last Name"
                    name="last_name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.last_name}
                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                    helperText={formik.touched.last_name && formik.errors.last_name}
                  />
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                      endAdornment: (
                          <IconButton
                            sx={{ color: 'grey.500'}}
                            onClick={() => formik.setFieldValue('password', generatePassword())}
                          >
                           <SvgIcon><KeyIcon /></SvgIcon> 
                          </IconButton>
                      )
                    }}
                  />
                </Grid>
                
                <Grid
                  xs={12}
                  md={6}
                >
                  <FormControl fullWidth error={formik.touched.roles && Boolean(formik.errors.roles)}>
                    <InputLabel htmlFor="roles">Select Role</InputLabel>
                    <Select
                      label="Select Role"
                      name="roles"
                      value={formik.values.roles}
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        formik.setFieldValue("roles", [e.target.value]);
                      }}
                      inputProps={{
                        name: "roles",
                        id: "roles",
                      }}
                    >
                      {rolesOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.roles && formik.errors.roles && (
                      <FormHelperText>{formik.errors.roles}</FormHelperText>
                    )}
                  </FormControl>


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
