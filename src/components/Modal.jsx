import { useState } from "react";
import "../styles/modal.css";
import ReadingEyes from "./eyes";
const RemoveIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const UploadIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);
const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const FileIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="12" y1="18" x2="12" y2="12"></line>
    <line x1="9" y1="15" x2="15" y2="15"></line>
  </svg>
);
export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <>
      <button className="trigger-btn" onClick={() => setIsOpen(true)}>
        <UploadIcon />
        <span>Upload your files</span>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* close button */}
            {!isAnalyzing && (
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            )}

            <div className="modal-header">
              <div className="icon-wrapper"><UploadIcon /></div>
              <h2>{isAnalyzing ? "Kozmo is Analyzing" : "Upload your files"}</h2>
              <p>
                {isAnalyzing 
                  ? "Please wait while we process your study materials..." 
                  : "Select the study materials you want to upload."}
              </p>
            </div>

            <div className="modal-body py-6">
              {/*  file analyzing */}
              {isAnalyzing ? (
                <ReadingEyes />
              ) : (
                //  file not selected
                !selectedFile ? (
                  <div className="upload-area">
                    <input
                      type="file"
                      id="file-upload"
                      className="file-input"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,image/*"
                    />
                    <label htmlFor="file-upload" className="upload-label">
                      <FileIcon />
                      <span className="upload-title">Click to browse or drag and drop</span>
                      <span className="upload-subtitle">Max file size: 50MB</span>
                    </label>
                  </div>
                ) : (
                  // file selected
                  <div className="selected-file-display flex flex-col items-center p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <div className="text-purple-400 mb-3"><FileIcon /></div>
                    <p className="text-white font-medium">{selectedFile.name}</p>
                    <button onClick={() => setSelectedFile(null)} className="remove-btn">
                      <RemoveIcon />
                    </button>
                  </div>
                )
              )}
            </div>

            {!isAnalyzing && (
              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setIsOpen(false)}>Cancel</button>
                <button
                  className={`submit-btn ${!selectedFile ? "opacity-50" : ""}`}
                  disabled={!selectedFile}
                  onClick={() => setIsAnalyzing(true)}
                >
                  Analyze Files
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}