import React, { useState } from "react";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

function TodoForm({ onAdd }: TodoFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add task..."
        className="add-input"
        autoFocus
      />
      <button type="submit" className="add-btn">
        +
      </button>
    </form>
  );
}

export default TodoForm;
