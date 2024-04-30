import Stripe from 'stripe';
/**It seems that the formattedPaymentMethod object is indeed being received correctly in the backend. 
 * However, the issue lies in the fact that the PaymentIntent is being created without a 
 * payment method attached to it, which is why Stripe is throwing the error "You cannot confirm this 
 * PaymentIntent because it's missing a payment method." */

const stripe = new Stripe('sk_test_51OmyAkFrMLefLTJ5GRSmUK0gdh5GLRelIYQtp7KqT59iWMShb5icYfzB2k283yshM8Jscltq2BF7HBJyAZEguTRD00nJZjTsBS');

export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, paymentMethod } = req.body;

        // Generate idempotency key
        const idempotencyKey = generateIdempotencyKey();

        console.log('Request body:', req.body); 

        // Create the payment intent with idempotency key
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            payment_method: paymentMethod.id,
            confirm: true,
            return_url: 'https://geardepo.netlify.app/checkout/success',
        }, {
            idempotencyKey: idempotencyKey, // Include idempotency key
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
        console.log('Payment intent:', paymentIntent);
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ success: false, message: 'Failed to create payment intent.' });
    }
};

// Generate a unique idempotency key
const generateIdempotencyKey = () => {
  return Math.random().toString(36).substr(2, 9);
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

