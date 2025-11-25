import * as oauthServices from "../services/oauthServices.js";

const getGoogleRedirect = async (req, res) => {
    try {

        const url = await oauthServices.getGoogleAuthURL();
        return res.redirect(url);
    } catch (error) {
        console.error("Error sing in usuario with Google:", error);
        return res.status(500).json({ error: error.message });
    }

};

const getGoogleCallback = async (req, res) => {
    try {
        const code = req.query.code;

        if (!code) {
            return res.status(400).json({ error: "Missing authorization code" });
        }

        const { token, user } = await oauthServices.handleGoogleCallback(code);

        return res.status(201).json({ user, token });

    } catch (error) {
        console.error("Error login usuario with Google:", error);
        return res.status(500).json({ error: error.message });
    }
};

export {
    getGoogleRedirect,
    getGoogleCallback
};