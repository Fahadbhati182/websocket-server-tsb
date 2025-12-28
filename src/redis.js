//For In memory Data storing
import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  tls: {},
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;
