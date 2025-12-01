const tokenBlacklist = new Set();

const logoutUser = async (token) => {
    tokenBlacklist.add(token);

    return { message: "Logout exitoso" };
};

const blacklistToken = async (token) => {
    return tokenBlacklist.has(token);
};

export {
    logoutUser,
    blacklistToken
};