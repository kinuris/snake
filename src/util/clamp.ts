export function clamp(num: number, min: number, max: number = Infinity) {
    return Math.max(Math.min(num, max), min)
}