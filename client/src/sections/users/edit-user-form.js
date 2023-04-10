import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Stack,
  CardActions,
  CardContent,
  CardHeader,
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


export const EditUserForm = (props) => {
  const router = useRouter();
  const { username } = props;
  const { email } = props;
  const { first_name } = props;
  const { sur_name } = props;
  const { roles } = props;
  const rolesOptions = roles.map((role) => ({
    value: role.toLowerCase(),
    label: role.charAt(0).toUpperCase() + role.slice(1),
  }));


  const [open, setOpen] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false);
  const [showUpdateFailAlert, setShowUpdateFailAlert] = useState(false);
  const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
  const [showDeleteFailAlert, setShowDeleteFailAlert] = useState(false);
  const [actions, setActions] = useState();

  const handleClickOpen = (type) => {
    let dialogText = '';
    if (type === 'update') {
      dialogText = 'Are you sure you want to create this user?';
      setActions(
        <>
          <Button autoFocus onClick={handleDisagree}>
            Back
          </Button>
          <Button onClick={handleUpdate} autoFocus>
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
          <Button component={NextLink} href="/admin-dashboard/users" autoFocus>
            Agree
          </Button>
        </>
      );
    } else if (type === 'delete') {
      dialogText = 'Are you sure you want to permanently delete this user? This action is irreversible!';
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

      await axios.delete(`https://api-generator.retool.com/bBorK0/users/${username}`);
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

  const [values, setValues] = useState({
    first_name: first_name,
    sur_name: sur_name,
    email: email,
    username: username,
    roles: roles
  });

  const [errors, setErrors] = useState({
    first_name: '',
    sur_name: '',
    email: '',
    username: ''
  });

  const handleOnBlur = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;

      let newErrors = { ...errors };
      let errorMessage = '';

      switch (name) {
        case 'first_name':
          if (!/^[a-zA-Z]+$/.test(value)) {
            errorMessage = 'First name must only contain alphabetical characters.';
          } else if (value.length > 50) {
            errorMessage = 'First name must be less than 50 characters long.';
          }
          break;
        case 'sur_name':
          if (!/^[a-zA-Z]+$/.test(value)) {
            errorMessage = 'Surname must only contain alphabetical characters.';
          } else if (value.length > 50) {
            errorMessage = 'Surname must be less than 50 characters long.';
          }
          break;
        case 'email':
          if (!value.match(/^\S+@\S+\.\S+$/)) {
            errorMessage = 'Invalid email address.';
          }
          break;
        case 'username':
          if (!/^[a-zA-Z0-9_.-]+$/.test(value)) {
            errorMessage = 'Username can only contain alphanumeric characters, hyphens, underscores, and periods.';
          } else if (value.length > 30) {
            errorMessage = 'Username must be less than 30 characters long.';
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
      setTimeout(() => router.push('/admin-dashboard/users'), 3000);
    } else if (type === 'update-fail') {
      setShowUpdateFailAlert(true);
      setTimeout(() => setShowUpdateFailAlert(false), 5000);
    } else if (type === 'delete-success') {
      setShowDeleteSuccessAlert(true);
      setTimeout(() => router.push('/admin-dashboard/users'), 3000);
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

      await axios.put(`https://api-generator.retool.com/bBorK0/users/${username}`, values);
      setOpen(false);
      handleShowAlert("update-success");
    } catch (error) {
      console.log(error);
      setOpen(false);
      handleShowAlert("update-fail");
    }
  };



  return (
    <div>
      <form autoComplete="off" noValidate >
        <Card>
          <CardHeader
            title="Edit user"
          />
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
                    defaultValue={email}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    onBlur={handleOnBlur}
                    required
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    defaultValue={username}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                    onBlur={handleOnBlur}
                    required
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    defaultValue={first_name}
                    onBlur={handleOnBlur}
                    required
                    error={Boolean(errors.first_name)}
                    helperText={errors.first_name}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Surname"
                    name="sur_name"
                    defaultValue={sur_name}
                    onBlur={handleOnBlur}
                    required
                    error={Boolean(errors.sur_name)}
                    helperText={errors.sur_name}
                  />
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Select Role"
                    onBlur={handleOnBlur}
                    name="roles"
                    defaultValue={roles}
                    required
                    select
                    SelectProps={{ native: true }}
                  >
                    {rolesOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions >
            <Button variant="contained" color="error" sx={{ marginLeft: 2 }} onClick={() => handleClickOpen('delete')}>
              Delete User
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
        <Alert severity="success" onClose={() => setShowUpdateSuccessAlert(false)}>User updated successfully!</Alert>)}
        {showUpdateFailAlert && (
          <Alert severity="error" onClose={() => setShowUpdateFailAlert(false)}>User update failed!</Alert>)}
        {showDeleteSuccessAlert && (
          <Alert severity="success" onClose={() => setShowDeleteSuccessAlert(false)}>User deleted successfully!</Alert>)}
        {showDeleteFailAlert && (
          <Alert severity="error" onClose={() => setShowDeleteFailAlert(false)}>Error occurred!</Alert>)}
      </div>


    </div>
  );
};
