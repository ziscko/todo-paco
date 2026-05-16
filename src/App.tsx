import { useTodos } from "./hooks/useTodos";
import { exportService } from "./services/exportService";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const {
    pending,
    completed,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    reload,
  } = useTodos();

  const handleImport = async () => {
    try {
      await exportService.importFromFile();
      reload();
    } catch (err) {
      console.error("Import failed:", err);
    }
  };

  return (
    <div className="app">
      <div className="drag-region" />
      <Header pendingCount={pending.length} onImport={handleImport} />
      <TodoForm onAdd={addTodo} />

      <TodoList
        todos={pending}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onAddSubtask={addSubtask}
        onToggleSubtask={toggleSubtask}
        onDeleteSubtask={deleteSubtask}
      />

      {completed.length > 0 && (
        <>
          <h2 className="section-title">Completed ({completed.length})</h2>
          <TodoList
            todos={completed}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onAddSubtask={addSubtask}
            onToggleSubtask={toggleSubtask}
            onDeleteSubtask={deleteSubtask}
          />
        </>
      )}
    </div>
  );
}

export default App;
