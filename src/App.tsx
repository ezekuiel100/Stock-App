import StockCard from "./components/StockCard";
import CircularProgress from "@mui/material/CircularProgress";
import { useInfiniteQuery } from "@tanstack/react-query";

export type Stock = {
  name: string;
  price: string;
  symbol: string;
};

async function fetchData({ pageParam = 0 }) {
  const res = await fetch(
    `https://financialmodelingprep.com/api/v3/stock/list?apikey=${
      import.meta.env.VITE_KEY
    }`
  );
  const data = await res.json();
  const nextCursor = pageParam + 20;
  return { data: data.slice(0, nextCursor), nextCursor };
}

function App() {
  const { data, status, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["stocks"],
      queryFn: fetchData,
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    });

  if (status === "pending") {
    return (
      <div className="flex items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="max-w-[65rem] pb-10  mx-auto">
      <div className="bg-gray-100 min-h-screen grid md:grid-cols-2 gap-10 lg:grid-cols-3 mb-6">
        {data?.pages[data.pages.length - 1].data.map((db, i) => {
          return (
            <div className="flex justify-center" key={i}>
              <StockCard data={db} />
            </div>
          );
        })}
      </div>

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
        className={` p-2 text-lg text-blue-400 inline-block w-[100%] bg-gray-100 hover:bg-gray-200`}
      >
        {isFetching ? "Carregando...-" : "Ver mais ativos"}
      </button>
    </div>
  );
}

export default App;
