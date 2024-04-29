import React, { useEffect } from 'react'
import { useValue } from '../context/ContextProvider'
import {jwtDecode}  from 'jwt-decode'
import { storeGear } from '../actions/gear';
import { logout } from '../actions/user';

// this hook checks wether the token is expired or not 

const useCheckToken = () => {
  // importing dispatch aand other from the state 
  const {state:{currentUser,location, details, images, updatedGear, deletedImages, addedImages}, dispatch} = useValue();
  useEffect(()=>{ // if there is a logged in user import JWT decode to decode the current Users token
    if(currentUser){
        const decodedToken = jwtDecode(currentUser.token) // decoding the current user token 
        if(decodedToken.exp * 1000 < new Date().getTime()) // if the expiry date of the token and comparee it to the current time
        // compares the xpiry time of the toke with current time 
        {
          // if token is exired it stores the gear information 
          storeGear(location, details, images, updatedGear, deletedImages, addedImages, currentUser.id)
          logout(dispatch) // clears the users authentication status and removes token
        }
    }
  },[currentUser, dispatch])
};

export default useCheckToken


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
