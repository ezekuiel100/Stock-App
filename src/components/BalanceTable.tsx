import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useQuery } from "@tanstack/react-query";

// `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${
//   import.meta.env.VITE_KEY
// }`

async function fetchIncomeStatement() {
  const res = await fetch(`src/data/balance.json`);
  const data = await res.json();
  return data;
}

function BalanceTable() {
  const { data } = useQuery({
    queryKey: ["stockBalance"],
    queryFn: fetchIncomeStatement,
  });

  // console.log(data);
  if (!data) return;

  const reverseData = [...data].reverse();

  return (
    <Table className="mb-28 bg-white">
      <TableHeader className="border-2">
        <TableRow>
          <TableHead className="">Ano</TableHead>
          <TableHead className="">Receita</TableHead>
          <TableHead>Ebitda</TableHead>
          <TableHead>Lucro</TableHead>
        </TableRow>
      </TableHeader>

      {reverseData.map(({ calendarYear, revenue, ebitda, netIncome }, i) => (
        <TableBody key={i} className="border-2">
          <TableRow className=" ">
            <TableCell className="font-medium ">{calendarYear}</TableCell>
            <TableCell className="font-medium border-2">
              {new Intl.NumberFormat("pt-br", {
                notation: "compact",
                compactDisplay: "short",
              }).format(+revenue)}
            </TableCell>
            <TableCell className="font-medium border-2">
              {new Intl.NumberFormat("pt-br", {
                notation: "compact",
                compactDisplay: "short",
              }).format(+ebitda)}
            </TableCell>
            <TableCell className="font-medium border-2">
              {new Intl.NumberFormat("pt-br", {
                notation: "compact",
                compactDisplay: "short",
              }).format(+netIncome)}
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
}

export default BalanceTable;
