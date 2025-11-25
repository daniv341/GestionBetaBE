import * as oauthServices from "../services/oauthServices.js";

const getGoogleRedirect = (req, res) => {
    try {
        const url = oauthServices.getGoogleAuthURL();
        return res.redirect(url);
    } catch (error) {
        console.error("Error sing in usuario with Google:", error);
        return res.status(500).json({ error: error.message });
    }

};

const getGoogleCallback = async (req, res) => {
    try {
        const data = req.query;

        const emailExistente = await prisma.Usuario.findUnique({
            where: { email: data.email },
        });
        if (emailExistente) {
            return res.status(400).json({ error: `A usuario with email "${data.email}" already exists` });
        }

        const { token, user } = await oauthServices.handleGoogleCallback(data);
    
        return res.json({ user, token });
    } catch (error) {
        console.error("Error login usuario with Google:", error);
        return res.status(500).json({ error: error.message });
    }

};

export {
    getGoogleRedirect,
    getGoogleCallback
};