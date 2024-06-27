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
  scales,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements,
  scales
);

type Props = {
  stockData: StockData | null;
};

function StockChart({ stockData }: Props) {
  let labels: string[] = [];
  let values: string[] = [];

  if (stockData) {
    labels = Object.keys(stockData).reverse();
    values = Object.values(stockData)
      .map((value: any) => value["4. close"])
      .reverse();
  }

  const options = {
    responsive: true,
    elements: {
      point: { radius: 2 },
    },
    scales: {
      x: {
        ticks: {
          callback: function (val: number, index: number) {
            // Mostra a cada 5 rótulos
            return index % 5 === 0 ? this.getLabelForValue(val) : "";
          },
        },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cotação",
        data: values,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 90, 130, 0.5)",
      },
    ],
  };

  return <Line data={data} options={options} className="bg-white" />;
}

export default StockChart;
