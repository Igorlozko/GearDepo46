import mongoose from "mongoose";

// this is the schema for the Gear 

const gearSchema = mongoose.Schema({
    ugearId:{type: String, required:false}, // added the ugearId
    lng:{type: Number, required: true},
    lat:{type: Number, required: true},
    price:{type: Number, min:0, max:10000, default:0},
    title:{type: String, required: true, minLength:5, maxLength:150},
    description:{type: String, required: true, minLength:10, maxLength:10000},
    images:{type:[String], validate:(v) => Array.isArray(v) && v.length > 0}, //vlidating the value and checking if its an array and that it contains atleast on array
    uid:{type: String, required: true},
    uName:{type: String, required: true},
    uPhoto:{type: String, required: false},  
    contactEmail:{type: String, required: false},
    contactPhone:{type: String, required: false}
    //email and phone   
},
    {timestamps: true}
)

const Gear = mongoose.model('gears', gearSchema);

export default Gear;


//motorbike - 65b7cdee5240c1433c4a8689 
// backpack - 65c3fee564a409ca8adf5ced 
// cycle - 65b7cdee5240c1433c4a8689 


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
