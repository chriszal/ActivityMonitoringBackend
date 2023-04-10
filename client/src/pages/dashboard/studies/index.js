import { useCallback, useMemo, useState,useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StudiesTable } from 'src/sections/studies/studies-table';
import { StudiesSearch } from 'src/sections/studies/studies-search';
import { applyPagination } from 'src/utils/apply-pagination';
import NextLink from 'next/link';
import axios from 'axios';


// const data = [
//     {
//         study_id: "HUA",
//         title: "Tristique senectus et netus et malesuada fames ac turpis egestas.",
//         authors: ["Chris Zalachoris", "George Petrou"],
//         description: "Lacinia quis vel eros donec ac odio. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Sit amet massa vitae tortor condimentum lacinia quis vel. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Sodales ut etiam sit amet nisl purus. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Malesuada bibendum arcu vitae elementum curabitur. Tristique senectus et netus et malesuada fames ac turpis egestas.",
//         no_participants: 30,
//         study_coordinators: ["chriszal"],
//         study_assistants: []
//         },
//         {
//             study_id: "HUA1",
//             title: "Sensor Research",
//             authors: ["Chris Zalachoris", "George Petrou"],
//             description: "dgededfui",
//             no_participants: 30,
//             study_coordinators: ["chriszal"],
//             study_assistants: []
//             }
//             ,{
//               study_id: "NTUA",
//               title: "Test",
//               authors: ["Chris Zalachoris", "George Petrou"],
//               description: "dgededfui",
//               no_participants: 10,
//               study_coordinators: ["chriszal"],
//               study_assistants: []
//               }
// ];



const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');


  const useStudies = (page, rowsPerPage) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('https://retoolapi.dev/L8N5dY/studies')
        .then(response => {
          if (response.status == 200) {
            setData(response.data);
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
    }, []);

    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [page, rowsPerPage, data]
    );
  };
  
  const useStudyIds = (studies) => {
    return useMemo(
      () => {
        return studies.map((study) => study.study_id);
      },
      [studies]
    );
  };
  
  const studies = useStudies(page, rowsPerPage);
  const studiesIds = useStudyIds(studies);
  const studiesSelection = useSelection(studiesIds);


  

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  const filteredStudies = useMemo(() => {
    if (!searchQuery) {
      return studies;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    return studies.filter(
      (study) =>
        study.study_id.toLowerCase().includes(lowerCaseQuery) ||
        study.title.toLowerCase().includes(lowerCaseQuery)
    );
  }, [studies, searchQuery]);

  return (
    <>
      <Head>
        <title>
          Studies 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Studies
                </Typography>
              </Stack>
              <div>
              <Button
                component={NextLink}
                href="/admin-dashboard/studies/create"
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >Add
              </Button>
              </div>
            </Stack>
            <StudiesSearch onSearch={handleSearch} />
            <StudiesTable
              error={error}
              isLoading={isLoading}
              count={filteredStudies.length}
              items={filteredStudies}
              onDeselectAll={studiesSelection.handleDeselectAll}
              onDeselectOne={studiesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={studiesSelection.handleSelectAll}
              onSelectOne={studiesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={studiesSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
