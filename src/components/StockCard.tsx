import { Link } from "react-router-dom";

type Stock = {
  name: string;
  price: string;
  symbol: string;
};

type StockProps = {
  data: Stock | null;
};

function StockCard({ data }: StockProps) {
  if (!data) return null;

  const { name, price, symbol } = data;

  return (
    <div className="bg-white w-64 mx-auto h-36 px-4 py-6 rounded-xl  gap-4 drop-shadow ">
      <Link to={`/${symbol}`}>
        <div>
          <p className="font-bold text-lg text-center">{symbol}</p>
          <p className="text-gray-600 text-sm font-semibold">{name}</p>
          <p className="font-semibold text-gray-600 ">R$ {price}</p>
        </div>
      </Link>
    </div>
  );
}

export default StockCard;
