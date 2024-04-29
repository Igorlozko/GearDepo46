import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import reducer from './reducer';

//using a context provider to manage and share application state across multiple components

// defines the context provider and custom hooks to manage applications state using the Reducer hook. Setting up initial values

const initialState = { // defines the initail state of the application 
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' }, // an object severity is low defined as info
  profile:{open:false, file:null, photoURL:''}, // object for the profile with default fields
  images:[],
  details:{title:'',description:'', price:0, contactEmail:''},
  location:{lng:0, lat:0}, 
  updatedGear:null,
  deletedImages:[],
  addedImages:[],
  gears: [],
  priceFilter: 500,
  addressFilter: null,
  titleFilter:null,
  filteredGears: [],
  gear:null,
  users:[],
  section:1,
  reservation:[],
  reservations :[], // inital tate of reservations 
  resDetails:{phone:'',purpose:'', addinfo:''},
  dateRange: [new Date(), new Date()], // Single array to store both start and end dates
  paymentMethodId: null

};

const Context = createContext(initialState); // context is created using the create context passign the inital state

export const useValue = () => { // extract values of the context easily 
  return useContext(Context); // custom hook created using the useContext , allows componments to acess the state and dispatch functions(triggering state changes in reedux stores/React)
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // responsible  for managing the applications state using the useReducer hook, state transitions
  // created using the useRef hok to store refrences to the map and search input elements
  const mapRef = useRef(); // map refrence for using and calling back to it 
  const searchRef = useRef();

  const updateDateRange =(dateRange) =>{
    dispatch({type: 'UPDATE_DATE_RANGE', payload:dateRange});
  }

  // checks if there is a user found in the local storage, if found updates the current user
  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); // gets the current user from the local storage 
    if(currentUser){ // if currentuser is found 
      dispatch({type:'UPDATE_USER', payload: currentUser}); // updates the user state and the payload
    }
  },[]);
//If a user is logged in, it retrieves gear-related data from localStorage and updates the state accordingly.
  useEffect(()=>{
    if(state.currentUser){
      const gear = JSON.parse(localStorage.getItem(state.currentUser.id))
      if(gear){
        dispatch({type:'UPDATE_LOCATION', payload:gear.location})
        dispatch({type:'UPDATE_DETAILS', payload:gear.details})
        dispatch({type:'UPDATE_IMAGES', payload:gear.images})
        dispatch({type:'UPDATE_UPDATED_GEAR', payload:gear.updatedGear})
        dispatch({type:'UPDATE_DELETED_IMAGES', payload:gear.deletedImages})
        dispatch({type:'UPDATE_ADDED_IMAGES', payload:gear.addedImages})
      }
    }
  },[state.currentUser])
  //component returns a Context.Provider wrapping the children components, providing access to the state, dispatch function, mapRef, searchRef, and updateDateRange function via the context value.
  return (
    <Context.Provider value={{ state, dispatch, mapRef, searchRef, updateDateRange }}>{children}</Context.Provider> // componments made access able to child componments 
  ); // this code sets up the context provider to share data (state,dispacth,mapref,searchref,updateDateRange) with child componments, ensure they have access to data 
};// dispatch is a funtion used to trigger staet changes, when an action is dispacthed react invokes the reducer passing the current state and the action

export default ContextProvider;


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

