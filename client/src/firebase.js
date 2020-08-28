import * as firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'hazel-shop-storage.firebaseapp.com',
  databaseURL: 'https://hazel-shop-storage.firebaseio.com',
  projectId: 'hazel-shop-storage',
  storageBucket: 'hazel-shop-storage.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
