import { createClient } from "redis";
export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connected Successfully");
  } catch (error) {
    console.error("Redis Connection Failed!!!!!!!!", error);
  }
};
