import { useState } from 'react';
import fetchData from './utils/fetchData';
import { loadStripe } from '@stripe/stripe-js';

const url = process.env.REACT_APP_SERVER_URL + '/reservation';

export const createReservation = async (reservation, currentUser,formattedPaymentMethod, dispatch) => {
    dispatch({ type: 'START_LOADING' });
    //const {paymentMethod} = useState();
    console.log("gear id inside the createReservation" , reservation.gearId)

    try {
        // Create a payment intent on the server
        const response = await fetch('http://localhost:5000/reservation/create-payment-intent', {
           // token: currentUser?.token,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SC_KEY}`
            },
            body: JSON.stringify({
                paymentMethod: formattedPaymentMethod, //formattedPaymentMethod.id
                amount: reservation.totalPrice *100,
                token: currentUser?.token,
            }),
        });
        console.log('createReservation Payment method in res',formattedPaymentMethod)

        if (!response.ok) {
            throw new Error('Failed to create payment intent');
        }

        const { clientSecret } = await response.json();

        // Confirm the payment on the client side
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PL_KEY);
        const { error } = await stripe.confirmCardPayment(clientSecret);

        if (error) {
            console.error('Payment confirmation failed:', error);
            // Handle payment confirmation failure
            dispatch({ type: 'END_LOADING' });
            return;
        }

        // If payment confirmed successfully, proceed with creating the reservation
        const result = await fetchData({
            url,
            body: reservation,
            token: currentUser?.token,
        });

        if (result) {
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                    open: true,
                    severity: 'success',
                    message: 'Reservation created successfully.',
                },
            });
            dispatch({type:'RESET_RESERVATION'})
        }
    } catch (error) {
        console.error('Error creating reservation:', error);
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'error',
                message: 'Failed to create reservation.',
            },
        });
    }

    dispatch({ type: 'END_LOADING' });
};

export const getReservations = async(dispatch)=>{
    const result = await fetchData({url, method:'GET'}, dispatch)
    if(result){
        dispatch({type:'UPDATE_RESERVATIONS', payload: result});
    }
};

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


