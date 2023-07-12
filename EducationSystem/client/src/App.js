import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div>
      {typeof data.users === "undefined" ? (
        <p>Loading ... </p>
      ) : (
        data.users.map((user, i) => <p>{user}</p>)
      )}
    </div>
  );
}

export default App;
