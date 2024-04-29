import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Home from './pages/Home';
import Loading from './components/Loading';
import Notification from './components/Notification';
import GearPage from './components/gear/GearPage';

const App = () => {
  return (
    //Fragments =  allow grouping multiple JSX elements without adding extra nodes to the DOM.
    //Notifications = These are components that render loading indicators and notifications, respectively.
    //BrowserRouter =  It enables client-side routing using React Router.
    // Route = component specifies a path and the component to render when that path matches the current URL.
    // admin = This route matches any URL starting with "/admin" and renders the Admin component.
    // * =  This route matches any other URL and renders the Home component.
    // GearPage = rendered outside the browserRouter rendered on every page of the application.
    <> 
    <Loading/> 
    <Notification/>
    <BrowserRouter>
    <Routes>
      <Route path='admin/*' element={<Admin/>}/>
      <Route path ='*' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    <GearPage/>
    </>
  );
};

export default App;



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

