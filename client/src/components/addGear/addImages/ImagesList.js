import React from 'react'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { useValue } from '../../../context/ContextProvider'
import { Cancel } from '@mui/icons-material'
import deleteFile from '../../../firebase/deleteFile'

const ImagesList = () => {
    const {state:{images, currentUser, updatedGear}, dispatch} = useValue();// imorting upladoded images from the global state need current user for path due to id 

    const handleDelete = async(image)=>{
        dispatch({type:'DELETE_IMAGE', payload:image});//dispatch action to delete the imaage payload is the image
        const imageName = image?.split(`${currentUser?.id}%2F`)[1]?.split('?')[0] //extracts and  delets image from firebase storage
        //extracting image name and spliting the url
        try{
            await deleteFile(`gears/${currentUser?.id}/${imageName}`); // deleting the image function with user id and the image name 
        }catch(error){
            console.log(error); // throws an error
        }
    };
  return (
    <ImageList 
        rowHeight={200} 
        sx={{
            '&.MuiImageList-root':{
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))!important',
            },
        }}
    >
        {images.map(( //looping through the images 
            image,
            index
        )=>(
            <ImageListItem key={index} cols={1} rows={1}>
                <img src={image} alt="gears" loading='lazy' style={{height:'100%'}}/>
                <ImageListItemBar // this bar cotains the closing icon
                    position='top'
                    sx={{ // background for the bar 
                        background:'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%,rgba(0,0,0,0)100%,)',
                    }}
                    actionIcon={
                        <IconButton
                            sx={{color:'white'}} // color of the button
                            onClick={()=>handleDelete(image)} // icon button which triggers the deletion of the image
                        >
                            <Cancel/>
                        </IconButton>
                    }
                >
                </ImageListItemBar>
            </ImageListItem>
        ))}
    </ImageList>
  )
}

export default ImagesList

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
