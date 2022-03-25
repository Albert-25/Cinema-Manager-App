import React, { useContext, useState, useEffect } from "react";
//import { auth } from "../firebase";
import firebaseApp from '../firebase'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onAuthStateChanged
} from "firebase/auth";


import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

 

  async function signup(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth, 
      email,
      password)
    .then((usuarioFirebase) => {
      return usuarioFirebase
    });
    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`)
    setDoc(docuRef, {correo: email, rol: rol})
  }
  async function login(email, password) {

   await signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  /*function listAllUsers(nextPageToken) {
    getAuth(firebaseApp).listUsers(1000, nextPageToken)
    .then((listUserResult) => {
      listUserResult.users.forEach((userRecord) => {
        console.log('user', userRecord.toJSON())
      });
      if(listUserResult.pageToken){
        listAllUsers(listUserResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listening', error)
    })
  }*/
  //No hay necesidad de setear al usuario porque Firebase te lo notifica con el siguiente método:
   async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    console.log('terminé')
    return infoFinal;
  }

   async function setUserWithFirebaseAndRol(usuarioFirebase) {
    console.log('llega')
    await getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("userData fianl", userData);
    });
  }




 useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if(user){
      setUserWithFirebaseAndRol(user)
    }
      console.log('holaaa')
      setTimeout(function() {
        setCurrentUser(user);
            setLoading(false)}, 2000)
    });
    return unsuscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    user
    // listAllUsers
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
