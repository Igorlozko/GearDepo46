import { AddLocationAlt, GridView, LocationOn, PostAdd } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import ClusterMap from './map/ClusterMap';
import Gears from './gear/Gears';
import AddGear from './addGear/AddGear';
import Protected from './protected/Protected'; // Assuming this provides role-based protection
import { useValue } from '../context/ContextProvider';
import BasicMes from './protected/BasicMes';

const BottomNav = () => {
    const { state: { section, currentUser }, dispatch } = useValue(); // Access currentUser from context
    const ref = useRef(); // creates a ref object to croll to the top of that section

    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0; // hook used to scrol to the top of the page whenever the section state changes
    }, [section]);

    const isAdminOrEditor = currentUser && (currentUser.role === 'admin' || currentUser.role === 'editor'); // conditional block to determine who can see the icons

    return (
        <Box ref={ref}> 
            {{ // switch inside 
                0: <ClusterMap />, // if value is 0 then map
                1: <Gears />, // if 1 then show gears
                2: isAdminOrEditor ? <AddGear /> : <Protected /> && <BasicMes />, // Render AddGear if isAdminOrEditor, otherwise Protected
            }[section]}
            <Paper
                elevation={3}
                sx={{ position: 'fixed', boxShadow: 'none', bottom: 0, left: 0, right: 0, zIndex: 2 }} // psotion and location of the navbar zindex fill the full footer
            >
                <BottomNavigation
                    showLabels // can see the titles of the icons
                    value={section}
                    onChange={(e, newValue) => dispatch({ type: 'UPDATE_SECTION', payload: newValue })} //event attached to the bottom navigation, which dispatches the action to update the section
                >
                    <BottomNavigationAction
                        label='Map'
                        icon={<LocationOn />}
                    />
                    <BottomNavigationAction
                        label='Gear'
                        icon={<GridView />}
                    />
                    <BottomNavigationAction
                        label='Add'
                        icon={<PostAdd />}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    )
}

export default BottomNav;

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

