import { useEffect, useState } from "react";
import { getCharities, selectCharity } from "../api/charity.api";
import { toast } from "react-toastify";

const Charity = () => {
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    getCharities().then(res => setCharities(res.data));
  }, []);

  const handleSelect = async () => {
    if (!selected) return toast.error("Select a charity");

    await selectCharity({ charityId: selected });
    toast.success("Charity selected");
  };

  return (
    <div className="container">
      <h2>Select Charity</h2>

      {charities.map(c => (
        <div key={c._id}>
          <input type="radio" onChange={() => setSelected(c._id)} />
          {c.name}
        </div>
      ))}

      <button onClick={handleSelect}>Confirm</button>
    </div>
  );
};

export default Charity;