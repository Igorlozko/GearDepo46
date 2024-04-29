import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import InfoField from './InfoField';

const AddDetails = () => {
  const {
    state: {
      details: { title, description, price, contactEmail, contactPhone },
    },
    dispatch,
  } = useValue(); // collects the states from the glabal state using the useValue hook

  const [costType, setCostType] = useState(price ? 1 : 0); //setting the cost type state and initialises it based on the price

  const handlePriceChange = (e) => {//recives an event 
    dispatch({ type: 'UPDATE_DETAILS', payload: { price: e.target.value } }); // recieves an event and sents the event value
  };

  return (
    <Stack
      spacing={3}
      alignItems='stretch'
      sx={{
        width: '100%',
        maxWidth: 600,
        margin: 'auto',
        padding: 3,
        borderRadius: 8,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant='h5'>Add Details</Typography>
      <Typography variant='subtitle1'>1. Price</Typography>
      <TextField // this text field input is responsible for the price 
        variant="standard"
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>,
        }}
        inputProps={{ type: 'number', min: 1, max: 10000 }}
        value={price}
        onChange={handlePriceChange}
        name="price"
      />
      <Typography variant='subtitle1'>2. Gear Details</Typography>
      <InfoField
        mainProps={{ name: 'title', label: 'Title', value: title }} // adding the props to the infofield so the taget is title 
        minLength={5} // passing the minlenght of 5 
      />
      <InfoField
        mainProps={{
          name: 'description',
          label: 'Description',
          value: description,
        }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 8 }}
      />
      <Typography variant='subtitle1'>3. Contact Details</Typography>
      <InfoField
        mainProps={{ name: 'contactPhone', label: 'Contact Phone', value: contactPhone }}
        minLength={5}
      />
      <InfoField
        mainProps={{ name: 'contactEmail', label: 'Contact Email', value: contactEmail }}
        minLength={5}
      />
    </Stack>
  );
};

export default AddDetails;

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

