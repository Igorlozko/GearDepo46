
// function which receives the state and the action we need to preform on the state.
//This function takes two parameters: state (representing the current state of the application) and action (representing the action to be performed on the state).
//For each action type, the reducer returns a new state object that reflects the changes based on the action type and payload.
//Each case handles a specific action type and updates the state accordingly, either by modifying existing properties or appending new data to arrays. These actions 
//collectively manage the state of the application, ensuring that it reflects the changes caused by user interactions or other events.
const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN': // represent different actions that can occur in the application,
      return { ...state, openLogin: true }; // no need for payload only two situation true and false
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false }; //Depending on the action type, the reducer updates different properties of the state object using the spread operator (...state).

    case 'START_LOADING':
      return { ...state, loading: true }; // loading state changes to true
    case 'END_LOADING':
      return { ...state, loading: false }; // loading state changes to false

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload }; // same as user need payload due to many fields needed to eb filled unlike the login true/false

    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload }; // action for updating profile

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload)); //stores the updated currentUser in the local storage. to stay logged in
      return { ...state, currentUser: action.payload };

    case 'UPDATE_IMAGES':
        return {...state, images:[...state.images, ...action.payload]}; //Appends the images received in the payload to the images array in the state.

    case 'DELETE_IMAGE':
        return {...state, images: state.images.filter(image=>image !== action.payload)};//Removes the image specified in the payload from the images array in the state 

    case 'UPDATE_DETAILS':
        return {...state, details:{...state.details, ...action.payload}}; //Updates the details property of the state with the details received in the payload.
      // images not the same as the payload
    case 'UPDATE_LOCATION':
        return {...state, location: action.payload};

    case 'UPDATE_UPDATED_GEAR':
      return{...state, updatedGear: action.payload};

    case 'UPDATE_DELETED_IMAGES':
      return {...state, deletedImages:[...state.deletedImages, ...action.payload]};

      case 'UPDATE_ADDED_IMAGES':
        return {...state, addedImages:[...state.addedImages, ...action.payload]};

    case 'RESET_GEAR': // this is the reset part of the gear which sets everything back to null
      return{...state, images:[], details:{title:'', description:'', price:0}, location:{lng:0, lat:0},updatedGear:null }; 
    case 'RESET_RESERVATION':
      return{...state, reservation:[],reservations :[],resDetails:{phone:'',purpose:'', addinfo:''},dateRange: [new Date(), new Date()],paymentMethodId: null  }
      
    case 'UPDATE_GEARS':
      return{...state, gears: action.payload, addressFilter: null, priceFilter: 100, filteredGears: action.payload, deletedImages:[], addedImages:[]};  // resetting location and price to default values
      
    case 'UPDATE_RESERVATIONS':
      return{...state, reservations:action.payload };

    case 'FILTER_PRICE':
        return {...state, priceFilter: action.payload, filteredGears: applyFilter(
          state.gears,
          state.addressFilter,
          action.payload
        )};  

    case 'FILTER_ADDRESS':
      return{...state, addressFilter: action.payload, filteredGears: applyFilter(
        state.gears,
        action.payload,
        state.priceFilter
      )};

      case 'FILTER_TITLE':
        return {
          ...state,
          titleFilter: action.payload,
          filteredGears: applyFilter(
            state.gears,
            state.addressFilter,
            state.priceFilter,
            action.payload // Pass the title filter as an argument to applyFilter
          ),
        };

    case 'CLEAR_ADDRESS':
      return{...state, addressFilter: null, priceFilter: 100, filteredGears: state.gears};
      
    case 'UPDATE_GEAR':
      return{...state, gear: action.payload};

    case 'UPDATE_USERS':
      return{...state, users:action.payload};  

    case 'DELETE_GEAR':
      return{...state, gears:state.gears.filter((gear) => gear._id !== action.payload),};

    case 'UPDATE_SECTION':
      return{...state, section: action.payload};

    case 'RES_DETAILS':
        return {...state, resDetails:{...state.resDetails, ...action.payload}}; // return same state and old state and add payload as an object
    //case 'UPDATE_START_DATE':
    //  return{...state, startDate:{...state.startDate, ...action.payload}};
    //case 'UPDATE_END_DATE':
    //  return{...state, endDate:{...state.endDate, ...action.payload}};
    case 'UPDATE_DATE_RANGE':
      return{...state, dateRange:action.payload,};
      case 'UPDATE_RESERVATION':
      return{...state, reservtion: action.payload};

    default:
      throw new Error('Error in action spelling or none existant!'); // throws an error 
  }
};

export default reducer;

const applyFilter = (gears, address, price,title) =>{
  let filteredGears = gears
  if(address){
    const {
      lng, 
      lat
    } = address
    filteredGears = filteredGears.filter(gear => {
      const lngDif = lng > gear.lng ? lng - gear.lng : gear.lng - lng
      const latDif = lat > gear.lat ? lat - gear.lat : gear.lat - lat

      return lngDif <= 1 && latDif <= 1 

    });
  }

  if(price < 100){
    filteredGears = filteredGears.filter(gear => gear.price <= price)
  }

  if (title) {
    const searchTerm = title.toLowerCase();
    filteredGears = filteredGears.filter(gear => gear.title.toLowerCase().includes(searchTerm));
  }

  return filteredGears

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

