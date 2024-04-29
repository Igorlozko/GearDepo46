import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripeLogo from './stripeLogo.png';

const PaymentField = ({ handleSubmit }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        // Use Stripe.js to handle payment processing
        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error.message);
        } else {
            // If payment method created successfully, call handleSubmit with paymentMethod
            handleSubmit({
                id: paymentMethod.id, // Adjust based on the structure of paymentMethod
                brand: paymentMethod.card.brand,
                last4: paymentMethod.card.last4,
                exp_month: paymentMethod.card.exp_month,
                exp_year: paymentMethod.card.exp_year,
            }); // passes the payment method 
            console.log('Payment method in field',paymentMethod)
        }
    };

    return (
        <form onSubmit={handlePaymentSubmit} style={styles.form}>
            <label style={styles.label}></label>
            <img src={stripeLogo} alt="Stripe" style={styles.logo} />
            <div style={styles.cardContainer}>
                <CardElement options={cardStyle} />
            </div>
            <button type="submit" style={styles.button} disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

const styles = {
    form: {
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
    },
    logo: {
        width: '100px',
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '10px',
        fontSize: '16px',
        color: '#333',
    },
    cardContainer: {
        borderRadius: '4px',
        border: '1px solid #ddd',
        padding: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    },
    button: {
        backgroundColor: '#4285F4',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s',
    },
};

const cardStyle = {
    base: {
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        '::placeholder': {
            color: '#ccc',
        },
    },
};

export default PaymentField;

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

