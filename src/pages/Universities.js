import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useDispatch, useSelector } from 'react-redux';

import { getUniversities } from '../redux/actions/universities';

import countriesList from '../config/countries.json';

const columns = [
  { 
    id: 'country', 
    label: 'Country',
    align: 'center',
    width: '20%'
  },
  // { 
  //   id: 'state-province', 
  //   label: 'State-Province', 
  //   align: 'center',
  //   width: '15%'
  //   // minWidth: 100 
  // },
  { 
    id: 'name', 
    label: 'Name', 
    align: 'center',
    width: '30%'
    // minWidth: 100 
  },
  {
    id: 'web_pages',
    label: 'Web Sites',
    align: 'center',
    width: '30%'
  },
  {
    id: 'domains',
    label: 'Domains',
    align: 'center',
    width: '20%'
  },
];

export default function Universities() {

  const dispatch = useDispatch();

  // const { countries } = useSelector(state => state.countries);
  const { universities } = useSelector(state => state.universities);
  const [country, setCountry] = useState('select');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    // dispatch(getCountries());
  }, []);

  useEffect(()=>{
    setPage(0);
    dispatch(getUniversities(country));
  }, [country]);

  return (
    <Container>
      <Grid container mt={2}>
        <Grid item container justifyContent="flex-end" direction="column">
          <Grid item sm={12} xs={24}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/posts"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/universities"
              >
                <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Universities
              </Link>
            </Breadcrumbs>
          </Grid>
          <Grid item sm={12} xs={24}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Country"
                onChange={(event)=>{setCountry(event.target.value)}}
              >
                <MenuItem value={'select'}>Select</MenuItem>
                {
                  countriesList&&Object.keys(countriesList).map((item, index) =>{
                    return (
                      <MenuItem value={countriesList[item]} key={index}>{countriesList[item]}</MenuItem>
                    );
                  })
                }
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container justifyContent="space-around" direction="row">
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ width: column.width }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {universities&&universities
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row+index}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={universities.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage)=>setPage(newPage)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}