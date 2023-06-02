import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { fire, fs, auth } from "../config/firebase";
import Login from "./Login";
import Dashboard from "./Dashboard";
import TodoList from "./TodoList";
import Notes from "./Notes";
import "./Collabify.css";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Collabify = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const dbuser = collection(fs, "users");

  const navigate = useNavigate();

  const cleanInputs = () => {
    setEmail("");
    setPassword("");
  };

  const cleanErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    cleanErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            setEmailError("The email address is invalid");
            break;
          case "auth/user-disabled":
            setEmailError("The email address has been disabled");
            break;
          case "auth/user-not-found":
            setEmailError("Couldn't find your Collabify account");
            break;
          case "auth/wrong-password":
            setPasswordError("Wrong password. Try again");
            break;
          default:
            setEmailError("An error occurred. Please try again.");
        }
      });
  };

  const handleSignUp = async (email, password) => {
    cleanErrors();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setEmailError("The email address is invalid.");
            break;
          case "auth/email-already-in-use":
            setEmailError(
              "The email address is already in use. Login to your account"
            );
            break;
          case "auth/weak-password":
            setPasswordError("Password should be at least 6 characters");
            break;
        }
      });
      const user = res.user;
      await addDoc(collection(fs, "users"), {
        uid: user.uid,
        email,
        password,
        team: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    fire.auth().signOut();
    navigate("/collabify", { replace: true });
    console.log("clicked");
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        cleanInputs();
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
      } else {
        setUser(null);
        localStorage.removeItem("user"); // Remove user from localStorage
      }
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    authListener();
  }, [authListener]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    authListener();
  }, [authListener]);

  return (
    <div className="Collabify">
      <Routes>
        {user ? (
          <>
            <Route
            path="/"
            element={<Dashboard handleLogout={handleLogout} />}
          >
            <Route path="todo" element={<TodoList />} />
            <Route path="notes" element={<Notes />} />
          </Route>
          </>
        ) : (
          <Route
            path="/"
            element={
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignUp={handleSignUp}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError}
              />
            }
          />
        )}
      </Routes>
    </div>
  );
};

export default Collabify;