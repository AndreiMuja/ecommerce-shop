import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signinsignup/signinsignup.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import './App.css';

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);
  //const {setCurrentUser} = this.props;

  /*this.unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
    if(authUser){
      const userRef=await createUserProfile(authUser);
      userRef.onSnapshot(snapshot => {
        setCurrentUser({
            id:snapshot.id,
            ...snapshot.data()
        }, () => {
          console.log(this.state);
        });
      });
    }
    setCurrentUser(authUser);
  });*/

  /*componentWillUnmount() {
    this.unsubscribeFromAuth();
  }*/

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
      </Switch>
    </div>
  );
}

/*const mapDispatchToProps = dispatch => ({
  setCurrentUser:user => dispatch(setCurrentUser(user))
});*/

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
