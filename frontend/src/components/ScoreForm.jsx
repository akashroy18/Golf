import { useState } from "react";
import { addScore } from "../api/score.api";

const ScoreForm = ({ refresh }) => {
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;

    await addScore({ value: Number(value) });
    setValue("");
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Enter score (1-45)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add Score</button>
    </form>
  );
};

export default ScoreForm;