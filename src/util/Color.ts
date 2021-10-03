export class Color {

    r: number
    g: number
    b: number
    a: number

    constructor(red: number, green: number, blue: number, alpha: number) {
        this.r = red
        this.g = green
        this.b = blue
        this.a = alpha
    }

    static WHITE = new Color(255, 255, 255, 1)
    static BLACK = new Color(0, 0, 0, 1)

    public static genRandColor(mix?: Color) {
        let red = Math.random() * 255
        let green = Math.random() * 255
        let blue = Math.random() * 255

        if(mix) {
            red = (red + mix.r)/2
            blue = (blue + mix.b)/2
            green = (green + mix.g)/2
        }

        return new Color(red, green, blue, 1)
    }

    mix(mix: Color) {
        let r = (this.r + mix.r)/2
        let b = (this.b + mix.b)/2
        let g = (this.g + mix.g)/2

        return new Color(r, g, b, 1)
    }

    invert() {
        let r = 255 - this.r
        let g = 255 - this.g
        let b = 255 - this.b

        return new Color(r, g, b, 1)
    }

    brighter() {
        return this.mix(Color.WHITE)
    }

    darker() {
        return this.mix(Color.BLACK)
    }

    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
}