import StockCard from "./components/StockCard";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchData } from "./api/fetchData";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [number, setNumber] = useState(1);

  const { data, status, isFetching } = useQuery({
    queryKey: ["stocks"],
    queryFn: fetchData,
  });

  console.log(data);
  const newData = data && data.slice(0, 20 * number);

  return (
    <div className="max-w-[65rem] pb-10 mx-auto ">
      {status === "pending" && (
        <div className="flex justify-center items-center h-[calc(100vh-12rem)]  ">
          <CircularProgress />
        </div>
      )}

      <div className="bg-gray-100 min-h-screen grid  md:grid-cols-2 gap-4 lg:grid-cols-3 mb-6 ">
        {data &&
          newData.map((data, i) => {
            return <StockCard data={data} key={i} />;
          })}
      </div>

      <button
        onClick={() => setNumber((number) => number + 1)}
        className={` p-2 text-lg text-blue-400 inline-block w-[100%] bg-gray-100 hover:bg-gray-200`}
      >
        {isFetching ? "Carregando..." : "Ver mais ativos"}
      </button>
    </div>
  );
}

export default App;
