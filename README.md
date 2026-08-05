# Todoooze

A Linear-inspired, fully client-side project management app. Organize work into lists, track tasks on a kanban board, and drag them between **Todo**, **In Progress**, **In Review**, and **Done** — no backend, no account, no sign-up. Everything lives in your browser's localStorage.

<img style="max-height:100%;width:100%;" src="https://user-images.githubusercontent.com/66781740/137217796-3a51f8a1-0463-4bf6-9602-768a091949d8.png">

## Features

- **Lists (projects)** — create, rename, and delete lists from the sidebar
- **Kanban board** — four status columns with drag-and-drop; card order is persisted
- **Tasks** — create, edit, and delete tasks (right-click a card for the context menu), with title, description, status, and priority (Urgent / High / Medium / Low)
- **Search** — instant client-side search across every task in every list
- **Recent** — a feed of recently updated tasks across all lists
- **Local profile** — set your display name; no auth service, all data stays on your device
- **Responsive** — collapsible sidebar layout for small screens

## Tech stack

- [Next.js 13](https://nextjs.org/) (App Router) + React 18 + TypeScript
- Tailwind CSS + CSS Modules
- React Context + `useReducer` for state, persisted to localStorage
- `react-beautiful-dnd-next` for drag-and-drop, Radix UI for the context menu, Framer Motion for micro-interactions
- Jest + Testing Library

## Getting started

```bash
yarn install
yarn start     # dev server on http://localhost:3000
```

Other scripts:

```bash
yarn build      # production build
yarn test       # run tests once
yarn test:watch # run tests in watch mode
yarn lint       # eslint
```

## Data & privacy

There is intentionally **no auth and no server**. All lists, tasks, and profile data are stored under `todoooze.*` keys in localStorage. You can wipe everything from **My account → Clear all local data**.
