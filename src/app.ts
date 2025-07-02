import "dotenv/config";
import express, { Express, json } from "express";
import morgan from "morgan";
import { JwtMiddleware } from "./middlewares/auth-middleware";
import cors from "cors";
import { connectDatabase } from "./db/db";
import authRouter from "./controllers/authentication";
import v1Router from "./controllers/v1";
import { errorHandler } from "./middlewares/error-handler";
import responseTime from "response-time";
const app: Express = express();
const PORT = process.env.PORT;

app.use(responseTime());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors({ origin: ['https://fitness.therishabhdev.com','http://localhost:4200'] }));
app.use(json());

connectDatabase();

app.use("/auth", authRouter);

app.use(JwtMiddleware);
app.use("/api/v1", v1Router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `
    ---------------------------------
    |\tServer running on port ${PORT} |
    |-------------------------------|
    |\thttp://localhost:${PORT}       |
    ---------------------------------`
  );
});
