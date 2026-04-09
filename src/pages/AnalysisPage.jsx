import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!file) {
      navigate("/");
      return;
    }
    runAnalysis();
  }, []);

  const runAnalysis = async () => {
    try {
      setStatus("reading");
      const text = await extractTextFromPDF(file);

      setStatus("analyzing");
      const analysis = await analyzeStudyMaterial(text);

      setResult(analysis);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "reading" || status === "analyzing") {
    return (
      <div className="analysis-loading">
        <ReadingEyes />
        <p>{status === "reading" ? "Reading your file..." : "Kozmo is thinking..."}</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="analysis-error">
        <p>Something went wrong. Please try again.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="analysis-result">
      <h2>Analysis for: {file.name}</h2>
      <div className="result-content">
        <pre>{result}</pre>
      </div>
      <button onClick={() => navigate("/")}>Analyze Another File</button>
    </div>
  );
}