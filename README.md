# Todo-List

**A full-stack MERN to-do app — add, search, edit, complete, and delete tasks, all backed by a MongoDB REST API.**

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![MUI](https://img.shields.io/badge/MUI_7-007FFF?style=flat&logo=mui&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express_5-000000?style=flat&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose_8-880000?style=flat&logo=mongoose&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)

## Overview

This is a to-do list app built end to end on the MERN stack: a React frontend talking to an Express + MongoDB REST API. You type a task, it gets stored in MongoDB, and the list updates on screen. From there you can mark tasks done, edit their text inline, filter by status, search by keyword, and delete what you no longer need.

I built it to get hands-on with the full MERN flow — wiring a React UI to a REST backend, modeling data in Mongoose, and handling the request/response cycle on both sides. It started during a GDG workshop and I kept extending it afterward. It's a learning project rather than a deployed product, but the CRUD path is complete and the code is split the way a real app would be: separate frontend and backend, an MVC-style API layout, and a shared Axios client.

## Key Features

- **Add tasks** through a single input + "Add Task" button; empty/whitespace-only input is rejected on the client before it ever hits the API.
- **Inline editing** — each task has an edit icon that swaps the row into an editable text field and saves on submit (MUI `EditIcon`).
- **Mark complete / incomplete** with a checkbox; completed tasks show a green check, open tasks show a red cross, and the state is persisted to the database.
- **Delete tasks** with a one-click trash button (MUI `DeleteIcon`).
- **Keyword search** that filters the list live as you type, case-insensitive, matching against the task description.
- **Status filter** with All / Completed / Incomplete toggle buttons, applied on top of the search filter.
- **Newest-first ordering** — the list is reversed on render so the task you just added shows at the top.
- **Loading state** while the initial fetch is in flight, and an empty-state message ("No tasks available") when there's nothing to show.
- **REST API** with full CRUD over `/api/todos`, returning proper HTTP status codes (200 / 201 / 400 / 404 / 500).
- **Persistent storage** in MongoDB via Mongoose, with schema-level validation on the task description.
- **CORS configured** for specific frontend origins, plus a Vite dev proxy so the frontend and API can run on separate ports during development.

## How It Works

The project is two separate apps in one repo: a Vite/React frontend at the root (`src/`) and an Express API under `api/`. In development they run on different ports (5173 and 5000) and Vite proxies API calls across.

### Frontend (React + Vite)

`App.jsx` is the single source of truth. It holds three pieces of state — `search`, `tasks`, and `isLoading` — and owns every mutation:

- On mount, a `useEffect` calls `fetchTodo()` and loads the task list into state.
- `submitTask`, `completeTask`, `deleteTask`, and `editTask` each call the API and then update local state optimistically by mapping/filtering the `tasks` array, so the UI reflects the change immediately without a full refetch.
- `completeTask` flips the `completed` boolean and PUTs the whole task back; `editTask` PUTs just the new `description`.

The UI is split into small components:

- **`Search.jsx`** — holds the search box (lifts the query up via `setSearch`) and the add-task form. It has its own local input state and clears the field after a task is added.
- **`TaskPage.jsx`** — renders the All / Completed / Incomplete filter toggle (with `useMemo` for the filtered slice) and maps the tasks into rows, reversed so the newest is on top.
- **`TaskItem.jsx`** — one task row: the complete checkbox, the status icon, the description, and the edit/delete controls.
- **`EditTask.jsx`** — toggles a row between display and an inline edit form.

Styling is Tailwind CSS 4 wired in through the official `@tailwindcss/vite` plugin (no separate `tailwind.config` / PostCSS step), with MUI icons for the edit and delete actions. There's a gradient header, focus rings, and hover transitions throughout.

API access goes through a single Axios instance in `src/axios.js` with `baseURL: '/api/todos/'`. That relative base is what makes the Vite proxy work — calls go to the dev server, which forwards `/api` to `http://localhost:5000`.

### Backend (Express + Mongoose)

`api/server.js` is the entry point. It loads env vars with dotenv, fails fast if `MONGO_URI` is missing, connects to MongoDB (`config/db.js`), enables JSON/urlencoded body parsing, configures CORS for the allowed origins, mounts the todo router, and adds a catch-all error handler that returns a 500.

The data model (`models/todoModels.js`) is deliberately small:

```js
{
  description: { type: String, required: true },
  completed:   { type: Boolean, default: false }
}
```

The router (`views/todoRoutes.js`) exposes the CRUD endpoints under `/api/todos`:

| Method | Route   | Action                                  |
|--------|---------|-----------------------------------------|
| GET    | `/`     | List all todos                          |
| POST   | `/`     | Create a todo from `{ description }`    |
| PUT    | `/:id`  | Update description and/or completed flag |
| DELETE | `/:id`  | Delete a todo by id                     |

The PUT and DELETE handlers validate the `:id` with `mongoose.isValidObjectId` before touching the database and return 404 when no matching document is found. Updates use `findByIdAndUpdate` with `runValidators: true` so the schema rules still apply on edit.

> Note on layout: the repo follows an MVC-ish folder split (`config` / `controllers` / `models` / `views`). The route handlers in `views/todoRoutes.js` are self-contained, so `controllers/todoController.js` ends up as a parallel, currently-unused copy of the same CRUD logic — useful to know if you extend the API.

### Request flow, end to end

1. User types a task and submits → `Search` calls `submitTask` in `App`.
2. `createTodo()` (Axios) POSTs `{ description }` to `/api/todos/`.
3. Vite proxies it to the Express server on port 5000.
4. The router builds a `Todo`, saves it, and returns the created document (201).
5. `App` appends the returned task to state and the row appears at the top of the list.

## Tech Stack

- **Languages:** JavaScript (ES6+ / JSX), HTML5, CSS3
- **Frontend:** React 19, Vite 6, Tailwind CSS 4 (`@tailwindcss/vite`), MUI 7 (`@mui/material`, `@mui/icons-material`, Emotion), Axios
- **Backend:** Node.js, Express 5, Mongoose 8, MongoDB driver, dotenv, cors, nodemon
- **Tooling:** ESLint 9 (with `eslint-plugin-react-hooks` and `react-refresh`), Vite dev server + proxy

## Getting Started

### Prerequisites
- Node.js and npm
- A MongoDB instance (local `mongod` or a MongoDB Atlas connection string)

### Installation

```bash
git clone https://github.com/DCode-v05/Todo-List.git
cd Todo-List

# Backend
cd api
npm install

# Frontend
cd ..
npm install
```

Create a `.env` file in the `api/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Running

Start the API first, then the frontend:

```bash
# Terminal 1 — backend (from api/)
cd api
npm run dev        # nodemon server.js → http://localhost:5000

# Terminal 2 — frontend (from repo root)
npm run dev        # vite → http://localhost:5173
```

Open `http://localhost:5173` in your browser. The Vite proxy forwards `/api` calls to the backend, so you don't need to touch CORS for local use.

> Heads-up: `api/server.js` loads its `.env` from a hardcoded path (`/workspaces/TODO/api/.env`) and the root `package.json` `start` script points at an absolute `/workspaces/...` path — both left over from a GitHub Codespaces setup. If you run this locally, change `dotenv.config({ path: ... })` to just `dotenv.config()` (or point it at your own `api/.env`) and use `npm run dev` rather than `npm start`.

## Usage

- **Add a task:** type into "Add a new task" and hit Add Task (or Enter).
- **Search:** type in the search box to filter the list by description as you go.
- **Filter by status:** use the All / Completed / Incomplete toggle.
- **Complete a task:** click its checkbox — the icon flips to a green check and the change saves.
- **Edit a task:** click the edit (pencil) icon, change the text, submit.
- **Delete a task:** click the trash icon.

Every change is sent to the API and stored in MongoDB, so the list survives a page reload.

## Project Structure

```
Todo-List/
├── api/                          # Express + Mongoose backend
│   ├── config/
│   │   └── db.js                 # Mongoose connection helper
│   ├── controllers/
│   │   └── todoController.js     # CRUD handlers (parallel copy; routes use inline versions)
│   ├── models/
│   │   └── todoModels.js         # Todo schema: description + completed
│   ├── views/
│   │   └── todoRoutes.js         # /api/todos routes (GET/POST/PUT/DELETE)
│   ├── server.js                 # API entry point, CORS, error handler
│   └── package.json              # Backend deps (express, mongoose, cors, dotenv)
├── src/                          # React frontend
│   ├── components/
│   │   ├── Search.jsx            # Search box + add-task form
│   │   ├── TaskPage.jsx          # Status filter toggle + task list
│   │   ├── TaskItem.jsx          # Single task row (checkbox, edit, delete)
│   │   └── EditTask.jsx          # Inline edit form
│   ├── App.jsx                   # State + all CRUD handlers
│   ├── axios.js                  # Axios instance (baseURL /api/todos/)
│   ├── App.css / index.css       # Styles
│   └── main.jsx                  # React entry point
├── index.html                    # Vite HTML template
├── vite.config.js                # React + Tailwind plugins, /api dev proxy
├── eslint.config.js              # ESLint flat config
├── package.json                  # Frontend deps and scripts
└── README.md
```

---

## Contact

**Portfolio:** [Denistan](https://www.denistan.me)<br>
**LinkedIn:** [Denistan](https://www.linkedin.com/in/denistanb)<br>
**GitHub:** [DCode-v05](https://github.com/DCode-v05)<br>
**LeetCode:** [Denistan_B](https://leetcode.com/u/Denistan_B)<br>
**Email:** [denistanb05@gmail.com](mailto:denistanb05@gmail.com)

Made with ❤️ by **Denistan B**
