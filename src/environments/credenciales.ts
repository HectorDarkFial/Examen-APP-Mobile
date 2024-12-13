// Importar las funciones necesarias de Firebase
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// Configuración de Firebase para tu proyecto
const firebaseConfig = {
    apiKey: "AIzaSyBbipeXIE8MgT33GkslIB2I3MB30Gc8TWM",
    authDomain: "prueba3-432c5.firebaseapp.com",
    projectId: "prueba3-432c5",
    storageBucket: "prueba3-432c5.appspot.com", // Cambio aquí
    messagingSenderId: "427554728341",
    appId: "1:427554728341:web:753581a0332bf9aabfae9c",
    measurementId: "G-E5M2QTE251"
    };

// Inicializa la aplicación Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Inicializa el servicio de autenticación
const auth: Auth = getAuth(app);

// Exporta las instancias
export { app, auth };
