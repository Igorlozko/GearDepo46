import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import { getReservations } from '../../../actions/reservation';
import isAdmin from '../utils/isAdmin';
import { grey } from '@mui/material/colors';
import isEditor from '../utils/isEditor';

const Reservations = ({ setSelectedLink, link }) => {
  const { state: { reservations, gears, currentUser }, dispatch } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (reservations.length === 0) getReservations(dispatch);
  }, []);

  const columns = useMemo(() => [
    { field: 'resId', headerName: 'Reservation Id', width: 250 },
    { field: 'rName', headerName: 'Buyer Name', width: 150 },
    { field: 'phone', headerName: 'Buyer Phone', width: 150 },
    { field: 'gearId', headerName: 'Gear Id', width: 250 },
    { field: 'gearTitle', headerName: 'Gear Title', width: 200 }, // New column for gear title
    {
      field: 'images',
      headerName: 'Photo',
      width: 100,
      renderCell: (params) => params.row.gearPhoto ? <Avatar src={params.row.gearPhoto} alt="Gear" style={{ maxWidth: '150px', maxHeight: '150px' }} /> : null,
      sortable: false,
      filterable: false,
    },
    { field: 'startDate', headerName: 'Start Date', width: 200 },
    { field: 'endDate', headerName: 'End Date', width: 200 },
    { field: 'totalPrice', headerName: 'Total Price', width: 110 },
    { field: 'purpose', headerName: 'Purpose', width: 200 },
    { field: 'addinfo', headerName: 'Add Info', width: 200 },
  ], []);

  const filteredReservations = useMemo(() => {
  
    // For basic users, filter reservations based on their name
    return reservations.map(reservation => ({
      ...reservation,
      gearTitle: gears.find(gear => gear._id === reservation.gearId)?.title || 'Unknown',
      gearPhoto: gears.find(gear => gear._id === reservation.gearId)?.images?.[0] || '' // Ensure images array exists and access the first image
    })).filter(reservation => reservation.rName === currentUser.name);
  }, [currentUser, reservations, gears]);
  
  

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
        sx={{
          textAlign: 'center',
          mt: 3,
          mb: 3,
        }}
      >
        Manage Reservations
      </Typography>
      <DataGrid
        columns={columns}
        rows={filteredReservations}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
      />
    </Box>
  );
};

export default Reservations;

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

