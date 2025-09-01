import express from "express";
import routes from "./routes";
import swaggerRouter from "./swagger";
import middlewareErrorHandler from "./middleware";
import logger from "./logger";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/", swaggerRouter);
app.use("/api", routes);
app.use(middlewareErrorHandler);

app.listen(PORT, () => {
  logger.info(`listening on port:${PORT}`);
});
