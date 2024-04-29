import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Lock, Menu } from '@mui/icons-material';
import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';
import FilterSearch from './filtersearch/FilterSearch';
import logo4 from './logo4.png'; 
import { Link } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune';
import LoginIcon from '@mui/icons-material/Login';

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue(); // extracting the current user
  // useValue hook to access state and dispatch function from the context provider.
  //returns an object containing the current state currentUser and the dispatch function.
  // extracts current user from the state object and assgins it to a variable named currentUser and extracts dispatch function

  const [isOpen, setIsOpen] = useState(false); // state which controls the state of the drawer for search and filter
  //default value is closed

// toolbar is used a container for the other elements disabled gutters removes padding 
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <IconButton size="small" color="primary" onClick={()=>setIsOpen(true)}>{/**onclick toggles the sidebar to open setting the state to true */}
              <TuneIcon sx={{mr:1}} /> Filters
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Link to="/">
                <img src={logo4} alt="logo4" style={{ height: 60 }} />
              </Link>
            </Box>
            {!currentUser ? ( // condition if not the current user then show log in 
              <Button
                color="primary"
                startIcon={<LoginIcon />}
                onClick={() => dispatch({ type: 'OPEN_LOGIN' })} // onclick an action is triggered OPEN_LOGIN in order to sign the user in
                sx={{ ml: 'auto' }} // dispatch is updating the user state
              >
                Login
              </Button>
            ) : (
              <UserIcons />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/**passing the states of the drarer */}
      <FilterSearch {...{isOpen, setIsOpen}}/>
    </>
  );
};

export default NavBar;


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

