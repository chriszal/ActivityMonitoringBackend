import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";


function createData(study_id, title, authors, description,no_participants,study_coordinators,study_assistants) {
  return { study_id, title, authors, description,no_participants,study_coordinators, study_assistants};
}

const rows = [
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("PADA", "Aging Research", "Christos Diou","edffefefc  efefewf", 10,"chrisdiou"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),
  createData("HUA", "Sensor Research", "Chris Zalachoris, George Petrou","dgedede dededeb ededededede dessssss sssssssss sssssss ssssssssssss sssssssss sssssssss sss sssss ssss ssssss sssssss sssdeded edede ded eded edededed ede deddwg diuweg uiegwfiugeiufg fuiegfiugewfui", 30,"chriszal"),

  
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

const truncateDescription = (description) => {
  if (description.length > 50) {
    return description.substring(0, 50) + "...";
  } else {
    return description;
  }
};




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
      <h3>Studies</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" ,borderRadius: "15px" }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead >
                <TableRow>
                  <TableCell>Study ID</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Authors</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">No. Participants</TableCell>
                  <TableCell align="left">Study Coordinators</TableCell>
                  <TableCell align="left">Study Assistants</TableCell>
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
                    <TableCell component="th" scope="row" className="table-cell">
                      {row.study_id}
                    </TableCell>
                    <TableCell align="left" className="table-cell">{row.title}</TableCell>
                    <TableCell align="left" className="table-cell">{row.authors}</TableCell>
                  
                    <TableCell align="left" className="table-cell" style={{ maxWidth: '250px' }} onClick={() => setSelectedRow(row === selectedRow ? null : row)}>
                      {row === selectedRow ? row.description : truncateDescription(row.description)}
                    </TableCell>
                    <TableCell align="left" className="table-cell">{row.no_participants}</TableCell>
                    <TableCell align="left" className="table-cell">{row.study_coordinators}</TableCell>
                    <TableCell align="left" className="table-cell">{row.study_assistants}</TableCell>
                    {/* <TableCell align="left">
                      <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                    </TableCell> */}
                    {/* <TableCell align="left" className="Details">Details</TableCell> */}
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
