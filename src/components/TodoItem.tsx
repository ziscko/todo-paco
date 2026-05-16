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
  onEditSubtask: (todoId: string, subtaskId: string, text: string) => void;
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onEditSubtask,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showSubInput, setShowSubInput] = useState(false);
  const [subText, setSubText] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [editingSubId, setEditingSubId] = useState<string | null>(null);
  const [editSubText, setEditSubText] = useState("");

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

  const startEditSub = (subId: string, text: string) => {
    setEditingSubId(subId);
    setEditSubText(text);
  };

  const saveEditSub = (subId: string) => {
    if (!editSubText.trim()) return;
    onEditSubtask(todo.id, subId, editSubText);
    setEditingSubId(null);
    setEditSubText("");
  };

  const cancelEditSub = () => {
    setEditingSubId(null);
    setEditSubText("");
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
            {totalSubs > 0 && (
              <button
                className={`btn-collapse ${collapsed ? "collapsed" : ""}`}
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? "Expand" : "Collapse"}
              >
                ▸
              </button>
            )}
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
      {showSubInput && !todo.completed && !collapsed && (
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
      {totalSubs > 0 && !collapsed && (
        <ul className="subtask-list">
          {todo.subtasks.map((sub) => (
            <li
              key={sub.id}
              className={`subtask-item ${sub.completed ? "completed" : ""}`}
            >
              {editingSubId === sub.id ? (
                <div className="edit-row">
                  <input
                    type="text"
                    value={editSubText}
                    onChange={(e) => setEditSubText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEditSub(sub.id);
                      if (e.key === "Escape") cancelEditSub();
                    }}
                    className="edit-input"
                    autoFocus
                  />
                  <button
                    onClick={() => saveEditSub(sub.id)}
                    className="btn-save"
                  >
                    ✓
                  </button>
                  <button onClick={cancelEditSub} className="btn-cancel">
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className={`checkbox checkbox-sm ${sub.completed ? "checked" : ""}`}
                    onClick={() => onToggleSubtask(todo.id, sub.id)}
                    aria-label={
                      sub.completed ? "Uncheck subtask" : "Complete subtask"
                    }
                  />
                  <span
                    className="subtask-text"
                    onDoubleClick={() => startEditSub(sub.id, sub.text)}
                  >
                    {sub.text}
                  </span>
                  {!sub.completed && (
                    <button
                      onClick={() => startEditSub(sub.id, sub.text)}
                      className="btn-edit"
                      aria-label="Edit subtask"
                    >
                      ✎
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteSubtask(todo.id, sub.id)}
                    className="btn-delete"
                    aria-label="Delete subtask"
                  >
                    ×
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default TodoItem;
