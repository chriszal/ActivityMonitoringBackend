import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Stack,
  CardActions,
  CardContent,
  FormControl, InputLabel, MenuItem, Select,FormHelperText,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import NextLink from 'next/link';
import ResponsiveDialog from 'src/components/responsive-dialog';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    .matches(/^[a-zA-Z0-9_.-]+$/, 'Password can only contain alphanumeric characters, hyphens, underscores, and periods.')
    .min(8, 'Passwords must be more than 8 characters long.')
    .required('Password is required.'),
  roles: Yup.array()
    .min(1, 'At least one role is required.')
});


export const CreateUserForm = () => {
  const [open, setOpen] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [actions, setActions] = useState();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      roles: ""
    },
    validationSchema,
    onSubmit: (values) => {
      let dialogText = '';
      dialogText = 'Are you sure you want to create this user?';
      setActions(
        <>
          <Button autoFocus onClick={handleDisagree}>
            Back
          </Button>
          <Button onClick={() => {
            setOpen(false);
            console.log('Submitted', values);
            handleShowAlert();
          }} autoFocus>
            Create
          </Button>
        </>
      );
      setOpen(true);
      setDialogText(dialogText);
    },
  });


  const handleClose = () => {
    setOpen(false);
  };

  const handleDisagree = () => {
    console.log('User disagreed.');
    setOpen(false);
  };





  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };




  return (
    <div>
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Card sx={{ maxWidth: 1300 }}>
          <CardHeader subheader="Please fill out all the information" title="User" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
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
                  />
                </Grid>
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
          <Alert onClose={() => setShowAlert(false)}>User created successfully!</Alert>
        </div>
      )}

    </div>
  );
};
