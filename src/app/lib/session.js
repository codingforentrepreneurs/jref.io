import * as jose from "jose"
import {cookies} from 'next/headers'

const secret = jose.base64url.decode(process.env.JOSE_SESSION_KEY)
const issuer = 'urn:jrefio:issuer'
const audience = 'urn:jrefio:audience'
const expiresAt = '10s'

export const encodeUserSession = async (userId) => {
    const jwt = await new jose.EncryptJWT({ 'user': userId })
        .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
        .setIssuedAt()
        .setIssuer(issuer)
        .setAudience(audience)
        .setExpirationTime(expiresAt)
        .encrypt(secret)
    return jwt
}


export const decodeUserSession = async (jwt) => {
    try {
        const { payload } = await jose.jwtDecrypt(jwt, secret, {
            issuer: issuer,
            audience: audience,
        })
        const {user} = payload
        return user
    } catch (error) {
        
    }
    return null

} 

// async function verifySession () {
//     const userId = "1"
//     const jwtToken = await encodeUserSession(userId)
//     const user = await decodeUserSession(`${jwtToken}`)
//     console.log(user, userId === user)
// }

// verifySession().then(x=>console.log("verify")).catch(err=>console.log(err))


export const setSessionUser = async (userId) => {
    const newSessionValue = await encodeUserSession(userId)
    // call in routes.js
    cookies().set("session_id", newSessionValue)
}

export const getSessionUser = async () => {
    const cookieSessionValue = cookies().get("session_id").value
    if (!cookieSessionValue) {
        return null
    }
    const extractedUserId = await decodeUserSession(cookieSessionValue)
    if (!extractedUserId) {
        return null
    }
    return extractedUserId
}