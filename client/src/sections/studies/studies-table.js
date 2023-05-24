import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Button,
  Stack,
  Alert,
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
import NewtonsCradle from 'src/components/newtons-cradle-component';


export const StudiesTable = (props) => {
  const {
    error = "",
    isLoading = true,
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange ,
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

                <TableCell >
                  Study ID
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Authors
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  No. Participants
                </TableCell>
                <TableCell>
                  Owners
                </TableCell>
                <TableCell>
                  Study Coordinators
                </TableCell>
                <TableCell>
                  Study Assistants
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                <TableCell align="center" colSpan={8} height={420}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <NewtonsCradle />
                  </div>
                </TableCell>
              </TableRow>)
                : (error !== "" ? (
                  <TableRow>
                  <TableCell align="center" colSpan={8} >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Alert
                        severity="error" style={{ textAlign: "center" ,backgroundColor:"white"}}>{error}
                      </Alert>
                      </div>
                    </TableCell>

                  </TableRow>)
                  : (items.length > 0 ? (
                    items.map((study) => {
                      const isSelected = selected.includes(study.study_id);
                      // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                      return (
                        <TableRow
                          hover
                          key={study.study_id}
                          selected={isSelected}
                        >

                          <TableCell>
                            {study.study_id}
                          </TableCell>
                          <TableCell>
                            {study.title.length > 100 ? `${study.title.slice(0, 100)}...` : study.title}
                          </TableCell>
                          <TableCell>
                          {/* {study.authors.join(', ')} */}
                            {study.authors}
                          </TableCell>
                          <TableCell>
                            {study.description.length > 150 ? `${study.description.slice(0, 150)}...` : study.description}
                          </TableCell>
                          <TableCell>
                            {study.no_participants}
                          </TableCell>
                          <TableCell>
                            {study.owners.join(', ')}
                          </TableCell>
                          <TableCell>
                            {study.study_coordinators.join(', ')}
                          </TableCell>
                          <TableCell>
                            {study.study_assistants.join(', ')}
                          </TableCell>
                          <TableCell>
                            <Stack
                              alignItems="center"
                              direction="row"
                              spacing={1}
                            >
                              <IconButton component={NextLink} href={`/admin-dashboard/studies/${encodeURIComponent(study.study_id)}/edit`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#fff" fillOpacity="0.01" d="M2.8112 15.37c.038-.3423.0571-.5134.1089-.6734.046-.1419.1108-.277.193-.4015.0925-.1404.2143-.2621.4578-.5057L14.503 2.8574c.9144-.9144 2.3968-.9144 3.3112 0 .9144.9143.9144 2.3968 0 3.3111L6.8821 17.1006c-.2435.2435-.3653.3653-.5057.4579a1.6544 1.6544 0 0 1-.4015.1929c-.16.0518-.331.0708-.6734.1089L2.5 18.1716l.3112-2.8016Z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15.3308 8.652-3.3112-3.3113M2.5 18.1716l2.8015-.3113c.3423-.0381.5135-.0571.6734-.1089.142-.0459.277-.1108.4015-.1929.1404-.0926.2622-.2144.5057-.4579l10.9321-10.932c.9144-.9144.9144-2.3969 0-3.3113-.9144-.9143-2.3968-.9143-3.3112 0L3.571 13.7894c-.2436.2436-.3654.3653-.458.5057a1.6548 1.6548 0 0 0-.193.4015c-.0517.16-.0707.3311-.1088.6734L2.5 18.1716Z"></path></svg>
                              </IconButton>

                              <IconButton component={NextLink} href={`/admin-dashboard/studies/${encodeURIComponent(study.study_id)}/view`}>
                                <SvgIcon>
                                  <ArrowSmallRightIcon />
                                </SvgIcon>
                              </IconButton>


                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Typography>No studies found.</Typography>
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

StudiesTable.propTypes = {
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
