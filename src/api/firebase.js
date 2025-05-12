import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDXNXLW3nLwiwlWz6Fc9W9GsuFMTZ4P8DU",
    authDomain: "vipack-project.firebaseapp.com",
    projectId: "vipack-project",
    storageBucket: "vipack-project.appspot.com",
    messagingSenderId: "986510739535",
    appId: "1:986510739535:web:8c42bb7b4ec1e2187f823a",
    measurementId: "G-Z3FMVGPJ1S"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);