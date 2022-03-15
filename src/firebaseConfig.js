import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCr8EZTpiSt-UD7lB3rpBgQ9JTWoY7zANE',
  authDomain: 'uploadimage-ab683.firebaseapp.com',
  projectId: 'uploadimage-ab683',
  storageBucket: 'uploadimage-ab683.appspot.com',
  messagingSenderId: '955405702276',
  appId: '1:955405702276:web:1f2f47d2bde13ccda19ed1',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
