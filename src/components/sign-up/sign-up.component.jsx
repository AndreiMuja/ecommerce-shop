import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import {signUpStart} from '../../redux/user/user.actions';
import {connect} from 'react-redux';
import './sign-up.styles.scss'; 

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const{signUpStart}=this.props;
        const {displayName,email,password,confirmPassword}=this.state;
        if(password!==confirmPassword){
            alert("passwords don't match");
            return;
        }
        signUpStart({displayName,email,password});
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

    handleChange = event => {
        const {name,value} =event.target;
        this.setState({[name]:value});
    };

    render() {
        const {displayName,email,password,confirmPassword}=this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I don't have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput type='text' name='displayName' value={displayName} onChange={this.handleChange}
                    label='Display name' required>
                    </FormInput>
                    <FormInput type='email' name='email' value={email} onChange={this.handleChange}
                    label='Email' required>
                    </FormInput>
                    <FormInput type='password' name='password' value={password} onChange={this.handleChange}
                    label='Password' required>
                    </FormInput>
                    <FormInput type='password' name='confirmPassword' value={confirmPassword} onChange={this.handleChange}
                    label='Confirm password' required>
                    </FormInput>
                    <CustomButton type='submit'>Sign up</CustomButton>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart:userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null,mapDispatchToProps)(SignUp);