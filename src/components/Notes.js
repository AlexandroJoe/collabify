import "./Notes.css";
import React, { useState } from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";
import { v4 as uuid } from "uuid";
import NavBar from "./NavBar";
import SideNavBar from "./SideNavBar";
import axios from 'axios';

function Notes({ handleLogout }) {
  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState(true);
  const [activeNote, setActiveNote] = useState(null); // this is the id of the active note

  const getNotes = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:8000/get-notes/",
      { headers: {Authorization: `Bearer ${token}`} }
    );

    return response.data;
  }

  const showNotes = async () => {
    const data = getNotes();
    data.then(response => {
      const responses = response

      for (var i = 0; i < responses.length; i++){
        const times = parseInt(responses[i].time)
        const newNote = {
          id: responses[i].notes_id,
          title: responses[i].title,
          body: responses[i].body,
          lastModified: times,
        };

        setNotes((prevNotes) => [newNote, ...prevNotes]);
        console.log(notes)
      }
    })
  }

  const onAddNote = async () => {
    const token = localStorage.getItem("token");
    const dates = "" + Date.now();

    const response = await axios.post(
      "http://localhost:8000/add-notes/",
      { title: "Untitled Note", body: "", time: dates },
      { headers: { "content-type": "application/json", Authorization: `Bearer ${token}`} }
    );

    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]); // transferring every new note into our notes
  };

  const onUpdateNote = (updatedNote) => {
    console.log(updatedNote)
    const token = localStorage.getItem("token");

    const response = axios.put(
      "http://localhost:8000/update-notes/",
      { title: updatedNote.title, body: updatedNote.body, notes_id: updatedNote.notes_id },
      { headers: { "content-type": "application/json", Authorization: `Bearer ${token}`} }
    );
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  const onDeleteNote = async (idToDelete) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8000/delete-notes/", {
      method: "DELETE",
      body: JSON.stringify({notes_id: idToDelete}),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const getActiveNote = () => {
    if (show){
      showNotes();
      setShow(false);
    }
    return notes.find((note) => note.id === activeNote);
  }; // find the note to send it to the Main component

  return (
    <div className="notes-container">
      <div className="navBarS">
        <SideNavBar />
      </div>
      <div className="main-content">
        <NavBar
          welcomeText={"Welcome to your own notepad!"}
          handleLogout={handleLogout}
        />
        <div className="main-container">
          <Sidebar
            notes={notes}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
          <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
        </div>
      </div>
    </div>
  );
}

export default Notes;
