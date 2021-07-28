import firebase from 'firebase'
import {firebaseConfig} from './firebaseapikey'


const app = firebase.initializeApp(firebaseConfig);

export const firestore = app.firestore();
