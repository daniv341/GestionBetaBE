import redis from "../config/redis.js";

const logoutUser = async (token) => {
    const ttl=7200;

    await redis.set(token, "blacklisted", { EX: ttl });

    return { message: "Logout exitoso" };
};

const blacklistToken = async (token) => {
    const existencia = await redis.get(token);
    return existencia !== null;
};

export {
    logoutUser,
    blacklistToken
};