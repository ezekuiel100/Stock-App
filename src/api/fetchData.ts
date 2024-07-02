async function fetchData() {
  let res = await fetch("http://localhost:3000/");
  let data = await res.json();
  self.postMessage(data);
}

fetchData();
