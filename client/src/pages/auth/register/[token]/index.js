import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link,SvgIcon, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import NewtonsCradle from 'src/components/newtons-cradle-component';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';



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

        const response = await fetch(`http://0.0.0.0:8081/api/v1/is-token-valid/${token}`);
        const data = await response.json();

        if (response.ok) {
          setValidationError(null);
        } else {
          setValidationError(data.message);
        }
      } catch (err) {
        router.push("/404")
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
      submit: null
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
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await fetch(`http://0.0.0.0:8081/api/v1/user/register/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        });

        if (response.ok) {
          router.push('/');
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
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
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
                <Typography sx={{ mb: 3 }}
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
                  Go to dashboard
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
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
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
