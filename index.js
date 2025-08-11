import express from "express";
import router from "./routes/index.js";
import RedisClient from "./config/redis.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, async () => {
  const redis = new RedisClient();
  await redis.init();
  console.log(`Server started at http://localhost:${PORT}`);
});

app.use("/", router);
