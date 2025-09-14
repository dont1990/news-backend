// src/app.ts
import express from "express";
import cors from "cors";
import newsRoutes from "./routes/news.routes";
import ratesRoutes from "./routes/rates.routes";
import newsletterRoutes from "./routes/newsletter.routes";
import categoryRoutes from "./routes/category.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rates", ratesRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/categories", categoryRoutes);


export default app;
