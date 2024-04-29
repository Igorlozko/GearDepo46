import { Avatar, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import pendingIcon from './icons/progress1.svg';
import { Check } from '@mui/icons-material';

// this 


let timer;
const InfoField = ({ mainProps, optionalProps = {}, minLength }) => { // mainProps is title, option = description and minlenght
  const { dispatch } = useValue(); // extracting dispatch 
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  // creating 3 states for 3 actions for editing , error and succeess

  const handleChange = (e) => { // recievs an event 
    dispatch({ //dispatches the change to the detaial
      type: 'UPDATE_DETAILS',
      payload: { [e.target.name]: e.target.value }, // depending on the name the title or the description will be updated 
    });
    if (!editing) setEditing(true); // if editing set the editing to true therefore the pending icon show 
    clearTimeout(timer);// clearing the old timer 
    timer = setTimeout(() => { //setting the new timer 
      setEditing(false); // setting the timer to false
      if (e.target.value.length < minLength) { // checking the value less then the minlenght 
        if (!error) setError(true); // check if error is false the set error true 
        if (success) setSuccess(false); // check success if true then set error to false 
      } else {
        if (error) setError(false); // exact oposite then the top 
        if (!success) setSuccess(true);
      }
    }, 1000);//timer checks again after 1 second 
  };
  return (
    <TextField // this is the behaviour of the text field 
      {...mainProps} // spreading props dynamiclly , for versitility and flexibility
      {...optionalProps}
      error={error} // error = state error 
      helperText={error && `This field must be ${minLength} characters or more`} // if the lenght of the text is less than ch then show error 
      color={success ? 'success' : 'primary'}
      variant="outlined"
      onChange={handleChange}
      required //must be completed
      InputProps={{
        endAdornment: ( // added to the end 
          <InputAdornment position="end">
            {editing ? ( //if case the user is editing show the pending icon 
              <Avatar src={pendingIcon} sx={{ height: 70 }} />
            ) : (//in case it is success show the tick icon
              success && <Check color="success" />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InfoField;

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
