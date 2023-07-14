export default function randomShortStrings() {
    return Math.random().toString(36).substring(2, 7)
}