import React from "react";
import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote)
    return <div className="no-active-note">No note selected yet</div>;
  return (
    <div className="main">
      <div className="main-note-edit">
        <input
          type="text"
          id="title"
          value={activeNote.title}
          placeholder="Title"
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder={
            "Write your note here...\n(Use # to make a title, the more of it the smaller  \n**A bold text** \n*An italic text* \n1. An ordered list text \n- An unordered list text \n~~A strikethrough text~~ \nGet to know more at https://www.copycat.dev/blog/react-markdown/)"
          }
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="main-note-preview" style={{ display: "block", maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
