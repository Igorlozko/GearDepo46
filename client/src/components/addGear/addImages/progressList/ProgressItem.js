import { CheckCircleOutline } from '@mui/icons-material';
import { Box, ImageListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { v4 as uuidv4 } from 'uuid';
import uploadFileProgress from '../../../../firebase/uploadFileProgress';
import { useValue } from '../../../../context/ContextProvider';


// responsible for uploading all the files to firebase


const ProgressItem = ({ file }) => {
  const [progress, setProgress] = useState(0);// state of the progress to track the upload progress 
  const [imageURL, setImageURL] = useState(null); //stores the image url being uploaded 
  const {state:{currentUser, updatedGear}, dispatch} = useValue(); // getting the current state and dispatch to change the state of the images 
  //use effect used when the file prop changes the hook executes 
  useEffect(() => { // uses the useEffect hook to trigger the upload process and update the progress based on file change 
    const uploadImage = async () => {
      const imageName = uuidv4() + '.' + file.name.split('.').pop(); // when the file changes it triggeres to create a new file name 
      try {
        const url = await uploadFileProgress( // uploads the file to firebase 
          file,
          `gears/${updatedGear ? updatedGear.uid : currentUser?.id}`,
          imageName,
          setProgress // updates the progress 
        );
        dispatch({type:'UPDATE_IMAGES', payload: [url]}); // change stste of the images in gobal state 
        if(updatedGear) dispatch({type:'UPDATE_ADDED_IMAGES', payload: [url]});
        setImageURL(null);
      } catch (error) {
        dispatch({type:'UPDATE_ALERT', payload:{open:true, severity:'error', message:error.message}})//dispatchng a alert when image if not succesful 
        console.log(error);
      }
    };
    setImageURL(URL.createObjectURL(file));
    uploadImage();
  }, [file]);
  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="gallery" loading="lazy" />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <CheckCircleOutline
              sx={{ width: 60, height: 60, color: 'lightgreen' }}
            />
          )}
        </Box>
      </ImageListItem>
    )
  );
};

export default ProgressItem;

const backDrop = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0, .5)',
};

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
