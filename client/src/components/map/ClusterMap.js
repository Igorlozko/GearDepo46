import React, { useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { getGears } from '../../actions/gear';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Supercluster from 'supercluster';
import './cluster.css';
import { Avatar, Box, IconButton, Paper, Tooltip } from '@mui/material';
import GeocoderInput from '../filtersearch/GeocoderInput';
import WindowGear from './WindowGear';
import { GridCloseIcon } from '@mui/x-data-grid';

const supercluster = new Supercluster({ // initializing and creating the supercluster 
  radius: 40,
  maxZoom: 16,
});

const ClusterMap = () => {
  const {
    state: { filteredGears },
    dispatch,
    mapRef,
  } = useValue(); //extracting the values from the global state 
  const [points, setPoints] = useState([]); // states used by the cluster 
  const [clusters, setClusters] = useState([]); // states used for the cluster 
  const [bounds, setBounds] = useState([-180, -85, 180, 85]); // default bounds gotten from the supercluster package 
  const [zoom, setZoom] = useState(0); // state for the zoom
  const [popupInfo, setPopupInfo] = useState(null); // state for the popup info 

  useEffect(() => { // useeffect used to fetch all the gears in the firt render this is also used in the Gears tab 
    getGears(dispatch);
  }, []);

  //if any change in the room loop and create another format 
  useEffect(() => {
    const points = filteredGears.map((gear) => ({ // creating points object from the filtered gears mapping them 
      type: 'Feature',
      properties: { //adding properties of the cluster 
        cluster: false,
        gearId: gear._id, //extracting it fom the gear object 
        price: gear.price,
        title: gear.title,
        description: gear.description,
        lng: gear.lng,
        lat: gear.lat,
        images: gear.images,
        uPhoto: gear.uPhoto,
        uName: gear.uName,
        contactEmail: gear.contactEmail,
        contactPhone: gear.contactPhone,
        createdAt: gear.createdAt,
      },
      geometry: {
        type: 'Point', 
        coordinates: [parseFloat(gear.lng), parseFloat(gear.lat)], // array of lng and lat parseFloat to make it a number
      },
    }));
    setPoints(points); // setting state to this new points array
  }, [filteredGears]);

  // if there is a change in any of these points then this useeffect will trigger 
  useEffect(() => {
    //creating new cluster using the suercluster 
    supercluster.load(points); //loading points using supercluster 
    setClusters(supercluster.getClusters(bounds, zoom)); // setting cluster using docs
  }, [points, zoom, bounds]);

  // extracting the exatc bounds of the map 
  useEffect(() => {
    if (mapRef.current) { // if assigned 
      setBounds(mapRef.current.getMap().getBounds().toArray().flat()); //setting bounds converging to arrays getmap and get bounds to a single array using flat
    }
  }, [mapRef?.current]);

  return (
    <Box sx={{ height: 900, position: 'relative' }}>
      <ReactMapGL // importing the map componment 
        initialViewState={{ latitude: 53.349805, longitude: 6.26031 }} // setting the inital view Dublin
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN} // importing the map token 
        mapStyle="mapbox://styles/igorlozko/clskovgwk01oe01qsbhb6f5f7"//adding custom styles to the map dusk
        ref={mapRef} //refrence to control the map and accessing properties d methods , lke getting current map instance, for using it later, extracting it from the global context 
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))} // when an event like zoom state changes updating the clusters
        //zoom forces the supercluster to update 
      >
        {clusters.map((cluster) => { //looping through the clusters recieving the single cluster 
          const { cluster: isCluster, point_count } = cluster.properties;
          const [longitude, latitude] = cluster.geometry.coordinates; //extarcting the lng and lat from the cluster 
          if (isCluster) { // cluster then return a marker 
            return (
              <Marker
                key={`cluster-${cluster.id}`} // need key to identify 
                longitude={longitude}
                latitude={latitude}
              >
                <div // styling css for the cluster marker 
                  className="cluster-marker"
                  style={{
                    //size is dependant of the cluster size
                    width: `${5 + (points.length > 0 ? point_count / points.length : 0) * 10}px`, 
                    height: `${5 + (points.length > 0 ? point_count / points.length : 0) * 10}px`,
                  }}
                  onClick={() => {
                    const zoom = Math.min( //extract zoom 
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.flyTo({ // change the view of the map regarding the zoom
                      center: [longitude, latitude], //location of the cluster
                      zoom,
                      speed: 1, // one second 
                    });
                  }}
                >
                  {point_count}
                </div>
              </Marker>
            );
          }

          return (
            //incase it is not a clsuter return the marker of th user
            <Marker
              key={`gear-${cluster.properties.gearId}`}// id of the gear
              longitude={longitude}
              latitude={latitude}
            >
              <Tooltip title={cluster.properties.uName}>
                <Avatar 
                  src={cluster.properties.uPhoto}
                  component={Paper} //shwing the name and the avatar of the user
                  elevation={2}
                  onClick={() => setPopupInfo(cluster.properties)}  // action when clicks on the avatar the popup info is set and assigned from the cluster
                />
              </Tooltip>
            </Marker>
          );
        })}
        <GeocoderInput />
        {popupInfo && ( // if properties are already inside the properties then open the pop up component
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            maxWidth='auto'
            closeOnClick={false}
            focusAfterOpen={false}
            onClose={() => setPopupInfo(null)} //propeties are reset 
          >
             <Box sx={{ position: 'absolute', top: '1px', right: '1px', zIndex: 2 }}>
                <IconButton 
                  size="small" 
                  onClick={() => setPopupInfo(null)} 
                  sx={{ 
                    backgroundColor: '#ff4e53', // Light gray background color
                    borderRadius: '50%',
                    '&:hover': {
                      backgroundColor: '#ff4e53', // Light gray background color on hover
                    }
                  }}
                >
                  <GridCloseIcon fontSize="small" sx={{ color: 'white' }} /> {/* White "X" icon */}
                </IconButton>
              </Box>
            <WindowGear popupInfo={popupInfo} />
          </Popup>
        )}
      </ReactMapGL>
    </Box>
  );
};

export default ClusterMap;

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

