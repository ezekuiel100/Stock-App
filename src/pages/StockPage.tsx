import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockName}.sa&outputsize=compact&apikey=import.meta.env.VITE_KEY`;

function StockPage() {
  const { stockName } = useParams();
  const [stockData, setStockData] = useState(null);

  let labels;
  let values;
  let filteredDates = [];

  if (stockData) {
    labels = Object.keys(stockData);
    values = Object.values(stockData).map((value) => value["4. close"]);

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
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    elements: {
      point: { radius: 0 },
    },
  };

  const data = {
    labels: filteredDates.reverse(),
    datasets: [
      {
        label: "Dataset 1",
        data: values?.reverse(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    async function fetchStock() {
      const res = await fetch("src/data.json");
      const data = await res.json();
      setStockData(data["Time Series (Daily)"]);
    }

    fetchStock();
  }, []);

  return <div>{<Line data={data} options={options} />}</div>;
}

export default StockPage;
