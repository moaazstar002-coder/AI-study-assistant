import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate } from "react-router-dom";
import { extractTextFromPDF } from "../services/pdfReader";
import { analyzeStudyMaterial } from "../services/gemini";
import ReadingEyes from "../components/eyes";
import { Sparkles } from "lucide-react";
import useKozmoStore from "../store/store";

export default function AnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { 
    analysisFile: file, 
    analysisResult: result, 
    analysisStatus: status, 
    analysisError: errorMsg,
    setAnalysisStatus,
    setAnalysisResult,
    setAnalysisError,
    addXp,
    clearChat 
  } = useKozmoStore();
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      
      if (text.length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setPopupPos({
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY - 45 
        });
        setSelectedText(text);
        setShowPopup(true);
      } else {
         // small delay to allow click on popup before disappearing
         setTimeout(() => {
           const newSelection = window.getSelection().toString().trim();
           if (!newSelection) setShowPopup(false);
         }, 100);
      }
    };
    
    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("touchend", handleSelection);
    
    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("touchend", handleSelection);
    };
  }, []);

  const handleAskExplain = () => {
    clearChat();
    navigate("/Chat", { state: { explainText: selectedText } });
  };
  
  useEffect(() => {
    if (!file) {
      if (location.pathname === '/analysis') navigate("/");
      return;
    }
  
    if (status !== "reading") return;

    const runAnalysis = async () => {
      try {
        setAnalysisError("");
        const text = await extractTextFromPDF(file);
        
        setAnalysisStatus("analyzing");
        const analysis = await analyzeStudyMaterial(text);
        
        setAnalysisResult(analysis);
        setAnalysisStatus("done");
        
        // Reward user
        addXp(50);
      } catch (err) {
        console.error(err);
        setAnalysisError(err.message || "حدث خطأ أثناء التحليل");
        setAnalysisStatus("error");
      }
    };
    
    runAnalysis();
  }, [file, navigate, status, setAnalysisError, setAnalysisResult, setAnalysisStatus, addXp, location.pathname]);

  if (status === "reading" || status === "analyzing") {
    return (
      <div className="analysis-loading">
        <ReadingEyes />
        <p>
          {status === "reading"
            ? "Reading your file..."
            : "Kozmo is thinking..."}
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="analysis-error">
        <p>❌ حدث خطأ أثناء التحليل</p>
        <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>{errorMsg}</p>
        <button onClick={() => navigate("/")}>العودة للرئيسية</button>
      </div>
    );
  }

  return (
    <div className="analysis-result" dir="rtl">
      <h2>
        <span style={{ fontSize: '2.5rem' }}>📚</span>
        <span>تحليل: {file.name}</span>
      </h2>
      <div className="result-content" dir="auto">
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>
      <div className="action-buttons">
        <button onClick={() => navigate("/")}>
          تحليل ملف آخر <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>↺</span>
        </button>
      </div>

      {showPopup && (
        <button 
          onClick={handleAskExplain}
          onMouseDown={(e) => e.preventDefault()} // prevent selection loss on click
          style={{
            position: "absolute",
            left: `${popupPos.x}px`,
            top: `${popupPos.y}px`,
            transform: "translateX(-50%)",
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontSize: "0.9rem",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            zIndex: 1000,
            transition: "opacity 0.2s ease, transform 0.2s ease",
            animation: "popupFadeIn 0.2s ease-out forwards",
          }}
        >
          <Sparkles size={16} color="#60a5fa" />
          <span>اشرحلي ده</span>
        </button>
      )}
    </div>
  );
}
