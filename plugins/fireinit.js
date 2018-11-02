// import firebaseConfig from "~/firebase.env";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};

// init firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
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
}

// export
export {
  db,
  auth,
  //    currentUser,
  //    usersCollection,
  posts
  //    commentsCollection,
  //    likesCollection
};
