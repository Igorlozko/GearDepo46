import { Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import { useValue } from '../../../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocoder from './Geocoder';

// this componment is responsible for the map render and the location render of the user using the fetch api function 


const AddLocation = () => {

    const {state:{location:{lng,lat}, currentUser}, dispatch} = useValue(); // getting the default values from the global variable

    const mapRef = useRef(); //creating refrence for the map 
    //map
    useEffect(()=>{ 
            //fecth allows to find the location
            fetch('https://ipapi.co/json')
            //waits for the promise and recives the response 
            .then(response =>{
                //extracting the json object 
                return response.json();
            }).then(data => {
                //recieving and moving map 
                dispatch({type:'UPDATE_LOCATION', payload:{lng:data.longitude, lat:data.latitude}}); //updating the location from recieved data 
            })
    },[mapRef]);

    useEffect(()=>{
        if((lng|| lat)&& mapRef.current){
            mapRef.current.flyTo({ // fly the map to the location  
                center: [lng,lat]
            });
        }
    },[lng, lat])

    return (
        <Box
            sx={{
                height:400,// height and position of the map 
                position:'relative'
            }}
        >
            <ReactMapGL //react map componment 
            ref={mapRef}
                mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN} //mapbox access token 
                initialViewState={{ //adding the intial position of the map 
                    longitude: lng,
                    latitude: lat,
                    zoom:8//default zoom value 
                }}
                mapStyle='mapbox://styles/mapbox/streets-v11' // styling for the ma box chosen dusk for easier view
            >
                <Marker //adding the marker to the map
                    latitude={lat} //passing the lat prop
                    longitude={lng} //passing the lng prop
                    draggable // means can be dragged and moved 
                    onDragEnd={(e)=> dispatch({type:'UPDATE_LOCATION', // on the event of a drag an event is recieved  which updated the location 
                    payload:{lng:e.lngLat.lng, lat:e.lngLat.lat}})} //payload will extract from the event 
                />
                <NavigationControl position='bottom-right'/> {/*this is the geolocator which adds the zoom in and zoom out functions */}
                <GeolocateControl  // this is the geolocator 
                    position='top-left'
                    trackUserLocation // geolocator trackts the users location 
                    // on the event press of the geolocation the state is updated using dispach with payload extracting the lng and lat from the event
                    onGeolocate={(e)=> dispatch({type:'UPDATE_LOCATION', payload:{lng:e.coords.longitude, lat:e.coords.latitude}})}  
                />
                <Geocoder/>
            </ReactMapGL>
        </Box>
    )
}

export default AddLocation

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
