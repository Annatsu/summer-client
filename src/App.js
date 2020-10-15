import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function App() {
  const [numA, setNumA] = useState("");
  const [numB, setNumB] = useState("");
  const [previousAdditions, setPreviousAdditions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/sums")
      .then(({ data }) => setPreviousAdditions(data.payload));
  }, []);

  const sendSum = async () => {
    const num_a = numA.toString().split("").map(Number);
    const num_b = numB.toString().split("").map(Number);

    const response = await axios.post("/api/sums", { num_a, num_b });

    if (response.data.error) {
      return window.alert(response.data.error);
    } else {
      const { data } = await axios.get("/api/sums");
      setPreviousAdditions(data.payload);
      setNumA("");
      setNumB("");
    }
  };

  console.log({ numA, numB, previousAdditions });

  return (
    <div className="App">
      <h1>Calculate</h1>
      <input
        type="number"
        value={numA}
        onChange={(e) => setNumA(e.target.value)}
      />
      <input
        type="number"
        value={numB}
        onChange={(e) => setNumB(e.target.value)}
      />
      <button onClick={sendSum}>Add</button>
      <hr />
      <table style={{ minWidth: 640 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>A</th>
            <th style={{ textAlign: "left" }}>B</th>
            <th style={{ textAlign: "left" }}>Result</th>
            <th style={{ textAlign: "left" }}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {previousAdditions.map(({ id, num_a, num_b, result, created_at }) => (
            <tr key={id}>
              <td>{num_a}</td>
              <td>{num_b}</td>
              <td>{result}</td>
              <td>{moment(created_at).format("MM/DD/YYYY - HH:mm:ss")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
