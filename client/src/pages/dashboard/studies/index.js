import { useCallback, useMemo, useState,useEffect } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StudiesSearch } from 'src/sections/studies/studies-search';
import { applyPagination } from 'src/utils/apply-pagination';
import axios from 'axios';
import { StudiesGrid } from 'src/sections/studies/studies-grid';
import { useAuth } from 'src/hooks/use-auth';
import axiosInstance from 'src/utils/axios-instance';


const Page = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  console.log(user.id);

  const useStudies = (page, rowsPerPage) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      axiosInstance.get(`/studies/user/${user.id}`)
        .then(response => {
          if (response.status == 200) {
            setData(response.data);
            console.log(response.data);

            setIsLoading(false);
          } else {
            setIsLoading(false);
            console.log(response.message);
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


  // const filteredStudies = useMemo(() => {
  //   if (!searchQuery) {
  //     return studies.map((study) => ({
  //       ...study,
  //       studyType:
  //         study.owner.includes(username)
  //           ? 'owned'
  //           : study.study_coordinators.includes(username)
  //           ? 'coordinating'
  //           : study.study_assistants.includes(username)
  //           ? 'assisting'
  //           : ''
  //     }));
  //   }
  
  //   const lowerCaseQuery = searchQuery.toLowerCase();
  //   return studies
  //     .filter(
  //       (study) =>
  //         study.study_id.toLowerCase().includes(lowerCaseQuery) ||
  //         study.title.toLowerCase().includes(lowerCaseQuery)
  //     )
  //     .map((study) => ({
  //       ...study,
  //       studyType:
  //         study.owner.includes(username)
  //           ? 'owned'
  //           : study.study_coordinators.includes(username)
  //           ? 'coordinating'
  //           : study.study_assistants.includes(username)
  //           ? 'assisting'
  //           : ''
  //     }));
  // }, [studies, searchQuery, username]);
  

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
                  My Studies
                </Typography>
              </Stack>
            </Stack>
            <StudiesSearch onSearch={handleSearch} />
            <StudiesGrid studies={filteredStudies} isLoading={isLoading} error={error} userId={user.id} />
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
