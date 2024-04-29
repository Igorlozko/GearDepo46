import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './config';

// function reponsible for uploading images to firebase

const uploadFileProgress = (file, subFolder, imageName, setProgress) => { //function recieves the parameters from the progressItem componment 
  return new Promise((resolve, reject) => { // returns a promise that resolves when a upload is succesffut and rejects if not
    const storageRef = ref(storage, subFolder + '/' + imageName); // creates a storage refrence 
    const upload = uploadBytesResumable(storageRef, file); // starts the upload process 
    upload.on(
      'state_change', // attaches an event listner to the upload task to monitor state change when state changes it calculated the upload progress 
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // calculates the precentage 
        setProgress(progress); // updates tge progress 
      },
      (error) => {
        reject(error); // regection if error 
      },
      async () => { // this is the completion handler 
        try {
          const url = await getDownloadURL(storageRef); // once the download is complete retrieves the download url using the getDownload function
          resolve(url); // resolved in the promise inidcating success
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default uploadFileProgress;


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
