import { Dashboard, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useValue } from '../../context/ContextProvider';
import useCheckToken from '../../hooks/useCheckToken';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/user';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => { // pass properties of usermenu anchor where it should be related to apperaing next to that element 
  useCheckToken();
  const { dispatch, state: {currentUser, location, details, images, updatedGear, deletedImages, addedImages} } = useValue();
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null); // sets the anchor to null meaning that there i no elemnt related to the menu reciving a false
  };

  // using hook 
  const navigate = useNavigate();

  const handleLogout =()=>{
    logout(dispatch)
  }

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu} // anchorL means that the anchor elemnt is related to this element the avatar
        open={Boolean(anchorUserMenu)} // boolean parameter to bolean
        onClose={handleCloseUserMenu} // closes if clicked outside
        onClick={handleCloseUserMenu}
      >
        {!currentUser.google &&( //check if the current user doesnt have google properties(inside google authentication)
        <MenuItem onClick={()=> // react componment on click it dispacthes the action to update profile
          dispatch(
            {
              type:'UPDATE_PROFILE', 
              payload:{open:true, // open payload
              file: null, // null file
              photoURL: currentUser?.photoURL,} // passing the current users photo URL
              })}>
          <ListItemIcon>
            <Settings fontSize="small" /> 
          </ListItemIcon>
          Profile
        </MenuItem>
        )}
        <MenuItem
          onClick={() => navigate('admin')} // navigates to the admin route 
        >
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Admin
        </MenuItem>
        <MenuItem
          onClick={handleLogout} // action to handle the logout state
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile/>
    </>
  );
};

export default UserMenu;

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

