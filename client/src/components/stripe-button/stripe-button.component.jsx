import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceStripe=price*100;
    const publishableKey='pk_test_8668v732F7Fnz90PaxLdUIeE006YLsBLAt';

    const onToken = token => {
        axios({
            url:'payment',
            method:'post',
            data:{
                amount:priceStripe,
                token
            }
        }).then(response => {
            alert('Payment successful');
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was a problem with the payment');
        }); 
    };

    return (
        <StripeCheckout label='Pay now' name='ecommerce app' billingAddress shippingAddress 
                        image='http://svgshare.com/i/CUz.svg' description={`Your total is: ${price}`}
                        amount={priceStripe} panelLabel='Pay now' token={onToken}
                        stripeKey={publishableKey}/>
    );

};

export default StripeCheckoutButton;