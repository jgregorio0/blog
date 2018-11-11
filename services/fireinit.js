// import firebaseConfig from "~/firebase.env";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "" + process.env.apiKey,
  authDomain: "" + process.env.authDomain,
  databaseURL: "" + process.env.databaseURL,
  projectId: "" + process.env.projectId,
  storageBucket: "" + process.env.storageBucket,
  messagingSenderId: "" + process.env.messagingSenderId
};
console.log('firebaseConfig :', firebaseConfig);

if (!firebaseConfig) {
  throw new Error("missing firebase-config.js config");
} else if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();
//    const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
//    const usersCollection = db.collection('users')
const posts = db.collection("posts");
//    const commentsCollection = db.collection('comments')
//    const likesCollection = db.collection('likes')

export default {
  db,
  auth,
  //    currentUser,
  //    usersCollection,
  posts
  //    commentsCollection,
  //    likesCollection
};
