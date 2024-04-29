import Gear from "../models/Gear.js";
import tryCatch from "./utils/tryCatch.js";
import { v4 as uuidv4 } from 'uuid';


export const createGear = tryCatch(async(req, res)=>{ // wrappped in try and catch to catch any errors, recieved a req and response 
    const {id: uid, name: uName, photoURL: uPhoto,} = req.user; // extracting the req from the user for authentication 
    const ugearId = uuidv4(); // Generate unique ID
    const newGear = Gear({ // creating a new room 
        ...req.body, //spreading the req recieved from the client side 
        uid, 
        uName,
        uPhoto,
        ugearId,
    });
    await newGear.save(); // saving the new gear to the database
    res.status(201).json({ success: true, result: { ...newGear.toObject(), ugearId } }); //sending a succesful status
    console.log("req body",req.body);
    console.log("req user",req.user);

});

// controller responsible to finding and retriving the gears
export const getGears = tryCatch(async (req, res) =>{ // recieving req and res
    const gears = await Gear.find().sort({_id: -1 }); // finding the gears from the mongo atlas (-1 orders them from ne to old )
    res.status(200).json({success: true, result: gears }); // response if succeess 
});

export const deleteGear = tryCatch(async(req, res) =>{
    const {_id} = await Gear.findByIdAndDelete(req.params.gearId);
    res.status(200).json({success: true, result: {_id}});
});

export const updateGear = tryCatch(async(req, res)=>{
    const updatedGear = await Gear.findByIdAndUpdate(req.params.gearId, req.body, {new:true})
    res.status(200).json({success: true, result: updatedGear})
})


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
