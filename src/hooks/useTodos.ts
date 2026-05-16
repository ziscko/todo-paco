import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { todoService } from "../services/todoService";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => todoService.getAll());

  useEffect(() => {
    todoService.saveAll(todos);
  }, [todos]);

  const addTodo = (text: string) => {
    const todo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([todo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: text.trim() } : t)));
  };

  const pending = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);

  const reload = () => {
    setTodos(todoService.getAll());
  };

  return {
    todos,
    pending,
    completed,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    reload,
  };
}
