import jwt from "jsonwebtoken";

// headers contiene los datos del encabezado de la peticion http

const verificarToken = (req, res, next) => {
    try {
        const header = req.headers["authorization"];

        if (!header) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = header.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            }
            console.log(decoded);
            req.user = decoded;
            console.log(req.user);
            next();
        });
    } catch (error) {
        console.error("Error execute middleware:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {
    verificarToken
}