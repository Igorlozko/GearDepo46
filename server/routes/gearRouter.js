import {Router} from 'express'

import {createGear, deleteGear, getGears, updateGear} from '../controllers/gear.js'
import auth from '../middleware/auth.js';
import gearPerm from '../middleware/permissions/gear/gearPerm.js';
import checkAccess from '../middleware/checkAccess.js';



const gearRouter = Router()
gearRouter.post('/',auth,checkAccess(gearPerm.create), createGear);
gearRouter.get('/', getGears);
gearRouter.delete('/:gearId',auth, checkAccess(gearPerm.delete), deleteGear);
gearRouter.patch('/:gearId',auth, checkAccess(gearPerm.update), updateGear);


export default gearRouter;


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