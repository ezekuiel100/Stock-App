import { Link } from "react-router-dom";
import { Stock } from "../App";

type StockProps = {
  data: Stock[] | null;
};

function StockCard({ data }: StockProps) {
  if (!data) return null;

  const { name, price, symbol } = data;

  return (
    <div className="drop-shadow">
      <Link to={`/${symbol}`}>
        <div className="bg-white w-64 px-4 py-6 rounded-xl flex items-center mx-auto gap-4 ">
          {/* <img src={logo} className="mt-2 text-center h-16 "></img> */}
          <div>
            <p className="font-bold text-lg text-center">{symbol}</p>
            <p className="text-gray-600 text-sm font-semibold">{name}</p>
            <p className="font-semibold text-gray-600 ">R$ {price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default StockCard;
