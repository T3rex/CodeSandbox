# mycodebox.live

Mycodebox is an AI powered online, collaborative coding environment inspired by tools like CodeSandbox, Replit and ProjectIDX from Google.  
With AI prototyping and code generation features, mycodebox aims to streamline the development workflow.It lets developers quickly spin up projects, experiment with code, and share their work in real time.

Live at: [http://mycodebox.live](http://mycodebox.live)

**⚠️ Note: The app currently supports HTTP only. Some browsers may auto-upgrade to HTTPS, users are advised to manually switch to HTTP if they face issues.**

# 📸 Screenshots / Demo

![Screenshot 1](/frontend/public/ss1.png)
![Screenshot 3](/frontend/public/ss3.png)
![Screenshot 4](/frontend/public/ss4.png)
![Screenshot 5](/frontend/public/ss5.png)

## 🚀 Features

- 🤖 **AI Prototyping & Code Generation** – Turn your ideas into working applications with built-in AI assistance (powered by OpenAI & Gemini APIs).
- 🌐 **Zero-Setup Online IDE** – Write, run, and debug code instantly in the browser—no installs required.
- 🛡️ **Sandboxed Environments** – Each project runs in an isolated, containerized workspace for safety and reliability.
- 🔄 **Real-Time Collaboration** – Collaborate with teammates via WebSockets with instant auto-save and sync.
- 🖥️ **Live App Preview** – Preview running applications directly in the browser.
- 💻 **Interactive Terminal** – Run shell commands in an integrated, real-time terminal.
- 🗂️ **Multi-File Editor** – Work with multiple tabs and files at once, just like a local IDE.
- 📂 **Persistent File Explorer** – Browse, manage, and organize your project structure with ease.
- 📦 **Project Management** – Create, save, and manage multiple coding projects in one place.

## 🛠️ Tech Stack

- **Frontend**: React.js, Monaco Editor, Xterm for terminal emulation, CSS for styling.
- **Backend**: Node.js, Express.js — integrates OpenAI API & Gemini API for AI-powered code generation.
- **Others**: WebSockets for live collaboration, Docker for containerized environments

## 📂 Project Structure

```
mycodebox/
├── backend/ # Backend (Node.js + Express)
├── frontend/ # Frontend (React)
└── README.md # Project overview
```

## 📦 Getting Started

### Prerequisites

- Node.js
- npm
- Docker (mandatory for sandboxed environments)

### Setting up environment variables

Create a `.env` file in the `backend` directory with the following variables:

```bash
PORT=3000

TERMINAL_PORT=4000

VITE_CREATE_PROJECT_COMMAND="npm create vite@latest"

DOCKER_SOCKET_PATH=Your Docker socket path, e.g. /var/run/docker.sock

LOCAL_PROJECTS_DIRECTORY_PATH=Path to your local projects folder.
# Example: Create a folder named "projects" inside the backend directory
# and provide its absolute path.
# e.g. /home/username/CodeSandbox/backend/projects

GEMINI_API_KEY=Your Gemini API key
```

Create a `.env` file in the `frontend` directory with the following variables:

```bash
VITE_API_URL=http://localhost:3000

VITE_TERMINAL_URL=http://localhost:4000
```

### Installation

Navigate into project and install dependencies

```bash
cd mycodebox

# Install dependencies
cd backend && npm install
cd ../frontend && npm install
```

Starting up the frontend server

```bash
# In a fresh terminal
cd frontend
npm run dev # runs frontend
```

Creating the docker image for the sandboxed environment

```bash
# In a fresh terminal
cd backend
docker build -t sandbox .
```

Starting the backend server

```bash
# In a fresh terminal
cd backend
npm install
npm run dev
```

Starting the terminal server

```bash
# In a fresh terminal
cd backend/src
node TerminalServer.js
```

Frontend will be running on: http://localhost:5173

Backend will be running on:

1. Main server: http://localhost:3000

2. Terminal server: https://localhost:4000

## 🤝 Contributing

Contributions are welcome! To contribute:

- Fork the repository
- Create a new feature branch
- Commit your changes
- Submit a pull request

## 🗺️ Roadmap

- [ ] User authentication & profiles
- [ ] Team workspaces
- [ ] Support for more languages (Python, Java, etc.)
- [ ] Cloud-based persistence for projects
- [ ] Enhanced AI features (code completion, suggestions)
- [ ] Performance optimizations

## 📜 License

This project is licensed under the MIT License

## 🌟 Show your support

If you like mycodebox, consider giving it a ⭐ on GitHub and sharing it with others!
