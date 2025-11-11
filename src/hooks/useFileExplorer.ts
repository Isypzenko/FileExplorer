import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:3001/api";

export interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  download_url?: string;
  view_url?: string;
}

export const useFileExplorer = () => {
  const [path, setPath] = useState("/");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  const createFolder = async (name: string) => {
    try {
      await axios.post(`${API}/mkdir`, { path, name });
      await fetchFiles(path);
    } catch (err: any) {
      alert(err.response?.data?.error || "Error creating folder");
    }
  };
  const deleteItem = async (itemPath: string) => {
    if (!confirm("Delete forever ?")) return;

    try {
      await axios.delete(`${API}/delete`, { data: { path: itemPath } });
      await fetchFiles(path);
    } catch (err: any) {
      alert(err.response?.data?.error || "Error deleting");
    }
  };
  const fetchFiles = async (p: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/files`, { params: { path: p } });
      setFiles(res.data.files);
    } catch (err) {
      alert("Error loading");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(path);
  }, [path]);

  const uploadFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("path", path);

    try {
      await axios.post(`${API}/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchFiles(path);
    } catch (err: any) {
      alert(err.response?.data?.error || "Error loading");
    }
  };

  const openFile = (url: string) => {
    window.open(url, "_blank");
  };

  const goBack = () => {
    const parts = path.split("/").filter(Boolean);
    parts.pop();
    setPath("/" + parts.join("/") || "/");
  };

  return {
    deleteItem,
    path,
    files,
    loading,
    createFolder,
    uploadFile,
    openFile,
    goBack,
    goTo: setPath,
    refresh: () => fetchFiles(path),
  };
};
