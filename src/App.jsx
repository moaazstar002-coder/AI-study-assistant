import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import AnalysisPage from "./pages/AnalysisPage";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <div className="main-header">
              <h1>Welcome back, Moaaz 👋</h1>
              <p>Here you can access all your study materials.</p>
              <Modal />
            </div>
          } />
          <Route path="/analysis" element={<AnalysisPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;