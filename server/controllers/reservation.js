import Reservation from '../models/Reservation.js'
import tryCatch from "./utils/tryCatch.js";
import { v4 as uuidv4 } from 'uuid';

// add the start nd end date 

export const createReservation  = tryCatch(async(req, res) =>{
    const { name:rName, photo:rPhoto,} = req.user // extracting info from the request 
    const resId = uuidv4(); // Generate UUID for reservation ID

    const newReservation = Reservation ({...req.body,resId,rName,rPhoto,})
    console.log("inside the cretaeReservation", req.user)
    console.log("inside the cretaeReservation", req.body)
    
    await newReservation.save() // save to the database 
    res.status(201).json({success:true, result: newReservation })
    console.log("printing the saved data", newReservation)
});

export const getReservedDates = tryCatch(async (req, res) => {
    const { gearId } = req.query;

    try {
        // Find reservations for the specific gearId
        const reservedDates = await Reservation.find({ gearId }, 'startDate endDate');
        res.json(reservedDates);
    } catch (error) {
        console.error('Error fetching reserved dates:', error);
        res.status(500).json({ message: 'Failed to fetch reserved dates.' });
    }
});

export const getReservations = tryCatch(async (req, res) =>{
    const reservations = await Reservation.find().sort({_id: -1 });
    res.status(200).json({success: true, result: reservations });
});

// when i remove the try catch it comes back as running server side but does not pass the authorization 




// issue here with id or user auth 


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

