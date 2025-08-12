import { Router } from "express";
import TokenController from "../controllers/token.js";
import validateEncodedRequest from "../middlewares/encoder.js";
import validateDecoderRequest from "../middlewares/decoder.js";

const router = Router();

router.get("/", async (req, res) => {
  res.status(200).send("Healthy");
});

router.post("/encoder", validateEncodedRequest, TokenController.encoder);

router.post("/decoder", validateDecoderRequest, TokenController.decoder);

export default router;
