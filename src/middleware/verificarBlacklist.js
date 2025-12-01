import logoutServices from "../services/logoutServices.js";

const blacklistToken = async (req, res, next) => {
    try {
        const header = req.headers["authorization"];

        if (!header) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = header.split(" ")[1];

        const invalido = await logoutServices.blacklistToken(token);
        if (invalido) {
            return res.status(401).json({ error: "Invalid Token. The user logged out" });
        }
        
        next;
    } catch (error) {
        console.error("Error execute middleware:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {
    blacklistToken
};