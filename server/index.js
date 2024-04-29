import express from 'express'
import dontenv from 'dotenv'
import gearRouter from './routes/gearRouter.js'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'
import reservationRouter from './routes/reservationRouter.js'
import cors from 'cors'; // Import the cors middleware


dontenv.config() // initialising the enviornment variables to be made accessable

const port = process.env.PORT || 5000 // creating a port 

const app = express() // initialising express 

app.use(cors()); // Use the cors middleware to enable CORS from different links 
//By enabling cross server can control acess to to its resources and allow or deny requests 
//middleware are functions which have access to the request and response 
app.use((req, res, next)=>{ // injecting headers with these cofigureations app.use mounts middleware functions 
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL) // origins are allowed to acces the resources of the server
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE') // allows basic http requests to the express server
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization') // server permits client to include those headers, 
    next() // passes control to the next middleware function this ensures that the request passes through other middleware and reaches router handlers
    // x requests help identify ajax requests
    // content type - specifies data format req,res
    // auth - provides auh credentials
})

app.use(express.json({limit:'30mb'})); // json communication between client and server with limit of 30mb for security
app.use('/reservation', reservationRouter); // failing when i enter this and the server cant start
app.use('/user', userRouter);
app.use('/gear', gearRouter);
app.get('/', (req, res)=>res.json({messsage:"Welcome to our API"}))
app.use((req, res)=>res.status(404).json({success:false, message: 'Not Found'})) // client access link which is not available

const startServer = async()=>{ // function which creates the server to listne to requests it is async as it needs to communicate with the mongo
    try{
        await mongoose.connect(process.env.MONGO_CONNECT); // calling the connecting with mongo and pasign the enviorment variable
        app.listen(port, ()=> console.log(`Server is istnening on port: ${port}`)) // listing on port 
    }catch(error){
        console.log(error) // an error in case something goes wrong 
        console.log('crash at index')
    }
}

startServer(); // starts the server






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
