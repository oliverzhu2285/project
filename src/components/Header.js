import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState('home')
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
            <Button color={pageState==='home'?"secondary":"inherit"} onClick={()=>{navigate('/posts'); setPageState('home')}}>Home</Button>
            <Button color={pageState==='universities'?"secondary":"inherit"} onClick={()=>{navigate('/universities'); setPageState('universities')}}>Universities</Button>
            <Button color={pageState==='postallookup'?"secondary":"inherit"} onClick={()=>{navigate('/postallookup'); setPageState('postallookup')}}>Postal LookUp</Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
}