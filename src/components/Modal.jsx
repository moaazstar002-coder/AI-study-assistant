import { useState } from "react";
import { X, Upload, FileText, Trash2 } from "lucide-react";
import "../styles/modal.css";
import { useNavigate } from "react-router-dom";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFile(null);
  };

  const handleAnalyze = () => {
    navigate("/analysis", { state: { file: selectedFile } });
    setIsOpen(false);
  };

  return (
    <>
      <button className="trigger-btn" onClick={() => setIsOpen(true)}>
        <Upload size={18} />
        <span>Upload your files</span>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <button className="close-btn" onClick={handleClose}>
              <X size={18} />
            </button>

            <div className="modal-header">
              <div className="icon-wrapper">
                <Upload size={28} />
              </div>
              <h2>Upload your files</h2>
              <p>Select the study materials you want to upload.</p>
            </div>

            <div className="modal-body">
              {!selectedFile ? (
                <div className="upload-area">
                  <input
                    type="file"
                    id="file-upload"
                    className="file-input"
                    onChange={handleFileChange}
                    accept=".pdf,.docx,image/*"
                  />
                  <label htmlFor="file-upload" className="upload-label">
                    <FileText size={32} strokeWidth={1.5} />
                    <span className="upload-title">
                      Click to browse or drag and drop
                    </span>
                    <span className="upload-subtitle">Max file size: 50MB</span>
                  </label>
                </div>
              ) : (
                <div className="selected-file-display">
                  <FileText size={32} strokeWidth={1.5} className="file-icon-purple" />
                  <p className="file-name">{selectedFile.name}</p>
                  <button onClick={() => setSelectedFile(null)} className="remove-btn">
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleClose}>
                Cancel
              </button>
              <button
                className={`submit-btn ${!selectedFile ? "disabled" : ""}`}
                disabled={!selectedFile}
                onClick={handleAnalyze}
              >
                Analyze Files
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}