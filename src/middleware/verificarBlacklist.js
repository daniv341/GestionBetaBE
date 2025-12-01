import * as logoutServices from "../services/logoutServices.js";

const verificarBlacklist = async (req, res, next) => {
    try {
        const header = req.headers["authorization"].split(" ")[1];

        const invalido = await logoutServices.blacklistToken(header);
        if (invalido) {
            return res.status(401).json({ error: "Invalid Token. The user logged out" });
        }

        next();
    } catch (error) {
        console.error("Error execute middleware:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {
    verificarBlacklist
};