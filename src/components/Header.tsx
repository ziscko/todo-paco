import { exportService } from "../services/exportService";

interface HeaderProps {
  pendingCount: number;
  onImport: () => void;
}

function Header({ pendingCount, onImport }: HeaderProps) {
  const handleExport = () => {
    exportService.exportToFile();
  };

  return (
    <header className="header">
      <h1>To-Do</h1>
      <div className="header-actions">
        <button
          onClick={handleExport}
          className="btn-header"
          aria-label="Export"
          title="Export tasks"
        >
          ↓
        </button>
        <button
          onClick={onImport}
          className="btn-header"
          aria-label="Import"
          title="Import tasks"
        >
          ↑
        </button>
        <span className="counter">{pendingCount} pending</span>
      </div>
    </header>
  );
}

export default Header;
