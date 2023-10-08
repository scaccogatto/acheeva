import {signInWithRedirect, GoogleAuthProvider, signOut} from "firebase/auth";
import {setDoc, doc, collection, onSnapshot, orderBy, limit, query} from "firebase/firestore";
import {auth, db, functions, storage} from "../firebase.js";
import {ref, uploadBytes} from "firebase/storage";
import {v4 as uuidv4} from 'uuid';
import {httpsCallable} from "firebase/functions";


export const saveObjective = async (data, file) => {
    const id = uuidv4();
    await setDoc(doc(db, "objectives", id), {
        ...data,
        objectiveId: file?.name || "sample.pdf",
        createdDate: new Date()
    });
    const storageRef = ref(storage, `/objectives/${id}`);
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

export const subscribeToObjectives = (callback) => {

    let objectiveRef;

    const q = query(collection(db, "objectives"), orderBy('createdDate', 'desc'), limit(1));
    return onSnapshot(q, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
            results.push({id: doc.id, ...doc.data()});
        });

        callback(results);
    })
};

export const checkQuiz = (reply, question, objectiveId) => {
    const promise = httpsCallable(functions, 'stories-checkQuiz-trigger');
    return promise({reply, question, objectiveId})
        .then((result) => {
            // Read result of the Cloud Function.
            console.log(result.data);
            return result.data;
        });

}