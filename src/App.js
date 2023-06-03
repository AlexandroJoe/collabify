import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import TodoList from "./components/TodoList";
import Notes from "./components/Notes";
import LandingPage from "./components/LPcomponents/LandingPage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

  const navigate = useNavigate();

  const cleanInputs = () => {
    setEmail("");
    setPassword("");
  };

  const cleanErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogin = async (email, password) => {
    cleanErrors();
    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        body: new URLSearchParams({
          username: email,
          password: password,
          grant_type: "password",
          scope: "",
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });

      response
        .json()
        .then((response) =>
          localStorage.setItem("token", response.access_token)
        );

      const newUser = {
        email,
        password,
      };

      setUser(newUser);
      navigate("/collabify/dashboard");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleSignUp = async (email, password) => {
    cleanErrors();

    try {
      const response = await axios.post(
        "http://localhost:8000/signup/",
        { email, password },
        { headers: { "content-type": "application/json" } }
      );

      const token = response.data.access_token;
      localStorage.setItem("token", token);

      navigate("/collabify/dashboard"); // Navigate to the dashboard route after successful signup
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleLogout = async () => {
    cleanInputs();
    setHasAccount(true);
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("http://localhost:8000/logout", config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    localStorage.removeItem("token");
    setUser(null);
    navigate("/collabify/login", { replace: true });
    console.log("clicked");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/collabify/dashboard");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/collabify/dashboard"
          element={<Dashboard handleLogout={handleLogout} />}
        />
        <Route
          path="/collabify/login"
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
        <Route
          path="collabify/todo"
          element={<TodoList handleLogout={handleLogout} />}
        />
        <Route
          path="collabify/notes"
          element={<Notes handleLogout={handleLogout} />}
        />
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
