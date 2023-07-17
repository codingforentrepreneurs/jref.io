import {pbkdf2Sync} from 'node:crypto'

const saltKey = process.env.SALT_KEY ? process.env.SALT_KEY : 'salt'
const hashIterations = 10000


export function hashPassword(rawPasswordString) {
    const key = pbkdf2Sync(rawPasswordString, saltKey, hashIterations, 64, 'sha512')
    return key.toString("hex")
}

export function isMatchingPassword(enteredRawPassword, storedHash) {
    const hash = pbkdf2Sync(enteredRawPassword, saltKey, hashIterations, 64, 'sha512').toString("hex")
    return storedHash === hash
}


// function verifyPasswordWorking() {
//     const pw = "abc123"
//     const pwHash = hashPassword(pw)
//     const pwHash2 = hashPassword("abc1234")
//     const isValid = isMatchingPassword(pw, pwHash2)
//     console.log(isValid)
// }

// verifyPasswordWorking()