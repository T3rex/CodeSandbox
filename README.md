# mycodebox.live

mycodebox is an AI-powered, collaborative cloud IDE designed for rapid prototyping and seamless development. Inspired by tools like CodeSandbox and Replit, it provides a containerized environment where you can turn ideas into working applications instantly using integrated AI assistance.

## 🌐 Live Demo: http://mycodebox.live

**⚠️ Note: The application currently supports HTTP only. If you encounter issues, please ensure your browser hasn't auto-upgraded the connection to HTTPS.**

---

## 📸 Screenshots / Demo

![Screenshot 1](/frontend/public/ss1.png)
![Screenshot 3](/frontend/public/ss3.png)
![Screenshot 4](/frontend/public/ss4.png)
![Screenshot 5](/frontend/public/ss5.png)

---

## 🚀 Features

- 🤖 **AI-Powered Prototyping**: Generate full-stack applications from simple descriptions using integrated OpenAI and Gemini APIs.

- 🛡️ **Isolated Sandboxes**: Every project runs in a secure, containerized Docker workspace to ensure environment consistency and safety.

- 🔄 **Real-Time Collaboration**: Work together with teammates using WebSockets for instant code synchronization and auto-save.

- 🖥️ **Integrated Terminal**: Execute shell commands and manage your environment through an interactive, real-time terminal powered by Xterm.

- 🌐 **Live Preview**: View your application changes in real-time with an embedded browser preview.

- 🗂️ **Advanced Editor**: A multi-file Monaco-based editor with a persistent file explorer for professional-grade coding.

---

## 🧠 How It Works

### 1. AI Scaffolding

The platform uses **Gemini 2.5 Flash** to turn natural language descriptions into valid project structures. It doesn't just write code; it generates a full file tree including `package.json`, `vite.config.js`, and environment setups, ensuring the output is a "ready-to-run" application.

### 2. Containerized Environments

Security and isolation are handled via **Dockerode**. Each project is assigned a unique container instance:

- **Isolation**: Code runs in a secure, non-privileged container environment.
- **Binds**: Your local project files are mounted into the container, allowing for persistent storage and real-time editing.
- **Port Detection**: The system uses a backoff-retry mechanism to detect the dynamic host port assigned to the container, providing you with a live preview URL.

### 3. WebSocket Terminal

The terminal experience is driven by **WebSockets** and **Xterm.js**:

- **Auto-Provisioning**: As soon as you open the terminal, it triggers `npm install` and starts the dev server.
- **Bidirectional Streaming**: Your keystrokes are sent to the Docker `exec` stream, and the output is streamed back to your browser instantly with zero buffering.

## 🛠️ Tech Stack

- **Frontend**: React.js, Monaco Editor, Xterm.js

- **Backend**: Node.js, Express.js

- **AI Integration**: OpenAI API, Gemini API

- **Infrastructure**: Docker (Containerization), WebSockets (Live Sync)

---

## 🚀 Getting Started

Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Docker (Mandatory for running the sandboxed environments)

1. Clone & Install

```Bash
git clone https://github.com/T3rex/CodeSandbox.git
cd CodeSandbox

# Install Backend dependencies
cd backend && npm install

# Install Frontend dependencies
cd ../frontend && npm install
```

2. Environment Setup
   Create a `.env `file in the backend directory:

```bash
PORT=3000
TERMINAL_PORT=4000
GEMINI_API_KEY=your_gemini_key_here
DOCKER_SOCKET_PATH=/var/run/docker.sock # Standard path for Linux
LOCAL_PROJECTS_DIRECTORY_PATH=/absolute/path/to/mycodebox/backend/projects
VITE_CREATE_PROJECT_COMMAND="npm create vite@latest"
```

Create a `.env` file in the frontend directory:

```bash
VITE_API_URL=http://localhost:3000
VITE_TERMINAL_URL=http://localhost:4000
```

3. Run the Project
1. Prepare the Sandbox: Build the Docker image used for the workspace.

```Bash
cd backend && docker build -t sandbox .
```

2.  Start Services: Use separate terminals for the following:

- Backend: `cd backend && npm run dev`

- Terminal Server: `cd backend/src && node TerminalServer.js`

- Frontend: `cd frontend && npm run dev`

## 🤝 Contributing

Contributions are welcome! To contribute:

- Fork the repository
- Create a new feature branch
- Commit your changes
- Submit a pull request

## 🗺️ Roadmap

- [ ] Authentication: User profiles and saved project history.
- [ ] Language Support: Expansion beyond Node.js to Python, Java, and Go.
- [ ] Cloud Persistence: Moving from local file storage to cloud-based project persistence.
- [ ] Enhanced AI: Real-time code completion and automated bug fixing.

## 📜 License

This project is licensed under the MIT License

## 🌟 Show your support

If you like mycodebox, consider giving it a ⭐ on GitHub and sharing it with others!
