import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider';
import { getUsers } from '../../../actions/user';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import { getGears } from '../../../actions/gear';
import isAdmin from '../utils/isAdmin';
//https://www.youtube.com/watch?v=ibOz6Lz40xU&list=PLwP3cL-MKVkNM28X96Dhc3BLMhtUktiik
//https://www.youtube.com/watch?v=hCGiyI_NmRY&pp=ygUNbXVpIGRhYXNoYm9hcg%3D%3D
//https://www.youtube.com/watch?v=fzxEECHnsvU&t=76s&pp=ygUNbXVpIGRhYXNoYm9hcg%3D%3D


//Responsible fro displaying the gears bloning to the user.

const Gears = ({ setSelectedLink, link }) => {
  const {
    state: { gears, currentUser },
    dispatch,
  } = useValue(); // extracts the global state variables 

  const [pageSize, setPageSize] = useState(5); // sets the page size

  useEffect(() => {
    setSelectedLink(link);
    if (gears.length === 0) getGears(dispatch); // if there are no gears fetch gears from the bakend 
  }, []);

  const columns = useMemo( // responsible for shoing the fields on the gears 
    () => [
      {
        field: 'images',
        headerName: 'Photo',
        width: 100,
        //params is the cell parameters contains info about row,cell etc
        renderCell: (params) => <Avatar src={params.row.images[0]} variant='rounded' />, //rendercell defines ho the ell should be rendered
        sortable: false,
        filterable: false,
      },
      { field: 'price', headerName: 'Price', width: 70, renderCell:(params)=>'€'+params.row.price },
      { field: 'title', headerName: 'Title', width: 170 },
      { field: 'description', headerName: 'Description', width: 200 },
      { field: 'lng', headerName: 'Longitute', width: 100 },
      { field: 'lat', headerName: 'Latitude', width: 100 },
      {
        field: 'uName',
        headerName: 'Added by',
        width: 200,
        renderCell: params=>{
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto}/>
          </Tooltip>
        }
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 100,
        renderCell: params => (
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto}/>
          </Tooltip>
        )
      },
      { field: '_id', width:250, },
    ],
    []
  );

  return (
    <Box
      sx={{
        height: 800,
        width: '100%',
        pb:'100px',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Your Gear
      </Typography>
      <DataGrid
        columns={columns}
        rows={ gears.filter(gear => gear.uid === currentUser.id )} // return users gears only theirs due to gear id and user id matching 
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: { // the color of the grid
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
      />
    </Box>
  );
};

export default Gears;


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
