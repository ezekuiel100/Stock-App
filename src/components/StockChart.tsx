import { Line } from "react-chartjs-2";
import { StockData } from "../pages/StockPage";

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
  Legend,
  elements
);

type Props = {
  stockData: StockData | null;
};

function StockChart({ stockData }: Props) {
  let labels: string[] = [];
  let values: string[] = [];
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

  return <Line data={data} options={options} />;
}

export default StockChart;
