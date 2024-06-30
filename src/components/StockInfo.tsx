import { useQuery } from "@tanstack/react-query";
import { clearCanvas } from "chart.js/helpers";

type StockInfo = {
  name: string;
  finnhubIndustry: string;
  country: string;
  marketCapitalization: string;
  ticker: string;
};

// `https://financialmodelingprep.com/api/v3/profile/${stockName}?apikey=${ import.meta.env.VITE_KEY}`;

async function fetchStockInfo(stockName) {
  const res = await fetch(`src/data/stockInfo.json`);
  const data = await res.json();

  return data;
}

function StockInfo({ stockName }) {
  const { data, isPending } = useQuery({
    queryKey: ["stockInfo"],
    queryFn: () => fetchStockInfo(stockName),
  });

  if (isPending) return;

  if (!data) return;

  const {
    companyName,
    mktCap,
    symbol,
    price,
    exchangeShortName,
    industry,
    sector,
    country,
    ceo,
    image,
    fullTimeEmployees,
  } = data;

  return (
    <div className="p-4 bg-white flex justify-between">
      <div className="space-y-3">
        <p className="text-2xl">{companyName}</p>
        <p className="font-bold text-xl">{symbol}</p>
        <p>
          <span className="font-bold text-gray-600">País:</span> {country}
        </p>

        <p>
          <span className="text-gray-600 font-bold">INDUSTRIA: </span>
          {industry}
        </p>
        <p>
          <span className="text-gray-600 font-bold">VALOR DE MERCADO:</span>{" "}
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
            compactDisplay: "short",
          }).format(+mktCap)}
        </p>
      </div>

      <img src={image} alt="" className="h-32 bg-black" />
    </div>
  );
}

export default StockInfo;
