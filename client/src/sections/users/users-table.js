import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Alert,
  Avatar,
  Box,
  Card,
  Checkbox,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  SvgIcon,
  IconButton
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import ArrowSmallRightIcon from '@heroicons/react/24/solid/ArrowSmallRightIcon';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import NextLink from 'next/link';
import { CircularProgress } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export const UsersTable = (props) => {
  const {
    error = "",
    isLoading = true,
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange,
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;
  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>

                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Roles
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell align="center" colSpan={6} height={420}><CircularProgress size="2.5rem" sx={{color:'gray'}}  /></TableCell>

                </TableRow>)
                : (error !== "" ? (
                  <TableRow>
                    <TableCell align="center" colSpan={6}  >
                      <Alert
                        severity="error" style={{ textAlign: "center" }}>{error}
                      </Alert>
                    </TableCell>

                  </TableRow>)
                  : (items.length > 0 ? (
                    items.map((user) => {
                      const isSelected = selected.includes(user.username);
                      // const createdAt = format(user.createdAt, 'dd/MM/yyyy');

                      return (
                        <TableRow
                          hover
                          key={user.username}
                          selected={isSelected}
                        >

                          <TableCell>
                            {user.username}
                          </TableCell>
                          <TableCell>
                            {`${user.first_name} ${user.sur_name}`}
                          </TableCell>
                          <TableCell>
                            {user.email}
                          </TableCell>
                          <TableCell>
                            {/* .join(', ') */}
                            {user.roles}
                          </TableCell>
                          <TableCell>
                            {/* {format(user.created_at, 'dd/MM/yyyy')} */}
                            {user.created_at}
                          </TableCell>
                          <TableCell>
                            {/* {`/users/${user.username}/edit`} */}
                            <IconButton component={NextLink} href={`/admin-dashboard/users/${encodeURIComponent(user.username)}/edit`}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#fff" fillOpacity="0.01" d="M2.8112 15.37c.038-.3423.0571-.5134.1089-.6734.046-.1419.1108-.277.193-.4015.0925-.1404.2143-.2621.4578-.5057L14.503 2.8574c.9144-.9144 2.3968-.9144 3.3112 0 .9144.9143.9144 2.3968 0 3.3111L6.8821 17.1006c-.2435.2435-.3653.3653-.5057.4579a1.6544 1.6544 0 0 1-.4015.1929c-.16.0518-.331.0708-.6734.1089L2.5 18.1716l.3112-2.8016Z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15.3308 8.652-3.3112-3.3113M2.5 18.1716l2.8015-.3113c.3423-.0381.5135-.0571.6734-.1089.142-.0459.277-.1108.4015-.1929.1404-.0926.2622-.2144.5057-.4579l10.9321-10.932c.9144-.9144.9144-2.3969 0-3.3113-.9144-.9143-2.3968-.9143-3.3112 0L3.571 13.7894c-.2436.2436-.3654.3653-.458.5057a1.6548 1.6548 0 0 0-.193.4015c-.0517.16-.0707.3311-.1088.6734L2.5 18.1716Z"></path></svg>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })) : (
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        No users found
                      </TableCell>
                    </TableRow>
                  )))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UsersTable.propTypes = {
  isLoading: PropTypes.bool,
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
