import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import './sign-in.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });

    const { email, password } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();

        emailSignInStart(email, password);
        /*try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'',password:''});
        }catch(error){
            console.error(error);
        }*/
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your username and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput type='email' name='email' value={email}
                    label='email' handleChange={handleChange} required />
                <FormInput type='password' name='password' value={password}
                    label='password' handleChange={handleChange} required />
                <div className='buttons'>
                    <CustomButton type='button'>Sign In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);