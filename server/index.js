const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 3001;

const DATA_DIR = path.join(__dirname, "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log("Folder was created: server/data");
}

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const upload = multer({
  dest: DATA_DIR,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, true),
});

app.get("/api/files", (req, res) => {
  const requestPath = req.query.path || "/";
  const fullPath = path.join(DATA_DIR, requestPath);

  if (!fullPath.startsWith(DATA_DIR)) {
    return res.status(400).json({ error: "Invalid path" });
  }

  fs.readdir(fullPath, { withFileTypes: true }, (err, items) => {
    if (err || !fs.existsSync(fullPath)) {
      return res.status(404).json({ error: "Path not found" });
    }

    const files = items.map((item) => {
      const filePath = path.join(requestPath, item.name).replace(/\\/g, "/");
      const isFolder = item.isDirectory();

      return {
        name: item.name,
        path: filePath,
        type: isFolder ? "folder" : "file",
        download_url: isFolder
          ? null
          : `http://localhost:${PORT}/files${filePath}`,
        view_url: isFolder ? null : `http://localhost:${PORT}/view${filePath}`,
      };
    });

    res.json({ files });
  });
});

app.post("/api/mkdir", (req, res) => {
  const { path: parentPath = "/", name } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: "Name required" });

  const folderName = name.trim();
  const fullPath = path.join(DATA_DIR, parentPath, folderName);

  if (!fullPath.startsWith(DATA_DIR))
    return res.status(400).json({ error: "Invalid path" });
  if (fs.existsSync(fullPath)) return res.status(400).json({ error: "Exists" });

  fs.mkdirSync(fullPath, { recursive: true });
  res.json({ success: true });
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  const { path: folderPath = "/" } = req.body;
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file" });

  const targetDir = path.join(DATA_DIR, folderPath);
  const targetPath = path.join(targetDir, file.originalname);

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  fs.renameSync(file.path, targetPath);

  res.json({ success: true });
});

app.delete("/api/delete", (req, res) => {
  const { path: targetPath } = req.body;
  if (!targetPath) return res.status(400).json({ error: "Path required" });

  const fullPath = path.join(DATA_DIR, targetPath);

  if (!fullPath.startsWith(DATA_DIR)) {
    return res.status(400).json({ error: "Invalid path" });
  }

  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: "Not found" });
  }

  try {
    fs.rmSync(fullPath, { recursive: true, force: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

app.use(
  "/files",
  (req, res, next) => {
    const filePath = path.join(DATA_DIR, decodeURIComponent(req.path));
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${path.basename(filePath)}"`
      );
      res.setHeader("Content-Type", "application/octet-stream");
    }
    next();
  },
  express.static(DATA_DIR)
);

app.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/files?path=/`);
});
