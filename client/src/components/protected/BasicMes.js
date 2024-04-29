import React from 'react';
import { Alert, Button, Container, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { useValue } from '../../context/ContextProvider';

const BasicMes = () => {
    const { dispatch } = useValue();

    return (
        <Container
            sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <Alert
                severity="error"
                variant="outlined"
                sx={{ width: '100%', textAlign: 'center', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', flexDirection: 'column', alignItems: 'center' }}
            >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Only verified sellers can place a listing
                </Typography>
                <Typography variant="body1" gutterBottom>
                    You must be a verified seller to place a listing.
                </Typography>
                <Typography variant="h8" gutterBottom sx={{ fontWeight: 400 }}>
                    Please contact team@thegeardepo.com
                </Typography>
            </Alert>
        </Container>
    );
}

export default BasicMes

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
