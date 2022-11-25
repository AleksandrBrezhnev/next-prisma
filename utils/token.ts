import { SignJWT, jwtVerify, JWTVerifyResult } from "jose";

const secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : 'secret';
const accessExpires = Number(process.env.TOKEN_ACCESS_EXPIRES);
const refreshExpires = Number(process.env.TOKEN_REFRESH_EXPIRES);

export const createAccessToken = async (id: number) => {
    const payload = { id };
    const jwtToken = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(new Date().getTime() + accessExpires)
        .sign(new TextEncoder().encode(secret));
    return jwtToken;

}
export const createRefreshToken = async (id: number) => {
    const payload = { id };
    console.log(id)
    const jwtToken = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(new Date().getTime() + refreshExpires)
        .sign(new TextEncoder().encode(secret));
        console.log(jwtToken)
    return jwtToken;
};

export const createTokensPair = async (id: number) => {

    const access = await createAccessToken(id).catch(err => {
        console.log(err)
        throw err
    })
    const refresh = await createRefreshToken(id).catch(err => {
        console.log(err)

        throw err
    })

    return { access, refresh }

};

export const verifyToken = async (token: string) => {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))

        return {payload, err: null};
    } catch (err: any) {
        if(err.code === 'ERR_JWT_EXPIRED') {
            return {payload: null, err: true}
        }
    }
};