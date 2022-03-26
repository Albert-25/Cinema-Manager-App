import React, { useContext, useState, useEffect } from "react";
//import { auth } from "../firebase";
import firebaseApp from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
} from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, rol, nombre, imagen) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });
    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol, nombre: nombre, imagen: imagen });
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
  function updateName(name, imagen, user) {
    const docuRef = doc(firestore, `usuarios/${user.uid}`);

    setDoc(docuRef, {nombre: name || user.nombre, imagen :  imagen || user.imagen, rol: user.rol });
  }
  //No hay necesidad de setear al usuario porque Firebase te lo notifica con el siguiente método:
  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    const infoTotal = [docuCifrada.data().rol, docuCifrada.data().nombre, docuCifrada.data().imagen]
    console.log("terminé");
    return infoTotal;
  }

  async function setUserWithFirebaseAndRol(usuarioFirebase) {
    console.log("llega");
    await getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol[0],
        nombre: rol[1],
        imagen: rol[2],
      };
      setUser(userData);
      console.log("userData fianl", userData);
    });
  }

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserWithFirebaseAndRol(user);
      }
      console.log("holaaa");
      setTimeout(function () {
        setCurrentUser(user);
        setLoading(false);
      }, 2000);
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
    user,
    updateName,
    // listAllUsers
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
