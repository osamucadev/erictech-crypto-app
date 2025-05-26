import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import cryptoRoutes from "./routes/cryptoRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";
import { setupSwagger } from './utils/swagger';
import path from "path";

const app = express();

setupSwagger(app);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/crypto", cryptoRoutes);

// Error handling
app.use(errorHandler);

export default app;
