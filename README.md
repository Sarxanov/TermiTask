# TermiTask

TermiTask is a terminal-inspired productivity dashboard built with React, TypeScript, and Vite.

## Features

- Add, edit, delete, complete, and restore tasks
- Priorities: Low, Medium, High
- Categories and due dates
- Search, filters, and sorting
- Dashboard stats (total, completed, pending, overdue)
- Progress indicator and empty state
- Local storage persistence with first-run sample tasks
- Clear demo data action
- Keyboard shortcuts:
  - `N`: focus the new-task title field
  - `/`: focus search
- Responsive and accessible controls with destructive-action confirmation

## Architecture

- `src/components`: UI building blocks
- `src/types`: task type definitions
- `src/utils`: storage, filtering, stats, and date helpers
- `src/constants`: sample seed tasks

## Getting Started

```bash
npm install
npm run dev
```

## Validation Commands

```bash
npm run test
npm run build
npm run lint
```

## Persistence and Limitations

- Tasks are stored in browser `localStorage`.
- If `localStorage` is unavailable, the app shows a user-facing error.
- Screenshots are not included because none were generated in this environment.

## License

MIT
