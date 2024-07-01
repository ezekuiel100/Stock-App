// `https://financialmodelingprep.com/api/v3/stock/list?apikey=${
//   import.meta.env.VITE_KEY

export async function fetchData() {
  const res = await fetch(`src/data/stocks.json`);
  const data = await res.json();
  // console.log(data);
  return data;
}
