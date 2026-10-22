# ⚡ TermiTask

**A terminal-inspired productivity dashboard for managing tasks with focus.**

TermiTask is a lightweight task management application built with React, TypeScript, and Vite. It combines a clean, terminal-inspired interface with practical productivity features to help you organize tasks, track progress, and stay focused.

[Features](#-features) · [Getting Started](#-getting-started) · [Usage](#-usage) · [Project Structure](#-project-structure) · [Development](#-development) · [License](#-license)

---

## ✨ Features

### Task Management
- **Create and edit tasks** — manage tasks with titles, categories, priorities, and due dates.
- **Complete and restore tasks** — track finished work and bring tasks back when needed.
- **Delete tasks** — remove tasks with confirmation before destructive actions.
- **Demo data** — explore the application using sample tasks on first launch.
- **Clear demo data** — remove sample content when you're ready to use your own tasks.

### Organization & Productivity
- **Priority levels** — classify tasks as Low, Medium, or High.
- **Categories** — organize tasks by topic or area of work.
- **Due dates** — keep track of upcoming deadlines.
- **Search and filters** — find tasks and narrow down your task list.
- **Sorting** — organize tasks according to available sorting options.
- **Progress tracking** — view task statistics and completion progress at a glance.

### User Experience
- **Terminal-inspired design** — a dark, developer-focused interface.
- **Dashboard statistics** — view total, completed, pending, and overdue tasks.
- **Responsive layout** — use the dashboard across different screen sizes.
- **Keyboard shortcuts** — navigate common actions without relying entirely on the mouse.
- **Local persistence** — tasks are saved in browser `localStorage`.
## 🖥️ Preview

![TermiTask dashboard](screenshots/termitask-dashboard.png)


## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type-safe application logic |
| Vite | Development server and production build |
| Browser localStorage | Local task persistence |

## 🚀 Getting Started

### Prerequisites

Install the following before running TermiTask:

- [Node.js](https://nodejs.org/) — use a version compatible with the project's dependencies.
- npm — included with Node.js.
- Git — to clone the repository.

Check your installation:

```bash
node --version
npm --version
git --version
```

### 1. Clone the repository

```bash
git clone https://github.com/Sarxanov/TermiTask.git
cd TermiTask
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal, typically:

```text
http://localhost:5173/
```

Keep the development server running while using the application.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `N` | Focus the new-task title field |
| `/` | Focus the search field |

Shortcuts may be unavailable while typing in certain input fields, depending on the application's keyboard handling.

## 📁 Project Structure

```text
TermiTask/
├── src/
│   ├── components/   # Reusable UI components
│   ├── types/        # Task and application types
│   ├── utils/        # Storage, filtering, statistics, and date helpers
│   ├── constants/    # Sample task data and constants
│   └── ...           # Application entry points and supporting files
├── public/           # Static assets, if present
├── package.json      # Dependencies and npm scripts
├── package-lock.json # Dependency lockfile
├── index.html        # Application HTML entry point
├── vite.config.ts    # Vite configuration, if present
├── tsconfig.json     # TypeScript configuration, if present
├── .gitignore
└── README.md
```

The exact files may vary as the project evolves.

## 🧪 Development & Validation

Run the following commands to check the project:

```bash
npm run test
npm run build
npm run lint
```

- **Tests** — run the project's configured test suite.
- **Build** — generate the production-ready application.
- **Lint** — check the code for configured style and quality issues.

These commands depend on the scripts defined in `package.json`. A successful result should be confirmed by running each command locally.

## 💾 Data & Privacy

TermiTask stores tasks in the browser's `localStorage`.

- Tasks remain available across page reloads in the same browser profile.
- Data is stored locally rather than in a remote account database.
- Clearing browser site data may remove saved tasks.
- Tasks are not automatically synchronized between browsers or devices.
- If browser storage is unavailable, the application displays a user-facing error.

**Important:** `localStorage` is not encrypted storage. Avoid entering passwords, authentication tokens, or other sensitive information into task descriptions.

## 🗺️ Roadmap

Potential improvements for future versions:

- [ ] Export and import tasks
- [ ] Customizable themes and accent colors
- [ ] Drag-and-drop task organization
- [ ] Recurring tasks and reminders
- [ ] Improved mobile interactions
- [ ] Optional cloud synchronization
- [ ] Additional keyboard shortcuts

These are ideas for future development, not promises of existing functionality.

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run the available tests and checks.
5. Open a pull request describing your changes.

Please keep contributions focused, readable, and consistent with the existing codebase.

## 📄 License

This project is distributed under the [MIT License](LICENSE).

## 👨‍💻 Author

Created by [@Sarxanov](https://github.com/Sarxanov).

---

**Built for focused work, one task at a time.** ⚡
