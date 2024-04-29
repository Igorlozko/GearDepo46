import { Paper, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ProgressList from './progressList/ProgressList';
import ImagesList from './ImagesList';

const AddImages = () => {
    const [files, setFiles] = useState([]); // creating a state for files
    const onDrop = useCallback((acceptedFiles) => { // function to reieve the files after the user drops fiiles 
        setFiles(acceptedFiles); // set setfiles with the accepted files 
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ // hook 
        onDrop, // passing function
        accept: 'image/*' /// which file will be accepted needs to be in an array 
    });

    return (
        <div style={{ height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Paper //styling of te box where the images are being dropped
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #ccc',
                    borderRadius: 4,
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease',
                    '&:hover': {
                        borderColor: '#999',
                    },
                }}
                {...getRootProps()}
            >
                <input {...getInputProps()} /> {/**the files input  */}
                {isDragActive ? ( // incase drag is active show message 
                    <Typography variant="h6" color="primary">
                        Drop files here
                    </Typography>
                ) : (
                    <Typography variant="h6">
                        Drag and drop files or click to upload
                    </Typography>
                )}
                <Typography variant="body2" color="textSecondary" mt={1}>
                    -(Images with .jpeg, .png, .jpg formats will be accepted)
                </Typography>
            </Paper>
            <ProgressList files={files} />
            <ImagesList />
        </div>
    );
};

export default AddImages;

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

