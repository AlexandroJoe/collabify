import "./Notes.css";
import React, { useState } from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";
import { v4 as uuid } from "uuid";
import NavBar from "./NavBar";

function Notes({ handleLogout }) {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null); // this is the id of the active note

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]); //transfering every new notes into our notes
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }; //find the note to send it to main

  return (
    <>
      <NavBar
        welcomeText={"Welcome to very own notepad!"}
        handleLogout={handleLogout}
      />
      <div className="Notes">
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>
    </>
  );
}

export default Notes;
