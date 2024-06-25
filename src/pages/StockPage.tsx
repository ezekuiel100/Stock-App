import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from "chart.js";
import BalanceTable from "../components/BalanceTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements
);

// const KEY = "import.meta.env.VITE_KEY";

function StockPage() {
  // const { stockName } = useParams();
  const [stockData, setStockData] = useState<string | null>(null);

  let labels: string[];
  let values: string[];
  let filteredDates: string[] = [];

  if (stockData) {
    labels = Object.keys(stockData);
    values = Object.values(stockData).map((value: any) => value["4. close"]);

    const interval = 5;

    labels.forEach((label, index) => {
      if (index % interval == 0) {
        filteredDates.push(label);
      } else {
        filteredDates.push("");
      }
    });
  }

  const options = {
    responsive: true,
    elements: {
      point: { radius: 2 },
    },
  };

  const data = {
    labels: filteredDates.reverse(),
    datasets: [
      {
        label: "Price",
        data: values?.reverse(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 90, 130, 0.5)",
      },
    ],
  };

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
      setStockData(data["Time Series (Daily)"]);
    }

    fetchStock();
  }, []);

  return (
    <div className=" w-[40rem] space-y-14 mx-auto">
      <Line data={data} options={options} />
      <BalanceTable />
    </div>
  );
}

export default StockPage;
