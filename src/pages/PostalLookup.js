import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Stack from '@mui/material/Stack'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useDispatch, useSelector } from 'react-redux';
import countriesList from '../config/countries.json';

import { getPlace } from '../redux/actions/postalcode'

const fakePlace = {
  "post code": "90210",
  "country": "United States",
  "country abbreviation": "US",
  "places": [
    {
      "place name": "Beverly Hills",
      "longitude": "-118.4065",
      "state": "California",
      "state abbreviation": "CA",
      "latitude": "34.0901"
    }
  ]
}

export default function Universities() {

  const dispatch = useDispatch();

  const [code, setCode] = useState('');
  const [country, setCountry] = useState('select')
  const { place } = useSelector(state=>state.place);
  useEffect(()=>{
    if(isNaN(Number(code))) {
      console.log('need to input correct code')
      return;
    }
    if((country!=='select')&&(code.length>0))
      dispatch(getPlace(country.toLowerCase(), code));
  }, [code, country]);

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
            <Stack spacing={5} direction="row">
              <TextField 
                id="country code" 
                label="Code" 
                variant="outlined" 
                value={code}
                error={isNaN(Number(code))}
                onChange={(e)=>setCode(e.target.value)}
                />
              <Select
                id="country name"
                value={country}
                label="Country"
                fullWidth
                onChange={(event)=>{setCountry(event.target.value)}}
              >
                <MenuItem value={'select'}>Select</MenuItem>
                {
                  countriesList&&Object.keys(countriesList).map((item, index) =>{
                    return (
                      <MenuItem value={item} key={index}>{countriesList[item]}</MenuItem>
                    );
                  })
                }
              </Select>
            </Stack>
          </Grid>
        </Grid>
        <Grid item container justifyContent="flex-start" direction="row">
          <Stack spacing={2} direction="row">
            {
              place&&place['places'].length>0?
              place['places'].map((item, index)=>{
                return (
                  <Card sx={{ width: '100%' }} key={index}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {fakePlace['places'][index]['place name']}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {fakePlace['places'][index]['state']}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        Longnitude
                      </Typography>
                      <Typography variant="body2">
                        {fakePlace['places'][index]['longitude']}
                        <br />
                      </Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        Latutude
                      </Typography>
                      <Typography variant="body2">
                        {fakePlace['places'][index]['latitude']}
                        <br />
                      </Typography>
                    </CardContent>
                  </Card>
                );
              }) 
              :
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {'No data is available.'}
                  </Typography>
                </CardContent>
              </Card>
              
            }
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}