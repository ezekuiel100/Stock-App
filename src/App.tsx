import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import StockCard from "./components/StockCard";

function App() {
  const [stock, setStock] = useState(null);
  const [limit, setLimit] = useState(24);

  useEffect(() => {
    const url = `https://brapi.dev/api/quote/list?&sortBy=volume&sortOrder=desc&limit=${limit}&token=${
      import.meta.env.VITE_TOKEN
    }`;

    async function fetchData() {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setStock(data.stocks);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [limit]);

  return (
    <div className="bg-gray-100 min-h-screen   ">
      <Nav />
      <div className="flex justify-center">
        <StockCard stock={stock} setLimit={setLimit} />
      </div>
    </div>
  );
}

export default App;
