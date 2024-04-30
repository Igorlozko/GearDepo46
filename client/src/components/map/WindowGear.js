import React from 'react';
import { useValue } from '../../context/ContextProvider';
import { Card, Box, Typography, Divider } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

//This componment is responsible for showing the small window when  user clicks on an icon

const WindowGear = ({ popupInfo }) => { // recieving the pop up information 
    const { title, price, images } = popupInfo; //populating the information 
    const { dispatch } = useValue();

    const handleClick = () => {
        dispatch({ type: 'UPDATE_GEAR', payload: popupInfo });// opens the gear, open the single page of the gear 
        // Add logic to navigate to the gear page
    };

    return (
        //card componemnt with the styling for the gear 
        <Card
            sx={{
                width: 230,
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: 'transparent',
                boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}
            onClick={handleClick} //action carried out when the card is clicked
        >
            <Carousel //carousel componment which is responsible to containing and mapping the images of the gear
                autoPlay={false}
                indicators={true}
                indicatorContainerProps={{
                    style: {
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    },
                }}
            >
                {images.map((url, index) => ( // mapping of the images recieving the url and index 
                    <Box key={index}>
                        <img
                            src={url}
                            alt={`gear-${index}`}
                            style={{
                                height: '180px',
                                width: '100%',
                                objectFit: 'cover',
                                borderRadius: '4px',
                            }}
                        />
                    </Box>
                ))}
            </Carousel>
            <Box sx={{ padding: '5px' }}>
                <Typography variant="h6" color="black" gutterBottom>
                    {title} 
                </Typography>
                <Divider sx={{ mb: '5px' }} />
                <Typography variant="subtitle1" color="black">
                    {price === 0 ? 'Free Stay' : '€' + price}
                </Typography>
            </Box>
        </Card>
    );
};

export default WindowGear;

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

