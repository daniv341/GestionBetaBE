//import firebase from "firebase/compat/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const addUser = async (email, contraseña) => {
    createUserWithEmailAndPassword(auth, email, contraseña);
};
 
const authenticate = async (email, contraseña) => {
    signInWithEmailAndPassword(auth, email, contraseña);
};

export {
    addUser,
    authenticate
};