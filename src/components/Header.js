import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
export default function Header() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
            <Button color="inherit">
              <NavLink to="/">Home</NavLink>
            </Button>
            <Button color="inherit">
                <NavLink to="/universities">Universities</NavLink>
            </Button>
            <Button color="inherit">
                <NavLink to="/postallookup">Postal LookUp</NavLink>
            </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
}