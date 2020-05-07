import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAGOiJqYQOhkzapCF5VCWGHdzO3byrpyMg",
    authDomain: "ecommercedb-3b11a.firebaseapp.com",
    databaseURL: "https://ecommercedb-3b11a.firebaseio.com",
    projectId: "ecommercedb-3b11a",
    storageBucket: "ecommercedb-3b11a.appspot.com",
    messagingSenderId: "249536392716",
    appId: "1:249536392716:web:0231475742a60792bf0829",
    measurementId: "G-QW0K3BM6VD"
  };

  export const createUserProfile = async(authUser, additionalData) => {
    if(!authUser) return;
    const userRef=firestore.doc(`user/${authUser.uid}`);
    const snapshot=await userRef.get();
    if(!snapshot.exists){
      const {displayName,email}=authUser;
      const createdAt=new Date();

      try{
        await userRef.set({
          displayName, 
          email,
          createdAt,
          ...additionalData
        });
      }catch(error){
        console.log('error creating user',error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth=firebase.auth();
  export const firestore=firebase.firestore();
  
  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
