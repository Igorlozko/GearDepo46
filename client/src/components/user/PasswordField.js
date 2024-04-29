import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

//component that renders a text field for entering passwords. 

const PasswordField = ({
  passwordRef, // recieving the password refrence
  id = 'password',
  label = 'Password',
}) => {
  const [showPassword, setShowPassword] = useState(false); // manages the state of the password visible or not

  const handleClick = () => {
    setShowPassword(!showPassword); // toggles the visibility of the pasword when the eye button is clicked, 
    
  };

  const handleMouseDown = (e) => { // Prevents the default behavior of the mouse down event to avoid unwanted focus behavior.keeps focus on the password field
    e.preventDefault();
    // prevents it from switching to the button
  };
  /**When a user clicks the eye icon button to toggle the visibility of the password, the button receives 
   * a mouse down event. By calling e.preventDefault() within handleMouseDown, we ensure that the default 
   * action associated with that mouse down event (like focusing the input or triggering other browser behavior) 
   * is prevented. This is often done to avoid any unintended side effects or interactions that could occur due 
   * to the default behavior. */

  return (
    <TextField
      margin="normal"
      variant="standard"
      id={id}
      label={label}
      type={showPassword ? 'text' : 'password'} // if the password if true or false toggles between text or dots
      fullWidth
      inputRef={passwordRef} // a ref passed to th input field for managing focus or acceesinf the input value
      inputProps={{ minLength: 6 }}
      required
      InputProps={{
        endAdornment: ( // positioned at the end of the textfield componment 
          <InputAdornment position="end"> 
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}> {/**toggles the visibility icon displayed, onMuseDown keeps focus in the text field */}
              {showPassword ? <VisibilityOff /> : <Visibility />} {/**depending on the state if the icon is eye open or closed */}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;

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

