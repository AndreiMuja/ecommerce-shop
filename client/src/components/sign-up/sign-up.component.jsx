import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setCredentials] = useState({ displayName: '', email: '', password: '', confirmPassword: '' });

    const { displayName, email, password, confirmPassword } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }
        signUpStart({ displayName, email, password });
        /*try{
            const {user} =await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfile(user,{displayName});
            this.setState({
                displayName:'',
            email:'',
            password:'',
            confirmPassword:''});
        }catch(error){
            console.error(error);
        }*/
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>I don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput type='text' name='displayName' value={displayName} onChange={handleChange}
                    label='Display name' required>
                </FormInput>
                <FormInput type='email' name='email' value={email} onChange={handleChange}
                    label='Email' required>
                </FormInput>
                <FormInput type='password' name='password' value={password} onChange={handleChange}
                    label='Password' required>
                </FormInput>
                <FormInput type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange}
                    label='Confirm password' required>
                </FormInput>
                <CustomButton type='submit'>Sign up</CustomButton>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);