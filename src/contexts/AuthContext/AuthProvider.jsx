/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.init";

import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();

axios.defaults.baseURL = "https://book-management-backend-pi.vercel.app/api/v1";
// axios.defaults.baseURL = "http://localhost:5000/api/v1";

const AuthProvider = ({ children }) => {
  // states for holding user info
  const [user, setUser] = useState(null);
  const [userDB, setUserDB] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterObject, setFilterObject] = useState({});
  const [refetchUserDB, setRefetchUserDB] = useState(false);
  const [userRefetch, setUserRefetch] = useState(false);
  const createUserWithEmail = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInWithEmail = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInWithGoogle = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const update = (name) => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const logOut = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  // getting and setting the user from firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // setIsLoading(false);
    });
    return () => {
      return () => unsubscribe();
    };
  }, []);

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);

      try {
        const promise = await axios.get(`/users/profile`, {
          headers: {
            authorization: `${token}`,
          },
        });

        setUserDB(promise.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        if (error.response.data.message === "Invalid Token!") {
          localStorage.removeItem("accessToken");
        }
      }
    };

    getProfile();
  }, [token, userRefetch]);

  // Getting the user from mongodb database
  // useEffect(() => {
  //   if (user?.email) {
  //     setIsLoading(true);
  //     fetch(`${config.base_url}/users/single/${user?.email}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUserDB(data.data);
  //         setIsLoading(false);
  //       });
  //   }
  // }, [user, user?.email, refetchUserDB]);
  console.log({ user, userDB });
  const authInfo = {
    user,
    userDB,
    isLoading,
    createUserWithEmail,
    logInWithEmail,
    logInWithGoogle,
    update,
    logOut,
    setIsLoading,
    refetchUserDB,
    setRefetchUserDB,
    filterObject,
    setFilterObject,
    setUserRefetch,
    userRefetch,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
