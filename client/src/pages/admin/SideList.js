import React, { useMemo, useState } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography, styled } from '@mui/material';
import { BikeScooter, ChevronLeft, Dashboard, Inbox, LibraryBooksRounded, Logout, Mail, MarkChatUnread, NotificationsActive, PeopleAlt } from '@mui/icons-material';
import { useValue } from '../../context/ContextProvider';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from './main/Main';
import Gears from './gears/Gears';

import Requests from './reservations/Reservations';
import { logout } from '../../actions/user';
import useCheckToken from '../../hooks/useCheckToken'
import isAdmin from './utils/isAdmin';

// This is the sidelist part of the admin board which helspp users navigate through their reservatons and their gears 

const drawerWidth = 240;


const openedMixin = (theme)=> ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));



  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

  // Functions above are taken from the MUI dashbaord componemnt 

const SideList = ({open, setOpen}) => {

  useCheckToken(); // hook check if the token is still valid if not logs out 

    // importing user from the global state using global context provider
    const {state:{currentUser, location, details, images, updatedGear, deletedImages, addedImages}, dispatch} = useValue();

    // the state that highlists which tab is being used 
    const [selectedLink, setSelectedLink] = useState('gears'); // default is the link of the main conponment 

    const list = useMemo(()=>[ // use memo used to remeber the values in the first render depending on the role

      ...isAdmin(currentUser) ? [ // now these componments will only appear is the uer is admin or editor (renter)
      ] : [],
      // sets the selected lik to gears 
        {title:'Gears', icon:<BikeScooter/>, link:'gears', component:<Gears {...{setSelectedLink, link:'gears'}}/>},
        {title:'Resevations', icon:<LibraryBooksRounded/>, link:'reservations', component:<Requests {...{setSelectedLink, link:'resevations'}}/>},
    ], [currentUser])

    const navigate = useNavigate(); // used to forard user to home

    const handleLogout = ()=>{ // function responsible for loging the user out 
      logout(dispatch)
    }

  return (
    <>
        <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={()=>setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => ( // ths maps the componments one by one 
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>navigate(item.link)} // navigates based on the click of the componment 
                selected={selectedLink === item.link} // when the button is pressed selected item is highlighted 
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon} 
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{mx:'auto', mt:3, mb:1}}>
                <Tooltip title={currentUser?.name || ''} >
                    <Avatar //importing the avatar of the user 
                        src={currentUser?.photoURL} //photo of the user
                        {...(open && {sx:{width:100, height:100}})}
                    />
                </Tooltip>
        </Box>
        <Box sx={{textAlign:'center'}}>
            {open && <Typography>{currentUser?.name}</Typography>}
            {open && <Typography variant='body2'>{currentUser?.email}</Typography>}
            <Tooltip title='Logout'sx={{mt:1}}>
                <IconButton onClick={handleLogout}>
                    <Logout/>
                </IconButton>
            </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
            {list.map(item=>( // routing componments maps sthe componments 
                <Route key={item.title} path={item.link} element={item.component} />
            ))}
            <Route 
              path='*' 
              element = {
              <Gears {...{setSelectedLink, link:'gears'}} />
          }
          />
        </Routes>
      </Box>
    </>
  )
}

export default SideList


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
