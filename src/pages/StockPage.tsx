import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BalanceTable from "../components/BalanceTable";
import StockChart from "../components/StockChart";
import StockInfo from "../components/StockInfo";
import { CircularProgress } from "@mui/material";

type StockItem = {
  "4. close": string;
};

export type StockData = {
  [date: string]: StockItem;
};

const KEY = "import.meta.env.VITE_KEY";
const key = "cpu1tdhr01qj8qq0vj80cpu1tdhr01qj8qq0vj8g"; //finnhub

function StockPage() {
  const { stockName } = useParams();
  const [stockData, setStockData] = useState<StockData | null>(null);

  useEffect(() => {
    async function fetchStock() {
      try {
        const res = await fetch(`src/data/data.json`);
        const data = await res.json();
        setStockData(data["Time Series (Daily)"]);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchStock();
  }, []);

  if (!stockData) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5rem)] ">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-[40rem] space-y-14 mx-auto ">
      {stockData && <StockInfo stockName={stockName} />}
      {/* {stockData && <StockChart stockData={stockData} />}
      {stockData && <BalanceTable />} */}
    </div>
  );
}

export default StockPage;
