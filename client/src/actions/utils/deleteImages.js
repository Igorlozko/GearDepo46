import deleteFile from "../../firebase/deleteFile"


const deleteImages = async (images, userId) => {
    if (images.length > 0) {
        const promises = images.map((imageArray) => { // Iterate over the outer array
            if (Array.isArray(imageArray) && imageArray.length === 2) { // Check if it's an array and has two elements
                const [imgURL] = imageArray; // Extract the URL from the inner array
                if (typeof imgURL === 'string') { // Check if imgURL is a string
                    const imgName = imgURL.split(`${userId}%2F`)[1]?.split('?')[0];
                    console.log(imgURL, imgName);
                    return deleteFile(`gears/${userId}/${imgName}`); // stored inside promises arrays as request promises
                } else {
                    console.error('imgURL is not a string:', imgURL);
                    return Promise.reject(new Error('imgURL is not a string'));
                }
            } else {
                console.error('Invalid image array:', imageArray);
                return Promise.reject(new Error('Invalid image array'));
            }
        });
        try {
            await Promise.all(promises);
        } catch (error) {
            console.log(error);
        }
    }
};

export default deleteImages;

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
