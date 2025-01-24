import React, { useState } from 'react';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination, 
  TableSortLabel, 
  IconButton 
} from '@mui/material';


const DataTable = ({ data, columns }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = React.useMemo(() => {
    if (!orderBy) return data;
    return [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      if (order === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return bValue < aValue ? -1 : 1;
      }
    });
  }, [data, order, orderBy]);

  return (
    <Box sx={{ width: '100%', bgcolor: '#f9f9f9', p: 2, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#333' }}>
        Custom Data Table
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table stickyHeader aria-label="data table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell 
                  key={column.id} 
                  sx={{ 
                    fontWeight: 'bold', 
                    backgroundColor: '#18A18A', 
                    color: 'white',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleSort(column.id)}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    IconComponent={order === 'asc' ? ArrowUpward : ArrowDownward}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover key={index} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} sx={{ fontSize: '0.95rem', color: '#555' }}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
      />
    </Box>
  );
};

export default DataTable;

