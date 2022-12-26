import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination, Typography
} from "@mui/material/";


const useStyles = makeStyles(theme => ({
  root: {
    padding: 0
  },
  content: {
    padding: 0
  },
  head: {
    backgroundColor: "#FF919D"
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: "flex",
    alignItems: "baseline"
  },
  status: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: "flex-end"
  },
}));


const TableComponent = props => {

//   const { className, query, cubejsApi, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const tableHeaders = [
    {
      text: "Order id",
      value: "Orders.id"
    },
    {
      text: "Orders size",
      value: "Orders.size"
    },
    {
      text: "Full Name",
      value: "Users.fullName"
    },
    {
      text: "User city",
      value: "Users.city"
    },
    {
      text: "Order price",
      value: "Orders.price"
    }
  ];
    return (
      <Card
        {...rest}
        padding={"0"}
        className={clsx(classes.root, className)}
      >
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead className={classes.head}>
                  <TableRow>
                    {tableHeaders.map((item) => (
                      <TableCell key={item.value + Math.random()}
																 className={classes.hoverable}
                      >
                        <span>{item.text}</span>

                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(obj => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={obj["Orders.id"]}
                    >
                      <TableCell>
                        {obj["Orders.id"]}
                      </TableCell>
                      <TableCell>
                        {obj["Orders.size"]}
                      </TableCell>
                      <TableCell>
                        {obj["Users.fullName"]}
                      </TableCell>
                      <TableCell>
                        {obj["Users.city"]}
                      </TableCell>
                      <TableCell>
                        {"$ " + obj["Orders.price"]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={orders.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
          />
        </CardActions>
      </Card>
    )
};

TableComponent.propTypes = {
  className: PropTypes.string,
  query: PropTypes.object.isRequired
};

export default TableComponent;