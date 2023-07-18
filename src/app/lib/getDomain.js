export default function getDomain() {
    const protocol = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "https" : "http"
    const domain = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "localhost:3000"
    return `${protocol}://${domain}`
}