import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyBoP1rM9W0odigUIsubISBQ-m5IQiDWXTU',
	authDomain: 'mern-instagram-5ca63.firebaseapp.com',
	databaseURL: 'https://mern-instagram-5ca63.firebaseio.com',
	projectId: 'mern-instagram-5ca63',
	storageBucket: 'mern-instagram-5ca63.appspot.com',
	messagingSenderId: '636514122857',
	appId: '1:636514122857:web:5656b869e5ca2b15a1b6f8',
	measurementId: 'G-8FM68ZXJ32',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
