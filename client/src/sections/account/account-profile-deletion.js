import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Stack,
  Typography, Unstable_Grid2 as Grid
} from '@mui/material';
import { useContext,useCallback } from 'react';
import { DialogContext } from 'src/contexts/dialog-context';
import { AlertContext } from 'src/contexts/alert-context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export const AccountProfileDeletion = () => {

  const router = useRouter();
  const auth = useAuth();
  const email = auth.user.email;
  const handleSignOut = useCallback(
    () => {
      auth.signOut();
      router.push('/auth/login');
    },
    [ auth, router]
  );

  const { openDialog, closeDialog } = useContext(DialogContext);
  const { showAlert } = useContext(AlertContext);

  const onSubmit = async (values) => {
    const dialogText = 'Are you sure you want to delete your account?';
    const dialogActions = (
      <>
        <Button autoFocus onClick={closeDialog}>
          Back
        </Button>
        <Button variant="contained" autoFocus
          onClick={async () => {
            closeDialog();
            try {
              const response = await axios.delete(`http://0.0.0.0:8081/api/v1/users/${email}`);
              console.log(response.data);
              showAlert('Your account was deleted successfully!', 'success');
              handleSignOut();
            }  catch (error) {
              console.error("There was an error deleting the user.", error);
              
              // Check if error response exists
              if (error.response) {
                // Application-level error returned by the server
                showAlert(error.response.data.message || 'An error occurred while trying to delete your account.', 'error');
              } else {
                // Network error or issue reaching the server
                showAlert('Unable to reach the server. Please check your connection or contact an Admin.', 'error');
              }
            }
          }} >
          Delete Account
        </Button>
      </>
    );
    openDialog('Confirmation', dialogText, dialogActions);
  };


  const formik = useFormik({
    initialValues: {},
    onSubmit
  });
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
    >

      <Card>
        <CardContent sx={{ pt: 2 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid xs={12} md={4}>
                <Typography variant="h6">Delete Account</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Grid container spacing={2}>
                  <Stack spacing={2}>
                    <Typography variant="subtitle1">Delete your account and all of your source data. This is irreversible.</Typography>
                    <Button variant="outlined" type="submit" color="error" sx={{ width: "fit-content" }}>Delete account</Button>
                  </Stack>
                </Grid>


              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </form>

  )
};
