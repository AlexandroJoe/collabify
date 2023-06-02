import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import Collabify from "./components/Collabify";
import TodoList from "./components/TodoList";
import Notes from "./components/Notes";
import { fire } from "./config/firebase";
import LandingPage from "./components/LPcomponents/LandingPage";

const App = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fire.auth().signOut();
    navigate("/collabify", { replace: true });
    console.log("clicked");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/collabify" element={<Collabify />} />
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
