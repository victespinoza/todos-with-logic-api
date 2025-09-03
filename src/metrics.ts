import client from "prom-client";
import { Router, Response, Request, NextFunction } from "express";

const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Latencia de requests HTTP por ruta/método/código",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

export const metricMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const seconds = Number(end - start) / 1e9;
    httpDuration
      .labels(req.method, req.route?.path ?? req.path, String(res.statusCode))
      .observe(seconds);
  });
  next();
};

export const metricRouter = Router();
metricRouter.get("/health", (req, res) => res.json({ ok: true }));

metricRouter.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});
