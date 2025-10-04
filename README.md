# TODO List Web Application (MERN Stack)

## Project Description
A full-stack TODO List web application designed to help users manage their daily tasks efficiently. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), this project provides a seamless experience for adding, editing, searching, and deleting tasks, with a robust backend and a modern, responsive frontend.

---

## Project Details

### Features
- Add, edit, and delete tasks
- Search tasks by keywords
- Responsive design for desktop and mobile
- RESTful API backend
- Persistent storage with MongoDB
- Error handling and validation

### Backend
- Built with Node.js and Express.js
- MongoDB for data storage, using Mongoose for schema modeling
- RESTful API endpoints for CRUD operations
- Centralized error handling
- CORS enabled for frontend-backend communication

### Frontend
- Built with React.js
- Axios for API requests
- Modular components for task management, editing, and searching
- Styled with CSS for a clean and modern UI

---

## Tech Stack
- **Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose

---

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DCode-v05/TODO-List.git
   cd TODO-List
   ```

2. **Set up the Backend**
   ```bash
   cd api
   npm install
   ```
   Create a `.env` file in the `api/` folder and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Set up the Frontend**
   ```bash
   cd ../
   npm install
   npm run dev
   ```
   Visit [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## Usage
- Add a new task using the input field.
- Edit or delete tasks using the respective buttons.
- Search for tasks using the search bar.
- All changes are saved to the database in real-time.

---

## Project Structure

```
TODO-List/
├── api/                  # Backend (Node.js/Express)
│   ├── config/           # Database configuration
│   │   └── db.js
│   ├── controllers/      # Route controllers
│   │   └── todoController.js
│   ├── models/           # Mongoose models
│   │   └── todoModels.js
│   ├── views/            # API routes
│   │   └── todoRoutes.js
│   ├── server.js         # Entry point for backend
│   └── package.json      # Backend dependencies
├── src/                  # Frontend (React)
│   ├── components/       # React components
│   │   ├── EditTask.jsx
│   │   ├── Search.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskPage.jsx
│   ├── App.jsx           # Main app component
│   ├── App.css           # App styles
│   ├── axios.js          # Axios instance
│   ├── main.jsx          # Frontend entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Frontend dependencies
└── README.md             # Project documentation
```

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request describing your changes.

---

## Contact
- **GitHub:** [DCode-v05](https://github.com/DCode-v05)
- **Email:** denistanb05@gmail.com
