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
import { useCallback, useState } from 'react';
export const AccountPasswordChange = () => {
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
      onSubmit: (values) => {
        // Handle form submission logic here
      },
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
            <Button variant="contained" type="submit">
              Update
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };