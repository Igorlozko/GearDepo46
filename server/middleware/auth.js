import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken';

// authentication and verificaion to check wether it is a google or a JWT token

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID) // importing auth from google library and passing the google client Id

const auth = async(req, res, next)=>{ // responsible for intercepting incoming requests and preforming authentication 
    try{
        // first check if it a google token or JWt token
        const token = req.headers.authorization.split(' ')[1] // extracting the token from the request header, split into two parts,authentication shcmee(Bearer) and the token
        const googleToken = token.length > 1000; // checks the lenght of the google token (as google tokens are generaly over 1000)
        if(googleToken){
                const ticket = await client.verifyIdToken({ // verifies the google token using the OAuth2Client method if succesfful it extracts the user infrmation
                    idToken:token, // passign token to id token 
                    audience:process.env.GOOGLE_CLIENT_ID
                })
                const payload = ticket.getPayload(); // gets the tickets payload from the ticket above 
                req.user = {id:payload.sub, name:payload.name, photoURL:payload.picture, role:'basic',} // when succesffl extracts information from the toens payload
        }else{
            //verify custom tokens using JWT
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET) //verifying the custom JWT token 
            const {id, name, photoURL, role,} = decodedToken //extract the trusted infrmation from the decoded token and   
            req.user = {id, name, photoURL, role,}//attach the object user to request
        }
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({success:false, message:'Something went wrong with the authoriztion'})
    }
}

export default auth

// intercepts any requests we need user to be authorized and validate token 


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
