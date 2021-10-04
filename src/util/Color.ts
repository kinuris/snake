import { approxEQ, clamp, getRandBool } from "./clamp"

export class Color {

    r: number
    g: number
    b: number
    a: number

    private static calculateHue(r: number, g: number, b: number, max: number, delta: number) {
        let hue: number 

        if(approxEQ(r, max)) {
            hue = 60 * (((g - b)/delta)%6)
        } else if(approxEQ(g, max)) {
            hue = 60 * (((b - r)/delta) + 2)
        } else if(approxEQ(b, max)) {
            hue = 60 * (((r - g)/delta) + 4)
        } else {
            hue = 0
        }

        return hue
    }
    
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

    static WHITE = new Color(255, 255, 255, 1)
    static BLACK = new Color(0, 0, 0, 1)

    constructor(red: number, green: number, blue: number, alpha: number) {
        this.r = red
        this.g = green
        this.b = blue
        this.a = alpha
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

    setAlpha(alpha: number) {
        let a = alpha

        return new Color(this.r, this.g, this.b, a)
    }

    toHSL() {
        let normalizedR = this.r/255
        let normalizedG = this.g/255
        let normalizedB = this.b/255

        let cMax = Math.max(normalizedR, normalizedG, normalizedB)
        let cMin = Math.min(normalizedR, normalizedG, normalizedB)

        let delta = cMax - cMin

        let lightness = (cMax + cMin)/2
        let saturation = approxEQ(delta, 0) ? 0 : delta/(1 - Math.abs((2 * lightness) - 1))
        let hue = Color.calculateHue(normalizedR, normalizedG, normalizedB, cMax, delta)

        return new ColorHSL(hue, saturation * 100, lightness * 100)
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

export class ColorHSL {
    private h
    private s
    private l

    constructor(hue: number, saturation: number, lightness: number) {
        this.h = hue
        this.s = saturation
        this.l = lightness
    }

    toString() {
        return `hsl(${this.h}, ${this.s}%, ${this.l}%)`
    }

    saturate() {
        this.s = (this.s + 100)/2

        return this
    }

    deSaturate() {
       this.s /= 2 

       return this
    }

    randSat() {
        this.s = this.s + (getRandBool() ? (-10 * Math.random()) - 5 : (10 * Math.random()) + 5)
        this.s = clamp(this.s, 0, 100)

        return this
    }

    randHue() {
        this.h = this.h + (getRandBool() ? (-5 * Math.random()) : (5 * Math.random()))
        this.h = clamp(this.h, 0, 360)

        return this
    }

    randLightness() {
        this.l = this.l + (getRandBool() ? (-10 * Math.random()) : (10 * Math.random()))
        this.l = clamp(this.l, 0, 100)

        return this
    }
}