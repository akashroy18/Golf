import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getScores } from "../api/score.api";
import { getMyWinnings } from "../api/winner.api";
import ScoreForm from "../components/ScoreForm";
import ScoreList from "../components/ScoreList";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [scores, setScores] = useState([]);
  const [winnings, setWinnings] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchScores = async () => {
    try {
      const res = await getScores();
      setScores(res.data.scores || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWinnings = async () => {
    try {
      const res = await getMyWinnings();

      setWinnings(
        res.data || { totalWins: 0, totalAmount: 0 }
      );
    } catch (err) {
      setWinnings({ totalWins: 0, totalAmount: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    fetchWinnings();
  }, []);

  const isActive =
    user?.isSubscribed &&
    new Date(user.subscriptionEndDate) > new Date();

  const handleSubscription = () => {
    if (isActive) {
      toast.warning("Already subscribed");
      return;
    }
    navigate("/payment");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleSubscription}>
          Activate Subscription
        </button>

        <button
          onClick={() => navigate("/charity")}
          style={{ marginLeft: "10px" }}
        >
          Select Charity
        </button>
      </div>

      <ScoreForm refresh={fetchScores} />
      <ScoreList scores={scores} />

      <h3 style={{ marginTop: "20px" }}>Your Winnings</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="winnings-card">
          <p>
            <strong>Total Wins:</strong>{" "}
            {winnings?.totalWins ?? 0}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹
            {winnings?.totalAmount ?? 0}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;