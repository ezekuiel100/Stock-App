// `https://financialmodelingprep.com/api/v3/stock/list?apikey=${
//   import.meta.env.VITE_KEY

export async function fetchData({ pageParam = 0 }) {
  const res = await fetch(`src/data/stocks.json`);
  const data = await res.json();
  const nextCursor = pageParam + 20;
  return { data: data.slice(0, nextCursor), nextCursor };
}
