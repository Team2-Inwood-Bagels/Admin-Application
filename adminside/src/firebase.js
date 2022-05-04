import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import firebaseConfig from "./credentials"

const app = firebase.initializeApp(firebaseConfig)
const auth = app.auth()
const db = app.firestore()

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const registerWithEmailAndPassword = async (name, email, role, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        const {uid} = user;

        await db.collection("Admin").doc(uid).set({
            uid: uid,
            name,
            authProvider: "local",
            email,
            role
        })

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email)
        alert("Password reset link sent!")
    } catch (err) {
        console.error(err)
        alert(err.message)
    }
}
const addTime = async(time) =>{
    try {

        await db.collection("Time").add({
            time
        })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}
const logout = () => {
    auth.signOut()
}


export {
    auth,
    db,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
    addTime,
    sendPasswordResetEmail,
}