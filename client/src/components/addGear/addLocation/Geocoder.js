import React from 'react'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useValue } from '../../../context/ContextProvider';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const Geocoder = () => {

    const {dispatch} = useValue(); // extracting the dispatch 
    const ctrl = new MapBoxGeocoder({ //initialising the mapbox geocoder 
        accessToken: process.env.REACT_APP_MAP_TOKEN, //passig the object containing the token 
        marker: false, // no marker needed 
        collapsed:true 
    })

    //usecontrol takes the ctrl info and calculates the result 

    useControl(()=>ctrl) // hook used from react map used to integrate the geocoder into the map 
    //returns the control instance which is added to the map 
    //map control integration takes a function as its arguments and in expected to return an instance 

    ctrl.on('result', (e)=>{ // an event listner of the hook if there if a result after search 
        const coords = e.result.geometry.coordinates // extract coordinated from the event 
        dispatch({type:'UPDATE_LOCATION', payload:{lng:coords[0], lat: coords[1]}, // update the state 
        } );
    })

  return (
    null
  )
}

export default Geocoder

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
