import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useValue } from '../../context/ContextProvider';
import {jwtDecode} from 'jwt-decode';

const GoogleOneTapLogin = () => {
  const { dispatch } = useValue(); // importing dispacth to show the error to the user
  const [disabled, setDisabled] = useState(false); // created states with default values as false meaning it is enabled 

  useEffect(() => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      console.log('Google One Tap library is available.');
    } else {
      console.error('Google One Tap library not available.');//
    }
  }, []);

  const handleResponse = (response) => { // recieves the response 
    const token = response.credential; // extracting token from the credentials 
    const decodedToken = jwtDecode(token); // decoding the token using jwt 
    console.log(decodedToken);
    const {sub: id, email, name, picture:photoURL } = decodedToken // extracting all the informaton from the google token 
    dispatch({type:'UPDATE_USER', payload:{id, email,name,photoURL, token, google:true, role:'basic'}}) // updating the user with this new objetc an  te payload will ontain all the information
    dispatch({type:'CLOSE_LOGIN'})
  };

  const handleGoogleLogin = () => {
    setDisabled(true); // disabling the button when clicked to stop people from double clicking 
    try {
        window.google.accounts.id.initialize({ // initialising the google account and passign the arguments iside the object
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // setting client_id to google id 
          callback: handleResponse, // when there is a callback or response from goofle handle response is called
        });
        // This is the small google window that shows up with all the google account sign in options 
        window.google.accounts.id.prompt((notification) => { // promts the window and pass  function to recieve the notification 
          if (notification.isNotDisplayed()) {  // Check for isNotDisplayed property the promt is not working 
            throw new Error('Try to clear the cookies and try again');
          }
          if (notification.isSkippedMoment() || notification.isDismissedMoment()) { // if skipped means user clicked outside the prmpt allowing us to enabe the button again
            setDisabled(false);// button is enabed again
          }
        });
    } catch (error) {
      dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: error.message }, // showing the error to the user
     });
      console.error(error);
    }
  };

  return (
    <Button variant="outlined" startIcon={<Google />} disabled={disabled} onClick={handleGoogleLogin}>
      Login with Google
    </Button>
  );
};

export default GoogleOneTapLogin;

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

