import { createRoot } from 'react-dom/client'; // function to create a root ReactDOM render subtree
import App from './App';
import ContextProvider from './context/ContextProvider';

/*
document.getElementById('root') =  Retrieves the DOM element with the ID "root". This is where the React application will be rendered.
createRoot(...) = Creates a root ReactDOM render subtree, specifying the target DOM element where the React application will be rendered.
Conext Provider - used to provide application-wide state or context using React's Context API.

this code sets up the root of a React application by rendering the main <App /> component wrapped within a 
<ContextProvider> component, providing application-wide context.

createRoot(document.getElementById('root')): This line creates a root element where the React application will be rendered. 
It finds the HTML element with the ID "root" in the document and sets it as the root.

root element is where the entire react appication is rendered, serving as the starting point 
*/

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);


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

