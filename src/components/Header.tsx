interface HeaderProps {
  pendingCount: number;
}

function Header({ pendingCount }: HeaderProps) {
  return (
    <header className="header">
      <h1>To-Do</h1>
      <span className="counter">{pendingCount} pending</span>
    </header>
  );
}

export default Header;
