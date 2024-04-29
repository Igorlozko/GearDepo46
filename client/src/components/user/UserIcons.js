import { Mail, Notifications } from '@mui/icons-material';
import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import UserMenu from './UserMenu';
import useCheckToken from '../../hooks/useCheckToken';

const UserIcons = () => {
  useCheckToken(); //token authentication or authorization logic.
  const {
    state: { currentUser },
  } = useValue(); // extracting the current user to get their details inside the state

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);// starts with a null value, indicating that initially, there's no anchor element for the user menu.

  return (
    <Box>
      <Tooltip title="Open User Settings">
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>{/**when a user clicks on the avatar icon event handler sets the anchorMenu to the current taget 
         * elemnt e.currentTarget this means thats the avatar icon becomes the anchor element of the user menu, UserMenu recievs the anchorMenu state as on of its props*/}
          <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>{/** extracting the user photo and the name */}
            {currentUser?.name?.charAt(0).toUpperCase()}{/** incase there is not photo use the first letter of the name charAT(0) */}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} /> {/**added a stateopen or close for the anchormenu passing state to userMenu componment */}
    </Box>
  );
};

export default UserIcons;
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

