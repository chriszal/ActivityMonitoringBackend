import { useCallback, useState, useRef, useEffect } from 'react';

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
import {generateAvatar} from 'src/utils/avatar-generator'


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



export const AccountProfileDetails = () => {
  
  const {user } = useAuth();
  const avatarUrl = generateAvatar(user.name);
  const inputRef = useRef(null);

  const [avatarSrc, setAvatarSrc] = useState(avatarUrl);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);


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
  const [values, setValues] = useState({
    first_name: '',
    sur_name: '',
    email: '',
    roles: []
  });

  const [errors, setErrors] = useState({
    first_name: '',
    sur_name: '',
    email: '',
  });

  const handleChange = useCallback(
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


  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
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
                <AvatarContainer sx={{mt:7,ml:10}}
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
                


                <Grid container spacing={2} sx={{mt:10}}>


                  <Grid item xs={12} md={6}>

                    <TextField
                      fullWidth
                      label="First Name"
                      name="first_name"
                      onBlur={handleChange}
                      required
                      error={Boolean(errors.first_name)}
                      helperText={errors.first_name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Surname"
                      name="sur_name"
                      onBlur={handleChange}
                      required
                      error={Boolean(errors.sur_name)}
                      helperText={errors.sur_name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      onBlur={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      disabled
                      fullWidth
                      label="Role"
                      name="roles"
                    >
                      {values.roles}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
