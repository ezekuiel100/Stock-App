import { useParams } from "react-router-dom";

function Stock() {
  const { stockId } = useParams();

  return (
    <div>
      <h1 className="text-xl">{stockId}</h1>
    </div>
  );
}

export default Stock;
