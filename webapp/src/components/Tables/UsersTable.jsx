import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";


function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];


const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rowsToDisplay = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  return (
      <div className="Table">
      <h3>Users</h3>
      <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" ,borderRadius: "15px" }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead >
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Created Date</TableCell>
                  <TableCell align="left">Roles</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {rowsToDisplay.map((row) => (
                  <TableRow
                    key={row.name}
                    // className={classes.tableRow}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.trackingId}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left" className="Details">Details</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange = {handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
        </TableContainer>
      </div>
  );
}
