import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,SvgIcon,
    CardContent,
    CardActions,
    Divider,Input,
    Stack,TextField,
    Typography, Unstable_Grid2 as Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CheckIcon from '@heroicons/react/24/solid/CheckIcon';
import { DialogContext } from 'src/contexts/dialog-context';
import { AlertContext } from 'src/contexts/alert-context';
import { useContext } from 'react';
import axiosInstance from 'src/utils/axios-instance';

export const AccountPasswordChange = () => {

  const { openDialog, closeDialog } = useContext(DialogContext);
  const { showAlert } = useContext(AlertContext);

  const onSubmit = async (values) => {
    const dialogText = 'Are you sure you want to change your password?';
    const dialogActions = (
      <>
        <Button autoFocus onClick={closeDialog}>
          Back
        </Button>
        <Button variant="contained" autoFocus 
          onClick={async () => {
            closeDialog();
            try {
              // const response = await axiosInstance.put(`/users/${email}`, values);
              // console.log(response.data);
              showAlert('Your password was updated successfully!', 'success');
              formik.resetForm(); 
            } catch (error) {
              console.error("There was an error updating the user password", error);
              
              // Check if error response exists
              if (error.response) {
                // Application-level error returned by the server
                showAlert(error.response.data.message || 'An error occurred while updating the password.', 'error');
              } else {
                // Network error or issue reaching the server
                showAlert('Unable to reach the server. Please check your connection or contact an Admin.', 'error');
              }
            }
          }} >
          Save
        </Button>
      </>
    );
    openDialog('Confirmation', dialogText, dialogActions);
  };
    const validationSchema = Yup.object({
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long.')
        .required('Password is required.'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
        .required('Confirm password is required.'),
    });
  
    const formik = useFormik({
      initialValues: {
        password: '',
        confirm_password: '',
      },
      validationSchema,
      onSubmit
    });
  
    return (
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardContent sx={{ pt: 2 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                  <Typography variant="h6">Change Password</Typography>
                </Grid>
                <Grid xs={12} md={8}>
                  <Stack spacing={2} sx={{ maxWidth: 350, pl: 1.5 }}>
                    <TextField
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      fullWidth
                      helperText={formik.touched.password && formik.errors.password}
                      label="Password"
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
                      InputProps={{
                        endAdornment: formik.touched.password && !formik.errors.password && (
                          <SvgIcon sx={{ color: 'primary.main' }}>
                            <CheckIcon />
                          </SvgIcon>
                        ),
                      }}
                    />
                    <TextField
                      error={!!(formik.touched.confirm_password && formik.errors.confirm_password)}
                      fullWidth
                      helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                      label="Confirm Password"
                      name="confirm_password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.confirm_password}
                      InputProps={{
                        endAdornment: formik.touched.confirm_password && !formik.errors.confirm_password && (
                          <SvgIcon sx={{ color: 'primary.main' }}>
                            <CheckIcon />
                          </SvgIcon>
                        ),
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type="submit" disabled={!formik.dirty}>
              Update
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };