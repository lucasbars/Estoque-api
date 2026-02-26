import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import rawMaterialRoutes from "./routes/rawMaterialRoutes";
import productionRoutes from "./routes/productionRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/raw-materials", rawMaterialRoutes);
app.use("/api/production", productionRoutes);

export default app;
