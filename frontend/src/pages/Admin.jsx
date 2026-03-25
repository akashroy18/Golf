import { useEffect, useState } from "react";
import { runDraw } from "../api/draw.api";
import { getStats } from "../api/admin.api";
import { updateWinnerStatus } from "../api/winner.api";
import { toast } from "react-toastify";
import "../styles/admin.css";

const Admin = () => {
  const [stats, setStats] = useState({});
  const [draw, setDraw] = useState(null);
  const [winners, setWinners] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRunDraw = async () => {
    try {
      const res = await runDraw();

      setDraw(res.data.draw);
      setWinners(res.data.winners);

      fetchStats();
      toast.success("Draw completed");
    } catch (err) {
      toast.error("Error running draw");
    }
  };

  const handleMarkPaid = async (id) => {
    try {
      await updateWinnerStatus({
        winnerId: id,
        status: "paid"
      });

      setWinners((prev) =>
        prev.map((w) =>
          w._id === id ? { ...w, status: "paid" } : w
        )
      );

      toast.success("Marked as paid");
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="admin-bg">
      <div className="admin-container">
        <h2>Admin Panel</h2>

        <button className="primary-btn" onClick={handleRunDraw}>
          Run Draw
        </button>

        <div className="stats">
          <p>Total Users: {stats.totalUsers || 0}</p>
          <p>Total Prize: {stats.totalPrize || 0}</p>
          <p>Charity Total: {stats.charityTotal || 0}</p>
        </div>

        {draw && (
          <div className="draw-box">
            <h3>Draw Numbers</h3>
            <p>{draw.numbers.join(" | ")}</p>
          </div>
        )}

        {winners.length > 0 && (
          <div className="table-box">
            <h3>Winners</h3>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Match</th>
                  <th>Prize</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {winners.map((w) => (
                  <tr key={w._id}>
                    <td>{w.userId?.name || "N/A"}</td>
                    <td>{w.userId?.email || "N/A"}</td>
                    <td>{w.matchCount}</td>
                    <td>₹{w.prizeAmount}</td>
                    <td>{w.status}</td>

                    <td>
                      {w.status !== "paid" ? (
                        <button
                          className="paid-btn"
                          onClick={() => handleMarkPaid(w._id)}
                        >
                          Mark Paid
                        </button>
                      ) : (
                        "Paid"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;