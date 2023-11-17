import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UsersTable } from 'src/sections/users/users-table';
import { UsersSearch } from 'src/sections/users/users-search';
import { applyPagination } from 'src/utils/apply-pagination';
import NextLink from 'next/link';
import axios from 'axios';
import axiosInstance from 'src/utils/axios-instance';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  

  const useUsers = (page, rowsPerPage) => {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
  
    useEffect(() => {
      axiosInstance.get('/users')
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
    }, []);
  
    return useMemo(() => {
      return {
        data: applyPagination(data, page, rowsPerPage),
        totalCount // return total count
      };
    }, [page, rowsPerPage, data]);
    
  };
  

  const { data: users, totalCount } = useUsers(page, rowsPerPage); 
  


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

  const filteredUsers = useMemo(() => {
    if (!searchQuery) {
      return users;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.id.toLowerCase().includes(lowerCaseQuery) ||
        user.email.includes(searchQuery) || user.first_name.toLowerCase().includes(lowerCaseQuery)
    );
  }, [users, searchQuery]);

  return (
    <>
      <Head>
        <title>
          Users
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
                  Users
                </Typography>
              </Stack>
              <div>
                <Button
                  component={NextLink}
                  href="/admin-dashboard/users/create"
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
            <UsersSearch onSearch={handleSearch} />
            <UsersTable
              error={error}
              isLoading={isLoading}
              count={totalCount}
              items={filteredUsers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
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
