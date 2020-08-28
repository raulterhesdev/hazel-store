import * as firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBs94RgANmBFiALq-Ltg-mOnewP-rjko4E',
  authDomain: 'hazel-shop-storage.firebaseapp.com',
  databaseURL: 'https://hazel-shop-storage.firebaseio.com',
  projectId: 'hazel-shop-storage',
  storageBucket: 'hazel-shop-storage.appspot.com',
  messagingSenderId: '9823012887',
  appId: '1:9823012887:web:e6fadc9d1ab1fae15af452',
};

console.log(process.env.REACT_APP_FIREBASE_API_KEY);

firebase.initializeApp(firebaseConfig);

export default firebase;
