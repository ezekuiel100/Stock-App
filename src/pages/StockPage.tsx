import { useEffect } from "react";
import { useParams } from "react-router-dom";

function StockPage() {
  const { stockName } = useParams();

  useEffect(() => {
    async function fetchStock() {
      const res = await fetch(
        `https://brapi.dev/api/quote/${stockName}?range=5y&interval=1d&token=${
          import.meta.env.VITE_TOKEN
        }`
      );
      const data = await res.json();
      console.log(data);
    }

    fetchStock();
  }, []);

  return (
    <div>
      <h1 className="text-xl">{stockName}</h1>
    </div>
  );
}

export default StockPage;
