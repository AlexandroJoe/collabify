import "./TodoList.css";
import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import NavBar from "./NavBar";

function TodoList({ handleLogout }) {
  const [text, setText] = useState("");
  const [state, setState] = useState({
    todo: {
      title: "Todo",
      items: [{ id: uuid(), name: "Clean the house", dueDate: "2023-05-31" }],
    },
    "in-progress": {
      title: "In Progress",
      items: [{ id: uuid(), name: "Wash the car", dueDate: "2023-06-02" }],
    },
    done: {
      title: "Completed",
      items: [],
    },
  });
  

  const [editingItems, setEditingItems] = useState({});
  const [lastFocusedInput, setLastFocusedInput] = useState(null);
  const addNameInputRef = useRef(null);
  const addDueDateInputRef = useRef(null);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const itemCopy = { ...state[source.droppableId].items[source.index] };
    setState((prev) => {
      prev = { ...prev };
      prev[source.droppableId].items.splice(source.index, 1);
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      return prev;
    });
  };

  const addItem = (name, dueDate) => {
    if (!name || !dueDate) {
      return;
    }

    const newItem = {
      id: uuid(),
      name: name,
      dueDate: dueDate,
    };

    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [newItem, ...prev.todo.items],
        },
      };
    });

    setText("");
    addNameInputRef.current.value = "";
    addDueDateInputRef.current.value = "";
  };

  const removeItem = (listId, index) => {
    if (listId === "todo" || listId === "in-progress" || listId === "done") {
      setState((prev) => {
        const newState = { ...prev };
        newState[listId].items.splice(index, 1);
        return newState;
      });
    }
  };

  const startEditing = (itemId, initialName, initialDueDate) => {
    if (state.done.items.some((item) => item.id === itemId)) {
      return;
    }

    setEditingItems((prev) => {
      return {
        ...prev,
        [itemId]: {
          initialName: initialName,
          initialDueDate: initialDueDate,
          name: initialName,
          dueDate: initialDueDate,
        },
      };
    });
  };

  const handleNameInputChange = (e, itemId) => {
    const value = e.target.value;
    setEditingItems((prev) => {
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          name: value,
        },
      };
    });
  };

  const handleDueDateInputChange = (e, itemId) => {
    const value = e.target.value;
    setEditingItems((prev) => {
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          dueDate: value,
        },
      };
    });
  };

  const confirmEditing = (itemId) => {
    setState((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        const items = newState[key].items;
        const itemIndex = items.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
          const editedItem = { ...items[itemIndex] };
          const editingItem = editingItems[itemId];
          if (editingItem && (editingItem.name || editingItem.dueDate)) {
            editedItem.name = editingItem.name || editedItem.name;
            editedItem.dueDate = editingItem.dueDate || editedItem.dueDate;
          }
          items[itemIndex] = editedItem;
        }
      });
      return newState;
    });
    setEditingItems((prev) => {
      const updatedEditingItems = { ...prev };
      delete updatedEditingItems[itemId];
      return updatedEditingItems;
    });
  };

  const cancelEditing = (itemId) => {
    setEditingItems((prev) => {
      const updatedEditingItems = { ...prev };
      delete updatedEditingItems[itemId];
      return updatedEditingItems;
    });
  };

  const handleKeyDown = (e, itemId) => {
    if (e.key === "Enter") {
      confirmEditing(itemId);
    }
  };

  const handleBlur = (e, itemId) => {
    if (lastFocusedInput !== itemId) {
      cancelEditing(itemId);
    }
  };

  const handleClickOutside = (e, itemId) => {
    if (!e.target.closest(`#item-${itemId}`)) {
      cancelEditing(itemId);
    }
  };

  const handleInputFocus = (itemId) => {
    setLastFocusedInput(itemId);
  };

  useEffect(() => {
    const handleClick = (e) => {
      Object.keys(editingItems).forEach((itemId) => {
        handleClickOutside(e, itemId);
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [editingItems, handleClickOutside]);

  return (
    <div className="TodoList">
      <NavBar welcomeText={"Bienvenue to your todo list!"} handleLogout={handleLogout} />
      <h1>Todo-wall</h1>
      <div className="adding">
        <div>
          <label htmlFor="itemName">Item Name: </label>
          <input
            type="text"
            id="itemName"
            placeholder="Add Item Name"
            ref={addNameInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addDueDateInputRef.current.focus();
              }
            }}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date: </label>
          <input
            type="date"
            id="dueDate"
            ref={addDueDateInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addItem(text, addDueDateInputRef.current.value);
              }
            }}
          />
        </div>
        <div>
          <button
            onClick={() => addItem(text, addDueDateInputRef.current.value)}
          >
            Add
          </button>
        </div>
      </div>

      <div className="list">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className="column">
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="droppable-col"
                      >
                        {data.items.map((el, index) => {
                          const isCompleted = key === "done";
                          const isEditing = !!editingItems[el.id];
                          const canEdit =
                            !isCompleted &&
                            (key === "todo" || key === "in-progress");
                          const canRemove =
                            !isEditing && (isCompleted || key !== "done");

                          return (
                            <Draggable
                              key={el.id}
                              draggableId={el.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                const isDragging = snapshot.isDragging;
                                return (
                                <div
                                  id={`item-${el.id}`}
                                  className={`item${
                                    isEditing ? " editing" : ""
                                  } ${
                                    isDragging ? "item-dragging" : ""
                                  }`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {isEditing ? (
                                    <>
                                      <input
                                        type="text"
                                        className="edit-input"
                                        value={editingItems[el.id].name}
                                        onChange={(e) =>
                                          handleNameInputChange(e, el.id)
                                        }
                                        onKeyDown={(e) =>
                                          handleKeyDown(e, el.id)
                                        }
                                        onBlur={(e) => handleBlur(e, el.id)}
                                        onClick={() => handleInputFocus(el.id)}
                                      />
                                      <input
                                        type="date"
                                        className="edit-input"
                                        value={editingItems[el.id].dueDate}
                                        onChange={(e) =>
                                          handleDueDateInputChange(e, el.id)
                                        }
                                        onKeyDown={(e) =>
                                          handleKeyDown(e, el.id)
                                        }
                                        onBlur={(e) => handleBlur(e, el.id)}
                                        onClick={() => handleInputFocus(el.id)}
                                      />
                                      <button
                                        className="edit-confirm"
                                        onClick={() => confirmEditing(el.id)}
                                      >
                                        &#10004;
                                      </button>
                                      <button
                                        className="edit-cancel"
                                        onClick={() => cancelEditing(el.id)}
                                      >
                                        &#10005;
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <div>{el.name}</div>
                                      <div>{"Due date --> "}{el.dueDate}</div>
                                      {canEdit && (
                                        <button
                                          className="edit-button"
                                          onClick={() =>
                                            startEditing(
                                              el.id,
                                              el.name,
                                              el.dueDate
                                            )
                                          }
                                        >
                                          Edit
                                        </button>
                                      )}
                                      {canRemove && (
                                        <button
                                          className="remove-button"
                                          onClick={() => removeItem(key, index)}
                                        >
                                          Remove
                                        </button>
                                      )}
                                    </>
                                  )}
                                </div>
                              );
                              }}
                            </Draggable>
                          );
                        })}

                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default TodoList;