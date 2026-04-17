import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate } from "react-router-dom";
import { extractTextFromPDF } from "../services/pdfReader";
import { analyzeStudyMaterial } from "../services/gemini";
import ReadingEyes from "../components/eyes";

export default function AnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file } = location.state || {};

  const [status, setStatus] = useState("reading");
  const [result, setResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  useEffect(() => {
    if (!file) {
      navigate("/");
      return;
    }
  
    const runAnalysis = async () => {
      try {
        setStatus("reading");
        setErrorMsg("");
        const text = await extractTextFromPDF(file);
        
        setStatus("analyzing");
        const analysis = await analyzeStudyMaterial(text);
        
        setResult(analysis);
        setStatus("done");
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message || "حدث خطأ أثناء التحليل");
        setStatus("error");
      }
    };
    
    runAnalysis();
  }, [file, navigate]);

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
    </div>
  );
}
