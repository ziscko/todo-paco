import React, { useState } from "react";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onAddSubtask: (todoId: string, text: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask: (todoId: string, subtaskId: string) => void;
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showSubInput, setShowSubInput] = useState(false);
  const [subText, setSubText] = useState("");

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subText.trim()) return;
    onAddSubtask(todo.id, subText);
    setSubText("");
    setShowSubInput(false);
  };

  const completedSubs = todo.subtasks.filter((s) => s.completed).length;
  const totalSubs = todo.subtasks.length;

  return (
    <li className="todo-item-wrapper">
      <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {isEditing ? (
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
        ) : (
          <>
            <button
              className={`checkbox ${todo.completed ? "checked" : ""}`}
              onClick={() => onToggle(todo.id)}
              aria-label={todo.completed ? "Uncheck" : "Mark as completed"}
            />
            <span
              className="todo-text"
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.text}
              {totalSubs > 0 && (
                <span className="subtask-count">
                  {" "}
                  ({completedSubs}/{totalSubs})
                </span>
              )}
            </span>
            {!todo.completed && (
              <>
                <button
                  onClick={() => setShowSubInput(!showSubInput)}
                  className="btn-sub"
                  aria-label="Add subtask"
                  title="Add subtask"
                >
                  +sub
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-edit"
                  aria-label="Edit"
                >
                  ✎
                </button>
              </>
            )}
            <button
              onClick={() => onDelete(todo.id)}
              className="btn-delete"
              aria-label="Delete"
            >
              ×
            </button>
          </>
        )}
      </div>

      {/* Subtask input */}
      {showSubInput && !todo.completed && (
        <form onSubmit={handleAddSubtask} className="subtask-form">
          <input
            type="text"
            value={subText}
            onChange={(e) => setSubText(e.target.value)}
            placeholder="Add subtask..."
            className="subtask-input"
            autoFocus
          />
          <button type="submit" className="btn-save">
            +
          </button>
        </form>
      )}

      {/* Subtasks list */}
      {todo.subtasks.length > 0 && (
        <ul className="subtask-list">
          {todo.subtasks.map((sub) => (
            <li
              key={sub.id}
              className={`subtask-item ${sub.completed ? "completed" : ""}`}
            >
              <button
                className={`checkbox checkbox-sm ${sub.completed ? "checked" : ""}`}
                onClick={() => onToggleSubtask(todo.id, sub.id)}
                aria-label={
                  sub.completed ? "Uncheck subtask" : "Complete subtask"
                }
              />
              <span className="subtask-text">{sub.text}</span>
              <button
                onClick={() => onDeleteSubtask(todo.id, sub.id)}
                className="btn-delete"
                aria-label="Delete subtask"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default TodoItem;
