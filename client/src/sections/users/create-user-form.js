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
import { useRouter } from 'next/router'; 
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

export const CreateUserForm = () => {
    const [open, setOpen] = useState(false);
      const [dialogText,setDialogText] = useState('');
      const [showAlert, setShowAlert] = useState(false);
      const [actions,setActions] = useState();
      const router = useRouter();
      const handleClickOpen = (type) => {
        let dialogText = '';
        if (type === 'create') {
          dialogText = 'Are you sure you want to create this user?';
          setActions(
            <>
              <Button autoFocus onClick={handleDisagree}>
                Back
              </Button>
              <Button onClick={handleSubmit} autoFocus>
                Create
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
              <Button onClick={() => router.back()} autoFocus>
                Agree
              </Button>
            </>
          );
        }
        setOpen(true);
        setDialogText(dialogText);
      };
      
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleAgree = () => {
        console.log('User agreed.');
        setOpen(false);
      };
    
      const handleDisagree = () => {
        console.log('User disagreed.');
        setOpen(false);
      };

  const [values, setValues] = useState({
    first_name: '',
    sur_name: '',
    email: '',
    password: '',
    roles: []
  });

  const [errors, setErrors] = useState({
    first_name: '',
    sur_name: '',
    email: '',
    password: ''
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
        case 'password':
          if (!/^[a-zA-Z0-9_.-]+$/.test(value)) {
            errorMessage = 'Password can only contain alphanumeric characters, hyphens, underscores, and periods.';
          } else if (value.length < 8) {
            errorMessage = 'Passwords must be more than 8 characters long.';
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
  

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); 
  };
  
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setOpen(false);
      console.log('Submitted', values);
      handleShowAlert();
    },
    [values, handleShowAlert]
  );
  

  return (
    <div>
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
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
                  label="Password"
                  name="password"
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  onBlur={handleOnBlur}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
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
                  name="roles"
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
        <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Stack
                alignItems="center"
                direction="row"
                spacing={1}
            >
                <Button onClick={() => handleClickOpen('cancel')} variant="text" sx={{color: 'gray'}}>
                    Cancel
                </Button>
                <Button onClick={() => handleClickOpen('create')} variant="contained" >
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
