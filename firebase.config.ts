import * as admin from "firebase-admin";
import { env } from "./src/env.mjs";

// Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHA_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSEAGING_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// Initialize Firebase
// const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

// const db = getFirestore(app);
// const storage = getStorage(app);

// export { app, db, storage };

const serviceAccount = {
  type: env.FIREBASE_TYPE,
  projectId: env.FIREBASE_PROJECT_ID,
  privateKeyId: env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  clientId: env.FIREBASE_CLIENT_ID,
  authUri: env.FIREBASE_AUTH_URI,
  tokenUri: env.FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: env.FIREBASE_CLIENT_X509_CERT_URL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin as firebaseAdmin };
