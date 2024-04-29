import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';

const prices = [0, 10, 20, 30, 40, 50, 60,70,80,90,100,150,200]; // Defining prices options

const CustomPriceSelector = () => {
    // Extract state and dispatch function from the context
    const { state: { priceFilter }, dispatch } = useValue();

    const handlePriceSelect = (price) => { // function handles and disptaches the change in price
        dispatch({ type: 'FILTER_PRICE', payload: price }); // passing the price payload to the global state 
    };

    return (
        <Box sx={{ mt: 5 }}>
            <Typography>Price below:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {prices.map((price) => ( // maps the prices in a column 
                    <Button
                        key={price} //assigns a key 
                        variant={priceFilter === price ? 'contained' : 'outlined'} //displaying either conained or outlined if blue then selected signifying the button is active
                        color="primary"
                        onClick={() => handlePriceSelect(price)} // an event occurs on the click triggering a handlepriceselect
                        sx={{ mb: 1 }}
                    >
                        {`€${price}`}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default CustomPriceSelector;
