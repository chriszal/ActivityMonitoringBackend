import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UsersTable } from 'src/sections/users/users-table';
import { UsersSearch } from 'src/sections/users/users-search';
import { applyPagination } from 'src/utils/apply-pagination';
import NextLink from 'next/link';
import axios from 'axios';

const now = new Date();

// const data = [
//     {
//        username: "chriszal",
//        first_name: "Chris",
//        sur_name : "Zalachoris",
//        email:"christoszal@gmail.com",
//        roles:["admin","study_coordinator"],
//        created_at: "20/3/2020",
//         },
//         {
//           username: "pet",
//           first_name: "Chris",
//           sur_name : "Sarris",
//           email:"it21922@hua.gr",
//           roles:["admin","study_coordinator"],
//           created_at: "20/3/2020",
//            },{
//             username: "test",
//             first_name: "Chris",
//             sur_name : "Dioy",
//             email:"sunizal@gmail.com",
//             roles:["admin","study_coordinator"],
//             created_at: "20/3/2020",
//              },
// ];



const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const useUsers = (page, rowsPerPage) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('https://retoolapi.dev/bBorK0/users')
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

  const useUserIds = (users) => {
    return useMemo(
      () => {
        return users.map((user) => user.username);
      },
      [users]
    );
  };


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const users = useUsers(page, rowsPerPage);
  const usersIds = useUserIds(users);
  const usersSelection = useSelection(usersIds);


  const handlePageChange = useCallback(
    (event, value) => {
      setPage(event.target.value);
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

  const filteredUsers = useMemo(() => {
    if (!searchQuery) {
      return users;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerCaseQuery) ||
        user.email.includes(searchQuery) || user.sur_name.toLowerCase().includes(lowerCaseQuery)
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
              count={filteredUsers.length}
              items={filteredUsers}
              onDeselectAll={usersSelection.handleDeselectAll}
              onDeselectOne={usersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={usersSelection.handleSelectAll}
              onSelectOne={usersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={usersSelection.selected}
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
