import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceStripe=price*100;
    const publishableKey='pk_test_8668v732F7Fnz90PaxLdUIeE006YLsBLAt';

    const onToken = token => {
        console.log(token);
        alert('Payment successful');
    };

    return (
        <StripeCheckout label='Pay now' name='ecommerce app' billingAddress shippingAddress 
                        image='http://svgshare.com/i/CUz.svg' description={`Your total is: ${price}`}
                        amount={priceStripe} panelLabel='Pay now' token={onToken}
                        stripeKey={publishableKey}/>
    );

};

export default StripeCheckoutButton;