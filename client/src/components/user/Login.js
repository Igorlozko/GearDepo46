import { Close, Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import PasswordField from './PasswordField';
import { login, register } from '../../actions/user';

const Login = () => {
  const {
    state: { openLogin }, // importing variable 
    dispatch, // need to close
  } = useValue();
  const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(false); // State because to toggle between the login and register modal
  // 
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' }); // closes the login 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent 
    const email = emailRef.current.value; // value stored from current users email
    const password = passwordRef.current.value; // smae with password

    if (!isRegister) return login({ email, password }, dispatch); // if state not register execution stops and send loging 

    const name = nameRef.current.value; // name is extracted 
    const confirmPassword = confirmPasswordRef.current.value; // and the name is extracted from the current submission
    if (password !== confirmPassword) { // checks first if the passwords match 
      return dispatch({ // if passwords dont match a dispatch is used to send an alert
        type: 'UPDATE_ALERT',
        payload: {
          open: true, // means wether the information should be dsiplayed 
          severity: 'error',// severity level
          message: 'Passwords do not match', // contents of the notification 
        },
      });
    }
    register({ name, email, password }, dispatch); // sends the registration form to actions user
  };

  useEffect(() => { // Useeffect used to change the title depending on the registered or not registered
    isRegister ? setTitle('Register') : setTitle('Login');
  }, [isRegister]);

  return (
    //passing th value of the open login
    <Dialog open={openLogin} onClose={handleClose} maxWidth="sm" fullWidth> {/** used to display content on top of an overlay */}
      <DialogTitle>
        {title} {/**passing the title of the modal */}
        <IconButton // handles the closing of the modal
          sx={{
            position: 'absolute', // positioned to the right side
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500], // color from the materal ui
          }}
          onClick={handleClose} // closes the modal
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}> {/**adding the fields, and triggers the handlesubmit  */}
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister && ( // this will only show if the user is not registered
            <TextField
              autoFocus
              margin="normal"
              variant="outlined"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef} // passing refrence variable
              inputProps={{ minLength: 2 }}
              required
              sx={{ mb: 2 }}
            />
          )}
          {/**This Email and Password fields are seen by registered and unregstered users while name and confirm password is seen by unregistered */}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="outlined"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef} // passing refrence variable
            required
            sx={{ mb: 2 }}
          />
          <PasswordField {...{ passwordRef }} /> {/**calling the password field and passing the refrence, ... ensures props is passed down without directly accessing the prop, to avid conflicts */}
          {isRegister && ( // this will only show if the user is not registered
            <PasswordField
              passwordRef={confirmPasswordRef} // similar to password just different passwordRef
              id="confirmPassword"
              label="Confirm Password"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: '24px', py: '16px' }}> {/**MUI componment used to contain actions  */}
          <Button
            type="submit"
            variant="contained"
            endIcon={<Send />}
            fullWidth
            size="large"
          >
            Submit
          </Button>
        </DialogActions>
      </form> {/**Contained inside the form and when the handle bmit is called button action is carried out (onSubmit) */}
      {/**This is the togling part between the login and register  */}
      <DialogActions sx={{ justifyContent: 'center', py: '16px' }}> 
        <Typography variant="body2"> 
          {isRegister ? 'Already have an account? ' : "Don't have an account? "} {/**if the user is registered show this message or not show the other */}
          <Button onClick={() => setIsRegister(!isRegister)} color="primary">{/**Button to toggle between the two modals, SetIsRegister is the opposite of all the states */}
            {isRegister ? 'Login' : 'Register'}{/**if true make it log in if false make it regster*/}
          </Button>
        </Typography>
      </DialogActions>
      {/**This is the logIn with google part where the user can chose to login with google */}
      <DialogActions sx={{ justifyContent: 'center', pb: '16px' }}>
        <GoogleOneTapLogin />
      </DialogActions>
    </Dialog>
  );
};

export default Login;

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

