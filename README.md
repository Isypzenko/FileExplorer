# File Explorer – Local File Manager (React + Node.js)

A fully functional **local file manager** inspired by Dropbox — no cloud, everything runs on your machine!

### Features
- Create folders
- Upload any files (PDF, images, videos…)
- Open files in browser
- Download to computer
- Delete files & folders
- Breadcrumbs navigation

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **No database** — files stored in `server/data/`

---

## How to Run (2 Terminals)
1. Clone & Enter
```bash
git clone https://github.com/your-username/file-explorer.git
cd file-explorer

2. Start Backend (Express)
bashcd server
npm install
npm start
Server runs at: http://localhost:3001

3. Start Frontend (React + Vite)
bashcd ../client
npm install
npm run dev
App opens at: http://localhost:5173
