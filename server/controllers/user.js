import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';
import Gear from '../models/Gear.js';


export const register = tryCatch(async(req, res) =>{ // async function which recieves the re and res
        const {name, email, password} = req.body; // extract the fields from the req body name, email and password
        if(password.lenght < 6) return res.status(400).json({success:false, message:"Password must be longer"}) // checks and sees if the password is less than 6
        const emailLowerCase = email.toLowerCase(); // converts the email to lower case. To avoid capitilization
        const existedUser = await User.findOne({email: emailLowerCase}) //  chekc if the user already exits by calling user finOne and passing the email
        if(existedUser) return res.status(400).json({success: false, message:'User already exists'}) // response if the user already exits
        const hashedPassword = await bcrypt.hash(password, 12) // hashing the password using bcrypt salt = adding a ch 12 =  iterations 
    const user = await User.create({ // this creates the odal in the User
        name,
        email:emailLowerCase,
        password:hashedPassword // passing all the info needed
    })
    //after user is created extract fields to send back to client side
    const {_id:id, photoURL, role, active} = user // update the register and log in function 
    const token = jwt.sign({id, name, photoURL, role}, process.env.JWT_SECRET, {expiresIn: '1h'}) // create a token for the user JWT
    res.status(201).json({success:true, result:{id, name, email:user.email, photoURL, token, role, active}});
});


export const login = tryCatch(async(req, res)=>{ // the login process function wrapped in try and cathc to catch errors 
    const { email, password,} = req.body; // extracting the req body from the request sent (email and password)
        const emailLowerCase = email.toLowerCase(); // converting email to lower case
        const existedUser = await User.findOne({email: emailLowerCase});// checking to see if the user already exists
        if(!existedUser) 
        return res
            .status(404)
            .json({success: false, message:'User does not exist'}) // if user doesnt exists send an error response 
        const correctPassword = await bcrypt.compare(password, existedUser.password); // check if the password is correct using bcrypt compare function
        if(!correctPassword) return res.status(400).json({success:false, message:'Invalid credentails'})//throws error

    const {_id:id,name,photoURL, role, active} = existedUser; // extracting the user object nd assignming it 
    const token = jwt.sign({id, name, photoURL,role}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({success:true, result:{id, name, email:emailLowerCase, photoURL, token, role, active}}); // success message
});

export const updateProfile = tryCatch(async(req,res) =>{ // update function which handles the updating of the user profile
    const fields = req.body?.photoURL ? {name:req.body.name, photoURL: req.body.photoURL} : {name:req.body.name}
    const updatedUser = await User.findByIdAndUpdate(req.user.id, fields, {new:true}) // update the user info in Modal by using the function and pass the req
    const {_id:id, name, photoURL, role} = updatedUser // extracting the updated felds from the udated user

    // to update the gear records
    await Gear.updateMany({uid: id}, {uName: name, uPhoto: photoURL}) //update the info when the user chnages their name (NOT ACCESSABLE TO NONE ADMINS)

    const token = jwt.sign({id, name, photoURL, role}, process.env.JWT_SECRET, {expiresIn: '1h'}); // generates a new token for the updated user
    res.status(200).json({success:true, result:{name,photoURL,token}}); // the success response 
});

export const getUsers = tryCatch(async (req, res) =>{
    const users = await User.find().sort({_id: -1 });
    res.status(200).json({success: true, result: users });
});



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

