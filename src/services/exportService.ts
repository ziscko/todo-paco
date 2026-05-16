import { Todo } from "../types/todo";
import { todoService } from "./todoService";

export const exportService = {
  exportToFile(): void {
    const todos = todoService.getAll();
    const data = JSON.stringify(todos, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `todos-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();

    URL.revokeObjectURL(url);
  },

  importFromFile(): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";

      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return reject(new Error("No file selected"));

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const todos: Todo[] = JSON.parse(event.target?.result as string);
            todoService.saveAll(todos);
            resolve(todos);
          } catch {
            reject(new Error("Invalid JSON file"));
          }
        };
        reader.readAsText(file);
      };

      input.click();
    });
  },
};
