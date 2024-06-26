import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import StockPage from "./pages/StockPage.tsx";
import NoPage from "./pages/NoPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Nav from "./components/Nav.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Nav />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:stockName" element={<StockPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
