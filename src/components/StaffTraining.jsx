import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StaffTraining.css";

const StaffTraining = ({ token }) => {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState("");

  const getFileURL = (filename) =>
    `hhttps://my-project-backend.vercel.app/uploads/training/${filename}`;

  const isVideo = (f) => f.toLowerCase().endsWith(".mp4");
  const isImage = (f) => /\.(jpg|jpeg|png|avif)$/i.test(f);
  const isPDF = (f) => f.toLowerCase().endsWith(".pdf");
  const isDoc = (f) => /\.(doc|docx)$/i.test(f);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get("https://my-project-backend.vercel.app/api/training/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(res.data);
      setError("");
    } catch {
      setError("Failed to load training materials");
    }
  };

  useEffect(() => {
    fetchMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="training-container">
      <h2 className="training-title">📚 Training Materials</h2>

      {materials.length === 0 && !error ? (
        <p className="no-materials">No training files uploaded yet.</p>
      ) : (
        <div className="training-grid">
          {materials.map((item) => (
            <div key={item.id} className="training-card">
              <p className="training-filename">{item.filename}</p>

              {isVideo(item.filename) ? (
                <video controls className="training-video">
                  <source src={getFileURL(item.filename)} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              ) : isImage(item.filename) ? (
                <img
                  src={getFileURL(item.filename)}
                  alt={item.filename}
                  className="training-image"
                />
              ) : isPDF(item.filename) ? (
                <iframe
                  src={getFileURL(item.filename)}
                  title={item.filename}
                  className="training-pdf"
                />
              ) : isDoc(item.filename) ? (
                <p className="training-doc">Word document. Please download to view.</p>
              ) : (
                <p className="training-unsupported">Unsupported file format.</p>
              )}

              <a
                href={getFileURL(item.filename)}
                download
                className="training-download-btn"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}

      {error && <p className="training-error">{error}</p>}
    </div>
  );
};

export default StaffTraining;
