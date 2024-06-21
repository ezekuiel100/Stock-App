import { Link } from "react-router-dom";

type Stock = {
  stock: string;
  logo: string;
  symbol: string;
  name: string;
  close: string;
};

type StockProps = {
  stock: Stock[] | null;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

function StockCard({ stock, setLimit }: StockProps) {
  if (!stock) return null;

  return (
    <div className="pb-10">
      <div className=" grid md:grid-cols-2 gap-10 lg:grid-cols-3 max-w-[65rem] drop-shadow p-10">
        {stock.map(({ stock, logo, name, close }, i) => (
          <Link to={`/${stock}`} key={i}>
            <div className="bg-white w-64 px-4 py-6 rounded-xl flex items-center mx-auto gap-4 ">
              <img src={logo} className="mt-2 text-center h-16 "></img>
              <div>
                <p className="font-bold text-lg text-center">{stock}</p>
                <p className="text-gray-600 text-sm font-semibold">{name}</p>
                <p className="font-semibold text-gray-600 ">R$ {close}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <button
          onClick={() => setLimit((limit) => limit + 10)}
          className="p-2 text-lg text-blue-400 inline-block w-[100%] bg-gray-100 hover:bg-gray-200"
        >
          Ver mais ativos
        </button>
      </div>
    </div>
  );
}

export default StockCard;
