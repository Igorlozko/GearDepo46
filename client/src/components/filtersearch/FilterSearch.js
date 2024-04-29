import { Box, Divider, Drawer, IconButton, Typography, styled } from '@mui/material'
import {ChevronLeft, ChevronLeftRounded, ChevronRight} from '@mui/icons-material'
import React from 'react'
import PriceSlider from './PriceSlider'
import { useValue } from '../../context/ContextProvider'
import SearchByTitle from './SearchByTitle'

//https://mui.com/material-ui/api/drawer/
//https://github.com/mui/material-ui/issues/11006

// this is the drawer compnment holds all the 

const DrawerHeader = styled('div')(({theme})=>({ // defines the styling for the drawer header(recieving the theme)
  display:'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding:theme.spacing(0,1),
  ...theme.mixins.toolbar,
}))

const FilterSearch = ({isOpen, setIsOpen}) => { //props passed from the 

  const {searchRef} = useValue(); // value from the glabal context
  const {searchTerm} = useValue(); // not working at the moment 

  return (
    <Drawer // from mui
      variant='persistent' // doesnt close automaticly 
      hideBackdrop={true}
      open={isOpen} // controls the state of the drawer
      //anchor="top" // Set anchor to top
    >
      
      <DrawerHeader>
        <Typography sx={{ml:4}}>Search and Filter</Typography>
        <IconButton onClick={()=> setIsOpen(false)}> {/*action of the button when arrow is clicked closes the drawer*/}
          <ChevronLeftRounded fontSize='large'/> {/*direction of the arrow*/}
        </IconButton>
      </DrawerHeader>  

      <Box
        sx ={{width:240, p:5}}
      >      
        <Typography>Title</Typography>
        <SearchByTitle /> 
        <Typography sx={{ marginTop: '20px' }}>Location</Typography>
        <Box ref ={searchRef}>

        </Box>
        <PriceSlider/>
      </Box>                                                                      
    </Drawer>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  )
}                                                                                                                                                                                                                           
                                                                                                                                        
export default FilterSearch;    

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
