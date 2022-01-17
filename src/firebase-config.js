import {initializeApp} from "firebase/app";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAXAx9yaptlRfux3TnNfM1ehtppyGYWJSw",
  authDomain: "monopoly-e24eb.firebaseapp.com",
  databaseURL: "https://monopoly-e24eb-default-rtdb.firebaseio.com",
  projectId: "monopoly-e24eb",
  storageBucket: "monopoly-e24eb.appspot.com",
  messagingSenderId: "955499301652",
  appId: "1:955499301652:web:9360955b8ab8164d1b5001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;