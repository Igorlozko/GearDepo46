
// store all the functions that are responsible 
//for communicating with the server and the requests directed to the user

import fetchData from "./utils/fetchData"
import {v4 as uuidv4 } from 'uuid';
import uploadFile from "../firebase/uploadFile";

const url = process.env.REACT_APP_SERVER_URL + '/user' // creating a path to the server

export const register = async(user, dispatch) =>{ // responsible to communicating to the server for registration
    dispatch({type:'START_LOADING'}) // starts the loading screen 

    //SEND REQUEST WITH FETCH
    const result = await fetchData({ // helps to create a method body general function 
        url:url+'/register', // passing the url
        body: user, // user information passed
    },dispatch)
    if(result){ // if resut recieved 
        dispatch({
            type:'UPDATE_USER', // updating user 
            payload: result // recieved from the server
        }) 
        dispatch({
            type: 'CLOSE_LOGIN', // close the login modal
        })
        dispatch({
            type: 'UPDATE_ALERT',
            payload:{open:true, severity:'success', message:'Your account has been created'}, // show message 
        });
    }

    dispatch({type:'END_LOADING'}); // ends loading screen 
};

export const login = async(user, dispatch) =>{ //parameters being passed
    dispatch({type:'START_LOADING'});

    //SEND REQUEST WITH FETCH
    const result = await fetchData({
        url:url+'/login', // login end end point for the server side
        body: user, // body of the user containing all the information 
    },dispatch)
    if(result){
        dispatch({
            type:'UPDATE_USER',
            payload: result // sending a dispatch to indicate change 
        }); 
        dispatch({
            type: 'CLOSE_LOGIN', // closing the login modal by setting it t  false
        });
    }
    dispatch({type:'END_LOADING'});
};
// Responsible for updating the fields
export const updateProfile = async(currentUser, UpdatedFields, dispatch)=>{ // recieving the currentUser and the updated fields
    dispatch({type:'START_LOADING'});

    const {name, file} = UpdatedFields; // extracting the name and file from the updated fields
    let body = {name} // letting body = name
    try{
        if(file){ // if there is a file upload to firebase
            //splts by the dot and get the last part using pop
            const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop(); //uuid added to generate a unique id for the image
            // upload to firebase witht he path of file with name of image 
            const photoURL = await uploadFile(file, `profile${currentUser?.id}/${imageName}`); //uploading the image to firebase uing the function
            body ={...body, photoURL} // adding to body the photoUrl
        }
        const result = await fetchData({url:url+'/updateProfile', method: 'PATCH', body , token: currentUser.token }, dispatch); // sedning the request to server using the function fetchdata
        if(result){ // checking the result from fetchdata 
            dispatch({type:'UPDATE_USER',payload:{...currentUser, ...result} }); // dispatch the action to update the current user state adding the result updated fields
            dispatch({
                type: 'UPDATE_ALERT', // update alert
                payload:{open:true, severity:'success', message:'Your profile has been updated'},
            });
            dispatch({type: 'UPDATE_PROFILE', payload:{open: false, file:null, photoURL: result.photoURL}}) // dispatching and action to closing the profile modal 
        }
    }catch(error){ // upload to firebase fails
        dispatch({
            type: 'UPDATE_ALERT',
            payload:{open:true, severity:'error', message:error.message}, //error message
        });
        console.log(error);//logging error
    }

    dispatch({type:'END_LOADING'}); // endling the loading screen 
};

//this function retriesw the users from the database backend 
export const getUsers = async(dispatch, currentUser)=>{
    const result = await fetchData({url, method:'GET', token:currentUser.token}, dispatch)
    if(result){
        dispatch({type:'UPDATE_USERS', payload: result});
    }
};



export const logout = (dispatch)=>{
    dispatch({type:'UPDATE_USER', payload:null})
    dispatch({type:'RESET_GEAR'})
    dispatch({type:'UPDATE_USERS', payload:[]})
}

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
