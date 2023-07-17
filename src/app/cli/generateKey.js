import crypto from 'node:crypto'


export default function generateKey() {
    return crypto.randomBytes(16).toString("hex")
}

console.log(generateKey())