import { useTodos } from "./hooks/useTodos";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const { pending, completed, addTodo, toggleTodo, deleteTodo, editTodo } =
    useTodos();

  return (
    <div className="app">
      <div className="drag-region" />
      <Header pendingCount={pending.length} />
      <TodoForm onAdd={addTodo} />

      <TodoList
        todos={pending}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />

      {completed.length > 0 && (
        <>
          <h2 className="section-title">Completed ({completed.length})</h2>
          <TodoList
            todos={completed}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </>
      )}
    </div>
  );
}

export default App;
