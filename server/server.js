import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: "http://localhost:5173", // Substitua pela origem do seu frontend
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Usar o middleware cors
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "stocks.json"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
