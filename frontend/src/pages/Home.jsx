import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Golf Charity Platform
      </motion.h1>

      <p className="tagline">
        Play • Win • Donate • Impact Lives
      </p>

      <div className="cards">
        <motion.div whileHover={{ scale: 1.05 }} className="card"
          onClick={() => navigate("/dashboard")}>
          <h3>🎯 Play</h3>
          <p>Submit scores & compete</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="card"
          onClick={() => navigate("/dashboard")}>
          <h3>🏆 Win</h3>
          <p>Win exciting prizes</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="card"
          onClick={() => navigate("/charity")}>
          <h3>❤️ Donate</h3>
          <p>Support charities</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;