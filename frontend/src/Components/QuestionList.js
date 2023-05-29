import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import apis from '../config/api';

import TablePagination from '@mui/material/TablePagination';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { QuestionContext } from './Context';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
 
}));


const QuestionList = () => {
  const {rows, clickRow} = React.useContext(QuestionContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 

 

    return (
        <>
            <div style={{  width: '100%' }} className='bg-primary-white'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Id</StyledTableCell>
                    <StyledTableCell align="left">Questions</StyledTableCell>
                    <StyledTableCell align="center">TimeStamp</StyledTableCell>
                    <StyledTableCell align="center">Asked By</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name} onClick={()=>{clickRow(row.id)}}>
                      
                      <StyledTableCell align="center">{row.id}</StyledTableCell>
                      <StyledTableCell align="left">{row.title}</StyledTableCell>
                      <StyledTableCell align="center">{row.timeStamp}</StyledTableCell>
                      <StyledTableCell align="center">{row.asked_by}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
            </div>
        </>
    );
}

export default QuestionList;