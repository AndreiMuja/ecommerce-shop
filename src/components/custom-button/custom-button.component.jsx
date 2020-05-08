import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn, invert, ...otherProps}) => (
    <button className={`${invert ? 'invert' :''}${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
    {children}
    </button>
);

export default CustomButton;

