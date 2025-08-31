import express from "express";
import routes from "./routes";
import swaggerRouter from "./swagger";
import middlewareErrorHandler from "./middleware";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/", swaggerRouter);
app.use("/api", routes);
app.use(middlewareErrorHandler);

app.listen(PORT, () => {
  console.log(`listening on port:${PORT}`);
});
