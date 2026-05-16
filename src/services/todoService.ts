import { Todo } from "../types/todo";

const STORAGE_KEY = "todos";

// This service abstracts persistence logic.
// Currently uses localStorage, can be swapped for an API client later.

export const todoService = {
  getAll(): Todo[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveAll(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};
