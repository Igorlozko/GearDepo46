import React, { useEffect } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useValue } from '../../context/ContextProvider'

const ctrl = new MapboxGeocoder({ //using mapbox geocoder
    marker: false, //no marker
    accessToken: process.env.REACT_APP_MAP_TOKEN //token
})

const GeocoderInput = () => {
    const {mapRef, searchRef, dispatch} =useValue(); // getting the values from global context 

    useEffect(()=>{ // in the first render check the container if it already contains input 
        if(searchRef?.current?.children[0]){ // if there is a first child 
            searchRef.current.removeChild(searchRef.current.children[0]) // removes child 
        }
        //injects the geocoder and matces it witht he map
        searchRef.current.appendChild(ctrl.onAdd(mapRef.current.getMap())) // connects geo coder with the map adding search inuts 

        ctrl.on('result', (e)=>{ // a listner when a result recieve an event to extract the location of the result 
            const coords = e.result.geometry.coordinates // extracting the result co ordinates
            dispatch({
                type:'FILTER_ADDRESS', // dispatching to change the state
                payload:{lng:coords[0], lat:coords[1]} //passign the payload
            })
        })

         ctrl.on('clear', ()=> dispatch({type:'CLEAR_ADDRESS'})) // listner to  clears the address resetting to default values
    }, [])

  return (
    null
  )
}

export default GeocoderInput

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
https://www.youtube.com/watch?v=ZxxZ3kpk5tU
https://www.youtube.com/watch?v=9tFOGC2LPq0
Assistance from chatgpt was also used 
*/
