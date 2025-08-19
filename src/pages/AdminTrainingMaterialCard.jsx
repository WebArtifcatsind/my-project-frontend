// src/pages/AdminTrainingMaterialPage.jsx

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AdminTrainingMaterialCard.css"; // Link to the new CSS file

const AdminTrainingMaterialPage = () => {
    const token = localStorage.getItem("token");
    const [file, setFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState({ text: "", type: "" }); // { text: "message", type: "success" | "error" }
    const [files, setFiles] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [fileToDeleteId, setFileToDeleteId] = useState(null);
    const fileInputRef = useRef(null); // Ref for clearing the file input

    // Function to fetch all training files
    const fetchFiles = async () => {
        try {
            const res = await axios.get("https://api.webartifacts.in/api/training/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFiles(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
            setUploadMessage({ text: "Failed to load files.", type: "error" });
        }
    };

    // Handle file upload
    const handleUpload = async (e) => {
        e.preventDefault();
        setUploadMessage({ text: "", type: "" }); // Clear previous messages
        if (!file) {
            setUploadMessage({ text: "Please select a file to upload.", type: "error" });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("https://api.webartifacts.in/api/training/upload", formData, {
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
            });
            setUploadMessage({ text: "File uploaded successfully! ✅", type: "success" });
            setFile(null); // Clear selected file
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear file input visually
            }
            fetchFiles(); // Refresh the list of files
        } catch (err) {
            console.error("Upload failed:", err);
            setUploadMessage({ text: err.response?.data?.message || "File upload failed. ❌", type: "error" });
        }
    };

    // Open confirmation modal for deletion
    const openDeleteConfirmModal = (id) => {
        setFileToDeleteId(id);
        setShowConfirmModal(true);
    };

    // Confirm deletion action
    const confirmDelete = async () => {
        if (!fileToDeleteId) return;

        try {
            await axios.delete(`https://api.webartifacts.in/api/training/delete/${fileToDeleteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFiles((prev) => prev.filter((f) => f.id !== fileToDeleteId));
            setUploadMessage({ text: "File deleted successfully!🗑️", type: "success" });
        } catch (err) {
            console.error("Delete failed:", err);
            setUploadMessage({ text: err.response?.data?.message || "Failed to delete file. ❌", type: "error" });
        } finally {
            setShowConfirmModal(false);
            setFileToDeleteId(null);
        }
    };

    // Close confirmation modal
    const cancelDelete = () => {
        setShowConfirmModal(false);
        setFileToDeleteId(null);
    };

    // Fetch files on component mount
    useEffect(() => {
        fetchFiles();
    }, []);

    // Helper to render message
    const renderMessage = () => {
        if (!uploadMessage.text) return null;
        return (
            <p className={`status-message ${uploadMessage.type}`}>
                {uploadMessage.text}
            </p>
        );
    };

    return (
        <div className="admin-training-page-container">
            <div className="admin-training-card">
                <h2 className="admin-card-title">📤 Upload Training Material</h2>
                {renderMessage()}
                <form onSubmit={handleUpload} className="admin-upload-form">
                    <input
                        type="file"
                        accept=".pdf,.mp4,.doc,.docx,.jpg,.jpeg,.png,.avif"
                        onChange={(e) => setFile(e.target.files[0])}
                        ref={fileInputRef} // Attach ref here
                        required
                        className="file-input"
                    />
                    <button type="submit" className="admin-upload-button">
                        Upload
                    </button>
                </form>

                <h3 className="admin-card-subtitle">📄 Uploaded Files</h3>
                <div className="admin-file-list">
                    {files.length === 0 && <p className="admin-no-files-message">No training materials uploaded yet.</p>}
                    {files.map((file) => {
                        const fileUrl = `https://api.webartifacts.in/${file.path.replace(/\\/g, "/")}`;
                        const ext = file.filename.split(".").pop().toLowerCase();

                        return (
                            <div key={file.id} className="admin-file-card"> {/* Changed class to admin-file-card */}
                                <div className="admin-file-info">
                                    <p className="admin-file-name">{file.filename}</p>
                                    {['jpg', 'jpeg', 'png', 'avif'].includes(ext) && (
                                        <img src={fileUrl} alt="Preview" className="admin-file-preview" />
                                    )}
                                    {['mp4', 'webm'].includes(ext) && (
                                        <video controls src={fileUrl} className="admin-file-preview" />
                                    )}
                                    {['pdf'].includes(ext) && (
                                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="admin-file-link">
                                            <span role="img" aria-label="PDF icon">📄</span> View PDF
                                        </a>
                                    )}
                                    {['doc', 'docx'].includes(ext) && (
                                        <a href={fileUrl} download className="admin-file-link">
                                            <span role="img" aria-label="Document icon"> документов</span> Download Document
                                        </a>
                                    )}
                                    {/* Add more file type previews/links as needed */}
                                </div>
                                <div className="admin-file-actions">
                                    <a href={fileUrl} download className="admin-download-button">
                                        <span role="img" aria-label="Download icon">⬇️</span> Download
                                    </a>
                                    <button onClick={() => openDeleteConfirmModal(file.id)} className="admin-delete-button">
                                        <span role="img" aria-label="Delete icon">🗑️</span> Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Custom Confirmation Modal */}
            {showConfirmModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this file?</p>
                        <div className="modal-actions">
                            <button onClick={cancelDelete} className="modal-cancel-btn">Cancel</button>
                            <button onClick={confirmDelete} className="modal-confirm-btn">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTrainingMaterialPage;



















// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import "./AdminDashboard.css";

// const AdminTrainingMaterialPage = () => {
//     const token = localStorage.getItem("token");
//     const [file, setFile] = useState(null);
//     const [uploadMessage, setUploadMessage] = useState("");
//     const [files, setFiles] = useState([]);

//     const fetchFiles = async () => {
//         try {
//             const res = await axios.get("http://localhost:5001/api/training/all", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setFiles(res.data);
//         } catch (err) {
//             console.error("Fetch error", err);
//         }
//     };

//     const handleUpload = async (e) => {
//         e.preventDefault();
//         if (!file) return;
//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             await axios.post("http://localhost:5001/api/training/upload", formData, {
//                 headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
//             });
//             setUploadMessage("✅ File uploaded successfully");
//             setFile(null);
//             fetchFiles();
//         } catch (err) {
//             console.error(err);
//             setUploadMessage("❌ Upload failed");
//         }
//     };

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this file?");
//         if (!confirmDelete) return;

//         try {
//             await axios.delete(`http://localhost:5001/api/training/delete/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setFiles((prev) => prev.filter((f) => f.id !== id));
//         } catch (err) {
//             console.error("Delete failed", err);
//             alert("Failed to delete file.");
//         }
//     };

//     useEffect(() => {
//         fetchFiles();
//     }, []);

//     return (
        
//             <div className="admin-dashboard-container">
//                 <div className="admin-view-card">
//                     <h2 className="admin-card-title">📤 Upload Training Material</h2>
//                     {uploadMessage && <p className="status-message">{uploadMessage}</p>}
//                     <form onSubmit={handleUpload} className="admin-upload-form">
//                         <input
//                             type="file"
//                             accept=".pdf,.mp4,.doc,.docx,.jpg,.jpeg,.png,.avif"
//                             onChange={(e) => setFile(e.target.files[0])}
//                             required
//                         />
//                         <button type="submit" className="admin-upload-button">
//                             Upload
//                         </button>
//                     </form>

//                     <h3 className="admin-card-subtitle">📄 Uploaded Files</h3>
//                     <div className="admin-file-list">
//                         {files.length === 0 && <p className="admin-no-files-message">No training materials uploaded.</p>}
//                         {files.map((file) => {
//                             const fileUrl = `http://localhost:5001/${file.path.replace(/\\/g, "/")}`;
//                             const ext = file.filename.split(".").pop().toLowerCase();

//                             return (
//                                 <div key={file.id} className="admin-file-item">
//                                     <div className="admin-file-info">
//                                         <p className="admin-file-name">{file.filename}</p>
//                                         {['jpg', 'jpeg', 'png', 'avif'].includes(ext) && (
//                                             <img src={fileUrl} alt="Preview" className="admin-file-preview" />
//                                         )}
//                                         {['mp4', 'webm'].includes(ext) && (
//                                             <video controls src={fileUrl} className="admin-file-preview" />
//                                         )}
//                                         {['pdf'].includes(ext) && (
//                                             <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="admin-file-link">
//                                                 📄 View PDF
//                                             </a>
//                                         )}
//                                     </div>
//                                     <div className="admin-file-actions">
//                                         <a href={fileUrl} download className="admin-download-button">
//                                             ⬇ Download
//                                         </a>
//                                         <button onClick={() => handleDelete(file.id)} className="admin-delete-button">
//                                             🗑 Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
        
//     );
// };

// export default AdminTrainingMaterialPage;