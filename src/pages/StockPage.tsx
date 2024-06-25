import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import BalanceTable from "../components/BalanceTable";
import StockChart from "../components/StockChart";

type StockItem = {
  "4. close": string;
};

export type StockData = {
  [date: string]: StockItem;
};

// const KEY = "import.meta.env.VITE_KEY";

function StockPage() {
  // const { stockName } = useParams();
  const [stockData, setStockData] = useState<StockData | null>(null);

  // useEffect(() => {
  //   async function fetchStockData() {
  //     const res = await fetch(`src/stockInfo.json`);
  //     const data = await res.json();
  //     console.log(data);
  //   }
  //   fetchStockData();
  // }, []);

  useEffect(() => {
    async function fetchStock() {
      const res = await fetch(`src/data/data.json`);
      const data = await res.json();
      console.log(data["Time Series (Daily)"]);
      setStockData(data["Time Series (Daily)"]);
    }

    fetchStock();
  }, []);

  return (
    <div className=" w-[40rem] space-y-14 mx-auto">
      {stockData && <StockChart stockData={stockData} />}
      <BalanceTable />
    </div>
  );
}

export default StockPage;
