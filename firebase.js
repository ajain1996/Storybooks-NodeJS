var serviceAccount = require("./permissions.json");
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-api-9a206..firebaseio.com"
});
const db = admin.firestore();

// var firebase = require('firebase');
// import * as functions from 'firebase-functions';
// const admin = require('firebase-admin');

// var fire = firebase.initializeApp({ 
//     apiKey: "AIzaSyDMSQeI3TWgAL4W_SkWBChlTpVN-9_K1ec",
//     authDomain: "nodejs-d8a27.firebaseapp.com",
//     databaseURL: "https://nodejs-d8a27.firebaseio.com",
//     projectId: "nodejs-d8a27",
//     storageBucket: "nodejs-d8a27.appspot.com",
//     messagingSenderId: "601098183161",
//     appId: "1:601098183161:web:9369d2f9e8786fc89d1d28",
//     measurementId: "G-K0HDK1VHE5"
// });

// const firebaseApp = firebase.initializeApp({
    
// });

// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

// export { db, auth, storage };