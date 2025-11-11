import { useState } from "react";
import { useFileExplorer } from "../hooks/useFileExplorer";
import { Trash2 } from "lucide-react";
import {
  ArrowLeft,
  Home,
  Upload,
  FolderPlus,
  Download,
  File,
  Folder,
} from "lucide-react";

export const MainLayout = () => {
  const {
    path,
    files,
    loading,
    createFolder,
    uploadFile,
    openFile,
    goBack,
    goTo,
    refresh,
    deleteItem,
  } = useFileExplorer();
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="border-b bg-white px-4 py-2 flex items-center gap-2">
        <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => goTo("/")}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <Home className="w-5 h-5" />
        </button>

        <input
          type="text"
          placeholder="New folder..."
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
          className="px-3 py-1 border rounded text-sm ml-4"
        />
        <button
          onClick={handleCreateFolder}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <FolderPlus className="w-5 h-5" />
        </button>

        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                uploadFile(file);
                e.target.value = "";
              }
            }}
          />
          <div className="p-2 hover:bg-gray-100 rounded flex items-center gap-1">
            <Upload className="w-5 h-5" />
            <span className="text-sm">Upload</span>
          </div>
        </label>
      </div>

      <div className="px-4 py-2 text-sm border-b bg-white">
        {path
          .split("/")
          .filter(Boolean)
          .map((part, i, arr) => {
            const p = "/" + arr.slice(0, i + 1).join("/");
            console.log(part);
            console.log(p);
            return (
              <span key={p}>
                {i > 0 && " / "}
                <button onClick={() => goTo(p)} className="hover:underline">
                  {part}
                </button>
              </span>
            );
          })}
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : files.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Empty</div>
        ) : (
          <div className="space-y-1">
            {files.map((file) => (
              <div
                key={file.path}
                className="flex items-center gap-3 p-3 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => file.type === "folder" && goTo(file.path)}
              >
                {file.type === "folder" ? (
                  <Folder className="w-5 h-5 text-blue-600" />
                ) : (
                  <File className="w-5 h-5 text-gray-600" />
                )}
                <span className="flex-1">{file.name}</span>

                {file.type === "file" && file.download_url && file.view_url && (
                  <div
                    className="flex gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => window.open(file.view_url!, "_blank")}
                      className="p-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs text-blue-700"
                    >
                      Open
                    </button>

                    <a
                      href={file.download_url}
                      download={file.name}
                      className="p-1.5 bg-green-100 hover:bg-green-200 rounded flex items-center gap-1 text-xs text-green-700"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </a>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItem(file.path);
                      }}
                      className="p-1.5 bg-red-100 hover:bg-red-200 rounded text-xs text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {file.type === "folder" && (
                  <div
                    className="flex gap-1 ml-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItem(file.path);
                      }}
                      className="p-1.5 bg-red-100 hover:bg-red-200 rounded text-red-700"
                      title="Delete folder"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
