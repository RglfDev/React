import express from "express";
import cors from "cors";
import incidentRoutes from "./routes/incidents";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/incidents", incidentRoutes);

export default app;
