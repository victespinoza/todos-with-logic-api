import { Router } from "express";

const router = Router();

router.get("/todo", (req, res) => {
  res.send({ sarasa: "ok" });
});

export default router;
