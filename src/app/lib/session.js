import * as jose from "jose"
import {cookies} from 'next/headers'

// const secret = jose.base64url.decode(process.env.JOSE_SESSION_KEY)
const secret = new TextEncoder().encode(process.env.JOSE_SESSION_KEY)
const issuer = 'urn:jrefio:issuer'
const audience = 'urn:jrefio:audience'
const expiresAt = '2h'

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


export const setSessionUser = async (userId) => {
    const newSessionValue = await encodeUserSession(userId)
    // call in routes.js
    cookies().set("session_id", newSessionValue)
}

export const getSessionUser = async () => {
    const cookieSessionValue = cookies().get("session_id")
    if (!cookieSessionValue) {
        return null
    }
    const extractedUserId = await decodeUserSession(cookieSessionValue.value)
    if (!extractedUserId) {
        return null
    }
    return extractedUserId
}

export const endSessionForUser = async () => {
    cookies().delete("session_id")
}