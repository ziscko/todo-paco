import React, { useState } from "react";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="todo-item">
        <div className="edit-row">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="edit-input"
            autoFocus
          />
          <button onClick={handleSave} className="btn-save">
            ✓
          </button>
          <button onClick={handleCancel} className="btn-cancel">
            ✕
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <button
        className={`checkbox ${todo.completed ? "checked" : ""}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "Uncheck" : "Mark as completed"}
      />
      <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
        {todo.text}
      </span>
      {!todo.completed && (
        <button
          onClick={() => setIsEditing(true)}
          className="btn-edit"
          aria-label="Edit"
        >
          ✎
        </button>
      )}
      <button
        onClick={() => onDelete(todo.id)}
        className="btn-delete"
        aria-label="Delete"
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
