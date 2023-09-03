import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, SvgIcon, Stack,Alert, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import NewtonsCradle from 'src/components/newtons-cradle-component';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import CheckIcon from '@heroicons/react/24/solid/CheckIcon';



const Page = () => {
  const router = useRouter();
  const { token } = router.query;
  const auth = useAuth();

  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [validationError, setValidationError] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {


    const validateToken = async () => {
      setIsValidatingToken(true);
      setValidationError(null);

      try {
        const { header, payload, signature } = jwt.decode(token, { complete: true });
        if (header.typ !== 'JWT') {
          setValidationError('Invalid token type');
        } else {
          setDecodedToken(payload);
        }

        const response = await fetch(`http://localhost:8081/api/v1/is-token-valid/${token}`);
        const data = await response.json();

        if (response.ok) {
          setValidationError(null);
        } else {
          setValidationError(data.message);
        }
      } catch (err) {
        // router.push("/404");
        setValidationError("An error occurred while validating the token");
     

      }

      setIsValidatingToken(false);
    }

    if (token) {
      validateToken();
    }
  }, [token]);


  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      password: '',
      confirm_password: '',
      submit: null,
      errors: {
        first_name: false,
        last_name: false,
        password: false,
        confirm_password: false,
      },
    },
    validationSchema: Yup.object({
      first_name: Yup
        .string()
        .max(255)
        .required('First Name is required'),
      last_name: Yup
        .string()
        .max(255)
        .required('Last Name is required'),
      password: Yup
        .string()
        .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, 'Password can only contain alphanumeric characters and symbols')
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
      confirm_password: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await fetch(`http://localhost:8081/api/v1/user/register/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        });

        if (response.ok) {
          router.push('/auth/login');
        } else {
          const data = await response.json();
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: data.message });
          helpers.setSubmitting(false);
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });


  return (
    <>
      <Head>
        <title>
          Register
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: "#FBFBFB",
          borderRadius:'0.75rem',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          maxWidth: 550,
          px: 3,
          width: 500
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          {isValidatingToken ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Please Wait, Validating token...
              </Typography>
              <NewtonsCradle />
            </Box>
          ) : validationError ? (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <img
                  alt="Under development"
                  src="/assets/errors/error-401.png"
                  style={{
                    display: 'inline-block',
                    maxWidth: '100%',
                    marginBottom: '20px',
                    width: 400
                  }}
                />
                <Typography sx={{ mb: 3,textAlign: 'center' }}
                  variant="h5">
                  {validationError}
                </Typography>
                <Typography
                  align="center"
                  color="text.secondary"
                  variant="body2"
                >
                  Please
                  &nbsp;
                  <Link
                    href="mailto:it21922@hua.gr"
                    underline="hover"
                    variant="subtitle2"
                  >
                    Contact The Admin
                  </Link>  For Further Instructions.
                </Typography>
                <Button
                  component={NextLink}
                  href="/"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowLeftIcon />
                    </SvgIcon>
                  )}
                  sx={{ mt: 3 }}
                  variant="contained"
                >
                  Go back
                </Button>

              </Box>

            </>

          ) : (

            <div>
              <Stack
                spacing={1}
                sx={{ mb: 3 }}
              >
                <Typography variant="h4">
                  Register
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Already have an account?
                  &nbsp;
                  <Link
                    component={NextLink}
                    href="/auth/login"
                    underline="hover"
                    variant="subtitle2"
                  >
                    Log in
                  </Link>
                </Typography>
              </Stack>
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    disabled
                    defaultValue={decodedToken.email}
                    type="email"
                  />
                  <TextField
                    error={!!(formik.touched.first_name && formik.errors.first_name)}
                    fullWidth
                    helperText={formik.touched.first_name && formik.errors.first_name}
                    label="First Name"
                    name="first_name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                  />
                  <TextField
                    error={!!(formik.touched.last_name && formik.errors.last_name)}
                    fullWidth
                    helperText={formik.touched.last_name && formik.errors.last_name}
                    label="Last Name"
                    name="last_name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                  />

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
                      endAdornment: formik.touched.password && !formik.errors.password  && (
                        <SvgIcon sx={{ color: 'primary.main' }}>
                          <CheckIcon />
                        </SvgIcon>
                      )
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

                      )
                    }}
                  />
                </Stack>
                
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Register
                </Button>
                {formik.errors.submit && (
                  
                    <Alert severity="error"
                    sx={{ mt: 3 }}>{formik.errors.submit}</Alert>
                    
                )}
              </form>
            </div>

          )}
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
