import React, { createContext, useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC7YxfHE9hTr19Vs2c5844A54s09G35W5o",
    authDomain: "ticketmanagement2006.firebaseapp.com",
    projectId: "ticketmanagement2006",
    storageBucket: "ticketmanagement2006.firebasestorage.app",
    messagingSenderId: "722662466816",
    appId: "1:722662466816:web:a7fcd28a112cf0f4d83fe5"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create a context
const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Signup function
  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setLoading(true);
      return userCredential.user;
    } catch (error) {
      console.error('Signup Error:', error);
      throw error;
    } 
  };

  // Login function
  const login = async (email, password) => {
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setLoading(true);
      return userCredential.user;
    } catch (error) {
      console.error('Login Error:', error);
      alert( error);
    } 
  };

  return (
    <FirebaseContext.Provider value={{ user, loading, login, signup }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook for accessing the Firebase context
export const useFirebase = () => {
  return useContext(FirebaseContext);
};
