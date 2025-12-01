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

const handleGoogleCallback = async (code) => {
    const redirect_uri = process.env.GOOGLE_REDIRECT_URI;

    // intercambia el code por un token
    const tokenParams = { code, redirect_uri };
    const accessToken = await client.getToken(tokenParams);

    // obtiene la info del usuario del mail que pusiste desde Google
    const infoUsuario = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
            headers: { Authorization: `Bearer ${accessToken.token.access_token}` }
        }
    ).then(res => res.json());

    const { sub, name, email, picture } = infoUsuario;

    let user = await prisma.usuarioOAuth.findUnique({
        where: { email }
    });

    if (!user) {
        user = await prisma.usuarioOAuth.create({
            data: {
                uid: sub,
                nombre: name,
                email,
            }
        });
    }

    const token = jwt.sign(
        { uid: user.uid, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

    return {token,user}
};

const getAllUsuariosOauth = async () => {
    return prisma.UsuarioOAuth.findMany();
};

const getUsuarioOauthByUid = async (uid) => {
    return prisma.UsuarioOAuth.findUnique({
        where: { uid : uid}
    });
};

const updateUsuarioOauth = async (uid, data) => {
    return prisma.UsuarioOAuth.update({
        where: { uid : uid },
        data
    });
};

const deleteUsuarioOauth = async (uid) => {
    return prisma.UsuarioOAuth.delete({
        where: { uid: uid }
    });
};

export {
    getGoogleAuthURL,
    handleGoogleCallback,
    getAllUsuariosOauth,
    getUsuarioOauthByUid,
    updateUsuarioOauth,
    deleteUsuarioOauth
};