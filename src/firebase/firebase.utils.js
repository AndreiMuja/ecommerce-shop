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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef=firestore.collection(collectionKey);
    const batch=firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef=collectionRef.doc();
      batch.set(newDocRef,obj);
    });
    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc=> {
      const {title,items}=doc.data();
      return {
        routeName:encodeURI(title.toLowerCase()),
        id:doc.id,
        title,
        items
      };
    });
    return transformedCollection.reduce((accumulator,collection) => {
      accumulator[collection.title.toLowerCase()]=collection;
      return accumulator;
    },{});
  }

  export const getCurrentUser = () => {
    return new Promise((resolve,reject)=> {
      const unsubscribe=auth.onAuthStateChanged(userAuth=>{
        unsubscribe();
        resolve(userAuth);
      },reject)
    });
  };

  firebase.initializeApp(config);

  export const auth=firebase.auth();
  export const firestore=firebase.firestore();
  
  export const googleProvider=new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt:'select_account'});
 
