import pbkdf2 from './pbkdf2'

const saltKey = process.env.SALT_KEY ? process.env.SALT_KEY : 'salt'
const hashIterations = 10000

export const runtime = 'edge'

export function hashPassword(rawPasswordString) {
    const key = pbkdf2(rawPasswordString, saltKey, hashIterations, 64, 'sha512')
    return key
}

export function isMatchingPassword(enteredRawPassword, storedHash) {
    const hash = pbkdf2(enteredRawPassword, saltKey, hashIterations, 64, 'sha512')
    return storedHash === hash
}


// function verifyPasswordWorking() {
//     const pw = "abc123"
//     const pwHash = hashPassword(pw)
//     const pwHash2 = hashPassword("abc1234")
//     const isValid = isMatchingPassword(pw, pwHash2)
// }

// verifyPasswordWorking()