SOCIALNETWORK
│
├── api/ # Backend API
│ ├── controllers/ # Controllers for API endpoints (auth, post, user, etc.)
│ ├── routes/ # API routes
│ ├── node_modules/ # Dependencies
│ ├── connect.js # Database connection setup
│ ├── index.js # Entry point for the API
│ └── package.json # API dependencies and scripts
│
├── client/ # Frontend React Application
│ ├── node_modules/ # React project dependencies
│ ├── public/ # Public assets (images, fonts, etc.)
│ ├── src/ # React source code
│ │ ├── assets/ # Static assets (images, icons)
│ │ ├── components/ # React components (posts, comments, navbar, etc.)
│ │ ├── context/ # React Context (AuthContext, etc.)
│ │ ├── pages/ # Pages (home, profile, login, etc.)
│ │ ├── axios.js # Axios instance for making API requests
│ │ ├── App.js # Main React App component
│ │ └── style.scss # Global styles
│ ├── package-lock.json # Lock file for dependencies
│ └── package.json # Client-side dependencies and scripts
│
├── .gitignore # Files and directories to ignore in Git
├── .gitattributes # Git attributes configuration
├── README.md # Project documentation
└── package-lock.json # Lock file for dependencies
