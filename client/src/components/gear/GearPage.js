import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, Container, Dialog, Divider, Grow, IconButton, Rating, Slide, Stack, Toolbar, Typography } from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import { forwardRef } from 'react';
import { Close, StarBorder } from '@mui/icons-material';
import Gears from './Gears';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import mapboxgl from 'mapbox-gl';
import { Link, useNavigate } from 'react-router-dom';
import AddReservations from '../reservations/AddReservations.js';
import Protected from '../protected/Protected';

const Transition = forwardRef((props, ref) => { // recievs two parmeters 
  return <Grow ref={ref} {...props} />; // dialog grows from the clicked gear passing ref 
});

const GearPage = () => {
  const { state: { gear,user }, dispatch } = useValue(); //inital state is null closed 
  const [place, setPlace] = useState(null); // initial state of place
  const [map, setMap] = useState(null);
  const [showAddReservations, setShowAddReservations] = useState(false); // State variable to manage the visibility of the reservation model

  useEffect(() => { // getting the place name 
    if (gear) { // if the gear object is present 
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${gear.lng},${gear.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
      fetch(url)
        .then(response => response.json()) // fecth function sends url to map box and when promise is resolved in json format 
        .then((data) => { // recieve the oject as data parameter 
          setPlace(data.features[0]); // setting and extracting the place 
          initializeMap(data.features[0].center);
          //add the marker
        });
    }
  }, [gear]);

  const handleClose = () => {
    dispatch({ type: 'UPDATE_GEAR', payload: null }); // sets everyhing back to null
    // Close and reset the reservation model
    setShowAddReservations(false);
  };
// this function is responsible for showing the map box map itht he marker 
  const initializeMap = (center) => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;
    //creating the map box instance with object configs
    const map = new mapboxgl.Map({
      container: 'map',
      style: "mapbox://styles/igorlozko/clskovgwk01oe01qsbhb6f5f7",
      center: center,
      zoom: 12
    });
    new mapboxgl.Marker() //addign the marker depending on the center onject rescieved 
      .setLngLat(center)
      .addTo(map);
    setMap(map);
  }

  const handleBookNow = () => {
    // Logic to handle booking
    // For now, showing the AddReservations component
    console.log("Selected gear ID in Gear page:", gear._id);
    setShowAddReservations(true);
  };
  const handleReservationSuccess = () => {
    // Reset the reservation model after a successful reservation
    setShowAddReservations(false);
  };

  return (
    <Dialog
      fullScreen //declaring the pop up to be fullscreen
      open={Boolean(gear)} // a state if the gear is open or closed default valu is null if object then true
      onClose={handleClose} // function responsible for closing the dialog 
      TransitionComponent={Transition} // slides dialog from bottom to up
      transitionDuration={300}
    >
      <IconButton
        color='black'
        onClick={handleClose} // carries out the action for closing the pop up
        elevation={0}
      >
        {/*This is the part of the pop up with closes the dialog */}
        <AppBar position='relative' elevation={0} sx={{ backgroundColor: ' #ff4e53', borderRadius: '20px 20px 0 0' }}>
          <Toolbar  sx={{ justifyContent: 'center' }}>
            <Close/>
            <Typography variant="h6" color="white" sx={{ ml: 1, alignItems:'center', fontWeight: 400 }} >Close</Typography>
          </Toolbar>
          <Divider/>
        </AppBar>
      </IconButton>
      {/*This is the container containing all the information for the gear */}
      <Container sx={{pt:1}}>
        <Stack sx={{p:1}} spacing={2}>
           <Box style={{ maxWidth: '100%', margin: 'auto', borderRadius: '20px' }}>
           <Carousel showArrows={true} showThumbs={true}> 
              {gear?.images?.map((url, index) => ( //mapping the images recieving the url and inex
                <div key={index} style={{ borderRadius: '20px', height: '400px', width: '100%', overflow: 'hidden' }}>
                  <img src={url} alt={`image-${index}`} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
              ))}
            </Carousel>
          </Box>
          <Divider/>
          <Box sx={{ display: 'flex', justifyContent:'left' }}>
            <Typography
              variant='h4'
              component='h3'
              sx={{
                color: 'black',
                mb: .5, // Add margin bottom to the title for spacing
                fontWeight: 500 
              }}
            >
              {gear?.title} 
            </Typography>
          </Box>
          <Divider/>
          <Stack direction="row" sx={{justifyContent:'space-between',flexWrap:'wrap'}}>
            <Box>
              <Typography variant='h6' component='span'>{'Price per day: '}</Typography>
              <Typography component='span' >{gear?.price === 0 ? 'Free rental': '€'+gear?.price}</Typography>
            </Box>
          </Stack>
          <Stack direction="row" sx={{justifyContent:'space-between',flexWrap:'wrap'}}>
            <Box>
              <Typography variant='h6' component='span'>{'Location: '}</Typography>
              <Typography component='span' > {place?.text}</Typography>
            </Box>
          </Stack>
          <Stack>
            <Typography variant='h6' component='span'>{'Description: '}</Typography>
            <Typography component='span' > {gear?.description}</Typography>
          </Stack>
          <Divider/>
          <Stack>
            <Protected>
            <Button variant="contained" color="primary" onClick={handleBookNow}>Make a reservation</Button></Protected>

            {showAddReservations && <AddReservations gearId={gear._id} onSuccess={handleReservationSuccess} />}
          </Stack>
          <Divider/>
          <Stack direction="row" sx={{justifyContent:'space-between',flexWrap:'wrap'}}>
            <Box sx={{display:'flex-column',alignItems: 'center'}}>
              <Typography variant='h6' component='span'>{'Address: '}</Typography>
              <Typography component='span' > {place?.place_name}</Typography>
            </Box>
          </Stack>
          <Box id="map" style={{ width: '100%', height: '300px' }} />
          <Stack>
          <Typography variant="h6" gutterBottom>Contact Renter</Typography>
          <Divider/>
              <Typography sx={{mt:1}} variant="body1" gutterBottom>Name: {gear?.uName}</Typography>
              <Typography variant="body1" gutterBottom>Published At: {gear?.createdAt}</Typography>
              <Typography variant="body1" gutterBottom>Email: {gear?.contactEmail}</Typography>
              <Typography variant="body1" gutterBottom>Phone: {gear?.contactPhone}</Typography>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
}

export default GearPage;

/*
The following sources helped to shape and create the following code 
https://www.youtube.com/watch?v=MpQbwtSiZ7E
https://www.youtube.com/watch?v=k3Vfj-e1Ma4&t=9062s
https://www.youtube.com/watch?v=YdBy9-0pER4&t=45609s
https://www.youtube.com/watch?v=CvCiNeLnZ00&t=7695s
https://www.youtube.com/watch?v=72iEz5iopqQ&t=770s
https://www.youtube.com/watch?v=eJ3YysWaP_A
https://www.youtube.com/watch?v=ANZNMaBODDY&list=PLufbXXGswL_pS6rdWbDO56oiZovLWE_rs
https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE
https://www.youtube.com/watch?v=Ldw3mFGyjDE&list=PL86WBCjNmqh5HQInLsyYW7g76_6eKcQLf
https://www.youtube.com/watch?v=R5RoYDEIhCI&list=PLy1nL-pvL2M5xNIuNapwmABwEy2uifAlY
https://www.youtube.com/watch?v=1vpwfDDyINk&list=PLyzY2l387AlMy6r_JhflipKqKrhVK17gP
Assistance from chatgpt was also used 
*/

