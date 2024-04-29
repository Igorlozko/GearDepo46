import mongoose from "mongoose";

// this is the model for the reservation 

const reservationSchema = mongoose.Schema({
    //urId:{type:String, required:true},
    resId:{type: String,required: false},
    rName:{type: String,required: false},
    rPhoto:{type: String,default: ''},
    ugearId:{type:String, default:false},
    gearId:{type:String, required: true},
    startDate:{type: String,required: true},
    endDate:{type: String,required: true},
    totalPrice:{type:Number,required:true},
    phone:{type: String,required: true},
    purpose: {type: String,required: true},
    addinfo:{type: String,required: true},
    role:{
        type: 'String',
        default:'basic',
        enum:['basic', 'editor','admin']
    },
    active:{type:Boolean, default:true}
   // totalPrice:{type: Number,min:0, max:10000, default:0}
},
{timestamps:true}
)

// creating the model
const Reservation = mongoose.model('reservations', reservationSchema) // named colledction to reservations and passing shcema 

export default Reservation;


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
