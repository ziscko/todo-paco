# To-Do

A minimal personal to-do app built with Electron + React + TypeScript.

## Features

- Add, edit, delete and complete tasks
- Subtasks support (nested items)
- Export/import tasks as JSON for backup and migration
- Compact, resizable window with native macOS titlebar
- Data persisted in localStorage (offline-first)

## Tech Stack

- **Electron** — desktop shell
- **React 19** — UI
- **TypeScript** — type safety
- **Vite** — bundler

## Getting Started

### Prerequisites

- Node.js >= 22
- pnpm

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build .app

```bash
pnpm dist
```

The `.app` and `.dmg` are generated in the `release/` folder.

## Project Structure

```
src/
├── components/        UI components
│   ├── Header.tsx
│   ├── TodoForm.tsx
│   ├── TodoItem.tsx
│   └── TodoList.tsx
├── hooks/             Custom hooks
│   └── useTodos.ts
├── services/          Persistence layer
│   ├── todoService.ts
│   └── exportService.ts
├── types/             Shared interfaces
│   └── todo.ts
├── styles/
│   └── App.css
├── App.tsx
└── main.tsx
electron/
└── main.ts            Electron main process
```

## Roadmap

- [ ] API backend (Fastify + PostgreSQL)
- [ ] Sync across devices
- [ ] Web version
- [ ] Mobile app (React Native)
