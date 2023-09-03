import { useCallback, useState } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  SvgIcon,
  FormHelperText,
  Link,
  Stack,
  IconButton,
  Divider,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { LoadingButton } from '@mui/lab';
import EyeIcon from '@heroicons/react/24/outline/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/outline/EyeSlashIcon';


const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const formik = useFormik({
    initialValues: {
      email: 'christoszal@gmail.com',
      password: '1234',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        setLoading(true);
        await auth.signIn(values.email, values.password);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      } finally {
        setLoading(false);
      }
    }
  });


  return (
    <>
      <Head>
        <title>
          Login
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
          px: 3,
          width: 500
        }}
      >
        <Box
          sx={{
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{  mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              <Typography
                  color="secondary2"
                  variant="body2"
                >
                  Don&apos;t have an account?
                  &nbsp;
                  <Link
                    href="mailto:it21922@hua.gr"
                    underline="hover"
                    variant="subtitle2"
                  >
                    Contact admin
                  </Link>
                </Typography>


            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <SvgIcon ><EyeIcon /></SvgIcon> : <SvgIcon ><EyeSlashIcon /></SvgIcon>}
                      </IconButton>
                    )
                  }}
                />
              </Stack>

              <LoadingButton
                fullWidth
                loading={loading}
                onClick={formik.handleSubmit}
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Sign In
              </LoadingButton>
             

              {formik.errors.submit && (
                <Alert
                  color="error"
                  severity="error"
                  sx={{ mt: 3 }}
                >
                  {formik.errors.submit}
                </Alert>
              )}

            </form>
          </div>
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
