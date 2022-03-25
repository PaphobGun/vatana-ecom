import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyAD9y0jt8n3eA1t-IGOTPTNcN7Tlyt6fFI",
  authDomain: "vatana-ca5cf.firebaseapp.com",
  projectId: "vatana-ca5cf",
  storageBucket: "vatana-ca5cf.appspot.com",
  messagingSenderId: "126051789605",
  appId: "1:126051789605:web:c77c73907007be36ed88cc",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export default firebase;
