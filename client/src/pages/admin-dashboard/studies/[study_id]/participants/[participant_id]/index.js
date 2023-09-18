import Head from 'next/head';
import { useCallback, useMemo, useState, useEffect } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

import { Box, Button, SvgIcon, Container, Stack, Link, Typography, Breadcrumbs, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { applyPagination } from 'src/utils/apply-pagination';
import axiosInstance from 'src/utils/axios-instance';
import { ParticipantsSearch } from 'src//sections/studies/participants/participants-search';
import { ParticipantsTable } from 'src/sections/studies/participants/participants-table';
import NumberPicker from 'src/components/number-picker';
import { useContext } from 'react';
import { DialogContext } from 'src/contexts/dialog-context';

const Page = () => {
  const router = useRouter();
 

  return (
    <>
      <Head>
        <title>
          Study Participants
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">
                    Participant Analytics
                  </Typography>
                </Stack>
              </Stack>
              <Breadcrumbs separator="•" aria-label="breadcrumb">
                <Link component={NextLink}
                  underline="hover"
                  color="inherit"
                  variant="subtitle2"
                  onClick={() => router.back()}
                  href="/"
                >
                  Studies
                </Link>
                {router.isReady && (
                  <Link
                    component={NextLink}
                    underline="hover"
                    color="inherit"
                    variant="subtitle2"
                    onClick={() => router.back()}
                    href="/"
                  >
                    {router.query.study_id}
                  </Link>
                )}
                <Link component={NextLink}
                  underline="hover"
                  color="inherit"
                  variant="subtitle2"
                  onClick={() => router.back()}
                  href="/"
                >
                  Participants
                </Link>
                <Typography variant="subtitle2" color="text.primary">Analytics</Typography>
              </Breadcrumbs>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
