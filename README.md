# Todo-List

A MERN to-do app. React frontend, Express and Mongoose API, MongoDB storage. You can add, edit, complete, delete, search and filter tasks. I started it at a GDG workshop and kept adding to it.

## How it works

The repo holds two apps. The Vite and React frontend is at the root (`src/`), and the Express API is in `api/`. In development they run on ports 5173 and 5000, and Vite proxies `/api` to the API.

**Frontend.** `App.jsx` holds the state (`search`, `tasks`, `isLoading`) and the create, complete, edit and delete handlers. Each handler calls the API, then updates the local list without refetching. Components:

- `Search.jsx`: search box and the add-task form
- `TaskPage.jsx`: All / Completed / Incomplete filter and the list, newest first
- `TaskItem.jsx`: one row with checkbox, status icon, edit and delete buttons
- `EditTask.jsx`: inline edit form

`src/axios.js` creates the Axios instance with `baseURL: '/api/todos/'`. Styling is Tailwind CSS 4 through `@tailwindcss/vite`, with MUI icons.

**API.** `api/server.js` loads env vars, exits if `MONGO_URI` is missing, connects to MongoDB, sets up CORS for `localhost:5173` and one Codespaces URL, and mounts the router. The Todo schema is `description` (required string) and `completed` (boolean, default false).

| Method | Route | Action |
| --- | --- | --- |
| GET | `/api/todos/` | list all |
| POST | `/api/todos/` | create from `{ description }` |
| PUT | `/api/todos/:id` | update description and/or completed |
| DELETE | `/api/todos/:id` | delete |

PUT and DELETE check the id with `mongoose.isValidObjectId` and return 404 when nothing matches.

## Setup

You need Node and a MongoDB instance (local or Atlas).

```bash
npm install
cd api && npm install
```

Create `api/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run the API and the frontend in two terminals:

```bash
cd api && npm run dev     # nodemon server.js, http://localhost:5000
npm run dev               # vite, http://localhost:5173
```

## Project structure

```
api/
  config/db.js                 Mongoose connection
  controllers/todoController.js
  models/todoModels.js         Todo schema
  views/todoRoutes.js          /api/todos routes
  server.js
src/
  components/                  Search, TaskPage, TaskItem, EditTask
  App.jsx, axios.js, main.jsx
vite.config.js                 React and Tailwind plugins, /api proxy
```

## Known issues

- `api/server.js` calls `dotenv.config({ path: '/workspaces/TODO/api/.env' })`, a Codespaces path. Outside Codespaces it does not find your `.env`; change it to `dotenv.config()`.
- The root `npm start` script points at `/workspaces/TODO-MERN/api/server.js`. Use `npm run dev` in `api/` instead.
- `server.js` logs `MONGO_URI` to the console on startup.
- `api/controllers/todoController.js` is not imported anywhere. The routes in `views/todoRoutes.js` contain their own copy of the same logic.
