import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import "dotenv/config";
import { AuthorizationCode } from "simple-oauth2";

const client = new AuthorizationCode({
    client: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET
    },
    auth: {
        tokenHost: "https://oauth2.googleapis.com",
        authorizePath: "https://accounts.google.com/o/oauth2/v2/auth",
        tokenPath: "/token"
    }
});

const getGoogleAuthURL = async () => {
    const redirect_uri = process.env.GOOGLE_REDIRECT_URI;

    const authorizationUri = client.authorizeURL({
        redirect_uri,
        scope: ["openid", "email", "profile"]
    });

    return authorizationUri;
};

const handleGoogleCallback = async (data) => {
    const redirect_uri = process.env.GOOGLE_REDIRECT_URI;

    // intercambia el code por un token
    const tokenParams = { data, redirect_uri };
    const accessToken = await client.getToken(tokenParams);

    // obtiene la info del usuario del mail que pusiste desde Google
    const infoUsuario = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
            headers: { Authorization: `Bearer ${accessToken.token.access_token}` }
        }
    ).then(res => res.json());

    const { subGoogle, nameGoogle, emailGoogle } = infoUsuario;

    prisma.Usuario.create({
        data: {
            uid: subGoogle,
            nombre: nameGoogle,
            email: emailGoogle,
        }
    });

    const token = jwt.sign(
        { uid: data.uid, email: data.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

    return {token}
};

export {
    getGoogleAuthURL,
    handleGoogleCallback
};