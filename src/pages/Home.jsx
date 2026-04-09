import Modal from "../components/Modal";
export default function Home() {
  return (
    <div className="home-container"> 
        <div className="home-content">
            <h1 className="home-title">Welcome to Kozmo</h1>
            <p className="home-description">Your AI-powered study assistant</p>
            <Modal />
        </div>
    </div>
  );
}