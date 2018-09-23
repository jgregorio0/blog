import firebaseConfig from "~/firebase.env";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

if (!firebaseConfig) {
  throw new Error("missing firebase-config.js config");
}

export default function({ store, redirect }) {
  console.log('firebase init')
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return firebase;
}
