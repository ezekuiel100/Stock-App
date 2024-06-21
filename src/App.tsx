import { useState } from "react";
import Nav from "./components/Nav";
import StockCard from "./components/StockCard";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";

export type Stock = {
  stock: string;
  logo: string;
  symbol: string;
  name: string;
  close: string;
};

async function fetchData(limit: number) {
  const res = await fetch(
    `https://brapi.dev/api/quote/list?&sortBy=volume&sortOrder=desc&limit=${limit}&token=${
      import.meta.env.VITE_TOKEN
    }`
  );
  const data = await res.json();

  return data;
}

function App() {
  const [limit, setLimit] = useState<number>(24);

  const { data, isPending } = useQuery({
    queryKey: ["stocks", limit],
    queryFn: () => fetchData(limit),
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="flex justify-center">
        {isPending && (
          <div className="flex items-center h-screen">
            <CircularProgress />
          </div>
        )}
        <StockCard stock={data?.stocks} setLimit={setLimit} />
      </div>
    </div>
  );
}

export default App;
