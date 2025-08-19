// src/pages/UploadTraining.jsx


import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadTraining = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const token = localStorage.getItem("token");

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/training/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5001/api/training/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("✅ File uploaded successfully");
      setFile(null);
      fetchFiles(); // refresh list
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/api/training/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete file.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">📤 Upload Training Material</h2>

        {message && <p className="text-center mb-4 text-green-600">{message}</p>}

        <form onSubmit={handleUpload} className="mb-6">
          <input
            type="file"
            accept=".pdf,.mp4,.doc,.docx,.jpg,.jpeg,.png,.avif"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Upload
          </button>
        </form>

        <h3 className="text-xl font-semibold mb-3">📄 Uploaded Files:</h3>
        <div className="space-y-4">
          {files.length === 0 && <p className="text-gray-500">No training materials uploaded.</p>}

          {files.map((file) => {
            const fileUrl = `http://localhost:5001/${file.path.replace(/\\/g, "/")}`;
            const ext = file.filename.split(".").pop().toLowerCase();

            return (
              <div
                key={file.id}
                className="border p-4 rounded bg-gray-50 flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="font-medium">{file.filename}</p>

                  {/* Preview for supported types */}
                  {["jpg", "jpeg", "png", "avif"].includes(ext) && (
                    <img src={fileUrl} alt="Preview" className="mt-2 max-w-xs rounded" />
                  )}

                  {["mp4", "webm"].includes(ext) && (
                    <video controls src={fileUrl} className="mt-2 max-w-xs rounded" />
                  )}

                  {["pdf"].includes(ext) && (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline block mt-2"
                    >
                      📄 View PDF
                    </a>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  {/* Download link */}
                  <a
                    href={fileUrl}
                    download
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    ⬇ Download
                  </a>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UploadTraining;


