export function clamp(num: number, min: number, max: number = Infinity) {
    return Math.max(Math.min(num, max), min)
}

export function approxEQ(num1: number, num2: number, epsilon = 0.001) {
    return Math.abs(num1 - num2) < epsilon
}

export function getRandBool() {
    return Math.random() - 0.5 > 0
}