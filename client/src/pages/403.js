import Head from 'next/head';
import NextLink from 'next/link';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <>
      <Head>
        <title>
          403 Access Forbidden
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box
              sx={{
                mb: 3,
                textAlign: 'center'
              }}
            >
              <img
                alt="Under development"
                src="/assets/errors/error-401.png"
                style={{
                  display: 'inline-block',
                  maxWidth: '100%',
                  width: 400
                }}
              />
            </Box>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="h3"
            >
              403 Access Forbidden
            </Typography>
            <Typography
              align="center"
              color="text.secondary"
              variant="body1"
            >
              You do not have access to this page. Please contact the administrator for more information.
            </Typography>
            <Button
              onClick={() => router.back()}
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
        </Container>
      </Box>
    </>
  );
};

export default Page;
