import { Avatar, Card, Container, Grid, Typography, Tooltip, Divider } from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import { useEffect, useState } from 'react';
import { getGears } from '../../actions/gear';

// tis componemnt is responsbe for showing the cards of all the gears on the website 

const Gears = () => {
  const { state: { filteredGears }, dispatch } = useValue(); // extracting the filtered gears 
  const maxDescriptionLength = 100; // setting the max description lenght 
  const [maxHeight, setMaxHeight] = useState('auto');

  useEffect(() => { // useeffect used to fetch all the gears 
    getGears(dispatch);
  }, []);

  const handleGearClick = (selectedGear) => { //managin ght eselected gear 
    console.log("Clicked gear ID:", selectedGear._id); // printing the gear id selected 
    dispatch({
      type: 'UPDATE_GEAR',
      payload: selectedGear // updating the global state variable 
    });
  };

  //makes sure that the height of each card is the same, called when image finishes loading
  const handleImageLoad = (event) => {
    // Get the maximum height of all cards
    const maxHeight = Math.max(...Array.from(event.target.parentNode.parentNode.parentNode.parentNode.children).map(child => child.clientHeight));
    //acess the image parent then messures all the cards extracts all the children cards, determines the tallest card and sets the max height 
    // Set the maximum height for all cards
    setMaxHeight(`${maxHeight}px`); //sets the maxheight state 
  };

  return (
    <Container style={{ minHeight: '100vh', paddingBottom: '50px',paddingTop: '15px'}}>
    <Grid container spacing={2} style={{ height: `calc(100% - 64px - 48px)` }}> {/* Adjust 64px for header and 48px for footer */}
      {filteredGears.map((gear) => ( // mapping the gears 
        <Grid item xs={12} sm={6} md={4} lg={3} key={gear._id}>
          <div style={{ cursor: 'pointer' }} onClick={() => handleGearClick(gear)}>
            <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: maxHeight }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={gear.images[0]} // adding the first image 
                  alt={gear.title} // adding the title 
                  loading="lazy"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                  onLoad={handleImageLoad}
                />
                {/*adding the users name and image */}
                <Tooltip title={gear.uName}>
                  <Avatar src={gear.uPhoto} style={{ position: 'absolute', top: '8px', right: '8px', border: '2px solid #fff' }} />
                </Tooltip>
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                <div>
                  <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    {gear.title}
                  </Typography>
                  <Typography variant="body2" style={{ color: 'gray', marginBottom: '8px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {gear.description.length > maxDescriptionLength ? `${gear.description.substring(0, maxDescriptionLength)}...` : gear.description}
                  </Typography>
                </div>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#333', marginTop: 'auto' }}>
                  {gear.price === 0 ? 'Free Rental' : `€${gear.price} / day`}
                </Typography>
              </div>
            </Card>
          </div>
        </Grid>
      ))}
    </Grid>
    <Divider/>
  </Container>
  );
};

export default Gears;

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

