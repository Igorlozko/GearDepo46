import React, { useRef } from 'react';
import { useValue } from '../../context/ContextProvider';
import { Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import { updateProfile } from '../../actions/user';


// this is the updating window for the user can change the name and can change the profile pic
const Profile = () => {
    const { state: { profile, currentUser }, dispatch } = useValue(); // extracting the global variable from the state and dispatch
    const nameRef = useRef(); // holds the name of the user

    const handleClose = () => { // this closes the profile update screen 
        dispatch({ type: 'UPDATE_PROFILE', payload: { ...profile, open: false } }); //dispatch to update profile, payload is an object same profile fields and changing it to closed
    };

    const handleChange = (e) => { // initialised when icon changes receiving the event 
        const file = e.target.files[0]; // exracting the file from the event 

        if (file) { // if file is present
            const photoURL = URL.createObjectURL(file); // extracting url from the file and store it i the variable 
            dispatch({ // update the profile state 
                type: 'UPDATE_PROFILE',
                payload: { ...profile, file: file, photoURL: photoURL }, // payload containing the changes 
            });
        }
    };

    const handleSubmit = (e) => { 
        e.preventDefault(); // prevents deafult actions 
        const name = nameRef.current.value; // extracting name of the user
        updateProfile(currentUser, { name, file: profile.file }, dispatch); // passing the current user info and the fields needed to update to the function updateProfile and the dispatch
    };

    return (
        <Dialog open={profile.open} onClose={handleClose}>
            <DialogTitle>
                <Typography variant="h6" component="div">Profile</Typography>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={handleClose}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <DialogContentText>
                        Update your profile by updating the fields:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        variant="outlined"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        inputRef={nameRef}
                        inputProps={{ minLength: 2 }}
                        required
                        defaultValue={currentUser?.name}
                        disabled // Disable the input field for the name
                    />
                    {/**wrapped in a label accepts images, type of a file */}
                    <label htmlFor='profilePhoto'>
                        <input
                            accept='image/*'
                            id='profilePhoto'
                            type='file'
                            style={{ display: 'none' }}
                            onChange={handleChange}
                        />
                        <Avatar
                            src={profile.photoURL} // source if the photo url
                            sx={{ width: 75, height: 75, cursor: 'pointer', margin: '16px auto' }}
                        />
                    </label>
                </DialogContent>
                <DialogActions sx={{ px: '19px', justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        endIcon={<Send />}
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            letterSpacing: '1px',
                            borderRadius: '4px',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        Update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default Profile;

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

