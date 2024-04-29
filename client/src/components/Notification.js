import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useValue } from '../context/ContextProvider';

const Notification = () => {
  const {
    state: { alert },
    dispatch, // importing object from the state, and dispatch to close the alert
  } = useValue(); // useValue hook to get the states inside the context provider

  // recieving the event and the reason 
  const handleClose = (event, reason) => { //responsible for closing the notification when the user clicks the close icon or click anywhere
    if (reason === 'clickaway') return; // if click away just return 
    dispatch({ type: 'UPDATE_ALERT', payload: { ...alert, open: false } }); // dispatches an action to update the alert setting it to open to false if clickway then returns without dispatch
  };
  return (
    <Snackbar // snackbar componment is conditionally rendered based on the open property of the alert
      open={alert.open}
      autoHideDuration={6000} // time until the notification dissapears 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // position on the alert
    >
      <Alert // alert componment is rendered  which displays the actual message to the user
        onClose={handleClose}
        severity={alert.severity} // severity level of the notifcation like error,warning,info
        sx={{ width: '100%' }}
        variant="filled"
        elevation={6}
      >
        {alert.message} 
      </Alert>
    </Snackbar>
  );
};

export default Notification;


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

