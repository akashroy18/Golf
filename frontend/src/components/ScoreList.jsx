const ScoreList = ({ scores }) => {
  return (
    <div>
      <h3>Your Scores</h3>
      {scores.length === 0 && <p>No scores yet</p>}

      {scores.map((s, i) => (
        <p key={i}>
          {s.value} - {new Date(s.date).toLocaleDateString()}
        </p>
      ))}
    </div>
  );
};

export default ScoreList;