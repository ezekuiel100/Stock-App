import { useQuery } from "@tanstack/react-query";

type StockInfo = {
  name: string;
  finnhubIndustry: string;
  country: string;
  marketCapitalization: string;
  ticker: string;
};

async function fetchStockInfo(stockName) {
  const res = await fetch(`${import.meta.env.VITE_KEY}`);
  const data = await res.json();

  return data;
}

function StockInfo({ stockName }) {
  const { data, isPending } = useQuery({
    queryKey: ["stockInfo"],
    queryFn: () => fetchStockInfo(stockName),
  });

  if (isPending) return;

  const { name, finnhubIndustry, marketCapitalization, ticker, country, logo } =
    data;

  console.log(data);

  return (
    <div className="p-4 bg-white flex justify-between">
      <div className="space-y-3">
        <p className="text-2xl">{name}</p>
        <p className="font-bold text-xl">{ticker}</p>
        <p>
          <span className="font-bold text-gray-600">País:</span> {country}
        </p>

        <p>
          <span className="text-gray-600 font-bold">INDUSTRIA:</span>{" "}
          {finnhubIndustry}
        </p>
        <p>
          <span className="text-gray-600 font-bold">VALOR DE MERCADO:</span>{" "}
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
            compactDisplay: "short",
          }).format(+marketCapitalization)}
        </p>
      </div>

      <img src={logo} alt="" className="h-32" />
    </div>
  );
}

export default StockInfo;
