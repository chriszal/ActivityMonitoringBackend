import { useCallback, useState } from 'react';
import { useContext } from 'react';
import { DialogContext } from 'src/contexts/dialog-context';
import { AlertContext } from 'src/contexts/alert-context';
import {
  Box,
  Button,
  Card,
  Stack,
  CardActions,
  CardContent,
  FormControl, InputLabel, MenuItem, Select, FormHelperText,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export const EditUserForm = (props) => {
  const router = useRouter();
  const { email } = props;
  const { first_name } = props;
  const { last_name } = props;
  const { roles } = props;
  const { openDialog, closeDialog } = useContext(DialogContext);
  const { showAlert } = useContext(AlertContext);
  let rolesOptions = [];

  if (roles[0].toLowerCase() === 'admin') {
    rolesOptions = [
      { value: 'admin', label: 'Admin' },
      { value: 'member', label: 'Member' },
    ];
  } else {
    rolesOptions = [
      { value: 'member', label: 'Member' },
      { value: 'admin', label: 'Admin' },
    ];
  }

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
    roles: Yup.array()
      .min(1, 'At least one role is required.')
  });

  const onSubmit = async (values) => {
    const dialogText = 'Are you sure you want to update this user?';
    const dialogActions = (
      <>
        <Button autoFocus onClick={closeDialog}>
          Back
        </Button>
        <Button variant="contained" autoFocus 
          onClick={async () => {
            closeDialog();
            try {
              const response = await axios.put(`http://0.0.0.0:8081/api/v1/users/${email}`, values);
              console.log(response.data);
              showAlert('User updated successfully!', 'success');
              router.back();
            } catch (error) {
              console.log("There was an error updating the user", error.response.data.message);
              showAlert(error.response.data.message, 'error');
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
      first_name: first_name,
      last_name: last_name,
      email: email,
      roles: [roles[0]],
    },
    validationSchema,
    onSubmit
  });

  const handleClickOpen = () => {
    const dialogText = 'Are you sure you want to delete this user?';
    const dialogActions = (
      <>
        <Button autoFocus onClick={closeDialog}>
          Back
        </Button>
        <Button variant="contained" color="error" autoFocus
          onClick={async () => {
            closeDialog();
            try {
              const response = await axios.delete(`http://0.0.0.0:8081/api/v1/users/${email}`);
              console.log(response.data);
              showAlert('User deleted successfully!', 'success');
              router.back();
            } catch (error) {
              console.error("There was an error updating the user", error);
              showAlert(error.response.data.message, 'error');
            }
          }} >
          Delete
        </Button>
      </>
    );
    openDialog('Confirmation', dialogText, dialogActions);
  };

  




  return (
    <div>
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Card >
          <CardHeader
            title="Edit user"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3} >

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
          <CardActions >
            <Button variant="contained" color="error" onClick={() => handleClickOpen()}>
              Delete User
            </Button>
            <Stack sx={{ ml: 'auto', justifyContent: 'flex-end' }}
              alignItems="center"
              direction="row"
              spacing={1}
            >
              <Button variant="contained" type="submit" disabled={!formik.dirty}>
                Update
              </Button>

            </Stack>

          </CardActions>
        </Card>
      </form>

    </div>
  );
};
