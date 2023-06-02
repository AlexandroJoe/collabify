import React, { useRef, useEffect } from "react";

const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const sidebarRefCurrent = sidebarRef.current;

    const handleClick = (event) => {
      const clickedNote = event.target.closest(".sidebar-note");
      if (clickedNote) {
        const noteId = clickedNote.dataset.noteId;
        setActiveNote(noteId);
      } else {
        setActiveNote(null);
      }
    };

    const handlePopstate = () => {
      setActiveNote(null);
    };

    sidebarRefCurrent.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopstate);

    return () => {
      sidebarRefCurrent?.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [setActiveNote]);

  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="sidebar" ref={sidebarRef}>
      <div className="sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className="sidebar-notes">
        {sortedNotes.map((note) => (
          <div
            key={note.id}
            className={`sidebar-note ${note.id === activeNote ? "active" : ""}`}
            data-note-id={note.id}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button onClick={() => onDeleteNote(note.id)}>Delete</button>
            </div>
            <p>{note.body && note.body.substring(0, 100) + "..."}</p>
            <small className="note-meta">
              Last modified{" "}
              {new Date(note.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
