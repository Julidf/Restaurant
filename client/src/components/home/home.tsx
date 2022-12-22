import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [state, setState] = useState<any[]>([]);

  const fetchApi = async () => {
    const response = await axios.get("http://localhost:8080/api/products");
    setState(response.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      <ul>
        {!state ? "loading..." : state.map((e) => <li key={e.id}>{e.name}</li>)}
      </ul>
    </div>
  );
}
