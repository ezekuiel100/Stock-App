import StockCard from "./components/StockCard";
import CircularProgress from "@mui/material/CircularProgress";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchData } from "./api/fetchData";

function App() {
  const { data, status, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["stocks"],
      queryFn: fetchData,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    });

  return (
    <div className="max-w-[65rem] pb-10  mx-auto">
      {status === "pending" && (
        <div className="flex items-center h-screen">
          <CircularProgress />
        </div>
      )}

      <div className="bg-gray-100 min-h-screen grid md:grid-cols-2 gap-4 lg:grid-cols-3 mb-6">
        {data?.pages[data.pages.length - 1].data.map((data, i) => {
          return <StockCard data={data} key={i} />;
        })}
      </div>

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
        className={` p-2 text-lg text-blue-400 inline-block w-[100%] bg-gray-100 hover:bg-gray-200`}
      >
        {isFetching ? "Carregando..." : "Ver mais ativos"}
      </button>
    </div>
  );
}

export default App;
