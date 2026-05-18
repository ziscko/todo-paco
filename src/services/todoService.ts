import { Todo } from "../types/todo";

const STORAGE_KEY = "todos";

// This service abstracts persistence logic.
// Currently uses localStorage, can be swapped for an API client later.

export const todoService = {
  getAll(): Todo[] {
    const data = localStorage.getItem(STORAGE_KEY);
    const todos = data ? JSON.parse(data) : [];
    return Array.isArray(todos)
      ? todos.map((t) => ({
          ...t,
          subtasks: Array.isArray(t.subtasks) ? t.subtasks : [],
        }))
      : [];
  },

  saveAll(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};
