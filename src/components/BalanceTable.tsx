import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type DataType = {
  fiscalDateEnding: string;
  totalRevenue: string;
  ebitda: string;
  netIncome: string;
};

function BalanceTable() {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    async function fetchIncomeStatement() {
      const res = await fetch(`src/data/balance.json`);
      const data = await res.json();
      setData(data.annualReports.reverse());
    }
    fetchIncomeStatement();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Ano</TableHead>
          <TableHead className="">Receita</TableHead>
          <TableHead>Ebitda</TableHead>
          <TableHead>Lucro</TableHead>
        </TableRow>
      </TableHeader>

      {data.map(({ fiscalDateEnding, totalRevenue, ebitda, netIncome }, i) => (
        <TableBody key={i}>
          <TableRow>
            <TableCell className="font-medium">
              {fiscalDateEnding.slice(0, 4)}
            </TableCell>
            <TableCell className="font-medium">
              {new Intl.NumberFormat("pt-br", {
                notation: "compact",
                compactDisplay: "short",
              }).format(+totalRevenue)}
            </TableCell>
            <TableCell className="font-medium">
              {new Intl.NumberFormat("pt-br", {
                notation: "compact",
                compactDisplay: "short",
              }).format(+ebitda)}
            </TableCell>
            <TableCell className="font-medium">
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
