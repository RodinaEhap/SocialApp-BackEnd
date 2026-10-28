"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});
const connectRedis = async () => {
    try {
        await exports.redisClient.connect();
        console.log("Redis Connected Successfully");
    }
    catch (error) {
        console.error("Redis Connection Failed!!!!!!!!", error);
    }
};
exports.connectRedis = connectRedis;
