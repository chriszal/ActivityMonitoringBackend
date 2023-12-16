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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const { openDialog } = useContext(DialogContext);

  const baseRoute = router.pathname.includes('/admin-dashboard/')
    ? '/admin-dashboard/studies/'
    : '/dashboard/studies/';

  const handleCreateClick = () => {
    openDialog(
      'Create New Participants',
      'Choose the number of new participants to generate.',
      <NumberPicker />
    );
  };
  const useParticipants = (page, rowsPerPage) => {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);


    useEffect(() => {
      if (router.isReady) {
        const { study_id } = router.query;
        axiosInstance.get(`/participants/study/${study_id}`)
          .then(response => {
            if (response.status == 200) {
              setData(response.data);
              setTotalCount(response.data.length);
              setIsLoading(false);
            } else {
              setIsLoading(false);
              setError(response.message)
            }

          })
          .catch(error => {
            setIsLoading(false);
            setError(error.message);
          });
      }
    }, []);

    return useMemo(() => {
      return {
        data: applyPagination(data, page, rowsPerPage),
        totalCount // return total count
      };
    }, [page, rowsPerPage, data]);

  };



  const { data: participants, totalCount } = useParticipants(page, rowsPerPage);


  const handlePageChange = useCallback(
    (event, newPage) => {
      setPage(newPage);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };
  const handleExport = () => {
    // Use xlsx library to create a workbook
    const { utils, writeFile } = require('xlsx');
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(participants); 
    utils.book_append_sheet(wb, ws, "Participants");
    writeFile(wb, 'participants.xlsx');
  };

  const filteredParticipants = useMemo(() => {
    if (!searchQuery) {
      return participants;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    return participants.filter(
      (participant) =>
        participant.participant_id.toLowerCase().includes(lowerCaseQuery)
    );
  }, [participants, searchQuery]);

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
                    Study Participants
                  </Typography>
                </Stack>
                  <Button
                    startIcon={<SvgIcon fontSize="small"><PlusIcon /></SvgIcon>}
                    variant="contained"
                    onClick={handleCreateClick}
                  >
                    Create
                  </Button>
              </Stack>
             
            </div>
            <ParticipantsSearch onSearch={handleSearch} onExport={handleExport} />
            <ParticipantsTable
              error={error}
              isLoading={isLoading}
              count={totalCount}
              items={filteredParticipants}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
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
