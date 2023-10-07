import {signInWithRedirect, GoogleAuthProvider, signOut} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";
import {auth, db, storage} from "../firebase.js";
import { ref, uploadBytes } from "firebase/storage";

export const saveObjective = async (data, file) => {
    const objectiveRef = collection(db, "objectives");
    await addDoc(objectiveRef, data);
    const storageRef = ref(storage, `/objectives/${data.uid}/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider);
}

export const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error);
    }
}