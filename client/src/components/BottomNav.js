import { AddLocationAlt, GridView, LocationOn, PostAdd } from '@mui/icons-material';
import { AppBar, Box, BottomNavigation, BottomNavigationAction, Paper, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import ClusterMap from './map/ClusterMap';
import Gears from './gear/Gears';
import AddGear from './addGear/AddGear';
import Protected from './protected/Protected'; // Assuming this provides role-based protection
import { useValue } from '../context/ContextProvider';
import BasicMes from './protected/BasicMes';

const BottomNav = () => {
    const { state: { section, currentUser }, dispatch } = useValue(); // Access currentUser from context
    const ref = useRef(); // creates a ref object to scroll to the top of that section

    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0; // hook used to scroll to the top of the page whenever the section state changes
    }, [section]);

    const isAdminOrEditor = currentUser && (currentUser.role === 'admin' || currentUser.role === 'editor'); // conditional block to determine who can see the icons

    return (
        <Box>
            <Paper elevation={0} sx={{mb:0,position: 'static', top: 0, left: 0, right: 0, zIndex: 2 }}> {/* Move the BottomNavigation to the top */}
                <BottomNavigation
                    showLabels // can see the titles of the icons
                    value={section}
                    onChange={(e, newValue) => dispatch({ type: 'UPDATE_SECTION', payload: newValue })} // event attached to the bottom navigation, which dispatches the action to update the section
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
            <Box ref={ref} sx={{ mt: 2 }}> {/* Move the rest of the content below the BottomNavigation */}
                {{
                    0: <ClusterMap />, // if value is 0 then map
                    1: <Gears />, // if 1 then show gears
                    2: isAdminOrEditor ? <AddGear /> : <Protected /> && <BasicMes />, // Render AddGear if isAdminOrEditor, otherwise Protected
                }[section]}
            </Box>
        </Box>
    )
}

export default BottomNav;
