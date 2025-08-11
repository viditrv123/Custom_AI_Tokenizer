import { Router } from "express";
import TokenController from "../controllers/token.js";

const router = Router();

router.get("/", async (req, res) => {
  res.status(200).send("Healthy");
});

router.post("/encoder", TokenController.encoder);

router.post("/decoder", TokenController.decoder);

export default router;
