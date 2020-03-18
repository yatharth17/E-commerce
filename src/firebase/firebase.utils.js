import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'

const config={
    apiKey: "AIzaSyBidmEeWbZ1NVtrENdH8EgM9QdnkPkvD2g",
    authDomain: "crown-db-18589.firebaseapp.com",
    databaseURL: "https://crown-db-18589.firebaseio.com",
    projectId: "crown-db-18589",
    storageBucket: "crown-db-18589.appspot.com",
    messagingSenderId: "794513879482",
    appId: "1:794513879482:web:8e6f47d1c5ad4d134b6d83",
    measurementId: "G-KB26ZK1ND6"
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle=()=>auth.signInWithPopup(provider);

export default firebase;