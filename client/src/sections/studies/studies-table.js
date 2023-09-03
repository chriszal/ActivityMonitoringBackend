import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Button,
  Stack,
  Link,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  SvgIcon,
  IconButton
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import ArrowSmallRightIcon from '@heroicons/react/24/solid/ArrowSmallRightIcon';
import NextLink from 'next/link';
import NewtonsCradle from 'src/components/newtons-cradle-component';
import { DescriptionPopover } from 'src/layouts/dashboard/description-popover';
import { useState } from 'react';
import { Fragment } from 'react';

export const StudiesTable = (props) => {
  const {
    error = "",
    isLoading = true,
    count = 0,
    items = [],
    onPageChange,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0
  } = props;

  const [descriptionPopoverAnchorEl, setDescriptionPopoverAnchorEl] = useState(null);
  const [descriptionPopoverContent, setDescriptionPopoverContent] = useState("");

  const handleDescriptionPopoverOpen = (event, content) => {
    setDescriptionPopoverContent(content);
    setDescriptionPopoverAnchorEl(event.currentTarget);
  };

  const handleDescriptionPopoverClose = () => {
    setDescriptionPopoverAnchorEl(null);
  };

  const descriptionPopoverOpen = Boolean(descriptionPopoverAnchorEl);
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
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                        }}
                      >
                        <img
                          alt="Server Issue"
                          src="/assets/errors/error-500.png"
                          style={{
                            display: 'block', 
                            maxWidth: '100%',
                            width: 300,
                          }}
                        />
                        <Alert
                          severity="error"
                          style={{ textAlign: "center", backgroundColor: "white",fontWeight: "bold" }}
                        >
                          {error}
                        </Alert>
                      </Box>
                    </TableCell>

                  </TableRow>)
                  : (items.length > 0 ? (
                    items.map((study) => {
                      return (
                        <TableRow
                          hover
                          key={study.study_id}
                          sx={{ "&:nth-of-type(even)": { backgroundColor: "action.hover" } }}
                        >

                          <TableCell>
                            <Typography color="primary" variant="subtitle2">
                              {study.study_id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption">
                              {study.title}
                            </Typography>

                          </TableCell>
                          <TableCell>
                            <Typography variant="caption">
                              {study.authors.join(', ')}
                            </Typography>

                          </TableCell>
                          <TableCell>
                            <Typography variant="caption">
                              {study.description.length > 124
                                ? <>
                                  {`${study.description.slice(0, 124)}...`}
                                  <Button
                                    size="small"
                                    sx={{
                                      p: 0.5,
                                      fontSize: '0.875rem',
                                      textTransform: 'none'
                                    }}
                                    color="primary"
                                    onClick={(event) => handleDescriptionPopoverOpen(event, study.description)}
                                  >
                                    Read More
                                  </Button>

                                </>
                                : study.description}
                            </Typography>

                          </TableCell>
                          <TableCell>
                            <Typography variant="caption">
                              {study.no_participants}
                            </Typography>

                          </TableCell>
                          <TableCell>

                            {study.owners.map((user, index, arr) => (
                              <Fragment key={user.email}>
                                <Link href={`mailto:${user.email}`}>
                                  <Typography color="primary" variant="caption">
                                    {user.email}
                                  </Typography>
                                </Link>
                                {index < arr.length - 1 && ', '}
                              </Fragment>
                            ))}
                          </TableCell>
                          <TableCell>
                            {study.study_coordinators.map((user, index, arr) => (
                              <Fragment key={user.email}>
                                <Link href={`mailto:${user.email}`}>
                                  <Typography color="primary" variant="caption">
                                    {user.email}
                                  </Typography>
                                </Link>
                                {index < arr.length - 1 && ', '}
                              </Fragment>
                            ))}
                          </TableCell>
                          <TableCell>
                            {study.study_assistants.map((user, index, arr) => (
                              <Fragment key={user.email}>
                                <Link href={`mailto:${user.email}`}>
                                  <Typography color="primary" variant="caption">
                                    {user.email}
                                  </Typography>
                                </Link>
                                {index < arr.length - 1 && ', '}
                              </Fragment>
                            ))}

                          </TableCell>
                          <TableCell>
                            <Stack
                              alignItems="center"
                              direction="row"
                              spacing={1}
                            >
                              <Tooltip title="Edit Study">
                                <IconButton component={NextLink} href={`/admin-dashboard/studies/${study.study_id}/edit`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#fff" fillOpacity="0.01" d="M2.8112 15.37c.038-.3423.0571-.5134.1089-.6734.046-.1419.1108-.277.193-.4015.0925-.1404.2143-.2621.4578-.5057L14.503 2.8574c.9144-.9144 2.3968-.9144 3.3112 0 .9144.9143.9144 2.3968 0 3.3111L6.8821 17.1006c-.2435.2435-.3653.3653-.5057.4579a1.6544 1.6544 0 0 1-.4015.1929c-.16.0518-.331.0708-.6734.1089L2.5 18.1716l.3112-2.8016Z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15.3308 8.652-3.3112-3.3113M2.5 18.1716l2.8015-.3113c.3423-.0381.5135-.0571.6734-.1089.142-.0459.277-.1108.4015-.1929.1404-.0926.2622-.2144.5057-.4579l10.9321-10.932c.9144-.9144.9144-2.3969 0-3.3113-.9144-.9143-2.3968-.9143-3.3112 0L3.571 13.7894c-.2436.2436-.3654.3653-.458.5057a1.6548 1.6548 0 0 0-.193.4015c-.0517.16-.0707.3311-.1088.6734L2.5 18.1716Z"></path></svg>
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View Study">
                                <IconButton component={NextLink} href={`/admin-dashboard/studies/${encodeURIComponent(study.study_id)}/view`}>
                                  <SvgIcon>
                                    <ArrowSmallRightIcon />
                                  </SvgIcon>
                                </IconButton>
                              </Tooltip>



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

            <DescriptionPopover
              open={descriptionPopoverOpen}
              anchorEl={descriptionPopoverAnchorEl}
              onClose={handleDescriptionPopoverClose}
              description={descriptionPopoverContent}
            />
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
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number
};
