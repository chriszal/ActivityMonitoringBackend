import { useCallback, useState, useRef, useEffect,useContext } from 'react';

import {
  Box,
  Button,
  Card,
  Avatar,
  CardActions,
  SvgIcon,
  CardContent,
  CardHeader,
  Typography,
  Stack, Input,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

import { styled } from '@mui/material/styles';
import CameraIcon from '@heroicons/react/24/solid/CameraIcon';
import { keyframes } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { useAuth } from 'src/hooks/use-auth';
import { generateAvatar } from 'src/utils/avatar-generator'
import { DialogContext } from 'src/contexts/dialog-context';
import { AlertContext } from 'src/contexts/alert-context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AvatarContainer = styled(Box)({
  position: 'relative',
  display: 'inline-block',
  marginLeft: 15
});


const CircleBorder = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -6,
  left: -6,
  width: 'calc(100% + 12px)',
  height: 'calc(100% + 12px)',
  borderRadius: '50%',
  border: `2px dashed ${theme.palette.primary.main}`,
  opacity: 0.5,
}));

const Circle = styled(Box)({
  position: 'absolute',
  top: '50%',
  right: '-28px',
  transform: 'translateY(-50%)',
  borderRadius: '50%',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  transition: 'background-color 0.3s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    color: 'white',
    width: 20,
    height: 20
  },
  '& p': {
    color: 'white',
    fontSize: 12,
    marginLeft: 6
  },
  left: '50%',
  transform: 'translate(-50%, -50%)'
});

const validationSchema = Yup.object({
  first_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'First name must only contain alphabetical characters.')
    .max(50, 'First name must be less than 50 characters long.')
    .required('First Name is required.'),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Last name must only contain alphabetical characters.')
    .max(50, 'Last name must be less than 50 characters long.')
    .required('Last name is required.')
});


export const AccountProfileDetails = () => {
  const { user } = useAuth();
  const [firstName, lastName] = user.name.split(" ");
  const role = user.role;
  const email = user.email;
  const avatarUrl = generateAvatar(user.name);
  const inputRef = useRef(null);
  const { openDialog, closeDialog } = useContext(DialogContext);
  const { showAlert } = useContext(AlertContext);
  const [avatarSrc, setAvatarSrc] = useState(avatarUrl);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);



  const onSubmit = async (values) => {
    const dialogText = 'Are you sure you want to change your details?';
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
              showAlert('Your information was updated successfully!', 'success');
              formik.resetForm(); 
            }  catch (error) {
              console.error("There was an error updating the user information.", error);
              
              // Check if error response exists
              if (error.response) {
                // Application-level error returned by the server
                showAlert(error.response.data.message || 'An error occurred while updating yout account details.', 'error');
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

  const handleAvatarChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    },
    [setAvatarSrc]
  );
  const formik = useFormik({
    initialValues: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      role: role
    },
    validationSchema: validationSchema,
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
                <Typography variant="h6">Profile Details</Typography>
                <Typography variant="body2">The information can be edited</Typography>
                <AvatarContainer sx={{ mt: 7, ml: 10 }}
                  onMouseEnter={() => setIsEditingAvatar(true)}
                  onMouseLeave={() => setIsEditingAvatar(false)}
                >
                  <CircleBorder className="circle-border" />
                  <Avatar
                    src={avatarSrc}
                    sx={{
                      width: 96,
                      height: 96,
                      borderRadius: '50%',
                      boxShadow: 'none',
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                  />
                  {isEditingAvatar && (
                    <>
                      <Circle onClick={() => inputRef.current.click()}>
                        <SvgIcon component={CameraIcon} />
                        <Typography sx={{ color: "white" }} variant="subtitle2">Select</Typography>
                      </Circle>
                      <input
                        ref={inputRef}
                        type="file"
                        accept="image/png, image/jpeg"
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                      />
                    </>

                  )}

                </AvatarContainer>
              </Grid>
              <Grid xs={12} md={8}>



                <Grid container spacing={2} sx={{ mt: 10 }}>


                  <Grid item xs={12} md={6}>

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
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Last name"
                      name="last_name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      required
                      value={formik.values.last_name}
                      error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                      helperText={formik.touched.last_name && formik.errors.last_name}

                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      disabled
                      value={formik.values.email}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      disabled
                      fullWidth
                      label="Role"
                      name="roles"
                      value={formik.values.role}
                      InputLabelProps={{ shrink: true }}
                    >
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit" disabled={!formik.dirty}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
