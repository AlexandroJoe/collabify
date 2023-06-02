  import React from "react";
  import "./App.css";
  import { Route, Routes, useNavigate } from "react-router-dom";
  import Home from "./components/LPcomponents/Home";
  import About from "./components/LPcomponents/About";
  import Creators from "./components/LPcomponents/Creators";
  import Features from "./components/LPcomponents/Features";
  import Productivity from "./components/LPcomponents/Productivity";
  import Collabify from "./components/Collabify";
  import TodoList from "./components/TodoList";
  import Notes from "./components/Notes"
  import { fire } from "./config/firebase";

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
          <Route path="collabify/todo" element={<TodoList handleLogout={handleLogout}/>} />
          <Route path="collabify/notes" element={<Notes handleLogout={handleLogout}/>} />
          <Route path="/" element={[<Home />,
            <About/>,
            <Creators />,
            <Features />,
            <Productivity />]}>
            
          </Route>
        </Routes>
      </div>
    );
  };

  export default App;
