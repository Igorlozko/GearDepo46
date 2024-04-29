
// default token is empty
const fetchData = async({url,method='POST', token='', body=null}, dispatch)=>{ // takes an object as its arguments and dispatch for updating 
    const headers = token // creating headers
    ? {'Content-Type':'application/json', authorization:`Bearer ${token}`}// if token is recieved add it to headers using authorization
    : {'Content-Type':'application/json'}; // if there is no token dont use authorization
  body = body ? {body: JSON.stringify(body)} : {}; // if body is recievd as parameter add object and stringify body 
  try{
    const response = await fetch(url, {method, headers, ...body}); // making the requet using fetch passing url, headers,spread body 
    const data = await response.json(); // extract data from response 
    if(!data.success){
        if(response.status === 401) dispatch({type: 'UPDATE_USER', payload: null}); // if response fails send error
        throw new Error(data.message);
    }
    return data.result;
  } catch(error){
    dispatch({type:'UPDATE_ALERT', payload: {open:true, severity:'error', message: error.message}})
    console.log(error)
    console.log('Error in fetch')
    return null;
  } 
};

export default fetchData;

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
